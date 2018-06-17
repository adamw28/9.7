var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);
var pickRock = document.getElementById('js-playerPick_rock'),
     pickPaper = document.getElementById('js-playerPick_paper'),
     pickScissors = document.getElementById('js-playerPick_scissors');
     pickLizard = document.getElementById('js-playerPick_lizard');
     pickSpock = document.getElementById('js-playerPick_spock');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
pickLizard.addEventListener('click', function() { playerPick('lizard') });
pickSpock.addEventListener('click', function() { playerPick('spock') });

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    return possiblePicks[Math.floor(Math.random()*5)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');
    winnerIs = '';

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  	winnerIs='player';
    if (playerPick == computerPick) {
        winnerIs = 'none'; // remis
        playerResultElem.innerHTML = computerResultElem.innerHTML = winnerIs;
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ||
        (computerPick == 'rock' && playerPick == 'lizard') ||
        (computerPick == 'lizard' && playerPick =='spock' ) ||
        (computerPick == 'spock' && playerPick == 'scissors') ||
    	(computerPick == 'scissors' && playerPick == 'lizard') || 
    	(computerPick == 'lizard' && playerPick == 'paper') ||
    	(computerPick == 'paper' && playerPick == 'spock') ||
    	(computerPick == 'spock' && playerPick == 'rock')) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerText = "Win!";
        computerResultElem.innerHTML = "Lose!"
        player.score++;
        setGamePoints();
    } else if (winnerIs == 'computer') {
    	playerResultElem.innerHTML = "Lose!"
        computerResultElem.innerHTML = "Win!";
        computer.score++;
        setGamePoints();
    }
}

function setGamePoints(){
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerText = computer.score;
	setTimeout(gameOver,100);
}

function gameOver(){
	if(player.score==10 || computer.score==10){
		alert('Winner is '+winnerIs);
		gameState='ended';
		setGameElements();
	}
}