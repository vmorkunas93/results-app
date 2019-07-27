import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Container, Card, CardTitle, CardText } from 'reactstrap';

const Home = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scoreRes = await axios(`/getScores?limit=3`);
      setScores(scoreRes.data);
    };
    fetchScores();
  }, []);

  return (
    <Container>
      <h3>Sveiki atvykę</h3>
      {scores.map(score => (
        <Card
          body
          outline
          color="info"
          key={score._id}
          style={{ margin: '5px auto' }}
        >
          <CardTitle>
            <Moment style={{ float: 'right' }} fromNow>
              {score.createdAt}
            </Moment>
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
      ))}
    </Container>
  );
};

export default Home;
