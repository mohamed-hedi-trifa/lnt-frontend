import React from "react";
import reactStringReplace from "react-string-replace";

export default function BlogList({ content }: { content: any[] }) {
  return (
    <ul className={`divide-y mb-4 list-inside ${content[0]?.image ? "" : "list-disc"}`}>
      {content.map((listItem: any, index: number) => (
        <li key={index} className="py-2">
          <div className="inline-flex gap-2 items-center">
            {listItem.image && <img src={`${process.env.GATSBY_API_URL}${listItem.image}`} alt="" className="size-20 object-contain" />}
            <div className="whitespace-pre-wrap">{parseContent(listItem.text)}</div>
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
