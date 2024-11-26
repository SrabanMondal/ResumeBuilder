"use client";

import { useCallback, useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { Section } from "./Single";
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

import Header3 from "./ui/Header3";
import Profile from "./ui/Profile";

import Style3 from "./ui/Style3";
export type StylesType={
  linkColor: string,
  resumeBg: string,
  textColor: string,
  hrColor: string,
  h1Color:string,
  h2Color: string,
  h3Color: string,
  listStyleType: string,
  leftcolor: string,
  rightcolor:string
}
const defaultStyles = {
  linkColor: "blue",
  resumeBg: "whitesmoke",
  textColor: "black",
  hrColor: "black",
  h1Color:"black",
  h2Color: "black",
  h3Color: "gray",
  listStyleType: "disc",
   leftcolor: "lightblue",
  rightcolor: "white"
};
export default function ResumeBuilder() {
  const [loading, setloading] = useState(false)
  const [sections, setsections] = useState<Section[]>([{id:0, content:"",type:'header', placement:"right"},{id:1, content:"",type:'profile',placement:'left'}])
    const [styles, setstyles] = useState<StylesType>(defaultStyles)
    const generateHTML = () => {
      const leftSections = sections.filter(section => section.placement === 'left').map(section => section.content).join('');
      const rightSections = sections.filter(section => section.placement === 'right').map(section => section.content).join('');
    
      return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        .resume a { color: ${styles.linkColor} !important; }
        .resume { background-color: ${styles.resumeBg} !important; display: flex; }
        .resume p, .resume li, .resume span { color: ${styles.textColor} !important; }
        .resume hr { background-color: ${styles.hrColor} !important; }
        .resume h1 { color: ${styles.h1Color} !important; }
        .resume h2 { color: ${styles.h2Color} !important; }
        .resume h3 { color: ${styles.h3Color} !important; }
        .resume ul { list-style-type: ${styles.listStyleType} !important; }
        .left-column { flex: 1; padding-right: 10px; background-color:${styles.leftcolor} !important;}
        .right-column { flex: 2; padding-left: 10px; background-color:${styles.rightcolor} !important; }
      </style>
    </head>
    <body class="bg-gray-100">
      <div class="resume w-[794px] mx-auto bg-slate-200 p-10 rounded-lg shadow-md">
        <div class="left-column bg-red-200 min-h-40">${leftSections}</div>
        <div class="right-column bg-blue-200 min-h-40">${rightSections}</div>
      </div>
    </body>
    </html>`;
    };
    
    const handleClick = async () => {
      try {
        setloading(true)
        // Step 1: Extract the Base64 image string from the HTML content
        const imgbase64 = generateHTML().match(/<img\b[^>]*\s+src="([^"]*)"/);
    
        // If an image src was found and is a base64 string
        if (imgbase64 && imgbase64[1].startsWith('data:image/')) {
          const base64String = imgbase64[1]; // Extract the base64 string
    
          // Convert base64 string to a Blob to mimic a file upload
          const byteString = atob(base64String.split(',')[1]);
          const mimeString = base64String.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const imageFile = new Blob([ab], { type: mimeString });
    
          // Step 2: Prepare form data and upload the image to Cloudinary
          const formData = new FormData();
          formData.append('file', imageFile); // Image file created from Base64
          formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET??''); // Replace with your Cloudinary upload preset
    
          const cloudinaryResponse = await axios.post(
            process.env.NEXT_PUBLIC_CLOUDINARY_URL??'', // Replace with your Cloudinary cloud name
            formData
          );
          const imageUrl = cloudinaryResponse.data.secure_url;
          const newHTML = generateHTML().replace(
            /(<img\b[^>]*\s)src="[^"]*"/g, 
            `$1src="${imageUrl}"`
          );
          const res = await axios.post(
            'https://customresumebackend-production-96ba.up.railway.app/api/v1/user/pdf',
            { data: newHTML },
            { responseType: 'blob' }
          );
    
          const blob = new Blob([res.data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `resume.pdf`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          setloading(false)
        } else {
          console.error("No valid base64 image found in the HTML.");
          setloading(false)
        }
      } catch (error) {
        console.error("Error handling the PDF or Cloudinary upload:", error);
        setloading(false)
      }
    };
  
  const addSection = (type: string, placement: 'left' | 'right') => {
    const newSection: Section = {
      type: type,
      content: "",
      id: Date.now(),
      placement: placement,
    };
    console.log("id",newSection.id);
    setsections((prevSections) => [...prevSections, newSection]);
  };
  
  const deleteSection = useCallback((id: number) => {
    setsections((prevSections) => prevSections.filter((section) => section.id != id));
  }, []);
  
  return (
    <Box minH="100vh" bg="#191919" p={4} >
      <header className="bg-[#434343] text-white p-4">
        <h1 className="text-2xl font-bold">Resume Builder</h1>
      </header>

      <Stack direction={{ base: "column", md: "row" }} spacing={4} color={'#dcdcdc'}>
        {/* Accordion for Inputs */}
        <Box w={{ base: "100%", md: "40%" }} p={4} borderRight={{ md: "1px solid #e2e8f0" }}>
          <Accordion allowMultiple>
            <Style3 setStyles={setstyles} styles={styles}/>
           
          </Accordion>
          <Box border={"2px solid white"}>
          <Text color={'white'} p={3} fontWeight={'bold'}>Left</Text>
          
          <Accordion allowMultiple>
          {
            sections.filter((section:Section)=>section.placement=='left').length!=0 && sections.filter((section:Section)=>section.placement=='left').map((section:Section)=>(
                <AccordionItem key={section.id}>
                  <Flex alignItems={'center'}>

                    <AccordionButton>
                      <Box flex="1" textAlign="left">{section.type.toUpperCase()}</Box>
                      <AccordionIcon />
                    </AccordionButton>
                      <IconButton
                      aria-label="Delete section"
                      icon={<DeleteIcon />}
                      isDisabled={section.type=='profile'}
                      size="sm"
                      onClick={() => deleteSection(section.id)}
                      ml={2}
                      />
                      </Flex>
                <AccordionPanel>
                  {/* Render inputs based on section type */}
                  {section.type === "header" && (
                    <Header3 setsection={setsections} index={section.id}/>
                  )}
                  {section.type === "profile" && (
                    <Profile setsection={setsections} index={section.id}/>
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
          </Box>
          <Menu>
            <MenuButton as={Button} leftIcon={<AddIcon />} className="m-4 text-white">
              Add Left Section
            </MenuButton>
            <MenuList flexWrap={'wrap'} gap={0} border={'0px'} bg={'#434343'} display="flex" flexDirection="row" maxW={'35vw'}>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("summary",'left')}>Summary</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("skills",'left')}>Skills</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("experience",'left')}>Experience</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("education",'left')}>Education</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("achievements",'left')}>Achievements</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("certificates",'left')}>Certificates</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("internship",'left')}>Internship</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("projects",'left')}>Projects</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("awards",'left')}>Awards</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("publication",'left')}>Publication</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("languages",'left')}>Languages</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("hobbies",'left')}>Hobbies</MenuItem>
            </MenuList>
          </Menu>
          <Box border={"2px solid white"}>
            <Text color={'white'} p={3} fontWeight={'bold'}>Right</Text>
          <Accordion allowMultiple>
          {
            sections.length!=0 && sections.filter((section:Section)=>section.placement=='right').map((section:Section)=>(
                <AccordionItem key={section.id} >
                  <Flex alignItems={'center'}>

                    <AccordionButton>
                      <Box flex="1" textAlign="left">{section.type.toUpperCase()}</Box>
                      <AccordionIcon />
                      </AccordionButton>
                      <IconButton
                      aria-label="Delete section"
                      icon={<DeleteIcon />}
                      isDisabled={section.type=='header'}
                      size="sm"
                      onClick={() => deleteSection(section.id)}
                      ml={2}
                      />
                      </Flex>
                <AccordionPanel>
                  {/* Render inputs based on section type */}
                  {section.type === "header" && (
                    <Header3 setsection={setsections} index={section.id}/>
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
          </Box>
          <Menu>
            <MenuButton as={Button} leftIcon={<AddIcon />} className="m-4 text-white">
              Add Right Section
            </MenuButton>
            <MenuList flexWrap={'wrap'} gap={0} border={'0px'} bg={'#434343'} display="flex" flexDirection="row" maxW={'35vw'}>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("summary",'right')}>Summary</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("skills",'right')}>Skills</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("experience",'right')}>Experience</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("education",'right')}>Education</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("achievements",'right')}>Achievements</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("certificates",'right')}>Certificates</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("internship",'right')}>Internship</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("projects",'right')}>Projects</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("awards",'right')}>Awards</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("publication",'right')}>Publication</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("languages",'right')}>Languages</MenuItem>
              <MenuItem _hover={{bg:'#ffffff20'}} rounded={'15px'} w={'fit-content'} bg={'none'} onClick={() => addSection("hobbies",'right')}>Hobbies</MenuItem>
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
