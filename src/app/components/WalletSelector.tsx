import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { useContext } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { walletContext } from "../../context/WalletContext";

interface Props {
  className?: string;
}
export const WalletSelector = ({ className = "" }: Props) => {

  const { wallets, activeWallet, setActiveWalletById } = useContext(walletContext);

  const handleChange = (walletId: string = "0") => {
    setActiveWalletById(walletId)
  }

  if(!activeWallet){
    return <div></div>
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className={`flex gap-2 items-center bg-accent text-white h-8 ${className}`}
        >
          <span className="font-[600]">{activeWallet?.title}</span>
          <MdOutlineKeyboardArrowDown />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={[...wallets, { id: "0", title: "Crear Nueva" }]} className="bg-secondary rounded-lg">
        {(item) => (
          <DropdownItem
            key={item.id}
            className={`text-textPrimary ${item.id === "0" ? "bg-primary text-accent" : "default"}`}
            onClick={() => handleChange(item.id)}
          >
            {item.title}
          </DropdownItem>
        )
        }
      </DropdownMenu>
    </Dropdown>
  );
}