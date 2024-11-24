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
  RadioGroup,
  Radio,
  Box,
  Input,
} from '@chakra-ui/react';
import { StylesType } from '../Dual';

const defaultStyles: StylesType = {
  linkColor: 'blue',
  resumeBg: 'whitesmoke',
  textColor: 'black',
  hrColor: 'black',
  h1Color: 'black',
  h2Color: 'black',
  h3Color: 'gray',
  listStyleType: 'disc',
  leftcolor: 'lightblue',
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

  const createColorPicker = (label: string, name: string, value: string) => (
    <FormControl>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <HStack>
        <Input
          type="color"
          name={name}
          value={value}
          onChange={handleChange}
          display="none"
          id={`${name}Input`}
        />
        <Box
          as="label"
          htmlFor={`${name}Input`}
          cursor="pointer"
          w="40px"
          h="40px"
          border="1px solid #ccc"
          borderRadius="md"
          backgroundColor={value}
        />
      </HStack>
    </FormControl>
  );

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
            {createColorPicker('Link Color', 'linkColor', styles.linkColor)}
            {createColorPicker('Resume Background', 'resumeBg', styles.resumeBg)}
          </HStack>

          {/* Row 2: Text Color & HR Color */}
          <HStack spacing={3}>
            {createColorPicker('Text Color', 'textColor', styles.textColor)}
            {createColorPicker('HR Color', 'hrColor', styles.hrColor)}
          </HStack>

          {/* Row 3: H1, H2, H3 Colors */}
          <HStack spacing={3}>
            {createColorPicker('H1 Color', 'h1Color', styles.h1Color)}
            {createColorPicker('H2 Color', 'h2Color', styles.h2Color)}
            {createColorPicker('H3 Color', 'h3Color', styles.h3Color)}
          </HStack>

          {/* Row 4: Header, Left, Right Colors */}
          <HStack spacing={3}>
            {createColorPicker('Left Color', 'leftcolor', styles.leftcolor)}
            {createColorPicker('Right Color', 'rightcolor', styles.rightcolor)}
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
