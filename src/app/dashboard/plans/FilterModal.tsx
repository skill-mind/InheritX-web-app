import React, { useState } from "react";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApply: (filter: string) => void;
  currentFilter: string;
}

const filterOptions = [
  "All",
  "ACTIVE",
  "COMPLETED",
  "PENDING",
  "EXPIRED",
];

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApply, currentFilter }) => {
  const [selected, setSelected] = useState(currentFilter || "All");

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#182024] rounded-[24px] shadow-lg p-8 w-full max-w-[340px] flex flex-col items-center">
        <span className="text-[#FCFFFF] text-[18px] font-semibold mb-4 text-center">Filter Plans</span>
        <div className="flex flex-col gap-3 w-full mb-6">
          {filterOptions.map(option => (
            <button
              key={option}
              className={`w-full px-4 py-2 rounded-[16px] text-[15px] font-medium border border-[#232B36] transition-colors ${selected === option ? "bg-[#33C5E0] text-[#161E22]" : "bg-[#232B36] text-[#FCFFFF]"}`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex gap-4 w-full justify-center mt-2">
          <button
            className="px-6 py-2 cursor-pointer rounded-[16px] bg-[#232B36] text-[#FCFFFF] text-[14px] font-medium border border-[#425558] hover:bg-[#232B36]/80 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 cursor-pointer rounded-[16px] bg-[#33C5E0] text-[#161E22] text-[14px] font-semibold border border-[#33C5E0] hover:bg-cyan-400 transition-colors"
            onClick={() => onApply(selected)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
