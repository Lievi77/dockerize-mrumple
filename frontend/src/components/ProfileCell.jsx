import { useEffect, useState } from "react";
import axios from "axios";
import "./profile_cell.css";
import "./cell.css";
import fire_img from "./../images/fire-img.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function ProfileCell(props) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    (async () => {
      console.log("username:  " + props.username);
      let userResponse = await axios.get("/user/" + props.username);
      setUserData(userResponse.data["data"]);
      console.log(props);
    })();
  }, []);

  return (
    <Container className="grid-cell">
      <Row>
        <Col>
          <figure>
            <img
              width="80%"
              className="profile-img"
              src={userData["snoovatar_img"]}
            />
            <figcaption
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              /u/{userData["name"]}
            </figcaption>
          </figure>
        </Col>
        <Col style={{ marginTop: "25px" }}>
          <div style={{ textAlign: "center" }}>
            <span className="header"> Link Karma: </span>
            <br /> {userData["link_karma"]}{" "}
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <span className="header"> Comment Karma:</span>
            <br /> {userData["comment_karma"]}{" "}
          </div>
        </Col>
      </Row>
      <Row>
        {" "}
        <Col>
        <span className="header" id="controversy" style={{ textAlign: "left" }}>
          {" "}
          Controversy:
        </span>{" "}
        </Col>
        <Col>
          <img src={fire_img} id="fire-meter" style={{filter: "saturate(" + props.controversy/10 + ")",}}/>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileCell;
