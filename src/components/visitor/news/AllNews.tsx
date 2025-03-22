import React, { useEffect, useState } from 'react';
import HeaderSection from './HeaderSection';
import LeftSidebar from './LeftSidebar';
import NewsCards from './NewsCards';
import axios from "axios";

export default function AllNews() {
  const [themes, setThemes] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedDateFilter, setSelectedDateFilter] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [isCustomDateRangeModified, setIsCustomDateRangeModified] = useState(false);

  const fetchThemes = () => {
    axios.get("/api/theme")
      .then((res) => setThemes(res.data))
      .catch((err) => console.error("Error fetching themes:", err));
  };


  useEffect(() => {
    document.querySelector("body")!.style.overflow = isOpened ? "hidden" : "visible";
  }, [isOpened]);

  useEffect(() => {
    fetchThemes();
  }, []);

  return (
    <div className="mt-10 w-full">
      <div className="px-5">
        <HeaderSection headerName="Toutes les Actualités" />
      </div>
      <div className="flex flex-col sm:flex-row gap-5 mt-10">
        <LeftSidebar />
        <section className="flex-1">
          <NewsCards
            filter={{
              themes: selectedThemes,
              dateFilter: selectedDateFilter,
              startDate: isCustomDateRangeModified ? selectedRange.startDate : null,
              endDate: isCustomDateRangeModified ? selectedRange.endDate : null,
            }}
            setIsOpened={setIsOpened}
          />
        </section>
      </div>
    </div>
  );
}
