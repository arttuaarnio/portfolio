import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Github, ExternalLink } from "lucide-react";
import data from "@/data/FeaturedProjectsData.ts";

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
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export default function Projects() {
  return (
    <>
      <motion.div
        className="max-w-3xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="flex" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-6 text-ctp-mauve">
            Featured Projects
          </h2>
          <Button asChild className="ml-auto">
            <Link to="/projects">View more</Link>
          </Button>
        </motion.div>
        <motion.p
          className="text-muted-foreground mb-8"
          variants={itemVariants}
        >
          Swipe through couple of my favorite personal projects.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Carousel
            opts={{ align: "start" }}
            className="max-w-3xl mx-auto relative p-6 rounded-xl bg-card/70 border border-border/40 dark:border-border/60 backdrop-blur-md shadow-md dark:shadow-lg"
          >
            <CarouselContent className="">
              {projectData.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-full lg:basis-full"
                >
                  <div className=" ">
                    <div className="mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-contain rounded-lg"
                      />
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-ctp-blue hover:bg-ctp-blue/10 dark:hover:bg-ctp-blue/10 hover:text-ctp-blue"
                            >
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
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-ctp-green hover:bg-ctp-green/10 dark:hover:bg-ctp-green/10 hover:text-ctp-green"
                            >
                              <ExternalLink className="w-6 h-6" />
                              Website
                            </Button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </motion.div>
      </motion.div>
    </>
  );
}
