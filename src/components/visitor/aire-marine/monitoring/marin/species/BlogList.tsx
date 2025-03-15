import PageParagraph from "@/components/atoms/PageParagraph";
import React from "react";
import reactStringReplace from "react-string-replace";
import PageParagraph2 from "@/components/atoms/PageParagraph2";

export default function BlogList({ content }: { content: any[] }) {

  const data = Array.isArray(content) ? content : JSON.parse(content);

  return (



      <ul className="divide-y mx-10 mb-4 list-disc border-2 border-black rounded-[12px]">



        {data.map((listItem, index) => (
          <li key={index} className="py-2 border-b-1 border-black">
            <div className="inline-flex gap-2 items-center mx-4">
              {listItem.image && <img src={`${process.env.GATSBY_API_URL}${listItem.image}`} alt="" className="size-20 object-contain" />}
              <div className="whitespace-pre-wrap"><PageParagraph2>{parseContent(listItem.text)}</PageParagraph2></div>
            </div>
          </li>
        ))}
      </ul>

  );
}

function parseContent(text: string) {
  const textWithBold = reactStringReplace(text, /\*\*(.*?)\*\*/g, (match, i) => (
    <span key={i} className="font-semibold">
      {match}
    </span>
  ));

  const textWithLinks = reactStringReplace(textWithBold, /(https?:\/\/[^\s]+)/g, (match, i) => (
    <a key={i} href={match} target="_blank" rel="noopener noreferrer" className="text-blue-500 markdown-link">
      {match}
    </a>
  ));

  return textWithLinks;
}
