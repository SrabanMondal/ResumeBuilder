import { Box, HStack, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box w={'100vw'} as="footer" py={6} bgColor={'black'} px={4} borderTop="1px solid" borderColor="gray.200">
      <HStack justify="space-between" w={'full'}>
        <Text fontSize="xs" color="gray.100">Frontend by Sraban Mondal <br/> Backend by Ashank Gupta</Text>
        <HStack spacing={4}>
        <Text fontSize="xs" color="gray.100">Built using NextJS & Acentrity UI</Text>
        </HStack>
      </HStack>
    </Box>
  );
}
