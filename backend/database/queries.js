//We will connect using a pool of connections
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "lguzm038",
  host: "web0.eecs.uottawa.ca",
  database: "lguzm038",
  //DO NOT DOXX ME - Lev
  password: "Kyorzkyre77!",
  port: 15432,
});

//Select appropriate schema upon connection
pool.on("connect", (client) => {
  client.query(`SET search_path TO 'sal-project', public`);
});

//simple request
const getAverageRating = (request, response) => {

  const query = `SELECT avg(rating)::integer FROM RATING WHERE username='${request.params.username}';`;


  pool.query(query,(error, results) => {

    if(error){
      throw error;
    }
    //returns a single row with a single column called average

    const avgResult = results.rows[0].avg;

    if(avgResult === undefined){
      avgResult = 0;
    }

    response.status(200).json(avgResult);

  })

};

const postRating = (req, res) => {

  const username = req.params.username;
  //You can access the ? arguments via req.query
  const rating = req.query.rating;
  const comment = req.query.comment;
  


  const query = `INSERT INTO rating(username, rating, comment) VALUES ('${username}',${rating}, '${comment}');`

  pool.query(query, (err, result) => {

    if(err){
      throw err;
    }
    res.send({message:"Upload Successful"});
  });
}

module.exports = {
  getAverageRating,
  postRating,
};

