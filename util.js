let hp = 5;
let score = 0;
const visitedRooms = [{ x:0, y:0 } ];

const navigate = ({ direction }, location) => {
  direction = direction.toLowerCase()
  switch (direction) {
    case 'north': 
      location.y ++
      break;
    case 'south': 
      location.y --
      break;
    case 'east': 
      location.x ++
      break;
    case 'west': 
      location.x --
      break;
  }
  return location;
};

const getRoomValue = () => {
  const outcome = Math.round((Math.random()));
  if (outcome === 0) {
    hp -= 1;
    let msg = 'You have encountered a monster and fought bravely! MONSTER!'
    return hp === 0 ? exitGame() : msg
  } else {
    score +=1;
    return 'Traveller, you have discovered some gold! GOLD!';
  }
};

const enterRoom = (coord)  => {
  const unVisited = visitedRooms.every(room => {
    return room.x !== coord.x || room.y !== coord.y
  });

  if(!unVisited) {
    return { 
      hp,
      score, 
      coord,
      message: 'You have been here before fellow traveller!',
    };
  } 
  visitedRooms.push(coord)
  return { 
    hp, 
    score,
    coord, 
    message: getRoomValue(),
  }
};

const exitGame = () => {
  return `GAMEOVER! You fought a monster, but have heroically sacrificed, your score is ${score}`
};

module.exports = {
  navigate: navigate,
  enterRoom: enterRoom,
  exitGame: exitGame
};