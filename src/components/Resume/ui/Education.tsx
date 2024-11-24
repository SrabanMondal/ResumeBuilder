import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

interface EducationEntry {
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}
const Education:React.FC<SectionProps> = ({setsection,index}) => {
  const [educations, setEducations] = useState<EducationEntry[]>([
    { school: "", degree: "", location: "", startDate: "", endDate: "" },
  ]);
  useEffect(() => {

    setsection((prev) =>  prev.map((section) =>
      section.id === index ? { ...section, content: generateEducationHTML(educations) } : section
    ));
 }, [educations,index,setsection])
  // Handle input change for each education entry
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedEducations = educations.map((education, i) =>
      i === index ? { ...education, [field]: value } : education
    );
    setEducations(updatedEducations);
  };

  // Add a new education entry
  const addEducation = () => {
    setEducations([
      ...educations,
      { school: "", degree: "", location: "", startDate: "", endDate: "" },
    ]);
  };

  // Generate HTML for the education section
  const generateEducationHTML = (educationData: EducationEntry[]) => {
    return `
      <section class="mt-6 py-2 px-3">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Education</h2>
        <hr class="w-full h-1 bg-gray-300 mb-2" />
        ${educationData
          .map(
            (education) => `
            <div class="mb-3">
              <div  class="flex justify-between">
                <div>
                  <h3 class="text-md font-semibold text-gray-800">
                    ${education.school}
                  </h3>
                  <p class="text-gray-600 text-sm">
                    ${education.degree}
                  </p>
                </div>
                <div class="text-gray-500 text-right text-sm">
                  <p>${education.location}</p>
                  <p>${education.startDate} - ${education.endDate}</p>
                </div>
              </div>
            </div>
          `
          )
          .join("")}
      </section>
    `;
  };

  return (
    <Box>
            <Stack spacing={6}>
              {educations.map((education, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Input
                    placeholder="School Name"
                    value={education.school}
                    onChange={(e) =>
                      handleInputChange(index, "school", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Degree"
                    value={education.degree}
                    onChange={(e) =>
                      handleInputChange(index, "degree", e.target.value)
                    }
                    mt={2}
                  />
                  <Input
                    placeholder="Location"
                    value={education.location}
                    onChange={(e) =>
                      handleInputChange(index, "location", e.target.value)
                    }
                    mt={2}
                  />
                  <Input
                    placeholder="Start Date"
                    value={education.startDate}
                    onChange={(e) =>
                      handleInputChange(index, "startDate", e.target.value)
                    }
                    mt={2}
                  />
                  <Input
                    placeholder="End Date"
                    value={education.endDate}
                    onChange={(e) =>
                      handleInputChange(index, "endDate", e.target.value)
                    }
                    mt={2}
                  />
                </Box>
              ))}
              <Button onClick={addEducation}>Add Another Education</Button>
            </Stack>
    </Box>
  );
};

export default Education;
