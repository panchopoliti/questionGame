const constants = require('./constants.js');

module.exports.getHowManyPlayersString = () => {
  let ret = '\nOpciones: \n';

  for(let i = 0; i < constants.numberOfPlayers.length; i++) {
    ret += `${i+1}. ${constants.numberOfPlayers[i]}\n`;
  }

  return ret;
};

module.exports.getPlayersString = (playersPlaying) => {
  let ret = '\nOpciones: \n 1. INVITADO\n';
  const possiblePlayersName = Object.keys(constants.players_id);
  const possiblePlayersId = Object.values(constants.players_id);

  for(let i = 0; i < possiblePlayersName.length; i++) {

    if (playersPlaying.includes(+possiblePlayersId[i]) && possiblePlayersId[i] !== 1) {
      continue
    }
    if (!possiblePlayersName[i].includes('INVITADO')) {
      ret += `${possiblePlayersId[i]}. ${possiblePlayersName[i]}\n`;
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
