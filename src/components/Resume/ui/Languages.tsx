import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

const Languages:React.FC<SectionProps> = ({setsection,index}) => {
  const [languages, setLanguages] = useState([{ name: "", proficiency: "" }]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content: generateLanguagesHTML(languages) } : section
    ));
 }, [languages,index,setsection])
  // Handle input change for languages
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedLanguages = languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    setLanguages(updatedLanguages);
  };

  // Add a new language
  const addLanguage = () => {
    setLanguages([...languages, { name: "", proficiency: "" }]);
  };

  // Generate HTML for the languages section
  const generateLanguagesHTML = (
    langData: { name: string; proficiency: string }[]
  ) => {
    return `
      <section class="mt-6 py-2 px-3">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Languages</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2">
        <div class="flex flex-wrap gap-2">
          ${langData
            .filter((lang) => lang.name.trim() !== "")
            .map(
              (lang) => `
            <span class="px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-sm">${lang.name} (${lang.proficiency})</span>
          `
            )
            .join("")}
        </div>
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for languages input */}
            <Stack spacing={4}>
              {languages.map((lang, index) => (
                <Box key={index}>
                  <Input
                    placeholder="Language Name"
                    value={lang.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Proficiency (e.g., Fluent, Basic)"
                    value={lang.proficiency}
                    onChange={(e) =>
                      handleInputChange(index, "proficiency", e.target.value)
                    }
                    mt={2}
                  />
                </Box>
              ))}
              <Button onClick={addLanguage}>Add Another Language</Button>
            </Stack>
    </Box>
  );
};

export default Languages;
