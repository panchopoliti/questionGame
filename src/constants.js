const chalk = require('chalk');


module.exports = constants = {
  difficulty: {
    HIGH_DIFFICULTY: 3,
    MID_DIFFICULTY: 2,
    LOW_DIFFICULTY: 1,
  },
  players_id: {
    ['INVITADO 1']: 1,
    ['INVITADO 2']: 2,
    ['INVITADO 3']: 3,
    ['INVITADO 4']: 4,
    ['INVITADO 5']: 5,
    ['INVITADO 6']: 6,
    ['INVITADO 7']: 7,
    ['INVITADO 8']: 8,
    ['INVITADO 9']: 9,
    SANTI: 11,
    ANDY: 12,
    PANCHO: 13,
    JOACO: 14,
    ANDRU: 15,
  },
  colours: {
    blueBold: (text) => chalk.hex('#337ab7').bold(text),
    green: (text) => chalk.hex('#128069')(text),
    wrongRed: (text) => chalk.hex('#ec4758').bold(text),
    yellow:(text) => chalk.hex('#8e8200').bold(text),
    orange: (text) => chalk.hex('#e8a409')(text),
  },
  numberOfPlayers: [1, 2, 3, 4],
  numberOfQuestionsPerPlayer: 2,
};

module.exports.playersPlaying = [];
