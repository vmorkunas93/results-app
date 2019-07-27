import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { Link } from 'react-router-dom';

const AddScore = () => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const teamsResult = await axios('/getTeams');
      const usersResult = await axios('/getUsers');
      setTeams(teamsResult.data);
      setUsers(usersResult.data);
    };
    fetchData();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const score1 = {
      player: e.target.user1.value,
      team: e.target.team1.value,
      points: e.target.team1score.value
    };

    const score2 = {
      player: e.target.user2.value,
      team: e.target.team2.value,
      points: e.target.team2score.value
    };

    const score = { score1, score2 };
    axios.post('/addScore', score);
    setShowModal(true);
  };

  let teamOptions = [];
  let userOptions = [];

  teams.forEach((team, index) => {
    teamOptions[index] = { value: team.teamName, label: team.teamName };
  });

  users.forEach((user, index) => {
    userOptions[index] = { value: user.name, label: user.name };
  });

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Pirmas žaidėjas</Label>
        </FormGroup>
        <FormGroup>
          <Select
            placeholder="Vardas"
            isSearchable={false}
            name="user1"
            options={userOptions}
          />
        </FormGroup>
        <FormGroup>
          <Select
            placeholder="Komanda"
            isSearchable={false}
            name="team1"
            options={teamOptions}
          />
        </FormGroup>
        <FormGroup>
          <Input type="number" name="team1score" placeholder="Taškai" />
        </FormGroup>
        <FormGroup>
          <Label>Antras žaidėjas</Label>
        </FormGroup>
        <FormGroup>
          <Select
            placeholder="Vardas"
            isSearchable={false}
            name="user2"
            options={userOptions}
          />
        </FormGroup>
        <FormGroup>
          <Select
            placeholder="Komanda"
            isSearchable={false}
            name="team2"
            options={teamOptions}
          />
        </FormGroup>
        <FormGroup>
          <Input type="number" name="team2score" placeholder="Taškai" />
        </FormGroup>
        <Button color="info" type="submit">
          Įrašyti
        </Button>
      </Form>
      <Modal isOpen={showModal} toggle={() => setShowModal(!showModal)}>
        <ModalHeader toggle={() => setShowModal(!showModal)} />
        <ModalBody>
          Sėkmingai įrašyta
          <br />
          <br />
          <br />
          Paziurim
        </ModalBody>
        <ModalFooter>
          <Button color="info" tag={Link} to="/scores">
            Peržiūrėti rezultatus
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AddScore;
