import React, { ReactNode } from "react";

interface TableProps {
    head: ReactNode;
    children: ReactNode;
    customClassNames?: string;
    headCustomClassNames?: string;
    bodyCustomClassNames?: string;
    rowsNb?: number;
    isEmptyText?: string;
}

const Table: React.FC<TableProps> = ({ children, head, bodyCustomClassNames, customClassNames, headCustomClassNames, rowsNb, isEmptyText }) => {
    return (
        <div className={`flex grow flex-col ${customClassNames}`}>
            {(!rowsNb && rowsNb != 0) || rowsNb > 0 ? (
                <div className={`grid grid-cols-12 border-b text-gray-400 font-semibold ${headCustomClassNames}`}>{head}</div>
            ) : (
                ""
            )}
            <div className={`flex grow flex-col divide-y-[1px] ${bodyCustomClassNames}`}>
                {(!rowsNb && rowsNb != 0) || rowsNb > 0 ? (
                    children
                ) : (
                    <div className="flex items-center justify-center font-semibold grow">{isEmptyText || "You didnt define an Empty text yet"}</div>
                )}
            </div>
        </div>
    );
};

export default Table;