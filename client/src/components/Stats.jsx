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
          <h3 className="title">Stats</h3>
          <p>Games Played: {stats["gamesPlayed"]}</p>
          <p>
            Erikas: {stats["ErikasWon"]}/{stats["gamesPlayed"]} -{" "}
            {stats["ErikasWonPct"]}%
          </p>
          <p>
            Vytautas: {stats["VytautasWon"]}/{stats["gamesPlayed"]} -{" "}
            {stats["VytautasWonPct"]}%
          </p>
          <h6>Total Points</h6>
          <p>Erikas: {stats["ErikasTotalPts"]}</p>
          <p>Vytautas: {stats["VytautasTotalPts"]}</p>
          <h6>Points Per Game</h6>
          <p>Erikas: {stats["ErikasAvgPts"]}</p>
          <p>Vytautas: {stats["VytautasAvgPts"]}</p>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Stats;
