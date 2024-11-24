"use client";
 
import React, { useRef } from "react";
import { Box, Heading, IconButton, Flex } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CylinderCarousel from "../ui/Carouselthree";
import { CloseIcon } from "@chakra-ui/icons";

export default function Join() {
  const boxref = useRef<HTMLDivElement>(null)
  const box2ref = useRef<HTMLDivElement>(null)
  const closeref = useRef<HTMLButtonElement>(null)
  const handleClose = ()=>{
    if(boxref.current && box2ref.current && closeref.current){
      const box = boxref.current
      const box2 = box2ref.current
      box.style.height='60vh';
      box.style.position='static'
      box2.style.height='50vh'
      closeref.current.style.display ='none'
    }
  }
  const handleZoom = ()=>{
      console.log("hlo")
      if(boxref.current && box2ref.current && closeref.current){
        const box = boxref.current
        const box2 = box2ref.current
        box.style.height='100vh';
        box.style.position='fixed'
        box.style.left='0'
        box.style.top='0'
        box.style.zIndex='10'
        box2.style.height='90vh'
        closeref.current.style.display ='block'
      }
  }
  return (
    <Box w={'100vw'} ref={boxref}  as="section" pt={2} pb={10} h={'60vh'} bgGradient="radial-gradient(circle, 
    rgba(255, 255, 255, 0.9) 10%, 
    rgba(80, 80, 80, 0.7) 40%,    
    rgba(10, 10, 10, 0.9) 75%,    
    rgba(0, 0, 0, 1) 100%)">
      <Flex justifyContent={'space-between'} alignContent={'center'}>
      <Heading color={'#dcdcdc'} px={5}>Our Resume Showcase</Heading>
      <IconButton mx={5} ref={closeref}display={'none'} aria-label="close button" icon={<CloseIcon/>} onClick={handleClose} py={2}/>
      </Flex>
      <Box ref={box2ref} h={'50vh'} pt={2} pb={10}>
        <CylinderCarousel handleZoom={handleZoom}/>
      </Box>
    </Box>
  );
}
