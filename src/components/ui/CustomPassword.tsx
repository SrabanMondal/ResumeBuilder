import { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  InputLeftElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, LockIcon } from '@chakra-ui/icons';

const PassInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  return (
    <InputGroup>
    <InputLeftElement pointerEvents="none">
        <LockIcon color="gray.800" />
    </InputLeftElement>
      <Input
        name="password"
        type={showPassword ? 'text' : 'password'}
        
        isRequired
      />
      <InputRightElement>
        <IconButton
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          icon={showPassword ? <ViewOffIcon color={'gray.800'} /> : <ViewIcon color={'gray.800'} />}
          onClick={handleToggle}
          variant="ghost"
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default PassInput;
