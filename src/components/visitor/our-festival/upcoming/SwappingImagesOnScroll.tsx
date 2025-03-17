import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import PageParagraph2 from "@/components/atoms/PageParagraph2";

const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };

export default function PinnedImageSwap({ edition }: { edition: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 1) Scroll progress pour cette section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // -- RÉGLAGES VITESSE D'ANIMATION : on compresse la plage de scroll
  const image1X = useTransform(scrollYProgress, [0, 0.2], ["0px", "25px"]);
  const image1Y = useTransform(scrollYProgress, [0, 0.2], ["0px", "25px"]);
  const image2X = useTransform(scrollYProgress, [0.2, 1], ["25px", "0px"]);
  const image2Y = useTransform(scrollYProgress, [0.2, 1], ["25px", "0px"]);

  const image1Zindex = useTransform(scrollYProgress, [0, 0.2], ["0", "1"]);
  const image2Zindex = useTransform(scrollYProgress, [0, 0.2], ["1", "0"]);

  const text1Opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.2, 1], [0, 1]);

  const num1Opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const num2Opacity = useTransform(scrollYProgress, [0.2, 1], [0.3, 1]);
  
  const trackHeight = 570;
  const handleHeight = 285;
  const handleY = useTransform(scrollYProgress, [0, 1], [0, trackHeight - handleHeight]);

  const formatDateRange = (startDate: string, endDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isSameYear = start.getFullYear() === end.getFullYear();
    const isSameMonth = start.getMonth() === end.getMonth() && isSameYear;

    if (isSameMonth) {
      return `Du ${start.getDate()} au ${end.toLocaleDateString("fr-FR", options)}`;
    } else if (isSameYear) {
      return `Du ${start.getDate()} ${start.toLocaleDateString("fr-FR", { month: "long" })} au ${end.toLocaleDateString("fr-FR", options)}`;
    } else {
      return `Du ${start.toLocaleDateString("fr-FR", options)} au ${end.toLocaleDateString("fr-FR", options)}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{
        // Hauteur globale un peu plus simple, pour un pinning plus fluide
        height: "150vh",
        position: "relative",
        marginBottom: "40px",
      }}
    >
      {/* PINNED CONTAINER */}
      <motion.div
        style={{
          position: "sticky",
          top: 60, // point de “pinning”
          height: "calc(100vh - 60px)",
          display: "flex",
          overflow: "hidden",
        }}
        className="pt-20 px-10"
      >
        {/* COLONNE GAUCHE - Images */}
        <div style={{ position: "relative", height: "100%" }} className="shrink-0 w-[525px]">
          {/* IMAGE #2 (derrière) */}
          <motion.img
            src={`${process.env.GATSBY_API_URL}${edition?.image_affiche2}`}
            alt="Second"
            style={{
              position: "absolute",
              width: "500px",
              height: "555px",
              x: image2X,
              y: image2Y,
              zIndex: image1Zindex,
              borderRadius: "12px",
              boxShadow:
                "0px -8px 80px 0px rgba(0, 0, 0, 0.07)," +
                "0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05)," +
                "0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04)," +
                "0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03)," +
                "0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)",
            }}
          />
          {/* IMAGE #1 (devant) */}
          <motion.img
            src={`${process.env.GATSBY_API_URL}${edition?.image_affiche1}`}
            alt="First"
            style={{
              position: "absolute",
              width: "500px",
              height: "555px",
              x: image1X,
              y: image1Y,
              zIndex: image2Zindex,
              borderRadius: "12px",
              boxShadow:
                "0px -8px 80px 0px rgba(0, 0, 0, 0.07)," +
                "0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05)," +
                "0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04)," +
                "0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03)," +
                "0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)",
            }}
          />
        </div>

        {/* TEXTE CENTRAL */}
        <div
          style={{
            flex: 1,
            position: "relative",
            padding: "0 2rem",
            height: "570px",
          }}
          className="flex items-center"
        >
          {/* TEXTE #1 */}
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              opacity: text1Opacity,
            }}
            className="flex items-center h-full"
          >
            <div>
              <h1 style={{ margin: "1rem 0 0 0", fontSize: "2rem", fontWeight: "bold" }}>
                {edition?.titre_affiche1_en || edition?.titre_affiche1_fr}
              </h1>
              <PageParagraph2>
                <p style={{ marginTop: "1rem" }}>{edition?.desciption_affich1_en || edition?.desciption_affich1_fr}</p>
              </PageParagraph2>
              <p className="mt-4 font-medium">
                <span className="text-[#0270A0] font-bold">Date:</span> {formatDateRange(edition?.start_date, edition?.end_date)}
              </p>
            </div>
          </motion.div>

          {/* TEXTE #2 */}
          <motion.div
            style={{
              position: "absolute",
              width: "100%",
              opacity: text2Opacity,
            }}
            className="flex items-center h-full"
          >
            <div>
              <h1 style={{ margin: "1rem 0 0 0", fontSize: "2rem", fontWeight: "bold" }}>
                {edition?.titre_affiche2_en || edition?.titre_affiche2_fr}
              </h1>
              <PageParagraph2>
                <p style={{ marginTop: "1rem" }}>{edition?.desciption_affich2_en || edition?.desciption_affich2_fr}</p>
              </PageParagraph2>
              <p className="mt-4 font-medium">
                <span className="text-[#0270A0] font-bold">Date:</span> {formatDateRange(edition?.start_date, edition?.end_date)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* COLONNE DROITE — Track + handle vertical */}
        <div
          style={{
            flex: "0 0 10%",
            position: "relative",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", width: "2px", height: `${trackHeight}px` }}>
            {/* Traque */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                background: "#ADD8E6",
              }}
              className="w-[6px]"
            />
            {/* Curseur */}
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                height: `${handleHeight}px`, // 285px
                y: handleY,                  // se déplace de 0 → 285
              }}
              className="w-[6px] bg-primary"
            />

            {/* 01 (fades out) */}
            <motion.div
              style={{
                position: "absolute",
                fontWeight: 700,
                opacity: num1Opacity,
              }}
              className="text-primary top-1 right-2 text-4xl"
            >
              01
            </motion.div>

            {/* 02 (fades in) */}
            <motion.div
              style={{
                position: "absolute",
                fontWeight: 700,
                opacity: num2Opacity,
              }}
              className="text-primary bottom-1 right-2 text-4xl"
            >
              02
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
