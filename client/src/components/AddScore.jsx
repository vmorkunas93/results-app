import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useToasts } from "react-toast-notifications";

const AddScore = () => {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [edition, setEdition] = useState("");
  const { addToast } = useToasts();

  useEffect(() => {
    const fetchData = async () => {
      const teamsResult = await axios("/getTeams");
      const usersResult = await axios("/getUsers");
      setTeams(teamsResult.data);
      setUsers(usersResult.data);
    };
    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const score1 = {
      player: e.target.user1.value,
      team: e.target.team1.options[e.target.team1.selectedIndex].text,
      logo: e.target.team1.value,
      points: e.target.team1score.value,
    };

    const score2 = {
      player: e.target.user2.value,
      team: e.target.team2.options[e.target.team2.selectedIndex].text,
      logo: e.target.team2.value,
      points: e.target.team2score.value,
    };

    const score = { edition, score1, score2 };

    if (
      !edition ||
      !score1.player ||
      !score1.team ||
      !score1.logo ||
      !score1.points ||
      !score2.player ||
      !score2.team ||
      !score2.logo ||
      !score2.points
    ) {
      addToast("Enter all required information", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      axios.post("/addScore", score);
      addToast("Score added successfully", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Input
            type="select"
            name="edition"
            onChange={(e) => setEdition(e.target.value)}
          >
            <option value="">2K Edition</option>
            <option value="2k19">2K19</option>
            <option value="2k20">2K20</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>First player</Label>
        </FormGroup>
        <FormGroup>
          <Input type="select" name="user1">
            <option value="">Name</option>
            {users.map((user) => (
              <option value={user.name} key={user._id}>
                {user.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select" name="team1">
            <option value="">Team</option>
            {teams.map((team) => (
              <option value={team.logo} key={team._id}>
                {team.teamName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="number" name="team1score" placeholder="Points" />
        </FormGroup>
        <FormGroup>
          <Label>Second player</Label>
        </FormGroup>
        <FormGroup>
          <Input type="select" name="user2">
            <option value="">Name</option>
            {users.map((user) => (
              <option value={user.name} key={user._id}>
                {user.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="select" name="team2">
            <option value="">Team</option>
            {teams.map((team) => (
              <option value={team.logo} key={team._id}>
                {team.teamName}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input type="number" name="team2score" placeholder="Points" />
        </FormGroup>
        <Button color="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddScore;
