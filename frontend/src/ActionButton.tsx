import { Button, Flex, ButtonProps } from '@chakra-ui/react'

interface CustomButtonProps extends ButtonProps {
  label: string;
  handleClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, handleClick, ...props }) => {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Button
        px={4}
        fontSize={'sm'}
        rounded={'md'}
        bg={'blue.400'}
        color={'white'}
        onClick={handleClick}
        // boxShadow={
        //   '0px 1px 25px -5px rgb(255 99 71 / 48%), 0 10px 10px -5px rgb(255 99 71 / 43%)'
        // }
        _hover={{
          bg: 'blue.500',
        }}
        _focus={{
          bg: 'blue.500',
        }}
        {...props}>
        {label}
      </Button>
    </Flex>
  )
}

export default CustomButton;