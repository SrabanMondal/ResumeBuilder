"use client";
import { Card, CardBody, CardFooter, Button, Box, Image, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";
// Templates with dummy images, replace with actual images if necessary
type Template = {
  id: number;
  name: string;
  image: string;
}
const templates:Template[] = [
  { id: 1, name: "Single Layout", image: "/resume1.jpg" },
  { id: 2, name: "Dual Layout", image: "/resume2.jpg" },
  { id: 3, name: "Triple Layout", image: "/resume3.jpg" },
];

export default function TemplateSelector() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<Template|null>(null);

  const handleTemplateSelect = (template:Template) => {
    setSelectedTemplate(template);
    router.push(`/resume/${template.name.split(' ')[0]}`); // Navigate to the resume builder page with the selected template ID
  };
  return (
    <Box
      className="px-4 py-8"
      minH="100vh"
      bgGradient="linear(to-br, black,gray.900, blue.600)"
      display="flex"
      flexDirection="column"
      alignItems="center"
    > 
      <Box maxW="5xl" mx="auto" textAlign="center" mb="8">
        <Heading as="h2" size="xl" mb="4" color="white">
          Select a Resume Template
        </Heading>
        <Text fontSize="lg" color="white">
          Choose from a variety of professionally designed templates that suit your needs.
        </Text>
      </Box>

      <Box display="flex" flexWrap="wrap" gap="10" w="full" justifyContent="center" alignItems="center">
        {templates.map((template) => (
          <Card
            key={template.id}
            overflow="hidden"
            boxShadow="2xl"
            transition="all 0.3s"
            bg="none"
            _hover={{ transform: "scale(1.02)", boxShadow: "3xl" }}
            borderRadius="2xl"
            border="2px solid"
            borderColor={selectedTemplate?.id === template.id ? "green.400" : "blue.300"} // Highlight selected template
            w="320px"
            h="550px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            onClick={() => handleTemplateSelect(template)}
          >
            <CardBody p="5" display="flex" flexDirection="column" alignItems="center" bg={'none'}>
              <Box mb="4" w="100%" h="370px" borderRadius="xl" overflow="hidden" bg={'none'}>
                <Image
                  src={template.image}
                  alt={`${template.name} template`}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  transition="all 0.3s"
                  _hover={{ opacity: 0.9 }}
                  bg={'none'}
                />
              </Box>
              <Heading as="h3" size="md" mb="2" color="white" textAlign="center">
                {template.name}
              </Heading>
            </CardBody>

            <CardFooter p="5" bg="blue.50" borderTop="2px solid" borderColor="blue.200">
              <Button
                w="full"
                bgGradient="linear(to-r, teal.400, blue.400)"
                color="white"
                _hover={{ bgGradient: "linear(to-r, teal.500, blue.500)" }}
                transition="all 0.3s"
                size="lg"
              >
                Select Template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Box>
      <BackgroundBeams/>
    </Box>
  );
}
