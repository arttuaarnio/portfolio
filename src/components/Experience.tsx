import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import EducationData from "@/data/EducationData.ts";
import WorkData from "@/data/WorkData.ts";

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

export default function Experience() {
  const workData = WorkData;

  const educationData = EducationData;

  return (
    <section className="pb-8 relative">
      <motion.div
        className="max-w-3xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Tabs defaultValue="work" className="w-full">
          <motion.div variants={itemVariants}>
            <TabsList className="mb-8">
              <TabsTrigger value="work" className="cursor-pointer">
                Work
              </TabsTrigger>
              <TabsTrigger value="education" className="cursor-pointer">
                Education
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <TabsContent value="work">
            <ExperienceList data={workData} />
          </TabsContent>

          <TabsContent value="education">
            <ExperienceList data={educationData} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
}

// One accent per coursework group, so the groups read apart at a glance
const groupColors = [
  "text-ctp-blue",
  "text-ctp-teal",
  "text-ctp-peach",
  "text-ctp-pink",
];

function ExperienceList({ data }: { data: any[] }) {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {data.map((item, index) => (
        <motion.div
          key={item.id ?? index}
          className="flex gap-4 p-6 rounded-xl bg-card/70 border border-border/40 dark:border-border/60 backdrop-blur-md shadow-md dark:shadow-lg"
          variants={itemVariants}
          custom={index}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
            {item.logoType === "image" && item.logo ? (
              <img
                src={item.logo}
                alt={`${item.company ?? "Company"} logo`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div
                className={`w-full h-full ${
                  item.logoColor ?? ""
                } rounded-lg flex items-center justify-center`}
              >
                <span className="text-white font-bold text-sm">
                  {item.logo ?? ""}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
              <h3 className="text-lg font-semibold">
                {item.company ?? "Company"}
              </h3>
              <span className="text-sm text-ctp-peach sm:ml-4 whitespace-nowrap">
                {item.duration ?? ""}
              </span>
            </div>

            <p className="text-ctp-blue mb-4">{item.position ?? ""}</p>

            {Array.isArray(item.achievements) &&
              item.achievements.length > 0 && (
                <ul className="space-y-3">
                  {item.achievements.map((achievement: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-ctp-teal">•</span>
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

            {Array.isArray(item.coursework) && (
              <div className="mt-5 space-y-4">
                <h4 className="text-sm font-semibold text-ctp-mauve">Relevant coursework</h4>
                {item.coursework.map(
                  (
                    { group, courses }: { group: string; courses: string[] },
                    i: number,
                  ) => (
                    <div key={group}>
                      <p className={`text-xs mb-2 ${groupColors[i % groupColors.length]}`}>
                        {group}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {courses.map((course) => (
                          <Badge key={course} variant="outline" className="whitespace-normal">
                            {course}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
