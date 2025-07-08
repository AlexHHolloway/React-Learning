import { CORE_CONCEPTS } from "../../data";
import "./CoreConcepts.css";

export default function CoreConcepts() {
  return (
    <section className="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((item) => (
          <li key={item.title}>
            <img src={item.image} alt="image" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
