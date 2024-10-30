import React from "react";
import NewsLetterSub from "../NewsLetterSub";
import Hero from "./Hero";
import UpcomingEvents from "./UpcomingEvents";
import WhoAreWe from "./WhoAreWe";
import Archipel from "./Archipel";
import LatestNews from "./LatestNews";
import Partners from "./Partners";
import ContactUs from "./ContactUs";

export default function Home() {
  return (
    <div className="mt-[-80px]">
      <Hero />
      <UpcomingEvents />
      <WhoAreWe />
      <Archipel />
      <LatestNews />
      <Partners />
      <ContactUs />
    </div>
  );
}
