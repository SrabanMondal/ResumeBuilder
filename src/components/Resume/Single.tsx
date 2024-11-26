"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import axios from "axios";
import {
  Box,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Button,
  IconButton,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
export type Section = {
  type:string;
  content:string;
  placement?: "left"|"right"
  id:number
}
export type SectionProps={
  setsection: Dispatch<SetStateAction<Section[]>>;
  index:number
}
import Header from "./ui/Header";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Summary from "./ui/Summary";
import Education from "./ui/Education";
import Achievements from "./ui/Accomplishments";
import Experience from "./ui/Experience";
import Skills from "./ui/Skills";
import Certification from "./ui/Certificates";
import Projects from "./ui/Projects";
import Awards from "./ui/Awards";
import Languages from "./ui/Languages";
import Hobbies from "./ui/Hobby";
import Internship from "./ui/Internship";
import Publication from "./ui/Publication";
import Styles from "./ui/Styles";
import { FileText } from "lucide-react";
import { Vortex } from "../ui/vortex";
export type StylesType={
  linkColor: string,
  resumeBg: string,
  textColor: string,
  hrColor: string,
  h1Color:string,
  h2Color: string,
  h3Color: string,
  listStyleType: string,
}
const defaultStyles = {
  linkColor: "blue",
  resumeBg: "whitesmoke",
  textColor: "black",
  hrColor: "black",
  h1Color:"black",
  h2Color: "black",
  h3Color: "gray",
  listStyleType: "disc"
};
export default function ResumeBuilder() {
    const [loading, setloading] = useState(false)
    const [styles, setstyles] = useState<StylesType>(defaultStyles)
  const generateHTML = ()=>{
    const combinedHTML = sections.length!=0 ? sections.map(section => section.content).join('') : "";
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resume Header</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
          .resume a {
            color: ${styles.linkColor} !important;
          }
          .resume {
            background-color: ${styles.resumeBg} !important;
          }
          .resume p {
            color: ${styles.textColor} !important;
          }
          .resume li {
            color: ${styles.textColor} !important;
          }
          .resume span {
            color: ${styles.textColor} !important;
          }
          .resume hr {
            background-color: ${styles.hrColor} !important;
          }
           .resume h1{
            color: ${styles.h1Color} !important;
            }
          .resume h2 {
            color: ${styles.h2Color} !important;
          }
          .resume h3 {
            color: ${styles.h3Color} !important;
          }
            .resume ul{
            list-style-type: ${styles.listStyleType} !important;}
  </style>
</head>
<body class="bg-gray-100"><div class="resume w-[794px] max-h-[1123px] mx-auto bg-slate-200 p-10 rounded-lg shadow-md overflow-hidden">`+combinedHTML+`</div></body></html>`
  }
const handleClick = async ()=>{
  try {
    setloading(true)
    const res = await axios.post('https://customresumebackend-production-96ba.up.railway.app/api/v1/user/pdf', {
      data: generateHTML(),
    }, {
      responseType: 'blob', // Important to handle PDF response correctly
    });

    const blob = new Blob([res.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `resume.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setloading(false)
  } catch (error) {
    console.error("Error downloading the PDF:", error);
    setloading(false)
  }
};
  const [sections, setsections] = useState<Section[]>([])
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Start dragging card
  const handleDragStart = (e: React.DragEvent, idx: number) => {
    setDraggedIndex(idx);
  };

  // On drag over, prevent default
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Handle drop, reorder items
  const handleDrop = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const draggedSectionIndex = sections.findIndex((section) => section.id === draggedIndex);
    const targetSectionIndex = sections.findIndex((section) => section.id === idx);
  
    if (draggedSectionIndex === -1 || targetSectionIndex === -1) return;
  
    // Reorder the sections
    const updatedSections = [...sections];
    const [draggedSection] = updatedSections.splice(draggedSectionIndex, 1);
    updatedSections.splice(targetSectionIndex, 0, draggedSection);
  
    setsections(updatedSections);
    setDraggedIndex(null); // Reset draggedIndex
  };
  const addSection = (type: string) => {
    const newSection: Section = {
      id:Date.now(),
      type: type,
      content: "",
    };
    setsections((prevSections) => [...prevSections, newSection]);
  }
  const deleteSection = useCallback((id: number) => {
    setsections((prevSections) => prevSections.filter((section) => section.id != id));
  }, []);
  return (
    <Box minH="100vh" bg="#191919" p={0}>
      <header className="bg-[#434343] text-white p-4 overflow-y-hidden">
      <Vortex
        backgroundColor="black"
        className="flex items-start flex-col justify-center w-full h-full"
      >
        
      <HStack spacing={3}>
          <FileText size='20px' color="#dcdcdc" />
          <Text fontSize={['16px','25px']} color={'#dcdcdc'}>Resume Builder</Text>
        </HStack>
      </Vortex>
      </header>

      <Stack direction={{ base: "column", md: "row" }} spacing={4} p={2} color={'#dcdcdc'}>
       
        <Box w={{ base: "100%", md: "40%" }} p={4} borderRight={{ md: "1px solid #e2e8f0" }}>
          <Accordion allowMultiple>
            <Styles setStyles={setstyles} styles={styles}/>
          {
            sections.length!=0 && sections.map((section:Section)=>(
                <AccordionItem key={section.id}  draggable
                onDragStart={(e) => handleDragStart(e, section.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, section.id)}>
                  <Flex alignItems={'center'}>

                    <AccordionButton>
                      <Box flex="1" textAlign="left">{section.type.toUpperCase()}</Box>
                      <AccordionIcon />
                      </AccordionButton>
                      <IconButton
                      aria-label="Delete section"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => deleteSection(section.id)}
                      ml={2}
                      />
                      </Flex>
                <AccordionPanel>
                  {/* Render inputs based on section type */}
                  {section.type === "header" && (
                    <Header setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "education" && (
                      <Education setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "summary" && (
                    <Summary setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "achievements" && (
                    <Achievements setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "experience" && (
                    <Experience setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "skills" && (
                    <Skills setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "certificates" && (
                    <Certification setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "projects" && (
                    <Projects setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "awards" && (
                    <Awards setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "languages" && (
                    <Languages setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "hobbies" && (
                    <Hobbies setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "internship" && (
                    <Internship setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "publication" && (
                    <Publication setsection={setsections} index={section.id}/>
                  )}
                </AccordionPanel>
                    </AccordionItem>
            ))
          }
          </Accordion>
          <Menu>
            <MenuButton as={Button} leftIcon={<AddIcon />} className="mt-4 text-white">
              Add Section
            </MenuButton>
            <MenuList flexWrap={'wrap'} gap={0} border={'0px'} bg={'#434343'} display="flex" flexDirection="row" maxW={'35vw'}>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("header")}>Header</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("summary")}>Summary</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("skills")}>Skills</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("experience")}>Experience</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("education")}>Education</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("achievements")}>Achievements</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("certificates")}>Certificates</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("internship")}>Internship</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("projects")}>Projects</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("awards")}>Awards</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("publication")}>Publication</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("languages")}>Languages</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("hobbies")}>Hobbies</MenuItem>
            </MenuList>
          </Menu>
        </Box>

        {/* Live Preview */}
        <Box w={{ base: "100%", md: "60%" }} p={4} bg="gray.100" >
          <h2 className="text-xl font-semibold mb-4 text-black">Live Preview</h2>
          <Box
            border="1px solid #e2e8f0"
            p={4}
            minH="300px"
            bg="white"
            overflow="scroll"
            textColor="black"
            dangerouslySetInnerHTML={{
              __html: generateHTML(),
            }}
          />
        </Box>
      </Stack>
      <Button m={3} onClick={handleClick} isLoading={loading}>Generate</Button>
    </Box>
  );
}
