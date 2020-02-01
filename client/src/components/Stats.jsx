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
          <p>{stats["gamesPlayed"]} Games Played</p>
          {/* <p>
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

          <h6>Table</h6> */}
          <table>
            <tbody>
              <tr className="background-primary">
                <th></th>
                <th>Erikas</th>
                <th>Vytautas</th>
              </tr>
              <tr>
                <td>W</td>
                <td>{stats["ErikasWon"]}</td>
                <td>{stats["VytautasWon"]}</td>
              </tr>
              <tr>
                <td>WIN%</td>
                <td>{stats["ErikasWonPct"]}</td>
                <td>{stats["VytautasWonPct"]}</td>
              </tr>
              <tr>
                <td>PTS</td>
                <td>{stats["ErikasTotalPts"]}</td>
                <td>{stats["VytautasTotalPts"]}</td>
              </tr>
              <tr>
                <td>PPG</td>
                <td>{stats["ErikasAvgPts"]}</td>
                <td>{stats["VytautasAvgPts"]}</td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Stats;
