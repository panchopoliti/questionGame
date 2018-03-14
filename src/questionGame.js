const readline = require('readline');
const loq = require('./list-of-questions.js');
const constants = require('./constants.js');
const fn = require('./general-functions.js');
const get = require('./gets-functions.js');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const log = console.log;
const colour = constants.colours;

const questionsAsked = [];
const playersPlaying = [];
const questionsAlreadyAsked = (index) => questionsAsked.push(index);
const checkIfWasAsked = (index) => questionsAsked.includes(index);

const isNumber = (str) => str !== null && isFinite(parseInt(str));

function askHowManyAreGoingToPlay(cb) {
  const numberPlayers = get.getHowManyPlayersString();
  const myQuestion = `\n${colour.blueBold('¿Cuántos van a jugar?:')} \n${numberPlayers}\n${colour.green('Selección: ')}`;

  rl.question(myQuestion, (ans) => {
    const playersArr = constants.numberOfPlayers;
    if (playersArr.includes(+ans)) {
      cb(+ans);
    } else {
      log(colour.wrongRed('Ese caracter no está permitido. Elegí otra vez dentro de las posibilidades en pantalla'));
      askHowManyAreGoingToPlay(cb);
    }
  });
}

function askPlayer(numberPlayers, cb) {
  const players = get.getPlayersString(playersPlaying);
  const firstPartOfQuestion = `\n${colour.yellow(`Jugador ${playersPlaying.length + 1}:`)}\nSi sos invitado, presiona 1, sino, ingresá tu usuario.\n`;
  const clarificationNote = `(Si queres visualizar los posibles Usuarios, presioná 0)\n`;
  const selection = `\n${colour.green('Selección: ')}`;
  const myQuestion = `${firstPartOfQuestion}${clarificationNote}${selection}`;

  rl.question(myQuestion, (ans) => {
    const possiblePlayersId = Object.values(constants.players_id);

    if(+ans === 0) {
      log(`${players}`);
      askPlayer(numberPlayers, cb)
    }
    if (isNaN(+ans)) {
      const answer = constants.players_id[ans.toUpperCase()];
      if (playersPlaying.includes(answer)) {
        log(`Jugador ya elegido. Intentá de nuevo con las siguientes opciones\n \n ${players}`);
        return askPlayer(numberPlayers, cb);
      }
      if (answer === undefined) {
        log(colour.wrongRed('Comando inválido. Intentá de nuevo'));
        askPlayer(numberPlayers, cb);
      } else {
        log(`Jugador ${playersPlaying.length + 1} es ${ans.toUpperCase()}`);
        playersPlaying.push(answer);
      }
    } else if (possiblePlayersId.includes(+ans)) {
      if (+ans < 11) {
        const nextGuest = fn.closestEmptyNumber(playersPlaying);
        log(`Jugador ${playersPlaying.length + 1} es ${fn.getKeyOfValue(constants.players_id, nextGuest)}`);
        playersPlaying.push(nextGuest);
      } else if (playersPlaying.includes(+ans)) {
        log(`Jugador ya elegido. Intentá de nuevo con las siguientes opciones\n \n ${players}`);
        return askPlayer(numberPlayers, cb);
      } else {
        log(`Jugador ${playersPlaying.length + 1} es ${fn.getKeyOfValue(constants.players_id, +ans)}`);
        playersPlaying.push(+ans);
      }
    } else {
      log(colour.wrongRed('Comando inválido. Intentá de nuevo'));
      askPlayer(numberPlayers, cb);
    }
    if (playersPlaying.length === numberPlayers) {
      cb(+ans);
    } else {
      askPlayer(numberPlayers, cb);
    }
  });
}

function askDifficulty(cb) {
	const myQuestion = `\nElegí la dificultad: \n1.Baja \n2.Media \n3.Alta\n\n${colour.green('Selección: ')} `;

	rl.question(myQuestion, (ans) => {
	  const diffObject = constants.difficulty;
	  if (Object.values(diffObject).includes(+ans)) {
	    const chosenDifficulty = (+ans === 1) ? 'Baja' :
        (+ans === 2) ? 'Media' : 'Alta';
	    log(`\nDificultad Elegida: ${colour.orange(chosenDifficulty)} `);
	    cb(+ans);
    } else {
	    log(colour.wrongRed('Comando inválido. Intentá de nuevo'));
	    askDifficulty(cb);
    }
	});
}

function nextQuestion(difficulty, player) {
	let nextIndex;
	let currQuestion;

	do  {
		nextIndex = fn.getRandomInt(loq.listOfQuestions.length - 1);
		currQuestion = loq.listOfQuestions[nextIndex];
	} while (checkIfWasAsked(nextIndex) || (difficulty !== currQuestion.difficulty) || player === currQuestion.creator);

	return nextIndex;
}

function checkCommandValidationInQuiz(questionAnswersArr, playerAnswer) {
  if (!isNumber(playerAnswer)) {
    return false;
  }
  const numberPlayerAnswer = parseInt(playerAnswer);
  return (numberPlayerAnswer <= questionAnswersArr.length && numberPlayerAnswer >= 1)
}

function determineWinnerOfGame() {
  const correctAnswersObj = get.getAmountOfCorrectAnswersPerPlayer(state);
  const correctAnswersPerPlayer = Object.values(correctAnswersObj);

  let result = 0;
  for (let i = 0; i < correctAnswersPerPlayer.length; i++) {
    result = (correctAnswersPerPlayer[i] > result) ? correctAnswersPerPlayer[i] : result;
  }

  if (fn.isDuplicate(correctAnswersPerPlayer, result) || result === 0) {
    log('Hay un Empate');
  } else {
    const playerId = Object.keys(correctAnswersObj)[correctAnswersPerPlayer.indexOf(result)];
    const playerName = Object.keys(constants.players_id)[Object.values(constants.players_id).indexOf(+playerId)];
    log(`El ganador es ${playerName}`)
  }
}

const playerTurns = {};

function compareAmountOfTurns() {
  const turnsArr = Object.values(playerTurns);

  for (let i = 1; i < turnsArr.length; i++) {

    if (turnsArr[i - 1] > turnsArr[i]) {
      const playerId = +Object.keys(playerTurns)[turnsArr.indexOf(turnsArr[i])];
      return playerId;
    }
  }
  return +Object.keys(playerTurns)[0];
}

function pickPlayerTurn() {

  for (const player of playersPlaying) {
    if (playerTurns[player] === undefined) {
      countPlayersTurns(player);
      return player;
    }
  }
  const player = compareAmountOfTurns();
  countPlayersTurns(player);
  return player;
}

function countPlayersTurns(playerId) {
  if (playerTurns[playerId] !== undefined) {
    playerTurns[playerId]++;
  } else {
    playerTurns[playerId] = 1;
  }
  return playerId;
}

const state = [];
let counter = 0;

function askQuestions(difficulty, indexQuest = null, prevPlayer = null) {
  let indexQuestion;
  let player;

  if (indexQuest !== null) {
    indexQuestion = indexQuest;
    player = prevPlayer;
  } else {
    player = pickPlayerTurn();
    indexQuestion = nextQuestion(difficulty, player);
    questionsAlreadyAsked(indexQuestion);
  }

  const playerName = Object.keys(constants.players_id)[Object.values(constants.players_id).indexOf(player)];
  const currQuestionObject = loq.listOfQuestions[indexQuestion];
	let currQuestion = currQuestionObject.question;

	let userInput = `\nTURNO DE ${playerName}\n${currQuestion} ${get.getOptionsString(currQuestionObject)}${colour.green('Respuesta: ')}`;


	if (counter < constants.numberOfQuestionsPerPlayer * playersPlaying.length) {
		rl.question(userInput, (ans) => {
      if (checkCommandValidationInQuiz(loq.listOfQuestions[indexQuestion].answers, ans)) {
        const answer = parseInt(ans);

        state[counter] = {
          answer,
          question: indexQuestion,
          correct: (answer - 1) === currQuestionObject.correct,
          playerId: player,
        };

        if (state[counter].correct) {
          log('Tu respuesta es correcta\n');
      } else {
          log(`${colour.wrongRed('Tu respuesta es incorrecta.')} La opción correcta es ${currQuestionObject.answers[currQuestionObject.correct]}\n`);
        }

				counter++;
        askQuestions(difficulty);
			} else {
				log(colour.wrongRed('Respuesta Inválida. Intentá de nuevo'));
        askQuestions(difficulty, indexQuestion, player);
			}
		});
	} else {
	  if (playersPlaying.length !== 1) {
      determineWinnerOfGame();
    }
    const correctAnswersObj = get.getAmountOfCorrectAnswersPerPlayer(state);
		for (let i = 0; i < playersPlaying.length; i++) {
      const playerName = fn.getKeyOfValue(constants.players_id, playersPlaying[i]);
      const quantityOfCorrectAnswers = correctAnswersObj[playersPlaying[i]];
      if (quantityOfCorrectAnswers === undefined){
        log(`${playerName}: No Acertaste respuestas`);
      } else {
        log(`${playerName}: Acertaste ${quantityOfCorrectAnswers} respuestas`);
      }
    }
		rl.close();
	}


}
function startGame() {
  askHowManyAreGoingToPlay( (numberPlayers) => {
    askPlayer( numberPlayers, () => {
      askDifficulty( (difficulty) => {
        askQuestions(difficulty);
      });
    });
  });
}

startGame();
