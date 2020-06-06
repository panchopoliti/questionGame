const lobq = require('./list-of-back-questions.js');
const constants = require('./constants.js');
const colour = constants.colours;
const get = require('./gets-functions.js');



function showBacklogQuestions() {
    
    let backlog = '';
    
    lobq.listOfBackQuestions.forEach((elem) => {
        backlog += `\n${colour.successGreen(elem.question)}\n${elem.answerMethod()}\n`;
    });

    return console.log(backlog);
}
showBacklogQuestions();
// Terminar con las Back Questions y sus respuestas

// Base de Datos

//Playing ID para sacar de encima el getKeyOfValue en Gets Functions