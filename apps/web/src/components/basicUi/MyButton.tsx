import { Button, ButtonProps } from "antd";
import { FC, ReactNode } from "react";

interface IMyButton extends ButtonProps {
	children: ReactNode;
	className?: string;
}

const MyButton: FC<IMyButton> = ({
	children,
	className,
	...props
}) => {
	return (
		<Button
			className={`min-w-[unset] px-6 sm:min-w-[150px] w-full sm:w-[unset]  ${className}`}
			{...props}
		>
			{children}
		</Button>
	);
};

export default MyButton;
