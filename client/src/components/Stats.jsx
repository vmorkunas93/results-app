import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import Spinner from './LoadingSpinner'

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      const statsRes = await axios(`/getStats`);
      setStats(statsRes.data);
      setLoading(false)
    };
    fetchStats();
  }, []);

  return (
    <Container>
      {loading ? <Spinner /> : (
        <div>
          <h5>Statistika</h5>
          <p>Iš viso sužaista rungtynių: {stats['gamesCount']}</p>
          <p>Darius laimėjo: {stats['DariusPlayed'] ? (stats['DariusWon'] + '/' + stats['DariusPlayed'] + ' - ' + Math.floor((stats['DariusWon'] / stats['DariusPlayed']) * 100) + '%') : '0/0 - 0%'}</p>
          <p>Erikas laimėjo: {stats['ErikasWon']}/{stats['ErikasPlayed']} - {Math.floor((stats['ErikasWon'] / stats['ErikasPlayed']) * 100)}%</p>
          <p>Vytautas laimėjo: {stats['VytautasWon']}/{stats['VytautasPlayed']} - {Math.floor((stats['VytautasWon'] / stats['VytautasPlayed']) * 100)}%</p>
        </div>
      )}
    </Container>
  );
};

export default Stats;
