import { useEffect, useState } from "react";
import {
  Box,
  Input,
  Stack,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { SectionProps } from "../Single";

const Certification:React.FC<SectionProps> = ({setsection,index}) => {
  const [certifications, setCertifications] = useState([{ title: "", description: "" }]);
  useEffect(() => {

    setsection((prev) => prev.map((section) =>
      section.id === index ? { ...section, content:generateCertificationsHTML(certifications) } : section
    ));
 }, [certifications,index,setsection])
  // Handle input change for certification title and description
  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedCertifications = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    setCertifications(updatedCertifications);
  };

  // Add a new certification
  const addCertification = () => {
    setCertifications([...certifications, { title: "", description: "" }]);
  };

  // Generate HTML for the certification section
  const generateCertificationsHTML = (certData: { title: string; description: string }[]) => {
    return `
      <section class="mt-6 px-3 py-2">
        <h2 class="text-lg font-semibold text-gray-800 m-2">Certification</h2>
        <hr class="w-full h-1 bg-gray-300 mt-1 mb-2">
        ${certData
          .filter((cert) => cert.title.trim() !== "")
          .map(
            (cert) => `
          <div class="mb-2">
            <p class="text-gray-700 text-sm">
              <strong>${cert.title}</strong> — ${cert.description}
            </p>
          </div>
        `
          )
          .join("")}
      </section>
    `;
  };

  return (
    <Box>
      {/* Accordion for certification input */}
            <Stack spacing={4}>
              {certifications.map((cert, index) => (
                <Box key={index}>
                  <Input
                    placeholder="Certification Title"
                    value={cert.title}
                    onChange={(e) => handleInputChange(index, "title", e.target.value)}
                  />
                  <Textarea
                    placeholder="Description"
                    value={cert.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    mt={2}
                  />
                </Box>
              ))}
              <Button onClick={addCertification}>Add Another Certification</Button>
            </Stack>

      
    </Box>
  );
};

export default Certification;
