import React, {FC} from 'react';
import './button.scss';

interface ButtonProps {
    text: string;
    variant: 'continue' | 'stop' | '';
    size: 'small' | 'tall' | '';
    onClick: () => void;
}
const Button:FC<ButtonProps> = ({text, variant, size, onClick}) => {
    const buttonClassName = `button ${variant} ${size}`;

    return (
        <button className={buttonClassName} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;