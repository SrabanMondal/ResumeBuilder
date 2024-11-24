"use client"
import { Box, Heading, SimpleGrid, VStack, Icon, Text } from "@chakra-ui/react";
import { PenLine, FileText, Share2 } from "lucide-react";
import { CardSpotlight } from "../ui/card-spotlight";

const features = [
  { icon: PenLine, title: "Easy Editing", description: "Intuitive interface for quick and easy resume creation." },
  { icon: FileText, title: "Professional Templates", description: "Choose from a variety of professionally designed templates." },
  { icon: Share2, title: "Easy Sharing", description: "Share your resume directly with employers or download as PDF." },
];

export default function Feature() {
  return (
    <Box as="section" py={12} className="bg-black/[0.96] bg-grid-white/[0.02] antialiased" w={'100vw'} px={10} bgPos={'0% 30%'} bgImage={'/feature.webp'} border={'4px solid #d3d3d3'} rounded={'xl'}  color={'#d3d3d3'}>
      <Heading size="xl" textAlign="center" mb={8}>Key Features</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={10}>
        {features.map((feature) => (
          <CardSpotlight key={feature.title} radius={200} color="#FF6EC760" className="p-2 rounded-xl">
          <VStack
            p={4}
            rounded="lg"
            shadow="lg"
            textAlign="center"
            >
            <Box p={3} rounded="full" bg={`gray.100`}>
              <Icon as={feature.icon} w={10} h={10} color={`gray.600`} />
            </Box>
            <Heading size="md">{feature.title}</Heading>
            <Text color="gray.300">{feature.description}</Text>
          </VStack>
          </CardSpotlight>
        ))}
      </SimpleGrid>
    </Box>
  );
}
