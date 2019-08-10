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
            {stats["DariusPlayed"]
              ? stats["DariusWon"] +
                "/" +
                stats["DariusPlayed"] +
                " - " +
                ((stats["DariusWon"] / stats["DariusPlayed"]) * 100).toFixed(
                  2
                ) +
                "%"
              : "0/0 - 0.00%"}
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
    </Container>
  );
};

export default Stats;
