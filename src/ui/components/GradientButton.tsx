import { Button } from '@nextui-org/button'

interface Props {
    text: string;
    onClick: () => void;
    size?: "normal" | "medium" | "big",
    align?: "start"|"center"|"end", 
    className?: string;
    isSubmit?: boolean;
}
export const GradientButton = ({ text, size = "normal", align = "center", className, onClick, isSubmit }: Props) => {

    const calculateSize = (): string => {
        switch (size) {
            case "big": return "w-full";
            case "medium": return "w-3/4";
            default: return "w-fit"
        }
    }

    return (
        <div className={`w-full flex items-center justify-${align}`}>
            <Button radius="md"
                onClick={onClick}
                type={isSubmit ? "submit" : "button"}
                className={
                    `bg-gradient-to-tr from-indigo-500 to-accent text-white shadow-lg text-xl
                     ${calculateSize()} ${className}`
                }>
                {text}
            </Button>
        </div>
    )
}
