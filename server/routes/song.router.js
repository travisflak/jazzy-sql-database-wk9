const express = require('express');
const router = express.Router();

const pg = require('pg');
// Setup PG to connect to DB
const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_ajax', // the name of database, This can change!
    host: 'localhost',// where is your database?
    port: 5432,// the port for your database, 5432 is default for postgres
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect - otherwise cancel
});
pool.on('connect', () => {
    console.log("Postgresql Connected");
} );
pool.on('error', (error) => {
    console.log("error with Postgresl pool", error);
});

// static content. this will be replaced with a database table
const songListArray = [
    {
        title: 'Take Five',
        length: '2:55',
        date_released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        date_released: '1959-08-17'
    }
];

router.get( '/', ( req, res )=>{
    // console.log( '/math GET hit' );
    // res.send( history );
    let queryText = 'SELECT * FROM "songs";'
    pool.query(queryText).then((result) =>{
        console.log('results from database', result.rows);
        res.send( result.rows );
        
    });

})

// router.get('/', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songListArray);
// });

// router.post('/', (req, res) => {
    
//     res.sendStatus(201);
// });


module.exports = router;