"use client"
import React, { ReactNode } from 'react'
import { toast, ToastContainer } from "react-toastify";

export default function CopyToClipboard({url, children}:{url:string, children:ReactNode}) {
    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
          .then(() =>  toast.success("Copied to clipboard.", {
                          position: "bottom-right",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                      }))
          .catch((err) => console.error("Failed to copy: ", err));
      };
  return (
    <div>
    <button onClick={()=>copyToClipboard(url)}>{children}</button>
    <ToastContainer/>
    </div>
  )
}
