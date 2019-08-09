import React, { useState, useEffect } from 'react'
import { Container, Input, Form, FormGroup, Button, Collapse } from 'reactstrap'
import axios from 'axios'

const Records = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([])
  // const [loading, setLoading] = useState(false)
  const [collapse, setCollapse] = useState(false)

  const types = [
    { _id: 1, name: 'Points' },
    { _id: 2, name: 'Rebounds' },
    { _id: 3, name: 'Assists' },
    { _id: 4, name: 'Steals' },
    { _id: 5, name: 'Blocks' },
    { _id: 6, name: '3PT Shots Made' },
    { _id: 7, name: 'Dunks' }
  ]

  useEffect(() => {
    const fetchStats = async () => {
      // setLoading(true)
      const usersResult = await axios('/getUsers');
      const recordsResult = await axios('/getRecords')
      setUsers(usersResult.data);
      setRecords(recordsResult.data)
      // setLoading(false)
    };
    fetchStats();
  }, [records]);

  const toggle = () => {
    setCollapse(!collapse)
  }

  const onSubmit = e => {
    e.preventDefault()

    const record = {
      user: e.target.user.value,
      player: e.target.player.value,
      recordType: e.target.type.value,
      recordValue: e.target.value.value
    }
    console.log(record)
    axios.post('/addRecord', record);
  }

  return (
    <Container>
      <Button color="info" onClick={toggle}>Įvesti rekordą</Button>
      <Collapse isOpen={collapse}>
        <Container>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input type="select" name="user">
                <option value="">Vardas</option>
                {users.map(user =>
                  <option value={user.name} key={user._id}>
                    {user.name}
                  </option>
                )}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="text" name="player" placeholder="Žaidėjas" />
            </FormGroup>
            <FormGroup>
              <Input type="select" name="type">
                <option value="">Tipas</option>
                {types.map(type =>
                  <option value={type.name} key={type._id}>
                    {type.name}
                  </option>
                )}
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="number" name="value" placeholder="Kiek" />
            </FormGroup>
            <Button color="info" type="submit">
              Įrašyti
        </Button>
          </Form>
        </Container>
      </Collapse>
      <Container>
        <h5>Rekordai</h5>
        {records.map(record => <div key={record._id}>{record.user} - {record.player} - {record.recordType} - {record.recordValue}</div>)}
      </Container>
    </Container>
  )
}

export default Records
