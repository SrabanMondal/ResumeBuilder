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
    useDisclosure,
  } from "@chakra-ui/react";
  import { AtSignIcon } from "@chakra-ui/icons";
import PassInput from "@/components/ui/CustomPassword";
  
  export default function SignUp() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Button size={'md'} onClick={onOpen}>Sign Up</Button>
  
        <Modal isOpen={isOpen} onClose={onClose} size={'sm'}>
          <ModalOverlay />
          <ModalContent rounded={'xl'} border={'4px solid #000'} boxShadow={'4px 4px 5px #43434380'} bgImage={'/signbg.jpeg'} color={'#191919'}>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="username" mb={4}>
                <FormLabel>Username</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AtSignIcon color="gray.700" />
                  </InputLeftElement>
                  <Input type="text" />
                </InputGroup>
              </FormControl>
  
              <FormControl id="password" mb={4}>
                <FormLabel>Password</FormLabel>
                 <PassInput/>
              </FormControl>
  
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                  <PassInput/>
              </FormControl>
            </ModalBody>
  
            <ModalFooter display={'flex'} justifyContent={'center'}>
              <Button colorScheme="teal">
                Sign Up
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  