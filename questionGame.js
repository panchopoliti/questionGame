const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const HIGH_DIFFICULTY = 0;
const MID_DIFFICULTY = 1;
const LOW_DIFFICULTY = 2;

const questions = [
	//Question 0 - Zero
	{
		question: '¿En cual de estos equipos no jugó Nuno Gomes? ',
		answers: [
			'Porto',
			'Blackburn Rovers',
			'Fiorentina'
		],
		correct: 0,
		difficulty: HIGH_DIFFICULTY
	},
	//Question 1 - One
	{
		question: '¿Quién ganó el Balón de Oro otorgado por la FIFA en 1992? ',
		answers: [
			'Mathias Sammer',
			'Marco Van Basten',
			'Lothar Matthaus',
			'Ruud Gullit',
		],
		correct: 1,
		difficulty: MID_DIFFICULTY
	},
	//Question 2 - Two
	{
		question: '¿Cuál de estos apodos representa al Club Atlético Platense? ',
		answers: [
			'El Bicho',
			'El Bohemio',
			'El Calamar'
		],
		correct: 2,
		difficulty: LOW_DIFFICULTY
	},
	//Question 3 - Three
	{
		question: 'Durante 12 años, Emilio Butragueño jugó para el mismo club en España. ¿Cuál era? ',
		answers: [
			'Atlético Madrid',
			'Real Madrid',
			'Barcelona'
		],
		correct: 1,
		difficulty: MID_DIFFICULTY
	},
	//Question 4 - Four
	{
		question: 'De estos equipos, ¿en cual fue el primero que jugó Zlatan Ibrahimovic ? ',
		answers: [
			'Juventus',
			'Inter',
			'Milán'
		],
		correct: 0,
		difficulty: LOW_DIFFICULTY
	},
	{
		question: 'Uno de estos jugadores, nunca ganó la Champions League. ¿Quién es? ',
		answers: [
			'Ronaldo Nazario Lima',
			'Rui Costa',
			'David Beckham',
			'Fernando Hierro',
			'John Terry',
		],
		correct: 0,
		difficulty: MID_DIFFICULTY
	},
	{
		question: 'En el Mundial de Corea-Japón 2002, Arabia Saudita fue derrotado 8-0 en su debut. ¿Quién fue el verdugo? ',
		answers: [
			'Brasil',
			'España',
			'Alemania',
			'Francia',
		],
		correct: 2,
		difficulty: MID_DIFFICULTY
	},
	{
		question: 'En Irlanda, desde 1922 que el fútbol es profesional. ¿Quién es el que mayor cantidad de veces fue campeón de la Liga? ',
		answers: [
			'Shelbourne',
			'Shamrock Rovers',
			'St Patrick\'s Athletic',
		],
		correct: 1,
		difficulty: HIGH_DIFFICULTY
	},
	{
		question: '¿Quién ganó el mundial de fútbol de 1954? ',
		answers: [
			'Brasil',
			'Alemania',
			'Italia'
		],
		correct: 1,
		difficulty: LOW_DIFFICULTY
	},
	{
		question: '¿Quién fue subcampeón de Inglaterra en el Mundial 1966? ',
		answers: [
			'Alemania',
			'Portugal',
			'Unión Soviética',
		],
		correct: 0,
		difficulty: MID_DIFFICULTY
	},
	{
		question: 'En la final de la Champions League del 2005, ¿quiénes metieron los goles del Liverpool? ',
		answers: [
			'Baros - Kewell - Carragher',
			'Gerrard - Kewell - Finnan',
			'Gerrard - Smicer - Xabi Alonso',
			'Luis García - Cissé - Carragher'
		],
		correct: 2,
		difficulty: HIGH_DIFFICULTY
	},
	{
		question: '¿Quién era el Entrenador del Velez Campeón de 1998? ',
		answers: [
			'Carlos Bianchi',
			'Marcelo Bielsa',
			'Alfio Basile',
			'Hugo Tocalli',
			'Héctor Veira',
		],
		correct: 1,
		difficulty: HIGH_DIFFICULTY
	},
	{
		question: '¿Cual es la temporada en que los Gunners de Arsene Wenger se coronan campeones sin perder un partido? ',
		answers: [
			'2000-2001',
			'2003-2004',
			'2007-2008'
		],
		correct: 1,
		difficulty: LOW_DIFFICULTY
	},
	{
		question: 'En el año 2006, Holanda y Portugal se enfrentan en los Octavos de Final del Mundial de Alemania. ¿Quién salió victorioso? ',
		answers: [
			'Holanda',
			'Portugal',
			'Perdieron los dos'
		],
		correct: 1,
		difficulty: LOW_DIFFICULTY
	},
	{
		question: '¿Quién es el máximo goleador histórico de la Selección Argentina de Fútbol ? ',
		answers: [
			'Diego Armando Maradona',
			'Gabriel Omar Batistuta',
			'Lionel Andrés Messi',
		],
		correct: 2,
		difficulty: LOW_DIFFICULTY
	},
	{
		question: '¿Quién fue el campeón del Torneo Nacional de 1984 en Argentina? ',
		answers: [
			'Ferro Carril Oeste',
			'Argentinos Juniors',
			'Independiente',
			'Estudiantes de La Plata',
			'River Plate',
		],
		correct: 0,
		difficulty: HIGH_DIFFICULTY
	},
	{
		question: '¿Quién ganó el Balón de Oro a Mejor Jugador en el mundial del 2002? ',
		answers: [
			'Ronaldo Nazario Lima',
			'Oliver Kahn',
			'Rivaldo',
		],
		correct: 1,
		difficulty: MID_DIFFICULTY
	},
	{
		question: '¿Quién fue el campeón de la Liga MX en México? ',
		answers: [
			'América',
			'Pachuca',
			'Chivas de Guadalajara',
			'Monterrey',
			'Toluca',
		],
		correct: 3,
		difficulty: HIGH_DIFFICULTY
	},
	{
		question: '¿En cuál de estos equipos no jugó Carlos \"El Apache\" Tevez? ',
		answers: [
			'Manchester United',
			'West Ham',
			'Flamengo',
		],
		correct: 2,
		difficulty: LOW_DIFFICULTY
	},
  {
    question: '¿Cuál de estos equipos ingleses no pertenece a la ciudad de Londres? ',
    answers: [
      'West Ham',
      'Crystal Palace',
      'Tottenham',
			'Aston Villa',
			'Arsenal',
    ],
    correct: 3,
    difficulty: MID_DIFFICULTY
  },
  {
    question: '¿Cuantos goles metió el Polaco-Alemán Miroslav Klose en todos los mundiales? ',
    answers: [
      '14',
      '15',
      '16',
      '17',
    ],
    correct: 2,
    difficulty: LOW_DIFFICULTY
  },
  {
    question: '¿En cuál de estos equipos no jugó Gerard Piqué? ',
    answers: [
      'Manchester United',
      'Barcelona B',
      'Zaragoza',
    ],
    correct: 1,
    difficulty: MID_DIFFICULTY
  },
  {
    question: '¿Qué equipo ganó la Champions League en el año 2002? ',
    answers: [
      'Inter',
      'Juventus',
      'Real Madrid',
			'Bayern Munich',
    ],
    correct: 2,
    difficulty: MID_DIFFICULTY
  },
  {
    question: '¿Qué tienen en común estos jugadores: Pierre Aubameyang, Thierry Henry, Sebastien Squillaci, David Trezeguet y Emmanuel Petit ? ',
    answers: [
      'Todos Representaron a la Selección Francesa',
      'Todos jugaron en el Arsenal',
      'Todos son Delanteros',
      'Todos Jugaron en el Monaco',
      'Todos jugaron en la Juventus',
    ],
    correct: 3,
    difficulty: HIGH_DIFFICULTY
  },
  {
    question: '¿Jugaron juntos en el Sporting Lisboa, Cristiano Ronaldo y Nani? ',
    answers: [
      'Sí',
      'No',
      ],
    correct: 1,
    difficulty: LOW_DIFFICULTY
  },
  {
    question: '¿En qué año nació Antoine Griezmann? ',
    answers: [
      '1985',
      '1989',
      '1991',
    ],
    correct: 2,
    difficulty: LOW_DIFFICULTY
  },
  {
    question: '¿Quién fue el tercer puesto en la entrega del Balón de Oro de la FIFA en el 2008? ',
    answers: [
      'Xavi',
      'Fernando Torres',
      'Kaká',
    ],
    correct: 1,
    difficulty: MID_DIFFICULTY
  },
  {
    question: '¿Cuál de estas ligas no pertenece al Quinteto de competiciones más atractivas según la UEFA? ',
    answers: [
      'Ligue 1 ',
      'Serie A',
      'Liga Portuguesa',
    ],
    correct: 2,
    difficulty: LOW_DIFFICULTY
  },
];


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
		nextIndex = myRandom(0, (questions.length - 1));
		currQuestion = questions[nextIndex];
	} while (checkIfWasAsked(nextIndex) || (difficulty !== currQuestion.difficulty))

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

	const currQuestionObject = questions[indexQuestion];

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
})


// function startGame(){
// 	askQuestions();
// }

// startGame();
