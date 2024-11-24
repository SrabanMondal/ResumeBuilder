import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

const Hobbies:React.FC<SectionProps> = ({setsection,index}) => {
  const [hobbies, setHobbies] = useState<string[]>([""]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateHobbiesHTML(hobbies) } : section
    ));
 }, [hobbies,index,setsection])
  // Handle hobby input change
  const handleHobbyChange = (index: number, value: string) => {
    const updatedHobbies = hobbies.map((hobby, i) =>
      i === index ? value : hobby
    );
    setHobbies(updatedHobbies);
  };

  // Add a new hobby
  const addHobby = () => {
    setHobbies([...hobbies, ""]);
  };

  // Generate HTML for the hobbies section
  const generateHobbiesHTML = (hobbyList: string[]) => {
    return `
      <section class="mt-6 py-2 px-3">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Hobbies</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2">
        <div class="flex flex-wrap gap-2">
          ${hobbyList
            .filter((hobby) => hobby.trim() !== "")
            .map(
              (hobby) => `
            <span class="px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-sm">${hobby}</span>
          `
            )
            .join("")}
        </div>
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for hobbies input */}
            <Stack spacing={4}>
              {hobbies.map((hobby, index) => (
                <Input
                  key={index}
                  placeholder="Enter a hobby"
                  value={hobby}
                  onChange={(e) => handleHobbyChange(index, e.target.value)}
                />
              ))}
              <Button onClick={addHobby}>Add Another Hobby</Button>
            </Stack>
    </Box>
  );
};

export default Hobbies;
