const get = require('./gets-functions.js');

module.exports.listOfBackQuestions = [
	{
		question: 'Cantidad de preguntas que tiene el juego en total',
		answerMethod: get.getAmountOfQuestionsInGame,
	},
	{
		question: 'Cantidad de preguntas separada por dificultad',
		answerMethod: () => JSON.stringify(get.getQuestionsSortedByDifficulty()),
	},
	{
		question: 'Posibles Usuarios',
		answerMethod: get.getPlayersString,
	},
	{
		question: 'Cantidad de Usuarios',
		answerMethod: get.getAmountOfUsers,
	},
	{
		question: 'Cantidad de preguntas creadas por usuario',
		answerMethod: () => JSON.stringify(get.getUsersSortedByCreatedQuestions()),
	},
];