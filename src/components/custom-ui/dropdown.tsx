import { IonIcon } from "@ionic/react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { chevronDownOutline } from "ionicons/icons";
import React, { SetStateAction } from "react";

export function LanguageDropdownComponent({
  items,
  setSelectedValue,
}: {
  items: { key: string; value: string }[];
  setSelectedValue: React.Dispatch<
    SetStateAction<{ key: string; value: string }>
  >;
}) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([items[0].key]));

  const selectedValue = React.useMemo(() => {
    const selectedKey = Array.from(selectedKeys)[0];
    const selectedItem = items.find((item) => item.key === selectedKey);
    return selectedItem ? selectedItem.value : "";
  }, [selectedKeys, items]);

  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(keys);
    const selectedKey = Array.from(keys)[0];
    const selectedItem = items.find((item) => item.key === selectedKey);
    if (selectedItem) {
      setSelectedValue({ key: selectedItem.key, value: selectedItem.value });
    }
  };

  
  return (
    <Dropdown className="border border-neutral-80 bg-neutral-90">
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="capitalize py-1 h-8 border border-neutral-10"
        >
          {selectedValue} <IonIcon icon={chevronDownOutline}/>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        {items.map((item) => (
          <DropdownItem key={item.key}>{item.value}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
