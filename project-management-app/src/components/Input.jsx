export default function Input({ ref, label, textarea, ...props }) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-300 text-stone-700 focus:outline-none focus:border-stone-500";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label htmlFor={label} className="text-sm font-bold uppercase text-stone-600">
        {label}
      </label>
      {textarea ? (
        <textarea  id={label} ref={ref} className={classes} {...props} />
      ) : (
        <input id={label} ref={ref} className={classes} {...props} />
      )}
    </p>
  );
}
