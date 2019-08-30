import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "reactstrap";
import Spinner from "./LoadingSpinner";

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const statsRes = await axios(`/getStats`);
      setStats(statsRes.data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h5>Statistika</h5>
          <p>Iš viso sužaista rungtynių: {stats["gamesCount"]}</p>
          <p>
            Darius laimėjo:{" "}
            {stats["DariusWon"]
              ? stats["DariusWon"] +
                "/" +
                stats["DariusPlayed"] +
                " - " +
                ((stats["DariusWon"] / stats["DariusPlayed"]) * 100).toFixed(
                  2
                ) +
                "%"
              : "0/" + stats["DariusPlayed"] + " - 0.00%"}
          </p>
          <p>
            Erikas laimėjo: {stats["ErikasWon"]}/{stats["ErikasPlayed"]} -{" "}
            {((stats["ErikasWon"] / stats["ErikasPlayed"]) * 100).toFixed(2)}%
          </p>
          <p>
            Vytautas laimėjo: {stats["VytautasWon"]}/{stats["VytautasPlayed"]} -{" "}
            {((stats["VytautasWon"] / stats["VytautasPlayed"]) * 100).toFixed(
              2
            )}
            %
          </p>
        </div>
      )}

      {/* <table className="stats-table">
        <tr>
          <th>Vardas</th>
          <th>Žaista</th>
          <th>Laimėta</th>
          <th>Pralaimėta</th>
          <th>Proc.</th>
        </tr>
        <tr>
          <td>Darius</td>
          <td>{stats["DariusPlayed"]}</td>
          <td>{stats["DariusWon"] || "0"}</td>
          <td></td>
          <td>
            {((stats["DariusWon"] / stats["DariusPlayed"]) * 100).toFixed(2)}
          </td>
        </tr>
        <tr>
          <td>Erikas</td>
          <td>{stats["ErikasPlayed"]}</td>
          <td>{stats["ErikasWon"]}</td>
          <td>{stats["ErikasPlayed"] - stats["ErikasWon"]}</td>
          <td>
            {((stats["ErikasWon"] / stats["ErikasPlayed"]) * 100).toFixed(2)}
          </td>
        </tr>
        <tr>
          <td>Vytautas</td>
          <td>{stats["VytautasPlayed"]}</td>
          <td>{stats["VytautasWon"]}</td>
          <td>{stats["VytautasPlayed"] - stats["VytautasWon"]}</td>
          <td>
            {((stats["VytautasWon"] / stats["VytautasPlayed"]) * 100).toFixed(
              2
            )}
          </td>
        </tr>
      </table> */}
    </Container>
  );
};

export default Stats;
