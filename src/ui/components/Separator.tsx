interface Props {
  width?: "w-full"|"w-4/5"|"w-1/2";
  className?: string;
  
}
export const Separator = ({className, width = "w-full"}:Props) => {
  return (
    <div className={`bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] ${className} ${width}`} />
  )
}
