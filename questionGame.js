const readline = require('readline');
const loq = require('./list-of-questions.js');
const constants = require('./constants.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function myRandom(lowerBound, upperBound) {
	return Math.floor(Math.random() * ((upperBound+1) - lowerBound));
}


const questionsAsked = {};
const playersPlaying = [];
const questionsAlreadyAsked = (index) => questionsAsked[index] = true;
const checkIfWasAsked = (index) => questionsAsked[index] !== undefined;

const isNumber = (str) => str !== null && isFinite(parseInt(str));

function getHowManyPlayersString() {
  let ret = '\nOpciones: \n';

  for(let i = 0; i < constants.numberOfPlayers.length; i++) {
    ret += `${i+1}. ${constants.numberOfPlayers[i]}\n`;
  }

  return ret;
}

function askHowManyAreGoingToPlay(cb) {
  const numberPlayers = getHowManyPlayersString();
  const myQuestion = `¿Cuántos van a jugar?: ${numberPlayers}\nSelección: `;

  rl.question(myQuestion, (ans) => {
    const playersArr = constants.numberOfPlayers;
    if (playersArr.includes(+ans)) {
      cb(+ans);
    } else {
      console.log('Ese caracter no está permitido. Elige otra vez dentro de las posibilidades en pantalla');
      askPlayer(cb);
    }
  });
}

function getPlayersString() {
  let ret = '\nOpciones: \n';

  for(let i = 0; i < Object.keys(constants.players_id).length; i++) {

    if (playersPlaying.includes(+Object.values(constants.players_id)[i]) && Object.values(constants.players_id)[i] !== 1) {
      continue
    }
    ret += `${i+10}. ${Object.keys(constants.players_id)[i]}\n`;
  }

  return ret;
}

function askPlayer(numberPlayers, cb) {
  const players = getPlayersString();
  const firtPartOfQuestion = `Jugador ${playersPlaying.length + 1}:\nSi sos invitado, presiona 1, sino, ingresá tu usuario.\n`;
  const clarificationNote = `(Si queres visualizar los posibles Usuarios, presioná 5)\n`;
  const selection = `Selección: `;
  const myQuestion = `${firtPartOfQuestion}${clarificationNote}${selection}`;

  rl.question(myQuestion, (ans) => {
    if(+ans === 5) {
      console.log(`${players}`);
      askPlayer(numberPlayers, cb)
    }
    const playersObject = constants.players_id;
    // if (isNaN(+ans)) {
    //   const answer = Object.keys(playersObject).indexOf(ans);
    // } else {
    //
    // }
    if (Object.values(playersObject).includes(+ans) && playersPlaying.length === numberPlayers) {
      cb(+ans);
    } else if (Object.values(playersObject).includes(+ans)) {
      playersPlaying.push(+ans);
      askPlayer(numberPlayers, cb);
    } else {
      console.log('Ese caracter no está permitido. Elige otra vez dentro de las posibilidades en pantalla');
      askPlayer(numberPlayers, cb);
    }
  });
}

function askDifficulty(cb) {
	const myQuestion = `Elegí la dificultad: \n1.Baja, \n2.Media, \n3.Alta\nSelección: `;

	rl.question(myQuestion, (ans) => {
	  const diffObject = constants.difficulty;
	  if (Object.values(diffObject).includes(+ans)) {
	    cb(+ans);
    } else {
	    console.log('Ese caracter no está permitido. Elige otra vez dentro de las posibilidades en pantalla');
	    askDifficulty(cb);
    }
	});
}

const state = [];
let counter = 0;

function nextQuestion(difficulty, player) {
	let nextIndex;
	let currQuestion;

	do  {
		nextIndex = myRandom(0, (loq.listOfQuestions.length - 1));
		currQuestion = loq.listOfQuestions[nextIndex];
	} while (checkIfWasAsked(nextIndex) || (difficulty !== currQuestion.difficulty) || player === currQuestion.creator);

	return nextIndex;
}

function getOptionsString(questionObject) {

	let ret = '\nOpciones: \n';

	for(let i = 0; i < questionObject.answers.length; i++) {
		ret += `${i+1}. ${questionObject.answers[i]}\n`;
	}

	return ret;
}

function getAmountOfCorrectAnswers() {
	let count = 0;
	for (const key of state){
		if(key.correct === true) {
			count ++;
		}
	}
	return count;
}

function askQuestions(player, difficulty, numberPlayers) {
  console.log(`JUEGAN: ${numberPlayers}`);
  const indexQuestion = nextQuestion(difficulty, player);

  questionsAlreadyAsked(indexQuestion);

	const currQuestionObject = loq.listOfQuestions[indexQuestion];

	let currQuestion = currQuestionObject.question;


	let userInput = `${currQuestion} ${getOptionsString(currQuestionObject)}Respuesta: `;


	if (counter < 5) {
		rl.question(userInput, (ans) => {
			if(isNumber(ans)) {
				const answer = parseInt(ans);

				state[counter] = {
					answer,
					question: indexQuestion,
					correct: (answer - 1) === currQuestionObject.correct
				};

				counter++;
        askQuestions(player, difficulty);
			} else {
				console.log('Respuesta Inválida');
				rl.close();
			}
		});
	}  else {
		const correctAnswers = getAmountOfCorrectAnswers();
		console.log(`Acertaste ${correctAnswers} respuestas`);
		rl.close();
	}


}
function startGame() {
  askHowManyAreGoingToPlay( (numberPlayers) => {
    askPlayer( numberPlayers, (player) => {
      askDifficulty( (difficulty) => {
        askQuestions(player, difficulty, numberPlayers);
      });
    });
  });
}

startGame();
