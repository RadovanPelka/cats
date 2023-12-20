"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const usePopupState = () => {
  const [isPopupVisible, setPopupVisibility] = useState(false);

  return {
    isPopupVisible,
    showPopup: () => setPopupVisibility(true),
    closePopup: () => setPopupVisibility(false),
    togglePopup: () => setPopupVisibility(!isPopupVisible),
  };
};

type ModalProps = {
  title?: React.ReactNode;

  children?: React.ReactNode;

  onClose?: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const closeModalOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", closeModalOnEsc);

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", closeModalOnEsc);
    };
  }, []);

  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    onClose && onClose();
  };

  const modalRoot = document?.getElementById("modal-root");

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      tabIndex={-1}
      className="fixed bottom-0 left-0 right-0 top-0 z-[125] flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-70 md:inset-0 md:h-full"
    >
      <div className="relative w-full max-w-4xl px-4 md:h-auto">
        <div className="relative max-h-[90vh] overflow-y-auto rounded-lg bg-white">
          <div className="flex justify-end p-4 pl-7 absolute w-full">
            <button
              className="bg-gray-200 py-1 px-3 hover:bg-slate-300 rounded-lg"
              type="button"
              onClick={closeModal}
            >
              X
            </button>
          </div>
          <div className="p-7">{children}</div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
