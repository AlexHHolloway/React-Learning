import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Toast({
  message,
  isVisible,
  onClose,
  type = "success",
  position,
}) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000); // 1 second duration for quick feedback

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const style = position
    ? {
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translate(-50%, -100%)",
        zIndex: 1000,
      }
    : {
        position: "fixed",
        top: "2rem",
        right: "2rem",
        zIndex: 1000,
      };

  const toastElement = (
    <div
      className={`toast ${position ? "toast-contextual" : ""} toast-${type}`}
      style={style}
    >
      <div className="toast-content">
        <span className="toast-icon">
          {type === "success" && "✅"}
          {type === "error" && "❌"}
          {type === "info" && "ℹ️"}
        </span>
        <span className="toast-message">{message}</span>
      </div>
      {!position && (
        <button className="toast-close" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );

  return createPortal(toastElement, document.body);
}
