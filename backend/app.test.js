//Testing database queries
test("GET /ratings Retrieve all ratings from database", async  () => {

    //We will connect using a pool of connections
    const Pool = require('pg').Pool;
    const pool = new Pool({
        user: "lguzm038",
        host: "web0.eecs.uottawa.ca",
        database: "lguzm038",
        //DO NOT DOXX ME - Lev
        password : "Kyorzkyre77!",
        max: 1,
        port: 15432,
        idleTimeoutMillis: 1
    });
    //Select appropriate schema upon connection
    pool.on('connect', (client) => {
        client.query(`SET search_path TO 'sal-project', public`);
    });

    //query data
    const {rows} = await pool.query("SELECT * FROM rating")


    expect(rows[0]["username"]).toBe("PedroThePanda");


})