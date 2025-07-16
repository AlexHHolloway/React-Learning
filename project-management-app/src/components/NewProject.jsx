import Input from "./Input";
import { useRef, useState } from "react";
import Modal from "./Modal";
import { getMissingFields } from "../utils";

export default function NewProject({ onSaveProject, onCancel }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();
  const modal = useRef();

  const [missingFields, setMissingFields] = useState([]);

  function handleSave() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    const missing = getMissingFields({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });

    if (missing.length > 0) {
      setMissingFields(missing);
      modal.current.open();
      return;
    }

    onSaveProject({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  }

  return (
    <>
      <Modal ref={modal} buttonCaption="Close">
        <h2 className="text-xl font-bold text-stone-800 my-4 inline-block border-b-2 border-stone-200 pb-1">
          Invalid Input
        </h2>
        <p className="text-stone-700 mb-2">You forgot to enter values for:</p>
        <ul className="list-disc list-inside text-stone-700 mb-4">
          {missingFields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
        <p className="text-stone-700 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <h1 className="text-3xl font-extrabold text-stone-800 mb-6 inline-block border-b-4 border-stone-300 pb-1">
          Add Project
        </h1>
        <div>
          <Input type="text" label="Title" ref={title} />
          <Input label="Description" textarea ref={description} />
          <Input type="date" label="Due Date" ref={dueDate} />
        </div>
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="px-6 py-2 rounded-md text-stone-800 hover:bg-stone-300 hover:drop-shadow-md"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-700 text-stone-50 hover:bg-stone-800 hover:drop-shadow-md"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
      </div>
    </>
  );
}
