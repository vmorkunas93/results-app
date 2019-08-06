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
      <h5>Paskutiniai rezultatai</h5>
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
              <img src={score.score1.logo} alt="team-logo" className="team-logo" /> <b>
                {score.score1.team} {score.score1.points}
              </b>{' '}
              - {score.score2.points} {score.score2.team}<img src={score.score2.logo} alt="team-logo" className="team-logo" />
            </CardText>
          ) : (
              <CardText>
                <img src={score.score1.logo} alt="team-logo" className="team-logo" /> {score.score1.team} {score.score1.points} -{' '}
                <b>
                  {score.score2.points} {score.score2.team}
                </b><img src={score.score2.logo} alt="team-logo" className="team-logo" />
              </CardText>
            )}
        </Card>
      ))}
    </Container>
  );
};

export default Home;
