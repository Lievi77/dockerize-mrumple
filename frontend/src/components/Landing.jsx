import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

function Landing() {
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // Put username in url.
    navigate("dashboard?username=" + username);
  }

  return (
    <div>
      <div className="center">
        <div className="banner">
          <h1>Reddit Analyzer </h1>
          <h2>Enter your username below</h2>
        </div>
        <form>
          <label className="search-box">
            u/
            <input
              className="search-input"
              type="search"
              placeholder="username"
              autoFocus
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />{" "}
            <br />
            &nbsp;&nbsp;&nbsp;
            <button
              className="search-button"
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
            </button>
          </label>
        </form>
      </div>
      <div className="center">
        <p className="acknowledgment">
          Brought to you by Sammy, Andrew, and Lev &#9825;
        </p>
      </div>
    </div>
  );
}

export default Landing;
