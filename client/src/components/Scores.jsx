import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/lt';
import { Container, Card, CardTitle, CardText, Button } from 'reactstrap';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const fetchScores = async () => {
      const scoreRes = await axios(`/getScores?limit=${perPage}`);
      setScores(scoreRes.data);
    };
    fetchScores();
  }, [perPage]);

  const onDelete = id => {
    setScores(scores.filter(score => score._id !== id));
    axios.delete(`/deleteScore/${id}`);
  };

  return (
    <Container>
      {console.log(scores)}
      {scores.length !== 0
        ? scores.map(score => (
            <Card
              body
              outline
              color="info"
              key={score._id}
              style={{ margin: '5px 0px' }}
            >
              <CardTitle>
                <Moment style={{ float: 'left' }} fromNow>
                  {score.createdAt}
                </Moment>
                <Button
                  style={{ float: 'right' }}
                  color="danger"
                  size="sm"
                  onClick={() => onDelete(score._id)}
                >
                  &times;
                </Button>
              </CardTitle>
              {score.score1.points > score.score2.points ? (
                <CardTitle>
                  <b>{score.score1.player}</b> - {score.score2.player}
                </CardTitle>
              ) : (
                <CardTitle>
                  {score.score1.player} - <b>{score.score2.player}</b>
                </CardTitle>
              )}

              {score.score1.points > score.score2.points ? (
                <CardText>
                  <b>
                    {score.score1.team} {score.score1.points}
                  </b>{' '}
                  - {score.score2.points} {score.score2.team}
                </CardText>
              ) : (
                <CardText>
                  {score.score1.team} {score.score1.points} -{' '}
                  <b>
                    {score.score2.points} {score.score2.team}
                  </b>
                </CardText>
              )}
            </Card>
          ))
        : 'Rezultatų nėra'}
      <br />
      Įrašų:
      <br />
      <select onChange={e => setPerPage(e.target.value)}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </Container>
  );
};

export default Scores;
