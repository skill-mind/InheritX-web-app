import React from "react";

interface DeletePlanModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planName?: string;
}

const DeletePlanModal: React.FC<DeletePlanModalProps> = ({ open, onClose, onConfirm, planName }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#182024] rounded-[24px] shadow-lg p-8 w-full max-w-[400px] flex flex-col items-center">
        <span className="text-[#FCFFFF] text-[18px] font-semibold mb-2 text-center">Delete Plan?</span>
        <span className="text-[#BFC6C8] text-[14px] mb-6 text-center">
          Are you sure you want to delete <span className="text-[#33C5E0] font-medium">{planName || "this plan"}</span>? This action cannot be undone.
        </span>
        <div className="flex gap-4 w-full justify-center mt-2">
          <button
            className="px-6 py-2 rounded-[16px] bg-[#232B36] text-[#FCFFFF] text-[14px] font-medium border border-[#425558] hover:bg-[#232B36]/80 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-[16px] bg-[#E53E3E] text-[#FCFFFF] text-[14px] font-semibold border border-[#E53E3E] hover:bg-red-700 transition-colors"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePlanModal;
