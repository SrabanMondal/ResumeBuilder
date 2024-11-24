"use client"
import { Button, Box, VStack, Heading, Text, Flex} from "@chakra-ui/react";
import Image from "next/image";
import resumeimg from "@/images/resume.png";
import {  motion} from "framer-motion";
import { useRef } from "react";
import { FlipWords } from "../ui/flip-words";
//export const MotionBox = motion<BoxProps>(Box)
export default function Section() {
  const btnanm = useRef<HTMLDivElement>(null)
  const words = ['professional','creative','customized','outstanding','impressive']
  return (
    <Box
      as="section"
      py={{ base: 12, md: 24, lg: 32 }}
      bgImage={'/resbg.webp'}
      w={'100vw'}
    >
      <Flex w={'full'} p={10} flexDirection={['column','column','column','row']} gap={5} justifyContent={'space-around'} alignItems={'center'}>

      <VStack spacing={4} textAlign="center" maxW="lg" py={5}>
        <Heading size="2xl" color="white">
          Create Your Perfect Resume
        </Heading>
        <div className="text-white text-md md:text-xl">
          Build <FlipWords words={words}/> resumes in minutes. Stand out from the crowd and land your dream job.
        </div>
        <VStack spacing={2} direction={{ base: "column", sm: "row" }}>
          <Button overflow={'hidden'} size="lg" pos={'relative'} colorScheme="cyan" color="purple.600" onClick={()=>{console.log('hello')}} onMouseLeave={()=>{
             if(btnanm.current){
              btnanm.current.style.left='-200px'
            }
          }} onMouseEnter={()=>{
              if(btnanm.current){
                btnanm.current.style.left='0px'
              }
          }}>
            <Box  pointerEvents={'none'} ref={btnanm} pos={'absolute'} display={'flex'} justifyContent={'center'} alignItems={'center'} top={0} left={-200} w={'full'} h={'full'} bgColor={'blue.500'} zIndex={5} rounded={'md'} transition={'1s ease-in'}
            > <Text color={'white'}>Tap Here</Text></Box>
            Get Started
          </Button>
        </VStack>
      </VStack>
      <motion.div initial={{x:200}} animate={{x:0}} className=" relative" transition={{duration:1, ease:'easeOut'}}>
        <Image src={resumeimg} alt="Resume Builder" width={600} height={400} style={{borderRadius:70,boxShadow:'0px 0px 5px 10px #00ffff60'}} />
      </motion.div>
      </Flex>
    </Box>
  );
}
