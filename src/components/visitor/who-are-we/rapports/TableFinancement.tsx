import React from "react";

// Define the props interface for the TabeFinancement component
interface TabeFinancement {
  data: {
    periode: string;
    source: string;
    titreDuProjet: string;
    description: string;
    montant: number | string;
  }[];
}



const TabeFinancement: React.FC<TabeFinancement> = ({ data }) => {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full border-collapse ">
        <thead className="hidden sm:table-header-group">
          {/* Header is hidden on smaller screens */}
          <tr className="bg-[#0270A0] text-white">
            <th className="border border-gray-300 px-4 py-2 text-center font-bold sm:text-2xl text-[20px]">Période</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-bold sm:text-2xl text-[20px]">Source</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-bold sm:text-2xl text-[20px] min-w-max">Titre du Projet</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-bold sm:text-2xl text-[20px]">Description</th>
            <th className="border border-gray-300 px-4 py-2 text-center font-bold sm:text-2xl text-[20px]">Montant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {/* Row format for larger screens */}
              <tr className="hidden sm:table-row hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 pb-4 sm:text-base text-[14px]">{item.periode}</td>
                <td className="border border-gray-300 px-4 py-2 pb-4 sm:text-base text-[14px]">{item.source}</td>
                <td className="border border-gray-300 px-4 py-2 pb-4 sm:text-base text-[14px]">{item.titreDuProjet}</td>
                <td className="border border-gray-300 px-4 py-2 pb-4 sm:text-base text-[14px]">{item.description}</td>
                <td className="border border-gray-300 px-4 py-2 pb-4 sm:text-base text-[14px]">{item.montant}</td>
              </tr>

              {/* Stacked format for smaller screens */}
              <tr className="sm:hidden border-t border-gray-300">
              <td colSpan={2} className="text-[#0270A0] text-center border-2 px-4 py-2 font-bold text-[16px]">{item.titreDuProjet}</td>
              </tr>
              <tr className="sm:hidden border 2">
                <td className="px-4 py-2 font-medium bg-[#0270A0] "><span className="text-[#ffffff]">Période</span></td>
                <td className="px-4 py-2">{item.periode}</td>
              </tr>
              <tr className="sm:hidden border-2">
                <td className="px-4 py-2 font-medium bg-[#0270A0]"><span className="text-[#ffffff]">Source</span></td>
                <td className="px-4 py-2">{item.source}</td>
              </tr>
              <tr className="sm:hidden border2">
                <td className="px-4 py-2 font-medium bg-[#0270A0]"><span className="text-[#ffffff]">Description</span></td>
                <td className="px-4 py-2">{item.description}</td>
              </tr>
              <tr className="sm:hidden border-2">
                <td className="px-4 py-2 font-medium bg-[#0270A0]"><span className="text-[#ffffff]">Montant</span></td>
                <td className="px-4 py-2">{item.montant}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabeFinancement; 
