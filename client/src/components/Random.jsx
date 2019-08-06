import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container } from 'reactstrap';

const Random = () => {
  const [teams, setTeams] = useState([]);
  const [randomTeam, setRandomTeam] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const teamsRes = await axios('/getTeams');
      setTeams(teamsRes.data);
    };
    fetchData();
  }, []);

  const onClick = () => {
    const randomNumber = Math.floor(Math.random() * 30);

    setRandomTeam(teams[randomNumber].logo);
  };

  return (
    <Container>
      <Button style={{ marginBottom: '20px' }} color="info" onClick={onClick}>
        Išrinkti komandą
      </Button>
      {randomTeam && <div><img src={randomTeam} alt="random-logo" /></div>}
    </Container>
  );
};

export default Random;
