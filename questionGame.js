const readline = require('readline');
const loq = require('./list-of-questions.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const HIGH_DIFFICULTY = 0;
const MID_DIFFICULTY = 1;
const LOW_DIFFICULTY = 2;


function myRandom(lowerBound, upperBound) {
	return Math.floor(Math.random() * ((upperBound+1) - lowerBound));
}


const questionsAsked = {};
const questionsAlreadyAsked = (index) => questionsAsked[index] = true;
const checkIfWasAsked = (index) => questionsAsked[index] !== undefined;

const isNumber = (str) => str !== null && isFinite(parseInt(str));

function askDifficulty(cb) {
	const myQuestion = `Elegí la dificultad: \n1.Baja, \n2.Media, \n3.Alta\nSelección: `;

	rl.question(myQuestion, (ans) => {
		switch(ans) {
			case '1':
				cb(LOW_DIFFICULTY);
				break;
			case '2':
				cb(MID_DIFFICULTY);
				break;
			case '3':
				cb(HIGH_DIFFICULTY);
				break;
		}
	});
}

const state = [];
let counter = 0;

function nextQuestion(difficulty) {
	let nextIndex;
	let currQuestion;

	do  {
		nextIndex = myRandom(0, (loq.listOfQuestions.length - 1));
		currQuestion = loq.listOfQuestions[nextIndex];
	} while (checkIfWasAsked(nextIndex) || (difficulty !== currQuestion.difficulty));

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
	for (key of state){
		if(key.correct === true) {
			count ++;
		}
	}
	return count;
}

function askQuestions(difficulty) {
	//Es preferible guardar esta data en un objeto?
	const indexQuestion = nextQuestion(difficulty);

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

				askQuestions(difficulty);
			} else {
				console.log('Invalid Answer');
				rl.close();
			}
		});
	}  else {
		const correctAnswers = getAmountOfCorrectAnswers();
		console.log(`Acertaste ${correctAnswers} respuestas`);
		rl.close();
	}


}

askDifficulty((difficulty) => {
	askQuestions(difficulty);
});


// function startGame(){
// 	askQuestions();
// }

// startGame();
