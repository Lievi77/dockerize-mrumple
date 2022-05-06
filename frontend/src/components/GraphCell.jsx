import "./cell.css";
import Plot from 'react-plotly.js';
import Container from "react-bootstrap/Container";


function GraphCell(props) {
    if (props.type === "pie") {
        let values = [];
        let labels = [];
        var total = 0;
        for(var sub in props.subreddits) {
            labels.push(sub);
            total += props.subreddits[sub];
            values.push(props.subreddits[sub]);
        }
        for(var i =0; i < values.length; i++) {
            values[i] /= total;
            values[i] *= 100;
        }
        var data = [{
          values: values,
          labels: labels,
          type: 'pie'
        }];

        var layout = {
          height: 400,
          width: 500,
          plot_bgcolor:"rgba(0,0,0,0)",
          paper_bgcolor: "rgba(0,0,0,0)"
        };

        var title = "Most Visited Subreddits"
        return (
            <Container className="grid-cell">
             <h3>{title}</h3>
                <Plot
                    data={data}
                    layout={layout}
                />
            </Container>
        );
    } else if (props.type === "line"){
        const activity = props.activity["2022"];
        const y_data = new Array(activity.length);
        for(const [key, value] of Object.entries(activity)) {
            y_data[parseInt(key)] = value;
        }
        for(let i = 0; i < activity.length; i++) {
            if(y_data[i] == null) {
                y_data[i] = 0;
            }
        }

        const data = [{
           x: ["Jan", "Feb", "March", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].slice(activity.length),
           y: y_data,
           type: "bar"
       }];




       const layout = {
           height: 400,
           width: 550,
           showlegend: false,
           plot_bgcolor:"rgba(0,0,0,0)",
           paper_bgcolor: "rgba(0,0,0,0)",
           yaxis: {
               title: 'Comment Score'
           }
       };

       var title = "User Comment Activity In 2022";

       return (
           <Container className="grid-cell">
            <h3>{title}</h3>
               <Plot
                   data={data}
                   layout={layout}
               />
           </Container>
       );


    }


}

export default GraphCell;
