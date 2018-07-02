const express = require('express');
const app = express();
const { enterRoom } = require('./util');

let location = {
  x: 0,
  y: 0
};

app.get('/', (req, res) => {
  res.send(location)
});

app.get('/:x/:y', (req, res) => {
  const result =  enterRoom({ x: Number(req.params.x), y: Number(req.params.y) })
  location = result.coord;
  message = result.message;
  console.log('Your hp is: ', result.hp);
  console.log('Your score is: ', result.score);
  res.send(message);
});

app.listen(8080, () => console.log('Your stats will show below:'));