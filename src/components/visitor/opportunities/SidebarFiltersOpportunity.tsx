// src/components/visitor/who-are-we/our-achievements/SidebarFilters.tsx
import React, { Dispatch, SetStateAction, memo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Checkbox from '../posts/Checkbox';
import FilterTitle from '../posts/FilterTitle';


const ShimmerBar = ({ className = '' }: { className?: string }) => (
    <div className={`relative overflow-hidden bg-gray-300/70 rounded ${className}`}>
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent)]" />
    </div>
);
const SkeletonCheckbox = () => <ShimmerBar className="h-4 w-40" />;

type LeftSidebarProps = {
    selectedAllTypes: boolean;
    handleAllTypesChange: (checked: boolean) => void;
    selectedTypes: string[];
    handleTypeChange: (id: string, checked: boolean) => void;
    selectedDateFilter: string | null;
    setSelectedDateFilter: Dispatch<SetStateAction<string | null>>;
    setIsCustomDropdownOpen: Dispatch<SetStateAction<boolean>>;
    resetFilters: () => void;
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    isOpened: boolean;
    setIsOpened: Dispatch<SetStateAction<boolean>>;
    
};

const SidebarFiltersOpportunity = memo(function LeftSidebar({

    selectedAllTypes,
    handleAllTypesChange,
    selectedTypes,
    handleTypeChange,
    selectedDateFilter,
    setSelectedDateFilter,

    setIsCustomDropdownOpen,

    resetFilters,
    searchQuery,
    setSearchQuery,
    isOpened,
    setIsOpened,

}: LeftSidebarProps) {


    return (
        <aside className={`pointer-events-none h-screen sm:h-fit fixed z-50 lg:z-10 sm:sticky sm:top-[116px] inset-0 p-5 transition duration-300 lg:translate-x-0 ${isOpened ? "translate-x-0" : "translate-x-[-100%]"}`} onClick={() => setIsOpened(false)}>
            <div className='opacity-90 sm:opacity-100  bg-white flex flex-col p-[10px] gap-4 sm:gap-10 w-full sm:w-[320px] rounded-xl shadow-xl overflow-y-auto pointer-events-auto h-full'
                style={{
                    boxShadow: "0px -8px 80px 0px rgba(0, 0, 0, 0.07), 0px -2.92px 29.2px 0px rgba(0, 0, 0, 0.05), 0px -1.42px 14.18px 0px rgba(0, 0, 0, 0.04), 0px -0.69px 6.95px 0px rgba(0, 0, 0, 0.03), 0px -0.27px 2.75px 0px rgba(0, 0, 0, 0.02)"
                }}>
                <div className="border rounded-lg border-black flex gap-4 p-2">
                    <MagnifyingGlassIcon className="size-5" />
                    <input
                        type="text"
                        placeholder="Recherche"
                        className="outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>




                {/* Date */}
                <div className="flex flex-col gap-5 relative z-50">
                    <FilterTitle title="Date" />
                    <div className="flex flex-col gap-3">
                        <Checkbox
                            name="all-types"
                            label="Tous les Types"
                            checked={selectedAllTypes}
                            onChange={handleAllTypesChange}
                        />
                        {['job-offer', 'call-for-tender', 'internship'].map((key) => (
                            <Checkbox
                                key={key}
                                name={`type-${key}`}
                                label={
                                    key === 'job-offer'
                                        ? "Offres d'Emploi"
                                        : key === 'call-for-tender'
                                            ? "Appels d'Offres"
                                            : key === 'internship'
                                                ? "Stages"
                                                : ""
                                }
                                checked={selectedTypes.includes(key)} // ✅ use `key` directly
                                onChange={(c) => handleTypeChange(key, c)} // ✅ use `key` directly
                            />
                        ))}

                    </div>
                </div>


                {/* Date */}
                <div className="flex flex-col gap-5 relative z-50">
                    <FilterTitle title="Date" />
                    <div className="flex flex-col gap-3">
                        {['today', 'week', 'month', 'year'].map((key) => (
                            <Checkbox
                                key={key}
                                name={`date-${key}`}
                                label={
                                    key === 'today'
                                        ? "Aujourd'hui"
                                        : key === 'week'
                                            ? 'Cette Semaine'
                                            : key === 'month'
                                                ? 'Ce Mois'
                                                : 'Cette Année'
                                }
                                checked={selectedDateFilter === key}
                                onChange={(c) => {
                                    if (c) {
                                        setSelectedDateFilter(key);
                                        setIsCustomDropdownOpen(false);
                                    } else {
                                        setSelectedDateFilter(null);
                                    }
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end">

                    <button
                        className="text-white font-semibold px-[10px] py-2 rounded-xl bg-[#858585]"
                        onClick={resetFilters}>
                        Réinitialiser
                    </button>
                </div>
            </div>
        </aside>
    );
});

export default SidebarFiltersOpportunity;
