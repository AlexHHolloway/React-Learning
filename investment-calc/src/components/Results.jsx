import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ userInput }) {
  const resultsData = calculateInvestmentResults(userInput);
  console.log(resultsData);

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map((year, index) => {
          const totalInterest = resultsData
            .slice(0, index + 1)
            .reduce((sum, data) => sum + data.interest, 0);

          const investedCapitalToDate = year.valueEndOfYear - totalInterest;

          return (
            <tr key={year.year}>
              <td>{year.year}</td>
              <td>{formatter.format(year.valueEndOfYear)}</td>
              <td>{formatter.format(year.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(investedCapitalToDate)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
