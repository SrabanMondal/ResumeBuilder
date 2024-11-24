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
} from "@chakra-ui/react";
import { SectionProps } from "../Single";
type Publication={
  title:string,
  journal:string,
  year:string,
}
const Publication:React.FC<SectionProps> = ({setsection,index}) => {
  const [publications, setPublications] = useState([{ title: "", journal: "", year: "" }]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generatePublicationsHTML(publications) } : section
    ));
 }, [publications,index,setsection])
  // Handle publication input change
  const handlePublicationChange = (index: number, field: string, value: string) => {
    const updatedPublications = publications.map((publication, i) =>
      i === index ? { ...publication, [field]: value } : publication
    );
    setPublications(updatedPublications);
  };

  // Add a new publication
  const addPublication = () => {
    setPublications([...publications, { title: "", journal: "", year: "" }]);
  };

  // Generate HTML for the publications section
  const generatePublicationsHTML = (publicationList: Publication[]) => {
    return `
      <section class="mt-6 py-2 px-3">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Publications</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2">
        <ul class="list-disc list-inside text-gray-700 space-y-1 text-sm">
          ${publicationList
            .filter((publication) => publication.title.trim() !== "")
            .map(
              (publication) => `
            <li><strong>${publication.title}</strong> – Published in ${publication.journal}, ${publication.year}</li>
          `
            )
            .join("")}
        </ul>
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for publications input */}
      <Accordion allowToggle>
        {publications.map((publication, index) => (
          <AccordionItem key={index}>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Publication {index + 1}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Stack spacing={4}>
                <Input
                  placeholder="Publication Title"
                  value={publication.title}
                  onChange={(e) => handlePublicationChange(index, "title", e.target.value)}
                />
                <Input
                  placeholder="Journal/Conference"
                  value={publication.journal}
                  onChange={(e) => handlePublicationChange(index, "journal", e.target.value)}
                />
                <Input
                  placeholder="Year"
                  value={publication.year}
                  onChange={(e) => handlePublicationChange(index, "year", e.target.value)}
                />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Add New Publication Button */}
      <Button mt={4} onClick={addPublication}>
        Add Another Publication
      </Button>
    </Box>
  );
};

export default Publication;
