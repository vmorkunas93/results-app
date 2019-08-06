import React, { useState, useEffect } from 'react';
import axios from 'axios';
<<<<<<< HEAD
=======
import Select from 'react-select';
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
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
<<<<<<< HEAD
      team: e.target.team1.options[e.target.team1.selectedIndex].text,
      logo: e.target.team1.value,
=======
      team: e.target.team1.value,
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
      points: e.target.team1score.value
    };

    const score2 = {
      player: e.target.user2.value,
<<<<<<< HEAD
      team: e.target.team2.options[e.target.team2.selectedIndex].text,
      logo: e.target.team2.value,
=======
      team: e.target.team2.value,
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
      points: e.target.team2score.value
    };

    const score = { score1, score2 };
<<<<<<< HEAD

=======
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
    axios.post('/addScore', score);
    setShowModal(true);
  };

<<<<<<< HEAD
=======
  let teamOptions = [];
  let userOptions = [];

  teams.forEach((team, index) => {
    teamOptions[index] = { value: team.teamName, label: team.teamName };
  });

  users.forEach((user, index) => {
    userOptions[index] = { value: user.name, label: user.name };
  });

>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Pirmas žaidėjas</Label>
        </FormGroup>
        <FormGroup>
<<<<<<< HEAD
          <Input type="select" name="user1" >
            <option value="">Vardas</option>
            {users.map(user =>
              <option value={user.name} key={user._id}>
                {user.name}
              </option>
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select" name="team1">
            <option value="">Komanda</option>
            {teams.map(team =>
              <option value={team.logo} key={team._id}>
                {team.teamName}
              </option>
            )}
          </Input>
=======
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
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
        </FormGroup>
        <FormGroup>
          <Input type="number" name="team1score" placeholder="Taškai" />
        </FormGroup>
        <FormGroup>
          <Label>Antras žaidėjas</Label>
        </FormGroup>
        <FormGroup>
<<<<<<< HEAD
          <Input type="select" name="user2" >
            <option value="">Vardas</option>
            {users.map(user =>
              <option value={user.name} key={user._id}>
                {user.name}
              </option>
            )}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select" name="team2" >
            <option value="">Komanda</option>
            {teams.map(team =>
              <option value={team.logo} key={team._id}>
                {team.teamName}
              </option>
            )}
          </Input>
=======
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
>>>>>>> c2e698ffebe04754d1dbc65ad88909f62382c22f
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
        <ModalBody>Rezultatas sėkmingai įrašytas</ModalBody>
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
