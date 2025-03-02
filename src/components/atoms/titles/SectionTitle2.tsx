import React from "react";

interface SectionTitle2Props {
  title: string;
  width?: string;   
  color?: string;    
  fontSize?: string; 
  spacing?: string;     
  firstWordColor?: string; 
}

const SectionTitle2: React.FC<SectionTitle2Props> = ({
  title,
  width = "",
  color = "#000000",
  fontSize = "",
  spacing = "",
  firstWordColor = "#0270A0",
}) => {
  // Découpage du titre en mots
  const words = title.split(" ");
  if (words.length === 0) return null;

  // Extraction du premier mot et du reste
  const firstWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <h2
      className={`${width} ${fontSize} ${spacing}`}
      style={{ color: color }} // Couleur globale du titre
    >
      <span style={{ color: firstWordColor }}>{firstWord}</span>{" "}
      {restWords}
    </h2>
  );
};

export default SectionTitle2;
