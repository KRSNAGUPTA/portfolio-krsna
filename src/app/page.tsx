import Game from "@/components/game";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { BiLinkExternal } from "react-icons/bi";
import { VscGithub } from "react-icons/vsc";

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
        <div className="relative flex min-h-screen min-w-screen items-center justify-center bg-black">
          <div
            className="
              absolute inset-0
              [background-size:40px_40px]
              [background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]
            "
          />

          {/* Radial gradient overlay */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="flex flex-col sm:flex-row flex-wrap z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
            {projects.map((project) => (
              <CardContainer key={project.id}>
                <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-neutral-100"
                  >
                    {project.title}
                  </CardItem>

                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-200 text-xs font-semibold antialiased max-w-xs mt-2"
                  >
                    {project.description}
                  </CardItem>

                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={project.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt={`${project.title} preview`}
                    />
                  </CardItem>

                  <div className="flex justify-between items-center mt-10">
                    <CardItem
                      href={project.githubLink}
                      translateZ={20}
                      as="a"
                      target="_blank"
                      className="p-1 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
                    >
                      <VscGithub className="h-7 w-7 text-white" />
                    </CardItem>

                    <CardItem
                      href={project.liveLink}
                      target="_blank"
                      translateZ={20}
                      as="button"
                      className="hover:cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white text-xs font-semibold hover:bg-white/20 transition"
                    >
                      {project.buttonText}
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
