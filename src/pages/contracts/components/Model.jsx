import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-[600px] p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-xl font-bold">
            ×
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
