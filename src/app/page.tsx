import Game from "@/components/game";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BiLinkExternal } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";
import { cn } from "@/lib/utils";
const projects = [
  {
    id: 1,
    title: "Task Manager",
    description:
      "A simple yet intuitive task management app that helps you organize your tasks efficiently. Create, edit, and delete tasks with ease.",
    image: "/task.webp",
    buttonText: "Try now →",
    githubLink: "https://github.com/KRSNAGUPTA/task-manager",
    liveLink: "https://task.krsnadev.tech/",
  },
  {
    id: 2,
    title: "Travel Tribe",
    description:
      "Next time book your hostel with us. Fast and easy booking for hostels and hotels. We are the best in the business.",
    image: "/travel-tribe.webp",
    buttonText: "Try now →",
    githubLink: "https://github.com/KRSNAGUPTA/traveltribe",
    liveLink: "https://travel-tribe.krsnadev.tech/",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <section id="game-section">
        <Game />
      </section>
      <section id="project-section">
        <div className="relative flex min-h-screen w-full items-center justify-center bg-black px-4">
          <div
            className="
              absolute inset-0
              [background-size:40px_40px]
              [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]
            "
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="relative z-20 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-8 py-8 w-full max-w-7xl">
            {projects.map((project) => (
              <CardContainer className="w-full sm:w-[30rem]" key={project.id}>
                <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] h-auto rounded-xl p-6 border">
                  <CardItem translateZ="50" className="text-xl font-bold text-neutral-100">
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-200 text-xs font-semibold antialiased max-w-xs mt-2"
                  >
                    {project.description}
                  </CardItem>
                  <CardItem
                    translateZ="100"
                    className="w-full mt-4 relative max-w-full aspect-video rounded-xl overflow-hidden border"
                  >
                    <iframe
                      src={project.liveLink}
                      className="w-full h-full border-0"
                      scrolling="no"
                      sandbox="allow-scripts allow-same-origin"
                      title={`${project.title} Live Preview`}
                    ></iframe>
                  </CardItem>

                  <div className="flex justify-between items-center mt-10">
                    <CardItem
                      href={project.githubLink}
                      translateZ={20}
                      as="a"
                      target="__blank"
                      className="p-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
                    >
                      <VscGithub className="h-7 w-7 text-white" />
                    </CardItem>

                    <CardItem
                      href={project.liveLink}
                      target="__blank"
                      translateZ={20}
                      as="button"
                      className="hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition"
                    >
                      Try now
                      <BiLinkExternal className="h-4 w-4" />
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

