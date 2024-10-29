import React from "react";
import NewsLetterSub from "../NewsLetterSub";
import Hero from "./Hero";
import UpcomingEvents from "./UpcomingEvents";

export default function Home() {
  return (
    <div className="mt-[-80px]">
      <Hero />
      <UpcomingEvents />
    </div>
  );
}
