import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Container, Card, CardTitle, CardText } from 'reactstrap';
import Spinner from './LoadingSpinner'

const Home = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true)
      const scoreRes = await axios(`/getScores?limit=3`);
      setScores(scoreRes.data);
      setLoading(false)
    };
    fetchScores();
  }, []);

  return (
    <Container>
      {loading ? <Spinner /> :
        <div>
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
        </div>}

    </Container>
  );
};

export default Home;
