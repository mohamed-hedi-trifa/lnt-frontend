import React from "react"
import { SortableHandle } from "react-sortable-hoc";
import { Bars3Icon } from "@heroicons/react/24/outline";

const DragHandle = SortableHandle(() =>
    <span className='flex justify-center items-center select-none'>
        <Bars3Icon fontSize="medium" />
    </span>);
export default DragHandle;