interface ButtonProps {
    style?: string;
    label?: string;
    onClick?: (even: any) => void;
    type?: "submit" | "button" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ({ style, label, onClick, type }: ButtonProps) => {
    return (
        <button type={type} className={`${style} text-white px-4 py-2 rounded-lg`} onClick={onClick}>
            { label }
        </button>
    )
}