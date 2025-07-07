"use client";

import { useEffect, useRef } from "react";

const COLOR = "#FFFFFF";
const HIT_COLOR = "#333333";
const BACKGROUND_COLOR = "#000000";
const BALL_COLOR = "#FFFFFF";
const PADDLE_COLOR = "#FFFFFF";
const LETTER_SPACING = 1;
const WORD_SPACING = 3;

const PIXEL_MAP = {
  K: [
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
};

interface Pixel {
  x: number;
  y: number;
  size: number;
  hit: boolean;
}
interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}
interface Paddle {
  x: number;
  y: number;
  width: number;
  height: number;
  targetY: number;
  isVertical: boolean;
}

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pixelsRef = useRef<Pixel[]>([]);
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 });
  const paddlesRef = useRef<Paddle[]>([]);
  const scaleRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000);
      initializeGame();
    };

    const initializeGame = () => {
      const scale = scaleRef.current;
      const LARGE_PIXEL_SIZE = 8 * scale;
      const SMALL_PIXEL_SIZE = 4 * scale;
      const BALL_SPEED = 10 * scale;

      pixelsRef.current = [];
      const words = ["KRSNA", "IS ALL YOU NEED"];

      const calculateWordWidth = (word: string, pixelSize: number) => {
        return (
          word.split("").reduce((width, letter) => {
            const letterWidth =
              PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0;
            return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize;
          }, 0) -
          LETTER_SPACING * pixelSize
        );
      };

      const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE);
      const totalWidthSmall = words[1]
        .split(" ")
        .reduce((width, word, index) => {
          return (
            width +
            calculateWordWidth(word, SMALL_PIXEL_SIZE) +
            (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
          );
        }, 0);
      const totalWidth = Math.max(totalWidthLarge, totalWidthSmall);
      const scaleFactor = Math.min(4, (canvas.width * 0.8) / totalWidth);

      const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor;
      const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor;

      const largeTextHeight = 5 * adjustedLargePixelSize;
      const smallTextHeight = 5 * adjustedSmallPixelSize;
      const spaceBetweenLines = 5 * adjustedLargePixelSize;
      const totalTextHeight =
        largeTextHeight + spaceBetweenLines + smallTextHeight;

      let startY = (canvas.height - totalTextHeight) / 2;

      words.forEach((word, wordIndex) => {
        const pixelSize =
          wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize;
        const totalWidth =
          wordIndex === 0
            ? calculateWordWidth(word, adjustedLargePixelSize)
            : words[1].split(" ").reduce((width, w, index) => {
                return (
                  width +
                  calculateWordWidth(w, adjustedSmallPixelSize) +
                  (index > 0 ? WORD_SPACING * adjustedSmallPixelSize : 0)
                );
              }, 0);

        let startX = (canvas.width - totalWidth) / 2;

        if (wordIndex === 1) {
          word.split(" ").forEach((subWord) => {
            subWord.split("").forEach((letter) => {
              const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP];
              if (!pixelMap) return;
              for (let i = 0; i < pixelMap.length; i++) {
                for (let j = 0; j < pixelMap[i].length; j++) {
                  if (pixelMap[i][j])
                    pixelsRef.current.push({
                      x: startX + j * pixelSize,
                      y: startY + i * pixelSize,
                      size: pixelSize,
                      hit: false,
                    });
                }
              }
              startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize;
            });
            startX += WORD_SPACING * adjustedSmallPixelSize;
          });
        } else {
          word.split("").forEach((letter) => {
            const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP];
            if (!pixelMap) return;
            for (let i = 0; i < pixelMap.length; i++) {
              for (let j = 0; j < pixelMap[i].length; j++) {
                if (pixelMap[i][j])
                  pixelsRef.current.push({
                    x: startX + j * pixelSize,
                    y: startY + i * pixelSize,
                    size: pixelSize,
                    hit: false,
                  });
              }
            }
            startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize;
          });
        }
        startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0;
      });

      const ballStartX = canvas.width * 0.9;
      const ballStartY = canvas.height * 0.1;

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: adjustedLargePixelSize / 2,
      };

      const paddleWidth = adjustedLargePixelSize;
      const paddleLength = 7 * adjustedLargePixelSize;

      paddlesRef.current = [
        {
          x: 0,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: 0,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
      ];
    };

    const updateGame = () => {
      const ball = ballRef.current,
        paddles = paddlesRef.current;
      ball.x += ball.dx;
      ball.y += ball.dy;
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height)
        ball.dy = -ball.dy;
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width)
        ball.dx = -ball.dx;
      paddles.forEach((p) => {
        if (p.isVertical) {
          if (
            ball.x - ball.radius < p.x + p.width &&
            ball.x + ball.radius > p.x &&
            ball.y > p.y &&
            ball.y < p.y + p.height
          )
            ball.dx = -ball.dx;
        } else {
          if (
            ball.y - ball.radius < p.y + p.height &&
            ball.y + ball.radius > p.y &&
            ball.x > p.x &&
            ball.x < p.x + p.width
          )
            ball.dy = -ball.dy;
        }
        p.targetY = p.isVertical
          ? Math.max(
              0,
              Math.min(canvas.height - p.height, ball.y - p.height / 2)
            )
          : Math.max(0, Math.min(canvas.width - p.width, ball.x - p.width / 2));
        if (p.isVertical) {
          p.y += (p.targetY - p.y) * 0.1;
        } else {
          p.x += (p.targetY - p.x) * 0.1;
        }
      });
      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true;
          const centerX = pixel.x + pixel.size / 2,
            centerY = pixel.y + pixel.size / 2;
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx;
          } else {
            ball.dy = -ball.dy;
          }
        }
      });
    };

    const drawGame = () => {
      if (!ctx) return;
      ctx.fillStyle = BACKGROUND_COLOR;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR;
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
      });
      ctx.fillStyle = BALL_COLOR;
      ctx.beginPath();
      ctx.arc(
        ballRef.current.x,
        ballRef.current.y,
        ballRef.current.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.fillStyle = PADDLE_COLOR;
      paddlesRef.current.forEach((p) =>
        ctx.fillRect(p.x, p.y, p.width, p.height)
      );
    };

    const gameLoop = () => {
      updateGame();
      drawGame();
      requestAnimationFrame(gameLoop);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    gameLoop();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      aria-label="KRSNA: Fullscreen Pong game with pixel text"
    />
  );
}

export default Game;
