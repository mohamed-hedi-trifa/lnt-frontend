import React from "react";
import NewsLetterSub from "../NewsLetterSub";
import Hero from "./Hero";
import UpcomingEvents from "./UpcomingEvents";
import WhoAreWe from "./WhoAreWe";
import Archipel from "./Archipel";
import LatestNews from "./LatestNews";
import Partners from "./Partners";
import ContactUs from "./ContactUs";
import Scientific from "./Scientific";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <UpcomingEvents />
      <WhoAreWe />
      <Archipel />
      <Scientific />
      <LatestNews />
      <Partners />
      <ContactUs />
    </div>
  );
}
