import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Input,
  Stack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";
type Internship={
  title: string;
  company: string;
  location: string;
  date: string;
  description: string[];
}
const Internship:React.FC<SectionProps> = ({setsection,index}) => {
  const [internships, setInternships] = useState([
    { title: "", company: "", location: "", date: "", description: [""] },
  ]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateInternshipHTML(internships) } : section
    ));
 }, [internships,index,setsection])
  // Handle internship input change
  const handleInternshipChange = (index: number, field: string, value: string) => {
    const updatedInternships = internships.map((internship, i) =>
      i === index ? { ...internship, [field]: value } : internship
    );
    setInternships(updatedInternships);
  };

  // Handle description change
  const handleDescriptionChange = (index: number, descriptionIndex: number, value: string) => {
    const updatedInternships = internships.map((internship, i) => {
      if (i === index) {
        const updatedDescriptions = internship.description.map((desc, j) =>
          j === descriptionIndex ? value : desc
        );
        return { ...internship, description: updatedDescriptions };
      }
      return internship;
    });
    setInternships(updatedInternships);
  };

  // Add a new internship
  const addInternship = () => {
    setInternships([...internships, { title: "", company: "", location: "", date: "", description: [""] }]);
  };

  // Add a new description line
  const addDescription = (index: number) => {
    const updatedInternships = internships.map((internship, i) =>
      i === index ? { ...internship, description: [...internship.description, ""] } : internship
    );
    setInternships(updatedInternships);
  };

  // Generate HTML for the internship section
  const generateInternshipHTML = (internshipList: Internship[]) => {
    return `
      <section class="mt-6 px-3 py-2">
        <h2 class="text-lg m-2 font-semibold text-gray-800">Internship</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2">
        ${internshipList
          .filter((internship) => internship.title.trim() !== "")
          .map(
            (internship) => `
          <div class="mb-4 p-2 border border-gray-200 rounded-md">
            <div class="flex justify-between">
              <div>
                <h3 class="text-md font-semibold text-gray-800">${internship.title}</h3>
                <p class="text-gray-600 text-sm">${internship.company}</p>
              </div>
              <div class="text-gray-500 text-right text-sm">
                <p>${internship.location}</p>
                <p>${internship.date}</p>
              </div>
            </div>
            <ul class="list-disc list-inside mt-1 text-gray-700 space-y-1 text-sm">
              ${internship.description
                .filter((desc:string) => desc.trim() !== "")
                .map((desc:string) => `<li>${desc}</li>`)
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
      {/* Accordion for internships input */}
      <Accordion allowToggle>
        {internships.map((internship, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Internship {index + 1}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <Input
                  placeholder="Internship Title"
                  value={internship.title}
                  onChange={(e) => handleInternshipChange(index, "title", e.target.value)}
                />
                <Input
                  placeholder="Company Name"
                  value={internship.company}
                  onChange={(e) => handleInternshipChange(index, "company", e.target.value)}
                />
                <Input
                  placeholder="Location"
                  value={internship.location}
                  onChange={(e) => handleInternshipChange(index, "location", e.target.value)}
                />
                <Input
                  placeholder="Date (e.g., 06/2022 - 09/2022)"
                  value={internship.date}
                  onChange={(e) => handleInternshipChange(index, "date", e.target.value)}
                />
                {internship.description.map((desc, descriptionIndex) => (
                  <Textarea
                    key={descriptionIndex}
                    placeholder="Description"
                    value={desc}
                    onChange={(e) =>
                      handleDescriptionChange(index, descriptionIndex, e.target.value)
                    }
                  />
                ))}
                <Button onClick={() => addDescription(index)}>Add Another Description</Button>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Add New Internship Button */}
      <Button mt={4} onClick={addInternship}>
        Add Another Internship
      </Button>
    </Box>
  );
};

export default Internship;
