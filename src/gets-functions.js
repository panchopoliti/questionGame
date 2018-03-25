const constants = require('./constants.js');
const get = require('./gets-functions.js');

module.exports.getHowManyPlayersString = () => {
  let ret = '\nOpciones: \n';

  for(let i = 0; i < constants.numberOfPlayers.length; i++) {
    ret += `${i+1}. ${constants.numberOfPlayers[i]}\n`;
  }

  return ret;
};

module.exports.getPlayersPlayingString = (playersPlaying) => {
  let ret = '\nOpciones: \n1. INVITADO\n';
      ret += module.exports.getPlayersString();
  return ret;
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

module.exports.getPossibleDifficulties = () => {
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
    if(key.correct === true) {
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
