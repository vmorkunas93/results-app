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
        <React.Fragment>
          <h3 className="title">Statistika</h3>
          <p>Iš viso sužaista rungtynių: {stats["gamesCount"]}</p>
          <p>
            Erikas: {stats["ErikasWon"]}/{stats["ErikasPlayed"]} -{" "}
            {((stats["ErikasWon"] / stats["ErikasPlayed"]) * 100).toFixed(2)}%
          </p>
          <p>
            Vytautas: {stats["VytautasWon"]}/{stats["VytautasPlayed"]} -{" "}
            {((stats["VytautasWon"] / stats["VytautasPlayed"]) * 100).toFixed(
              2
            )}
            %
          </p>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Stats;
