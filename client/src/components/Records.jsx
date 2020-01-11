import React, { useState, useEffect } from "react";
import {
  Container,
  Input,
  Form,
  FormGroup,
  Button,
  Collapse
} from "reactstrap";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import Spinner from "./LoadingSpinner";

const Records = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [recordType, setRecordType] = useState("Points");
  const { addToast } = useToasts();

  const types = [
    { _id: 1, name: "Points" },
    { _id: 2, name: "Rebounds" },
    { _id: 3, name: "Assists" },
    { _id: 4, name: "Steals" },
    { _id: 5, name: "Blocks" },
    { _id: 6, name: "3PT Shots Made" },
    { _id: 7, name: "Dunks" }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      const usersResult = await axios("/getUsers");
      setUsers(usersResult.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const recordsResult = await axios(`/getRecords?recordType=${recordType}`);
      setRecords(recordsResult.data);
      setLoading(false);
    };
    fetchRecords();
  }, [recordType]);

  const toggle = () => {
    setCollapse(!collapse);
  };

  const onSubmit = e => {
    e.preventDefault();

    const record = {
      user: e.target.user.value,
      player: e.target.player.value,
      recordType: e.target.type.value,
      recordValue: e.target.value.value
    };

    if (
      !record.user ||
      !record.player ||
      !record.recordType ||
      !record.recordValue
    ) {
      addToast("Neįvesta visa reikalinga informacija", {
        appearance: "error",
        autoDismiss: true
      });
    } else {
      addToast("Rekordas įvestas sėkmingai", {
        appearance: "success",
        autoDismiss: true
      });
    }
    axios.post("/addRecord", record);
  };

  const handleOnChange = async e => {
    setRecordType(e.target.value);
  };

  return (
    <Container>
      <Button color="primary" onClick={toggle}>
        Įvesti rekordą
      </Button>
      <Collapse isOpen={collapse}>
        <Container>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input type="select" name="user">
                <option value="">Vardas</option>
                {users.map(user => (
                  <option value={user.name} key={user._id}>
                    {user.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="text" name="player" placeholder="Žaidėjas" />
            </FormGroup>
            <FormGroup>
              <Input type="select" name="type">
                <option value="">Tipas</option>
                {types.map(type => (
                  <option value={type.name} key={type._id}>
                    {type.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="number" name="value" placeholder="Kiekis" />
            </FormGroup>
            <Button color="primary" type="submit">
              Įrašyti
            </Button>
          </Form>
        </Container>
      </Collapse>
      <Container>
        <h5>Rekordai</h5>
        <FormGroup>
          <Input type="select" onChange={handleOnChange}>
            {types.map(type => (
              <option value={type.name} key={type._id}>
                {type.name}
              </option>
            ))}
          </Input>
        </FormGroup>
        {loading ? (
          <Spinner />
        ) : (
          <div className="records">
            {records.map(record => (
              <div key={record._id} className="single-record">
                <div className="records-user">{record.user}</div>
                <div className="records-player">{record.player}</div>
                <div className="records-value">{record.recordValue}</div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Container>
  );
};

export default Records;
