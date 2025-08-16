import { useActionState, useContext } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = useContext(OpinionsContext);

  async function newOpinionAction(prevFormState, formData) {
    const userName = formData.get("userName")?.trim();
    const title = formData.get("title")?.trim();
    const body = formData.get("body")?.trim();

    let errors = [];

    if (!userName.trim() || !title.trim() || !body.trim()) {
      errors.push("All fields are required.");
      return {
        errors,
        userName,
        title,
        body,
      };
    }

    console.log({
      userName: userName,
      title: title,
      body: body,
    });

    await addOpinion({ title, body, userName });

    return { errors: null };
  }

  const [formState, formAction] = useActionState(newOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      {formState?.errors && <div className="errors">{formState.errors}</div>}
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState?.userName || ""}
            />
          </p>

          <p className="control">
            <label htmlFor="body">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState?.title || ""}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState?.body || ""}
          ></textarea>
        </p>

        <Submit />
      </form>
    </div>
  );
}
