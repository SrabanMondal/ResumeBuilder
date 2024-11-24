import React, {useEffect, useState } from 'react';
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
const Header: React.FC<SectionProps> = ({setsection, index}) => {
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
   useEffect(() => {

      setsection((prev) =>  prev.map((section) =>
        section.id === index ? { ...section, content: generateHTML(formData,contacts) } : section
      ));
   }, [formData,index,setsection,contacts])
   
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
  console.log(contacts);
  const generateHTML = (data:HeaderData,contacts:ContactData[]) => {
    return `
      <div>
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-800">${data.name}</h1>
          <p class="text-lg text-gray-600 mt-1">${data.title}</p>
        </div>
        <div class="flex flex-wrap justify-center items-center gap-3 text-gray-500 mt-3 text-sm">
        <span>${data.email}</span>
        <span>&bull;</span>
        <span>${data.location}</span>
        <span>&bull;</span>
        <span>${data.phone}</span>
       
    `+
      
        contacts.map(contact=>{
          if(contact.type=='Link'){
            return `<span>&bull;</span><a href="${contact.value}" target="_blank" class="text-blue-600 hover:underline">${contact.name}</a>`
          }
          else if(contact.type=='Text'){
            return `<span>&bull;</span><span>${contact.name}</span>`
          }
  }).join("")
        
        +`
        </div>
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
              
              {
                contacts.length > 0 && contacts.map((contact,idx:number)=>{
                  if (contact.type =='Link'){
                    return(
                        <Flex key={idx} gap={3} alignItems={'center'}>
                      <form key={idx}>
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
                      <Box key={idx} display={'flex'} gap={3}>
                      <Input
                      placeholder="Enter text to show on resume"
                      name={"contact"+idx}
                      value={contact.name}
                      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleContactName(e,idx)}
                      />
                      <IconButton aria-label='remove' icon={<DeleteIcon/>} onClick={()=>setcontacts(contacts.filter((_,i)=>i!==idx))}/>
                      </Box>
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

export default Header;
