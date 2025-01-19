import React, { useEffect } from "react";
import { SortableElement } from "react-sortable-hoc";
import { toast } from "react-toastify";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUpload } from "@fortawesome/free-solid-svg-icons";
// import { Delete, Photo } from "@mui/icons-material";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "../../atoms/Button";
import Textarea from "../../atoms/inputs/Textarea";
import Input from "../../atoms/inputs/Input";
import DragHandle from "./DragHandle";
import { ArrowUpTrayIcon, PhotoIcon, TrashIcon } from "@heroicons/react/24/solid";

const ContentItem = SortableElement(
  ({
    items,
    setItems,
    handleItemContentChange,
    item,
    idx,
  }: {
    idx: number;
    item: any;
    handleItemContentChange: (idx: number, e: any) => void;
    items: any[];
    setItems: (items: any[]) => void;
  }) => {
    const deleteItem = (item: any, index: number) => {
      if (item.id)
        Swal.fire({
          title: "delete item",
          text: `are you sure to delete this item ?`,
          showDenyButton: true,
          confirmButtonText: "Confirm",
          denyButtonText: "Cancel",
          confirmButtonColor: "#df4759",
          denyButtonColor: "#d9e2ef",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`/api/content-items/${item.id}`)
              .then(() => {
                const newItems = items.filter((item: any) => items.indexOf(item) != index);

                const updatedContent = newItems;

                setItems(updatedContent);
                toast.success("Item deleted", {
                  position: "bottom-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              })
              .catch((err) => {
                if (err.response.data.status === 404) {
                  toast.error(err.response.data.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                } else if (err.response.status === 401) {
                  toast.error(err.response.data.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              });
          } else if (result.isDenied) {
          }
        });
      else {
        const updatedContent = items.filter((item: any) => items.indexOf(item) != index);

        setItems([...updatedContent]);
      }
    };

    const handleListImageChange = (index: number, listIndex: number, e: any) => {
      const updatedItems = [...items];
      const file = e.target.files[0];
      updatedItems[index].content[listIndex].imageFile = file;
      updatedItems[index].content[listIndex].image = URL.createObjectURL(file);
      setItems(updatedItems);
    };

    const handleListChange = (index: number, listIndex: number, value: string) => {
      const updatedItems = [...items];
      updatedItems[index].content[listIndex].text = value;
      setItems(updatedItems);
    };

    const addListItem = (index: number) => {
      const updatedItems = [...items];
      updatedItems[index].content.push({ text: "", image: "" });
      setItems(updatedItems);
    };

    const removeListItem = (index: number, listIndex: number) => {
      const updatedItems = [...items];
      updatedItems[index].content.splice(listIndex, 1);
      setItems(updatedItems);
    };

    return (
      <div className="grid grid-cols-12 w-full pl-4">
        <div className="col-span-1 flex items-center gap-3">
          <DragHandle />
          <span>{idx + 1}</span>
        </div>
        {item.type === "title" ? (
          <div className="col-span-10 p-2 font-bold">
            <Input value={item.content || ""} onChange={(e) => handleItemContentChange(idx, e)} />
          </div>
        ) : item.type === "image" || item.type === "pdf" ? (
          <div className="col-span-10 flex gap-2 p-2">
            {item.type === "image" &&
              (item.file_path ? (
                <img
                  src={item?.file_path.includes("upload") ? `${process.env.GATSBY_API_URL}${item.file_path}` : item.file_path}
                  alt="Preview"
                  className="w-32 h-32 object-cover"
                />
              ) : (
                <PhotoIcon className="text-slate-400 !text-[8rem]" />
              ))}
            <div className="mx-2 relative z-[20] flex max-[450px]:flex-col gap-3 items-center">
              <label
                htmlFor={`upload-${idx}`}
                className="w-full min-[450px]:w-fit px-4 py-2 rounded-lg flex gap-3 items-center text-white bg-primary hover:bg-primaryHover cursor-pointer transition duration-300"
              >
                <ArrowUpTrayIcon className="" />
                Choose file
              </label>
              <p>{item.file?.name || "No files selected"}</p>
            </div>
            <input id={`upload-${idx}`} type="file" accept="image/*,application/pdf" onChange={(e) => handleItemContentChange(idx, e)} className="hidden" />
          </div>
        ) : item.type === "list" ? (
          <div className="col-span-10 p-2">
            <ul className="list-disc">
              {item.content.map((listItem: any, listIdx: number) => (
                <li key={listIdx} className="flex items-center gap-2 py-1">
                  {listItem.image && (
                    <img
                      src={listItem.image?.includes("upload") ? `${process.env.GATSBY_API_URL}${listItem.image}` : listItem.image}
                      alt="List item"
                      className="w-16 h-16 object-contain"
                    />
                  )}
                  <Textarea value={listItem.text} onChange={(e) => handleListChange(idx, listIdx, e.target.value)} divClassNames="grow" />
                  <label
                    htmlFor={`upload-list-${idx}-${listIdx}`}
                    className="w-full min-[450px]:w-fit px-4 py-2 rounded-lg flex gap-3 items-center text-white bg-primary hover:bg-primaryHover cursor-pointer transition duration-300"
                  >
                    <ArrowUpTrayIcon className="size-4" />
                    Image
                  </label>
                  <input
                    id={`upload-list-${idx}-${listIdx}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleListImageChange(idx, listIdx, e)}
                    className="hidden"
                  />
                  <Button type="button" onClick={() => removeListItem(idx, listIdx)} customClassnames="delete bg-white hover:bg-white">
                    <TrashIcon className="h-6 w-6 text-red-500" />
                  </Button>
                </li>
              ))}
            </ul>
            <Button type="button" onClick={() => addListItem(idx)} customClassnames="bg-primary hover:bg-primaryHover mt-2">
              Add Item
            </Button>
          </div>
        ) : (
          <div className="col-span-10 p-2">
            <Textarea value={item.content || ""} onChange={(e) => handleItemContentChange(idx, e)} />
          </div>
        )}
        <div className="col-span-1 flex justify-end">
          <Button type="button" onClick={() => deleteItem(item, idx)} customClassnames="delete bg-white hover:bg-white">
            <TrashIcon className="h-6 w-6 text-red-500" />
          </Button>
        </div>
      </div>
    );
  }
);

export default ContentItem;
