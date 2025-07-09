export default function UserInput({ userInput, onChange }) {
  function handleChange(identifier, newValue) {
    onChange({
      ...userInput,
      [identifier]: +newValue, // convert to number
    });
  }

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initialInvestment">Initial Investment</label>
          <input
            id="initialInvestment"
            type="number"
            required
            value={userInput.initialInvestment}
            onChange={(e) => handleChange("initialInvestment", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="annualInvestment">Annual Investment</label>
          <input
            id="annualInvestment"
            type="number"
            required
            value={userInput.annualInvestment}
            onChange={(e) => handleChange("annualInvestment", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="expectedReturn">Expected Return</label>
          <input
            id="expectedReturn"
            type="number"
            required
            value={userInput.expectedReturn}
            onChange={(e) => handleChange("expectedReturn", e.target.value)}
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            id="duration"
            type="number"
            required
            value={userInput.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
          />
        </p>
      </div>
    </section>
  );
}
