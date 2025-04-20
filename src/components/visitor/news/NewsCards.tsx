import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import NewsCard from "./NewsCard";
import { Link } from "gatsby";
import ButtonDropdown from "@/components/ButtonDropdown";
import sortIcon from "@/assets/icons/sort-icon.png";
import FilterIcon from "@/assets/icons/FilterIcon";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon";
import EmptyNews from "./EmptyNews";

/* ─────────── loader helper ─────────── */
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
  </div>
);

interface Props {
  filter: {
    searchQuery?: string;
    themes?: number[];
    dateFilter?: string | null;
    sortOrder?: "desc" | "asc";
  };
  setIsOpened: (b: boolean) => void;
}

export default function NewsCards({ filter, setIsOpened }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [itemsList, setItemsList] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">(filter.sortOrder || "desc");
  const firstLoad = useRef(true);

  const handlePageChange = (p: number) => p > 0 && p <= totalPages && setCurrentPage(p);

  const fetchNews = (q: any, page = currentPage) => {
    if (firstLoad.current) firstLoad.current = false;
    setLoading(true);
    axios
      .get(`/api/get-active-news/${limit}`, {
        params: { query: q, themes: filter.themes || [], page, sortOrder, dateFilter: filter.dateFilter },
      })
      .then((r) => {
        setItemsList(r.data.data);
        setTotalPages(r.data.last_page);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNews(filter.searchQuery, currentPage);
  }, [filter, currentPage, sortOrder]);

  /* ---------- loader grid ---------- */
  if (loading) {
    return (
      <div className="grid sm:grid-cols-3 gap-4 px-4 sm:px-0 my-5 sm:my-10">
        {Array.from({ length: 6 }).map((_, i) => (
          <Shimmer key={i} className="rounded-xl h-[420px] w-full max-w-[300px]" />
        ))}
      </div>
    );
  }

  return (
    <div>
      {/* ----- top bar (idem design) ----- */}
      <div className="hidden sm:flex justify-between items-center relative z-20">
        <ButtonDropdown
          items={[
            { key: "desc", name: "Les plus récents" },
            { key: "asc", name: "Les plus anciens" },
          ]}
          position="left"
          onSelect={(it) => setSortOrder(it.key)}
          renderItem={(it) => <div className="py-1 px-4 cursor-pointer">{it.name}</div>}
        >
          {(open) => (
            <button className="h-12 rounded-xl border-2 border-black flex items-center">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <img src={sortIcon} className="w-6" />
                <span className="text-xl font-medium">Trier</span>
                <div className={`w-6 h-6 transition ${open ? "-rotate-180" : ""}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
        {itemsList.length > 0 && (
          <div className="text-xl font-semibold pr-14">
            {`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, itemsList.length)} de ${itemsList.length} publications`}
          </div>
        )}
      </div>

      {/* ----- mobile bar ----- */}
      <div className="sm:hidden flex justify-between pr-5 relative z-20">
        <button onClick={() => setIsOpened(true)} className="w-[103px] h-[41px] px-2.5 py-5 bg-gradient-to-r from-[#006e9f] to-[#51adc6] rounded-tr-xl rounded-br-xl shadow-xl flex items-center gap-2.5">
          <FilterIcon />
          <span className="text-white text-sm font-bold">Filtres</span>
        </button>
        <ButtonDropdown
          items={[
            { key: "desc", name: "Les plus récents" },
            { key: "asc", name: "Les plus anciens" },
          ]}
          position="right"
          onSelect={(it) => setSortOrder(it.key)}
          renderItem={(it) => <div className="py-1 px-4 cursor-pointer">{it.name}</div>}
        >
          {(open) => (
            <button className="h-12 rounded-xl border-2 border-black flex items-center">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <img src={sortIcon} className="w-6" />
                <span className="text-xl font-medium">Trier</span>
                <div className={`w-6 h-6 transition ${open ? "-rotate-180" : ""}`}>
                  <ArrowDownIcon />
                </div>
              </div>
            </button>
          )}
        </ButtonDropdown>
      </div>

      {itemsList.length === 0 && <EmptyNews />}

      {itemsList.length > 0 && (
        <>
          <section className="grid sm:grid-cols-3 gap-4 px-4 sm:px-0 my-5 sm:my-10">
            {itemsList.map((n) => (
              <Link key={n.id} to={`/news/${n.slug}`}>
                <NewsCard news={n} />
              </Link>
            ))}
          </section>
          {totalPages > 1 && (
            <div className="flex justify-center px-4 sm:px-0 pt-6 pb-20">
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
