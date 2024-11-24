import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

const Projects:React.FC<SectionProps> = ({setsection,index}) => {
  const [projects, setProjects] = useState([{ name: "", description: "", githubLink: "" }]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateProjectsHTML(projects) } : section
    ));
 }, [projects,index,setsection])
  // Handle input change for project name, description, and GitHub link
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updatedProjects);
  };

  // Add a new project
  const addProject = () => {
    setProjects([...projects, { name: "", description: "", githubLink: "" }]);
  };

  // Generate HTML for the projects section
  const generateProjectsHTML = (projectData: { name: string; description: string; githubLink: string }[]) => {
    return `
      <section class="mt-6 px-3 py-2">
        <h2 class="text-lg m-2 font-semibold text-gray-800">Projects</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2">
        ${projectData
          .filter((project) => project.name.trim() !== "")
          .map(
            (project) => `
          <div class="mb-3">
            <h3 class="text-md font-semibold text-gray-800">${project.name}</h3>
            <p class="text-sm text-gray-600 mt-2">Description: ${project.description}</p>
            <a href="${project.githubLink}" target="_blank" class="text-blue-600 hover:underline mt-2 block text-sm">GitHub Link</a>
          </div>
        `
          )
          .join("")}
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for project input */}
            <Stack spacing={4}>
              {projects.map((project, index) => (
                <Box key={index}>
                  <Input
                    placeholder="Project Name"
                    value={project.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                  />
                  <Textarea
                    placeholder="Description"
                    value={project.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    mt={2}
                  />
                  <Input
                    placeholder="GitHub Link"
                    value={project.githubLink}
                    onChange={(e) => handleInputChange(index, "githubLink", e.target.value)}
                    mt={2}
                  />
                </Box>
              ))}
              <Button onClick={addProject}>Add Another Project</Button>
            </Stack>
    </Box>
  );
};

export default Projects;
