import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import data from "@/data/ProjectsData.ts";

const projectData = data;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

export default function Projects() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<(typeof projectData)[number]>();

  const open = (project: (typeof projectData)[number]) => {
    setSelected(project);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        className="m-auto w-[min(1200px,92vw)] cursor-zoom-out bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm open:animate-in open:fade-in open:zoom-in-95"
      >
        {selected && (
          <figure>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full rounded-xl shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {selected.title}
            </figcaption>
          </figure>
        )}
      </dialog>
      <motion.div
        className="flex max-w-3xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between align-start"
          variants={containerVariants}
        >
          {projectData.map((project, index) => (
            <motion.div key={index} variants={itemVariants} custom={index}>
              <div className="max-w-3xl min-h-[450px] mx-auto relative p-6 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-border/40 dark:border-border/60 backdrop-blur-md shadow-md dark:shadow-lg mb-2">
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => open(project)}
                    aria-label={`Enlarge ${project.title} image`}
                    className="block w-full cursor-zoom-in rounded-lg transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-contain rounded-lg"
                    />
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <Badge key={idx} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.source && (
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground flex items-center gap-1"
                      >
                        <Button variant="ghost" size="sm">
                          <Github className="w-6 h-6" />
                          Source
                        </Button>
                      </a>
                    )}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground flex items-center gap-1"
                      >
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-6 h-6" />
                          Website
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
