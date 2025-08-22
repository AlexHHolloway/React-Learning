import { forwardRef } from "react";

const Button = forwardRef(function Button(
  { children, textOnly, className = "", ...props },
  ref
) {
  let cssClasses = textOnly ? "text-button" : "button";
  cssClasses += " " + className;

  return (
    <button ref={ref} className={cssClasses} {...props}>
      {children}
    </button>
  );
});

export default Button;
