const { Client } = require('pg');

const client = new Client();
await client.connect();


client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
    console.log('DB OK!');
    client.end();
})
