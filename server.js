const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const api = require('./server/routes/api');


//parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//set port
const port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);

//server.listen(port,()=>console.log('Running on localhost : ${port}'));
server.listen(port, () => console.log('Running on localhost : ', port));
