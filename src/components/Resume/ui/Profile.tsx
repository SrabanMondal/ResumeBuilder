import React, { useEffect, useState } from 'react';
import { Box, Heading, Input } from '@chakra-ui/react';
import { SectionProps } from '../Single';


const Profile: React.FC<SectionProps> = ({setsection,index}) => {
  const [base64Image, setBase64Image] = useState<string>("");
 // const [generatedHTML, setGeneratedHTML] = useState<string | null>(null);
 useEffect(() => {

  setsection((prev) => prev.map((section) =>
    section.id === index ? { ...section, content: generateHTML(base64Image) } : section
  ));
}, [base64Image,index,setsection])
  // Convert the image file to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate HTML with the base64 image embedded
  const generateHTML = (img:string) => {
    return `
      <div class="w-24 h-24 mx-auto mt-8">
        <img src="${img}" alt="Profile Picture" class="w-full h-full object-cover rounded-full border-4 border-white shadow-lg">
      </div>
    `;
    //setGeneratedHTML(htmlContent);
   // console.log(htmlContent); // Log the generated HTML with the Base64 image
  };

  return (
    <Box p={5}>
      <Heading>Choose your profile pic</Heading>
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
    </Box>
  );
};

export default Profile;
