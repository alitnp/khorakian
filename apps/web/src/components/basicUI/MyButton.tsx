import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IButton extends ButtonProps {
	children:ReactNode;
	className?: string;
}

const MyButton: FC<IButton> = ({children,className,...props}) => {
	return <ChakraButton colorScheme="red" varient="solid" {...props} className={`sm:!min-w-[150px] w-full sm:w-fit !px-6 ${className}`}>{ children}</ChakraButton>;
};

export default MyButton;
