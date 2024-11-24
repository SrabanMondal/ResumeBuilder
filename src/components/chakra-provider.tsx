// src/chakra-provider.tsx
"use client"
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ReactNode } from 'react';

const theme = extendTheme({
  // You can add custom theme configurations here
});

interface ChakraProviderProps {
  children: ReactNode;
}

const ChakraWrapper = ({ children }: ChakraProviderProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraWrapper;
