import { useEffect, useState } from "react";
import axios from "axios";
import "./cell.css";
import "./sentiment_cell.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SentimentCell(props) {
  const [userData, setUserData] = useState({});
  const MAX_LENGTH = 200;
  let most_pos = props.most_pos;
  let most_neg = props.most_neg;
  if(most_pos.length > MAX_LENGTH) {
    most_pos = most_pos.slice(0,MAX_LENGTH) + "...";
  }

  if(most_neg.length > MAX_LENGTH) {
    most_neg = most_neg.slice(0,MAX_LENGTH) + "...";
  }
  useEffect(() => {
    (async () => {
      let userResponse = await axios.get("/user/spez");
      setUserData(userResponse.data["data"]);

    })();
  }, []);

  return (
    <Container className="grid-cell">
      <Row>
        <div className="header">Most Positive Post:</div>
        <div style={{ fontSize: "20px" }}><a target="_blank" href={props.most_pos_link} id="normLink">{most_pos}</a></div>
      </Row>
      <Row>
        <div className="header">Most Negative Post:</div>
        <div style={{ fontSize: "20px" }}><a target="_blank" href={props.most_neg_link} id="normLink">{most_neg}</a></div>
      </Row>
    </Container>
  );
}

export default SentimentCell;
