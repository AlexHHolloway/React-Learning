import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialogRef = useRef();

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current.showModal();
    },
    close: () => {
      dialogRef.current.close();
    },
  }));

  return createPortal(
    <dialog ref={dialogRef} className="m-auto backdrop:bg-stone-900/90 bg-stone-100 p-8 rounded-lg shadow-lg w-[35rem] max-w-full">
      {children}
      <form method="dialog" action="" className="mt-4 text-right">
        <Button >{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
