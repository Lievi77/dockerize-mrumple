import { useEffect, useState } from "react";
import axios from "axios";
import "./rating_cell.css";
import "./cell.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import StarRating from "./StarRating";

function RatingCell(props) {
  const [inputRating, setInputRating] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const placeholderComment = "Placeholder";

  useEffect(() => {
    //get average rating to display
    (async () => {
      //Works!!!

      let ratingsResponse = await axios.get(`/avgRating/${props.username}`);
      console.log(ratingsResponse.data);
      setAvgRating(ratingsResponse.data);
    })();
  }, []);

  const onClick = (newIndex) => {
    //controls the rating input to send the server
    setInputRating(newIndex);
  };

  const submitRating = async () => {
    //sends the rating input to the backend
    //input rating is held in inputRating
    console.log("Rating to be uploaded: " + inputRating);

    let postResponse = await axios.post(
      `/uploadRating/${props.username}?rating=${inputRating}&comment=${placeholderComment}`
    );

    //Should we do an alert in case of an error?
    console.log(`Post Response ${postResponse.data.message}`);
    window.alert("Rating Submitted!");
  };
  return (
    <Container className="grid-cell">
      <Row>
        <Col>
          <span className="header"> Rate this User: </span>
        </Col>
        <Col>
          <StarRating onClick={onClick} />
        </Col>
      </Row>
      <Row style={{ padding: "20px" }}>
        <button className="submit-button" type="submit" onClick={submitRating}>
          Submit Rating
        </button>
      </Row>
      <Row>
        <Col className="header">Average Rating:</Col>
        <Col>
          {/*disable button interaction with false. Set the
          value of the stars by passing an integer to the parameter value`
      */}
          <StarRating disable={true} value={avgRating} />
        </Col>
      </Row>
    </Container>
  );
}

export default RatingCell;
