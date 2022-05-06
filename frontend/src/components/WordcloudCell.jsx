import "./cell.css";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import ReactWordcloud from 'react-wordcloud';
import axios from "axios";

function WordcloudCell(props) {
        const [words, setWords] = useState([]);
        const [loading, setLoading] = useState(true);
        const options = {rotations: 0, scale: "sqrt", fontSizes: [10,60]};
        useEffect(() => {
            (async () => {
              if (loading) {
                let wordcloud = await axios.get("/user/" + props.username + "/wordcloud");


                setWords(wordcloud.data);
                setLoading(false);
            }
            })();
        }, [props, words]);



        return (<Container className="grid-cell">
        <div>
            {loading ? (<h3 id="center">Loading Word Cloud...</h3>) : (<ReactWordcloud words={words} options={options}/>)}
        </div>
        </Container>);

}

export default WordcloudCell;
