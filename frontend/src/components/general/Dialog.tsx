import React, { useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const Dialog = ({ isOpen, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenModal = () => {
    dialogRef?.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef?.current?.close();
  };

  useEffect(() => {
    isOpen ? handleOpenModal() : handleCloseModal();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="w-fit p-4 py-8 border left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
    >
      {children}
    </dialog>
  );
};

export default Dialog;
