const constants = require('./constants.js');
const get = require('./gets-functions.js');
const loq = require('./list-of-questions.js');
const fn = require('./general-functions.js');

module.exports.getHowManyPlayersString = () => {
  let ret = '\nOpciones: \n';

  for ( let i = 1; i <= constants.numberOfMaxPlayers; i++ ) {
    ret += `${i}. ${i}\n`;
  }

  return ret;
};

module.exports.getPlayersPlayingString = () => {

  let ret = '\nOpciones: \n1. INVITADO\n';

  return ret += get.getPlayersString();
};

module.exports.getUsersArray = () => {

  let resultArray = [];
  const usersName = Object.keys(constants.players_id);

    for( const name of usersName) {
    
      if (!name.toLowerCase().split(' ').includes('invitado')) {

        resultArray.push(name);

      }
    }

  return resultArray;

};

module.exports.getPlayerNameOutOfPlayingId = (playingId) => {

  if (playingId)
  return fn.getKeyOfValue(constants.players_id, playingId);


};

module.exports.getPlayersString = () => {
  let ret ='';
  const playersName = Object.keys(constants.players_id);
  const playersId = Object.values(constants.players_id);

  for(let i = 0; i < playersId.length; i++) {

    if (!playersName[i].toLowerCase().split(' ').includes('invitado')) {
      ret += `${playersId[i]}. ${playersName[i]}\n`;
    }
  }

  return ret;
};

module.exports.getOptionsString = (questionObject) => {

  let ret = '\nOpciones: \n';

  for(let i = 0; i < questionObject.answers.length; i++) {

    ret += `${i+1}. ${questionObject.answers[i]}\n`;

  }

  return ret;
};

module.exports.getPossibleDifficultiesInMenu = () => {
  let ret ='';
  const difficultiesName = Object.keys(constants.difficulty);
  const difficultiesId = Object.values(constants.difficulty);

  for(let i = 0; i < difficultiesId.length; i++) {
      ret += `${difficultiesId[i]}. ${difficultiesName[i]}\n`;
  }

  return ret;
};

module.exports.getAmountOfCorrectAnswersPerPlayer = (state) => {
  const correctAnswers = {};
  
  for (const key of state){
    if (key.correct === true) {

      const playerId = key.playerId;

      if (correctAnswers[playerId] === undefined) {

        correctAnswers[playerId] = 1;

      } else {

        correctAnswers[playerId]++;

      }
    }
  }
  return correctAnswers;
};

module.exports.getAmountOfQuestionsInGame = () => loq.listOfQuestions.length;

module.exports.getAmountOfUsers = () => Object.keys(constants.players_id).length;

// Count Items of an array of same type objects taking the value of a certain category (key). 
function countItemsBySpecificValue(arr, key, value) {
  
  let result = 0;
  
  for (const elem of arr) {

    result += (elem[key] === value);

  }
  
  return result
};

module.exports.getQuestionsSortedByDifficulty = () => {

  const difficultiesName = Object.keys(constants.difficulty);
  const difficultiesId = Object.values(constants.difficulty);

  let result = {};

  for (let i = 0; i < difficultiesId.length; i++) {

    const categoryItems = countItemsBySpecificValue(loq.listOfQuestions, 'difficulty', difficultiesId[i]);
    Object.assign(result, {[difficultiesName[i]]: categoryItems});

  }   
  
  return result;
  
};

module.exports.getUsersSortedByCreatedQuestions = () => {

  const playersNameArray = get.getUsersArray();
  const playersId = Object.values(constants.players_id);

  let result = {};

  for (let i = 0; i < playersId.length; i++) {

    const categoryItems = countItemsBySpecificValue(loq.listOfQuestions, 'creator', playersId[i]);
    Object.assign(result, {[playersNameArray[i]]: categoryItems});

  }   
  
  return result;

};

module.exports.getBackQuestionsMenu = (questionArr) => {
  
  let questionsMenu = [];

  for (const { question } of questionArr){

    questionsMenu.push(question);

  }

  return questionsMenu;
};
