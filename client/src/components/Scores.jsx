import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
// import "moment/locale/lt";
import {
  Container,
  Card,
  CardTitle,
  Button,
  Collapse,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Spinner from "./LoadingSpinner";
import AddScore from "./AddScore";

const Scores = () => {
  const [scores, setScores] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      const scoreRes = await axios(`/getScores?limit=${perPage}`);
      setScores(scoreRes.data);
      setLoading(false);
    };
    fetchScores();
  }, [perPage]);

  // const onDelete = id => {
  //   setScores(scores.filter(score => score._id !== id));
  //   axios.delete(`/deleteScore/${id}`);
  // };

  const toggle = () => {
    setCollapse(!collapse);
  };

  return (
    <Container>
      <Button color="primary" onClick={toggle}>
        Add New Score
      </Button>
      <Collapse isOpen={collapse}>
        <AddScore />
      </Collapse>
      <FormGroup className="perPage">
        <Label>Scores per page:</Label>
        <Input type="select" onChange={e => setPerPage(e.target.value)}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="1000">All</option>
        </Input>
      </FormGroup>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {scores.length !== 0
            ? scores.map(score => (
                <Card body outline color="primary" key={score._id}>
                  <CardTitle>
                    <Moment style={{ float: "right" }} fromNow>
                      {score.createdAt}
                    </Moment>
                    {/* <Button
                style={{ float: 'right' }}
                color="danger"
                size="sm"
                onClick={() => onDelete(score._id)}
              >
                &times;
              </Button> */}
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
                    <div className="scores-wrapper">
                      <div className="single-score">
                        <img
                          src={score.score1.logo}
                          alt="team-logo"
                          className="team-logo"
                        />
                        <div>
                          <b>{score.score1.team}</b>
                        </div>
                        <div>
                          <b>{score.score1.points}</b>
                        </div>
                      </div>
                      <div className="single-score">
                        <img
                          src={score.score2.logo}
                          alt="team-logo"
                          className="team-logo"
                        />
                        <div>{score.score2.team}</div>
                        <div>{score.score2.points}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="scores-wrapper">
                      <div className="single-score">
                        <img
                          src={score.score1.logo}
                          alt="team-logo"
                          className="team-logo"
                        />
                        <div>{score.score1.team}</div>
                        <div>{score.score1.points}</div>
                      </div>
                      <div className="single-score">
                        <img
                          src={score.score2.logo}
                          alt="team-logo"
                          className="team-logo"
                        />
                        <div>
                          <b>{score.score2.team}</b>
                        </div>
                        <div>
                          <b>{score.score2.points}</b>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              ))
            : "No scores to show"}
        </React.Fragment>
      )}
    </Container>
  );
};

export default Scores;
