export function Input({ invalid, label, ...props }) {
  const baseLabelClasses =
    "block mb-2 text-xs font-bold tracking-wide uppercase";
  const baseInputClasses =
    "w-full mb-4 px-3 py-2 leading-tight text-gray-700 border rounded shadow";

  const labelClasses = invalid
    ? `${baseLabelClasses} text-red-500`
    : `${baseLabelClasses} text-stone-500`;

  const inputClasses = invalid
    ? `${baseInputClasses} bg-red-200`
    : `${baseInputClasses} bg-stone-300`;

  return (
    <>
      <label className={labelClasses} htmlFor={label} {...props}>
        {label}
      </label>
      <input className={inputClasses} id={label} {...props} />
    </>
  );
}
