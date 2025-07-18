import logoImg from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="React Quiz Logo Image" />
      <h1>React Quiz</h1>
      <p>Pick an answer before the timer runs out!</p>
    </header>
  );
}
