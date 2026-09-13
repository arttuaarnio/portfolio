import { motion } from "framer-motion";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const technologies = [
  // Languages
  {
    name: "JavaScript",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Python",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },

  // Frontend
  {
    name: "React",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },

  // Backend & Database
  {
    name: "Node.js",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg",
  },
  {
    name: "PostgreSQL",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },

  // DevOps
  {
    name: "Docker",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },

  // Tools & Environment
  {
    name: "Git",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Terminal",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "macOS",
    status: "working",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
  },

  // Exploring
  {
    name: "Go",
    status: "exploring",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    name: "Kubernetes",
    status: "exploring",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
  },
  {
    name: "C",
    status: "exploring",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Technologies() {
  return (
    <section className="py-8 relative">
      <motion.div
        className="max-w-3xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-2xl font-semibold mb-6 text-center md:text-left"
          variants={itemVariants}
        >
          Technologies
        </motion.h2>

        <motion.p
          className="text-muted-foreground text-center md:text-left mb-4"
          variants={itemVariants}
        >
          A selection of technologies I use regularly and am currently exploring.
        </motion.p>

        <motion.div
          className="flex justify-center md:justify-start items-center gap-4 mb-8 text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-foreground/40" />
            <span>Working with</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span>Exploring</span>
          </div>
        </motion.div>

        <TooltipProvider>
          <motion.div
            className="flex flex-wrap justify-center gap-5"
            variants={containerVariants}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                custom={index}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="relative p-3 rounded-md bg-muted hover:bg-muted/80 transition-all"
                      title={tech.name}
                    >
                      {tech.status === "exploring" && (
                        <span
                          className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary"
                          aria-label="Currently exploring"
                        />
                      )}

                      <img
                        src={tech.src}
                        alt={`${tech.name} logo`}
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                  </TooltipTrigger>

                  <TooltipContent>
                    {tech.name}
                    {tech.status === "exploring" && " · Exploring"}
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>
        </TooltipProvider>
      </motion.div>
    </section>
  );
}
