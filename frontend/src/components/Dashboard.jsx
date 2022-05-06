import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProfileCell from "./ProfileCell";
import RatingCell from "./RatingCell";
import SentimentCell from "./SentimentCell";
import GraphCell from "./GraphCell";
import Header from "./Header";
import WordcloudCell from "./WordcloudCell"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  const [searchParams, _setSearchParams] = useSearchParams();

  let username = searchParams.get("username");

  const [controversy, setControversy] = useState(0);
  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingBar, setLoadingBar] = useState(true);
  useEffect(() => {
    (async () => {

        let userResponse = await axios.get("/user/" + username);
        let activityResponse = await axios.get("/user/" + username + "/activity");

        setControversy(userResponse.data.extra);
        setLoading(false);

    })();
    (async () => {

        let activityResponse = await axios.get("/user/" + username + "/activity");

        setActivity(activityResponse.data);

        setLoadingBar(false);

    })();
  }, []);


  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col xs={4}>
            {loading ? (<Container className="grid-cell"> <h2 id="center">Loading Profile</h2> </Container>) : (<ProfileCell username={username} controversy={controversy.controversy_rating}/>)}
          </Col>
          <Col>
            <WordcloudCell username={username} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={4}>
            <RatingCell username={username} />
          </Col>
          <Col>
          {loading ? (<Container className="grid-cell"> <h2 id="center">Loading Subreddits...</h2> </Container>) : (<GraphCell username={username} type={"pie"} subreddits={controversy.subreddits}/>)}
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={4}>
            {loading ? (<Container className="grid-cell"> <h2 id="center">Loading Comments...</h2> </Container>) : (<SentimentCell username={username} most_pos={controversy.most_pos_post} most_pos_link={controversy.most_pos_link} most_neg={controversy.least_pos_post} most_neg_link={controversy.least_pos_link}/>)}
          </Col>
          <Col>
          {loadingBar ? (<Container className="grid-cell"> <h2 id="center">Loading Activity Graph...</h2> </Container>) : (<GraphCell username={username} type={"line"} activity={activity}/>) }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
