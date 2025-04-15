import { Transition } from "@headlessui/react";
import React, { ReactNode, useRef, useState } from "react";

type Props = {
  children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  items?: any[];
  item?: ReactNode;
  renderItem?: (item: any) => React.ReactNode;
  onSelect?: (item: any) => void;
  onOpen?: () => void;
  onClose?: () => void;
  position?: "left" | "right";
};

function DateDropdown({
  children,
  items = [],
  item,
  renderItem = (item) => item.label,
  onSelect,
  onOpen,
  onClose,
  position = "left",
}: Props) {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const isOpenRef = useRef(false);
  const [_, forceUpdate] = useState<number>(0);

  function toggleDropdown(e: any) {
    // Prevent toggle if user clicks inside the date picker
    if (e.target.closest(".rdrDateRangeWrapper")) return;

    const willOpen = !isOpenRef.current;
    isOpenRef.current = willOpen;

    // Trigger open/close callbacks
    if (willOpen && onOpen) onOpen();
    if (!willOpen && onClose) onClose();

    forceUpdate((val) => val + 1);
  }

  return (
    <button className="relative" onClick={toggleDropdown} ref={dropdownRef}>
      <div
        className={`relative font-open font-normal capitalize transition duration-300 before:w-full before:h-[20px] before:absolute before:top-[95%] ${
          isOpenRef.current ? "before:block" : "before:hidden"
        }`}
      >
        {typeof children === "function" ? children(isOpenRef.current) : children}
      </div>

      <Transition
        show={isOpenRef.current}
        enter="transition duration-300"
        enterFrom="translate-y-[30px] opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-300"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-[30px] opacity-0"
      >
        <div
          onClick={() => {
            if (onSelect && item) onSelect(item);
          }}
        >
          {renderItem(item)}
        </div>
      </Transition>
    </button>
  );
}

export default DateDropdown;
