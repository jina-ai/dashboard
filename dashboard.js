const express = require('express')
const path = require('path');
const app = express();
const http = require('http').Server(app);

const PORT = 3030;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

http.listen(PORT, () => console.log('Dashboard is served on port', PORT));