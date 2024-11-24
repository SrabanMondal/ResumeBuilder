import React, {  useEffect, useState, useRef } from 'react';
import {
  Box,
  Input,
  Stack,
  IconButton,
  Flex,
  Tooltip,
} from '@chakra-ui/react';
import {SectionProps } from '../Single';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

type HeaderData = {
  name: string;
  title: string;
  email: string;
  location: string;
  phone: string;
  linkedin: string;
  portfolio: string;
  github: string;
}
type ContactType = "Link"|"Text"
type ContactData = {
  type: ContactType
  value: string
  name: string
}
const Header2: React.FC<SectionProps> = ({setsection, index}) => {
  const [formData, setFormData] = useState<HeaderData>({
    name: '',
    title: '',
    email: '',
    location: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    github: '',
  });
  const [contacts, setcontacts] = useState<ContactData[]>([])
  const [imagePreview, setImagePreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  //const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
 // const [imageFile, setImageFile] = useState<File | null>(null);
   useEffect(() => {

      setsection((prev) => prev.map((section) =>
        section.id === index ? { ...section, content: generateHTML(formData,contacts,imagePreview) } : section
      ));
   }, [formData,index,setsection,contacts,imagePreview])
   
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleContactLink = (e: React.ChangeEvent<HTMLInputElement>,idx:number) => {
    const {value } = e.target;
    setcontacts((prev) => {
      const updatedcontact = [...prev];
      updatedcontact[idx] = {
        ...updatedcontact[idx], value: value
      }
      return updatedcontact;
    });
    };
  const handleContactName = (e: React.ChangeEvent<HTMLInputElement>,idx:number) => {
    const {value } = e.target;
    setcontacts((prev) => {
      const updatedcontact = [...prev];
      updatedcontact[idx] = {
        ...updatedcontact[idx], name: value
      }
      return updatedcontact;
    });
    };
  
  const addcontact = (type:ContactType)=>{
    setcontacts((prev) => [...prev, {type:type, name:"", value:""}]);
  }
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview("");  // Clear the image
    if(fileInputRef.current){
      fileInputRef.current.value = "";  // Reset the input field
    }
  };

  const generateHTML = (data:HeaderData,contacts:ContactData[],image:string) => {
    return `
      <div class=" text-black rounded-lg flex justify-between items-center px-10 py-8 bg-blue-100 w-[794px] mx-auto header">
        <div class="text-left">
          <h1 class="text-3xl font-bold text-gray-800">${data.name}</h1>
          <p class="text-lg text-gray-600 mt-1">${data.title}</p>
        
        <div class="grid grid-cols-2 gap-3 mt-4 text-gray-700">
        <div class="flex items-center space-x-1">
        <span>&bull;</span>
        <span>${data.email}</span>
        </div>
        <div class="flex items-center space-x-1">
        <span>&bull;</span>
        <span>${data.location}</span>
        </div>
        <div class="flex items-center space-x-1">
        <span>&bull;</span>
        <span>${data.phone}</span>
        </div>
        <div class="flex items-center space-x-1">
        </div>
    `+
        contacts.map(contact=>{
          if(contact.type=='Link'){
            return `<div class="flex items-center space-x-1"><span>&bull;</span><a href="${contact.value}" target="_blank" class="text-blue-600 hover:underline">${contact.name}</a></div>`
          }
          else if(contact.type=='Text'){
            return `<div class="flex items-center space-x-1"><span>&bull;</span><span>${contact.name}</span></div>`
          }
  }).join("")
        
        +`
        </div></div>`+ 
        (image.length>0 ?`
        <div class="flex-shrink-0">
    <img src="${image}" alt="Profile Picture" class="rounded-full border-4 border-white w-36 h-36 m-3">
  </div>`:'')
  +`
      </div>
    `;
  };

  return (
    <Box>
   
            <Stack spacing={3}>
              <Input
                placeholder="Full Name"
                name="name"
                value={formData?.name||""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Title"
                name="title"
                value={formData?.title||""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Email"
                name="email"
                value={formData?.email||""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Location"
                name="location"
                value={formData?.location||""}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Phone Number"
                name="phone"
                value={formData?.phone||""}
                onChange={handleInputChange}
              />
             
              <Flex>

              <Input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
              <Tooltip label='Remove Image'>

              <IconButton
                      aria-label="Delete section"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={handleRemoveImage}
                      ml={2}
                      />
                      </Tooltip>
              </Flex>
              {
                contacts.length > 0 && contacts.map((contact,idx:number)=>{
                  if (contact.type =='Link'){
                    return(
                      <Flex key={idx} gap={3} alignItems={'center'}>

                      <form >
                        <Input
                        my={1}
                        placeholder="Enter text to show on resume"
                        name={"contact"+idx}
                        value={contact.name}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleContactName(e,idx)}
                        />
                        <Input
                        my={1}
                        placeholder="Enter link"
                        name={"contact"+idx}
                        value={contact.value}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleContactLink(e,idx)}
                        />
                      </form>
                        <IconButton aria-label='remove' icon={<DeleteIcon/>} onClick={()=>setcontacts(contacts.filter((_,i)=>i!==idx))}/>
                        </Flex>
                    )
                  }
                  else{
                    return(
                      <Flex key={idx} gap={3}>
                      <Input
                      placeholder="Enter text to show on resume"
                      name={"contact"+idx}
                      value={contact.name}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleContactName(e,idx)}
                      />
                      <IconButton aria-label='remove' icon={<DeleteIcon/>} onClick={()=>setcontacts(contacts.filter((_,i)=>i!==idx))}/>
                      </Flex>
                  )}
                })
              }
              <Flex px={3} gap={4}>
                <Tooltip label='Add Link'>
              <IconButton flexGrow={1} aria-label='add' icon={<AddIcon/>} onClick={()=>addcontact("Link")}/>
                </Tooltip>
                <Tooltip label='Add text contact'>
              <IconButton flexGrow={1} aria-label='add' icon={<AddIcon/>} onClick={()=>addcontact("Text")}/>
                </Tooltip>
              </Flex>
            </Stack>
    </Box>
  );
};

export default Header2;