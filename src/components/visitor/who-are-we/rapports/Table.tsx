import React from "react";
import PdfIcon from "@/assets/icons/PdfIcon.png";


const Table: React.FC<{ data: { title: string; date: string; pdf_link: string }[] }> = ({ data }) => {
  return (
    <div className="overflow-x-auto shadow-helmi flex justify-center">
      <table className="w-full  border-collapse shadow-helmi mx-auto">
        <thead className="h-[82px]">
          <tr className="bg-[#0270A0] text-white">
            <th className="px-4 py-2">
              <span className="text-[16px]">Titre</span>
            </th>
            <th className="px-4 py-2">
              <span className="text-[16px]">Date</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`h-[82px] ${index % 2 !== 0 ? "bg-[#C7E9F8]" : "bg-[rgba(255,255,255,0.6)]"
                } hover:bg-gray-300`}
            >
              <td className="px-4 py-2 flex items-center">
                <a
                  href={`${process.env.GATSBY_API_URL}${item?.pdf_link}`}
                  target="_blank" // Open in a new tab
                  rel="noopener noreferrer" // Recommended for security
                  className="flex justify-center items-center"
                >
                  <img className="h-16 w-[50px]" src={PdfIcon} alt="PDF Icon" />
                  <span className="text-[12px] md:text-[16px] ml-[16px] text-[#0270A0] underline">
                    {item.title}.pdf
                  </span>
                </a>
              </td>
              <td className="text-[14px] md:text-[16px] border-l-2 px-4 py-2">
                <span className="underline text-[16px] font-bold">{item.date}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
