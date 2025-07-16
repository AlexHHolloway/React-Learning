import { useState } from "react";

export default function NewTask({ onAdd }) {
  const [task, setTask] = useState("");

  function handleChange(e) {
    setTask(e.target.value);
  }

  function forwardTask() {
    if(task.trim() === "") {
        return;
    }
    onAdd(task);
    setTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-300 outline-none"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            forwardTask();
          }
        }}
        value={task}
      />
      <button
        className="px-4 py-1 rounded-md bg-stone-700 text-stone-50 hover:bg-stone-800 hover:drop-shadow-md"
        onClick={forwardTask}
      >
        Add Task
      </button>
    </div>
  );
}
