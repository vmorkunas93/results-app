import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import { useToasts } from 'react-toast-notifications'
import { Link } from 'react-router-dom';

const AddScore = () => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useToasts()

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
      team: e.target.team1.options[e.target.team1.selectedIndex].text,
      logo: e.target.team1.value,
      points: e.target.team1score.value
    };

    const score2 = {
      player: e.target.user2.value,
      team: e.target.team2.options[e.target.team2.selectedIndex].text,
      logo: e.target.team2.value,
      points: e.target.team2score.value
    };

    const score = { score1, score2 };

    if (!score1.player || !score1.team || !score1.logo || !score1.points || !score2.player || !score2.team || !score2.logo || !score2.points) {
      addToast('Neįvesta visa reikalinga informacija', { appearance: 'error', autoDismiss: true })
    } else {
      axios.post('/addScore', score);
      setShowModal(true);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Pirmas žaidėjas</Label>
        </FormGroup>
        <FormGroup>
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
        </FormGroup>
        <FormGroup>
          <Input type="number" name="team1score" placeholder="Taškai" />
        </FormGroup>
        <FormGroup>
          <Label>Antras žaidėjas</Label>
        </FormGroup>
        <FormGroup>
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
