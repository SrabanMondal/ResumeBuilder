import { Box, HStack, Text } from "@chakra-ui/react";
import { FileText } from "lucide-react";
//import SignIn from "./Auth/SignIn";
//import SignUp from "./Auth/SignUp";

export default function Nav() {
  return (
    <Box
      h={[14,16]}
      display="flex"
      justifyContent={'space-between'}
      alignItems="center"
      bgGradient="linear(to-bl,#43434380,#000)"
      backdropFilter="blur(10px)"
      position="fixed"
      top={0}
      left={0}
      zIndex="10"
     w={'100vw'}
     px={4}
    >
        <HStack spacing={3}>
          
          <FileText size='20px' color="#dcdcdc" />
          <Text fontSize={['16px','25px']} color={'#dcdcdc'}>Resume Builder</Text>
        </HStack>
      <HStack spacing={2}>
      </HStack>
    </Box>
  );
}
