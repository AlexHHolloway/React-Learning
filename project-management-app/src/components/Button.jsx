export default function Button({ children, ...props }) {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-300 hover:bg-stone-800 hover:text-stone-200 active:translate-y-px"
      {...props}
    >
      {children}
    </button>
  );
}
