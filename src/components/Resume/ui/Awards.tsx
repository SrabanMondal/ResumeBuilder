import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

const Awards:React.FC<SectionProps> = ({setsection,index}) => {
  const [awards, setAwards] = useState([{ title: "", event: "" }]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateAwardsHTML(awards) } : section
    ));
 }, [awards,index,setsection])
  // Handle input change for awards
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedAwards = awards.map((award, i) =>
      i === index ? { ...award, [field]: value } : award
    );
    setAwards(updatedAwards);
  };

  // Add a new award
  const addAward = () => {
    setAwards([...awards, { title: "", event: "" }]);
  };

  // Generate HTML for the awards section
  const generateAwardsHTML = (awardData: { title: string; event: string }[]) => {
    return `
      <section class="mt-6 px-3 py-2">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Awards & Honors</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2">
        <ul class="list-disc list-inside text-gray-700 space-y-1 text-sm">
          ${awardData
            .filter((award) => award.title.trim() !== "")
            .map(
              (award) => `
            <li><strong>${award.title}</strong> – ${award.event}</li>
          `
            )
            .join("")}
        </ul>
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for awards input */}
            <Stack spacing={4}>
              {awards.map((award, index) => (
                <Box key={index}>
                  <Input
                    placeholder="Award Title"
                    value={award.title}
                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  />
                  <Input
                    placeholder="Event/Organization"
                    value={award.event}
                    onChange={(e) => handleInputChange(index, "event", e.target.value)}
                    mt={2}
                  />
                </Box>
              ))}
              <Button onClick={addAward}>Add Another Award</Button>
            </Stack>

     
    </Box>
  );
};

export default Awards;
