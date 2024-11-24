import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

const Skills:React.FC<SectionProps> = ({setsection,index}) => {
  const [skills, setSkills] = useState<string[]>([""]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateSkillsHTML(skills) } : section
    ));
 }, [skills,index,setsection])
  // Handle skill input change
  const handleInputChange = (index: number, value: string) => {
    const updatedSkills = skills.map((skill, i) => (i === index ? value : skill));
    setSkills(updatedSkills);
  };

  // Add a new skill
  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  // Generate HTML for the skills section
  const generateSkillsHTML = (skillsData: string[]) => {
    return `
      <section class="mt-6 px-3 py-2">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Skills</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2">
        <div class="flex flex-wrap gap-1 mt-3">
          ${skillsData
            .filter((skill) => skill.trim() !== "")
            .map(
              (skill) => `
            <span class="px-2 py-1 bg-gray-300 rounded-full text-gray-700 text-sm">
              ${skill}
            </span>`
            )
            .join("")}
        </div>
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for skills input */}
            <Stack spacing={4}>
              {skills.map((skill, index) => (
                <Input
                  key={index}
                  placeholder="Skill"
                  value={skill}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
              <Button onClick={addSkill}>Add Another Skill</Button>
            </Stack>
    </Box>
  );
};

export default Skills;
