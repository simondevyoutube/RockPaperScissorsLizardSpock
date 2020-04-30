console.log('JavaScript Beginner Projects: Rock Paper Scissors Lizard Spock!');

window.addEventListener('DOMContentLoaded', () => {
  _Setup();
});

// The general idea here is that these represent all the possible ways to
// win for a given choice. So, for example, if you were to lookup "scissors",
// you can see that it cuts paper and decapitates lizard.
const _SHAPES = {
  scissors: {paper: 'cuts', lizard: 'decapitates'},
  paper: {rock: 'covers', spock: 'disproves'},
  rock: {lizard: 'crushes', scissors: 'crushes'},
  lizard: {spock: 'poisons', paper: 'eats'},
  spock: {scissors: 'smashes', rock: 'vaporizes'},
};

let _AIChoice = null;
let _PlayerChoice = null;
let _Score = [0, 0];


// This sets up the choices by creating elements programmatically, and then
// assigning the images to them and setting the onclick handler to handle
// player choices.
function _Setup() {
  for (const k in _SHAPES) {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const img = document.createElement('img');
    img.src = k + '.png';
    div1.id = k;
    div1.className = 'base unselected';
    div1.appendChild(img);
    div1.onclick = (e) => {
      _Select(e);
    };

    div2.id = 'ai-' + k;
    div2.className = 'base unselected';
    div2.appendChild(div1);

    document.getElementById('selection').appendChild(div2);
  }
  _UpdateScore();
}

function _UpdateScore() {
  document.getElementById('score').innerText = _Score[0] + ':' + _Score[1];
}

// This is called when a player selects one of the choices, ie. rock, paper, etc...
function _Select(evt) {
  for (const k in _SHAPES) {
    const node = document.getElementById(k);
    node.className = "base unselected";
  }
  evt.currentTarget.className = "base selected";

  _PlayerChoice = evt.currentTarget.id;

  _AIChoose(50);
}

function _AIChoose(delay) {
  for (const k in _SHAPES) {
    const node = document.getElementById(k);
    node.parentNode.className = "base unselected";
  }

  const possibleSelections = Object.keys(_SHAPES);
  const roll = Math.floor(Math.random() * possibleSelections.length);

  const choice = possibleSelections[roll];
  const node = document.getElementById(choice);
  node.parentNode.className = "base aiSelected";
  _AIChoice = choice;

  if (delay < 200) {
    setTimeout(() => {
      _AIChoose(delay + 5);
    }, delay);
  } else {
    _ResolveWinner();
  }
}

function _ResolveWinner() {
  let desc = '';
  if (_AIChoice == _PlayerChoice) {
    desc = 'Tie game.'
  } else if (_AIChoice in _SHAPES[_PlayerChoice]) {
    desc = 'Player Wins: ';
    desc += (_PlayerChoice + ' ' + _SHAPES[_PlayerChoice][_AIChoice] +
        ' ' + _AIChoice + '.');
    _Score[0] += 1;
  } else {
    desc = 'AI Wins: ';
    desc += (_AIChoice + ' ' + _SHAPES[_AIChoice][_PlayerChoice] +
        ' ' + _PlayerChoice + '.');
    _Score[1] += 1;
  }
  document.getElementById('description').innerText = desc;
  _UpdateScore();
}


function _IsWinner(player1, player2) {
  return player2 in _CHOICES[player1];
}
