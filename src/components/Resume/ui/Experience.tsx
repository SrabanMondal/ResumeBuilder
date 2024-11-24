import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

interface Experience {
  position: string;
  company: string;
  location: string;
  dateRange: string;
  responsibilities: string[];
}

const Experience:React.FC<SectionProps>= ({setsection,index}) => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      position: "",
      company: "",
      location: "",
      dateRange: "",
      responsibilities: [""],
    },
  ]);

  useEffect(() => {

    setsection((prev) =>prev.map((section) =>
      section.id === index ? { ...section, content: generateExperienceHTML(experiences) } : section
    ));
 }, [experiences,index,setsection])

  // Handle input change for each experience
  const handleInputChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index ? { ...experience, [field]: value } : experience
    );
    setExperiences(updatedExperiences);
  };

  // Handle change for responsibilities
  const handleResponsibilitiesChange = (
    expIndex: number,
    respIndex: number,
    value: string
  ) => {
    const updatedExperiences = experiences.map((experience, i) => {
      if (i === expIndex) {
        const updatedResponsibilities = experience.responsibilities.map(
          (resp, j) => (j === respIndex ? value : resp)
        );
        return { ...experience, responsibilities: updatedResponsibilities };
      }
      return experience;
    });
    setExperiences(updatedExperiences);
  };

  // Add a new experience entry
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        position: "",
        company: "",
        location: "",
        dateRange: "",
        responsibilities: [""],
      },
    ]);
  };

  // Add new responsibility for an experience
  const addResponsibility = (index: number) => {
    const updatedExperiences = experiences.map((experience, i) =>
      i === index
        ? {
            ...experience,
            responsibilities: [...experience.responsibilities, ""],
          }
        : experience
    );
    setExperiences(updatedExperiences);
  };

  // Generate HTML for the experience section
  const generateExperienceHTML = (experienceData: Experience[]) => {
    return `
      <section class="mt-6 py-2 px-3">
        <h2 class="text-lg m-2 font-semibold text-gray-800">Experience</h2>
        <hr class="w-full h-1 bg-gray-400 mt-1 mb-2">
        ${experienceData
          .map(
            (experience) => `
          <div class="mb-3">
            <div class="flex justify-between">
              <div>
                <h3 class="text-md font-semibold text-gray-800">
                  ${experience.position}
                </h3>
                <p class="text-gray-600 text-sm">${experience.company}</p>
              </div>
              <div class="text-gray-500 text-right text-sm">
                <p>${experience.location}</p>
                <p>${experience.dateRange}</p>
              </div>
            </div>
            <ul class="list-disc list-inside mt-2 text-gray-700 space-y-1 text-sm">
              ${experience.responsibilities
                .map((responsibility) => `<li>${responsibility}</li>`)
                .join("")}
            </ul>
          </div>
        `
          )
          .join("")}
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for experiences input */}
            <Stack spacing={6}>
              {experiences.map((experience, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Input
                    placeholder="Position"
                    value={experience.position}
                    onChange={(e) =>
                      handleInputChange(index, "position", e.target.value)
                    }
                  />
                  <Input
                    mt={2}
                    placeholder="Company"
                    value={experience.company}
                    onChange={(e) =>
                      handleInputChange(index, "company", e.target.value)
                    }
                  />
                  <Input
                    mt={2}
                    placeholder="Location"
                    value={experience.location}
                    onChange={(e) =>
                      handleInputChange(index, "location", e.target.value)
                    }
                  />
                  <Input
                    mt={2}
                    placeholder="Date Range (e.g. 01/2016 - Present)"
                    value={experience.dateRange}
                    onChange={(e) =>
                      handleInputChange(index, "dateRange", e.target.value)
                    }
                  />
                  <Heading size="sm" mt={4}>
                    Responsibilities
                  </Heading>
                  {experience.responsibilities.map((resp, respIndex) => (
                    <Textarea
                      key={respIndex}
                      mt={2}
                      placeholder="Responsibility"
                      value={resp}
                      onChange={(e) =>
                        handleResponsibilitiesChange(index, respIndex, e.target.value)
                      }
                    />
                  ))}
                  <Button
                    mt={2}
                    size="sm"
                    onClick={() => addResponsibility(index)}
                  >
                    Add Responsibility
                  </Button>
                </Box>
              ))}
              <Button onClick={addExperience}>Add Another Experience</Button>
            </Stack>
    </Box>
  );
};

export default Experience;