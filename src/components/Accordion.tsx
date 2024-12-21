import React, { ReactNode, ReactElement } from "react";

interface AccordionTitleProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function AccordionTitle({ children, className, onClick }: AccordionTitleProps) {
  return (
    <button style={{ display: "block", textAlign: "left" }} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

interface AccordionBodyProps {
  children: ReactNode;
  className?: string;
}

export function AccordionBody({ children, className }: AccordionBodyProps) {
  return <div className={className}>{children}</div>;
}

interface AccordionProps {
  children: ReactNode;
  open?: boolean;
  onClick?: () => void;
}

export function Accordion({ children, open = false }: AccordionProps) {
  let title: ReactElement | null = null;
  let body: ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === AccordionTitle) {
      title = child;
    } else if (child.type === AccordionBody) {
      body = child;
    }
  });

  return (
    <div className="">
      {/* Accordion Header */}
      {title}

      {/* Accordion Content */}
      <div
        className="grid transition-all duration-300 ease-in-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">{body}</div>
      </div>
    </div>
  );
}
