import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PinnedImageSwap({ edition }: { edition: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 1) Scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // IMAGES SHIFT
  const image1X = useTransform(scrollYProgress, [0, 0.5], ["0px", "25px"]);
  const image1Y = useTransform(scrollYProgress, [0, 0.5], ["0px", "25px"]);
  const image2X = useTransform(scrollYProgress, [0.5, 1], ["25px", "0px"]);
  const image2Y = useTransform(scrollYProgress, [0.5, 1], ["25px", "0px"]);

  // SWAP zIndex
  const image1Zindex = useTransform(scrollYProgress, [0, 0.5], ["0", "1"]);
  const image2Zindex = useTransform(scrollYProgress, [0, 0.5], ["1", "0"]);

  // TEXT FADE
  const text1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const text2Opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  // NUMBERS FADE
  const num1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const num2Opacity = useTransform(scrollYProgress, [0.5, 1], [0.3, 1]);

  // SCROLL "HANDLE" (instead of fill)
  // Track is 570px; handle is 285px; so it slides from 0→285 as we scroll 0→1
  const trackHeight = 570;
  const handleHeight = 285;
  const handleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, trackHeight - handleHeight]
  );


  const formatDateRange = (startDate, endDate) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
  
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const isSameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    
    if (isSameMonth) {
      return `Du ${start.getDate()} au ${end.toLocaleDateString("fr-FR", options)}`;
    } else {
      return `Du ${start.toLocaleDateString("fr-FR", options)} au ${end.toLocaleDateString("fr-FR", options)}`;
    }
  };

  
  return (
    <section
      ref={sectionRef}
      style={{
        height: "calc(200vh - 212px)",
        position: "relative",
      }}
    >
      {/* PINNED CONTAINER */}
      <motion.div
        style={{
          position: "sticky",
          top: 106,                   // pinned from 106px offset
          height: "calc(100vh - 106px)", // pinned container height
          display: "flex",
          overflow: "hidden",
        }}
        className="pt-20 px-10"
      >
        {/* LEFT COLUMN — Swapping images */}
        <div style={{ position: "relative", height: "100%" }} className="shrink-0 w-[525px]">
          {/* SECOND IMAGE (BEHIND) */}
          <motion.img
                     src={`${process.env.GATSBY_API_URL}${edition?.image_affiche2}`}
            alt="Second"
            style={{
              position: "absolute",
              width: "500px",
              height: "555px",
              objectFit: "cover",
              x: image2X,
              y: image2Y,
              zIndex: image1Zindex,
            }}
          />
          {/* FIRST IMAGE (ON TOP) */}
          <motion.img
            src={`${process.env.GATSBY_API_URL}${edition?.image_affiche1}`}
            alt="First"
            style={{
              position: "absolute",
              width: "500px",
              height: "555px",
              objectFit: "cover",
              x: image1X,
              y: image1Y,
              zIndex: image2Zindex,
            }}
          />
        </div>

        {/* MIDDLE COLUMN — 2 overlapping text blocks, cross-fading */}
        <div
          style={{
            flex: "1",
            position: "relative",
            padding: "0 2rem",
            height: "570px",
          }}
          className="flex items-center"
        >
          {/* TEXT #1 */}
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
                {edition.titre_affiche1_en || edition.titre_affiche1_fr }
              </h1>
              <p style={{ marginTop: "1rem" }}>
              {edition.desciption_affich1_en || edition.desciption_affich1_fr }
              </p>
              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                Date:  {formatDateRange(edition.start_date, edition.end_date)}
              </p>
            </div>
          </motion.div>

          {/* TEXT #2 */}
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
              {edition.titre_affiche2_en || edition.titre_affiche2_fr }
              </h1>
              <p style={{ marginTop: "1rem" }}>
              {edition.desciption_affich2_en || edition.desciption_affich2_fr }
              </p>
              <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                Date: {formatDateRange(edition.start_date, edition.end_date)}
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Vertical track + "handle" */}
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
            {/* Background line (track) */}
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
            {/* The sliding "thumb" */}
            <motion.div
              style={{
                position: "absolute",
                left: 0,
                height: `${handleHeight}px`, // 285px
                y: handleY,                  // moves from 0 → 285 as we scroll
              }}
              className="w-[6px] bg-primary"
            />

            {/* "01" (fades out) */}
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

            {/* "02" (fades in) */}
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
