import { Dispatch, SetStateAction } from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Heading,
  Input,
  RadioGroup,
  Radio,
  Box,
} from '@chakra-ui/react';
import { StylesType } from '../Triple';

const defaultStyles: StylesType = {
  linkColor: 'blue',
  resumeBg: 'whitesmoke',
  textColor: 'black',
  hrColor: 'black',
  h1Color: 'black',
  h2Color: 'black',
  h3Color: 'gray',
  listStyleType: 'disc',
  headercolour: 'lightblue',
  leftcolor: 'lightpink',
  rightcolor: 'white',
};

type StyleProps = {
  styles: StylesType;
  setStyles: Dispatch<SetStateAction<StylesType>>;
};

const Style2: React.FC<StyleProps> = ({ setStyles, styles }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStyles({ ...styles, [name]: value });
  };

  const handleListStyleChange = (value: string) => {
    setStyles({ ...styles, listStyleType: value });
  };

  const resetStyles = () => {
    setStyles(defaultStyles);
  };

  return (
    <AccordionItem>
      <AccordionButton display="flex" justifyContent="space-between" alignItems="center">
        <Heading fontSize="md" color="white">
          Style Settings
        </Heading>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <VStack spacing={3} align="stretch">
          {/* Row 1: Link Color & Resume Background */}
          <HStack spacing={3}>
            <FormControl>
              <FormLabel fontSize="sm">Link Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="linkColor"
                  value={styles.linkColor}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="linkColorInput"
                />
                <Box
                  as="label"
                  htmlFor="linkColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.linkColor}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Resume Background</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="resumeBg"
                  value={styles.resumeBg}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="resumeBgInput"
                />
                <Box
                  as="label"
                  htmlFor="resumeBgInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.resumeBg}
                />
              </HStack>
            </FormControl>
          </HStack>

          {/* Row 2: Text Color & HR Color */}
          <HStack spacing={3}>
            <FormControl>
              <FormLabel fontSize="sm">Text Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="textColor"
                  value={styles.textColor}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="textColorInput"
                />
                <Box
                  as="label"
                  htmlFor="textColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.textColor}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">HR Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="hrColor"
                  value={styles.hrColor}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="hrColorInput"
                />
                <Box
                  as="label"
                  htmlFor="hrColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.hrColor}
                />
              </HStack>
            </FormControl>
          </HStack>

          {/* Row 3: H1, H2, H3 Colors */}
          <HStack spacing={3}>
            <FormControl>
              <FormLabel fontSize="sm">H1 Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="h1Color"
                  value={styles.h1Color}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="h1ColorInput"
                />
                <Box
                  as="label"
                  htmlFor="h1ColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.h1Color}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">H2 Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="h2Color"
                  value={styles.h2Color}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="h2ColorInput"
                />
                <Box
                  as="label"
                  htmlFor="h2ColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.h2Color}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">H3 Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="h3Color"
                  value={styles.h3Color}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="h3ColorInput"
                />
                <Box
                  as="label"
                  htmlFor="h3ColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.h3Color}
                />
              </HStack>
            </FormControl>
          </HStack>

          {/* Row 4: Header, Left, Right Colors */}
          <HStack spacing={3}>
            <FormControl>
              <FormLabel fontSize="sm">Header Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="headercolour"
                  value={styles.headercolour}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="headerColorInput"
                />
                <Box
                  as="label"
                  htmlFor="headerColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.headercolour}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Left Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="leftcolor"
                  value={styles.leftcolor}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="leftColorInput"
                />
                <Box
                  as="label"
                  htmlFor="leftColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.leftcolor}
                />
              </HStack>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm">Right Color</FormLabel>
              <HStack>
                <Input
                  type="color"
                  name="rightcolor"
                  value={styles.rightcolor}
                  onChange={handleChange}
                  size="sm"
                  display="none"
                  id="rightColorInput"
                />
                <Box
                  as="label"
                  htmlFor="rightColorInput"
                  cursor="pointer"
                  w="40px"
                  h="40px"
                  border="1px solid #ccc"
                  borderRadius="md"
                  backgroundColor={styles.rightcolor}
                />
              </HStack>
            </FormControl>
          </HStack>

          {/* List Style Type */}
          <FormControl>
            <FormLabel fontSize="sm">List Style Type</FormLabel>
            <RadioGroup
              name="listStyleType"
              value={styles.listStyleType}
              onChange={handleListStyleChange}
            >
              <HStack spacing="24px">
                <Radio value="disc">Disc</Radio>
                <Radio value="circle">Circle</Radio>
                <Radio value="square">Square</Radio>
                <Radio value="none">None</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          {/* Reset Button */}
          <Button size="sm" colorScheme="red" onClick={resetStyles}>
            Reset to Default
          </Button>
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Style2;
