"use client"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel,
    InputGroup,
    InputLeftElement,
    Link as ChakraLink,
    useDisclosure,
  } from "@chakra-ui/react";
  import { AtSignIcon } from "@chakra-ui/icons";
import PassInput from "@/components/ui/CustomPassword";
  
  export default function SignIn() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Button size={'md'} onClick={onOpen}>Sign In</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size={'sm'}>
          <ModalOverlay />
          <ModalContent rounded={'xl'} border={'4px solid #000'} boxShadow={'4px 4px 5px #43434380'} bgImage={'/signbg.jpeg'} color={'#191919'}>
            <ModalHeader>Sign In</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="username" mb={4}>
                <FormLabel>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AtSignIcon color="gray.700" />
                  </InputLeftElement>
                  <Input type="text"/>
                </InputGroup>
              </FormControl>
  
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                  <PassInput/>
              </FormControl>
  
              <ChakraLink href="#" color="teal.500" display="block" textAlign="right" mt={2}>
                Forgot Password?
              </ChakraLink>
            </ModalBody>
  
            <ModalFooter display={'flex'} justifyContent={'center'}>
              <Button colorScheme="teal">
                Sign In
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  