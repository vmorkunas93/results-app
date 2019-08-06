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

<<<<<<< HEAD
    setRandomTeam(teams[randomNumber].logo);
=======
    setRandomTeam(teams[randomNumber].teamName);
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
  };

  return (
    <Container>
      <Button style={{ marginBottom: '20px' }} color="info" onClick={onClick}>
        Išrinkti komandą
      </Button>
<<<<<<< HEAD
      {randomTeam && <div><img src={randomTeam} alt="random-logo" /></div>}
=======
      <h3>{randomTeam}</h3>
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
    </Container>
  );
};

export default Random;
