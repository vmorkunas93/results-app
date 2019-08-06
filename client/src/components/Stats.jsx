import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const statsRes = await axios(`/getStats`);
      setStats(statsRes.data);
    };
    fetchStats();
  }, []);

  return (
    <Container>
      <h3>Statistika</h3>
      <p>Iš viso sužaista rungtynių: {stats['gamesCount']}</p>
      <p>Darius laimėjo: {stats['DariusWon'] ? stats['DariusWon'] : '0'}</p>
      <p>Erikas laimėjo: {stats['ErikasWon']}</p>
      <p>Vytautas laimėjo: {stats['VytautasWon']}</p>
    </Container>
  );
};

export default Stats;
