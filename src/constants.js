const chalk = require('chalk');

module.exports = constants = {
  difficulty: {
    BAJA: 1,
    MEDIA: 2,
    ALTA: 3,
  },
  players_id: {
    SANTI: 101,
    ANDY: 102,
    PANCHO: 103,
    JOACO: 104,
    ANDRU: 105,
    MARLON: 106,
  },
  colours: {
    blueBold: (text) => chalk.hex('#337ab7').bold(text),
    alentameGreen: (text) => chalk.hex('#128069')(text),
    successGreen: (text) => chalk.hex('00A227').bold(text),
    wrongRed: (text) => chalk.hex('#ec4758').bold(text),
    yellow:(text) => chalk.hex('#8e8200').bold(text),
    orange: (text) => chalk.hex('#e8a409')(text),
    lightBlueBold: (text) => chalk.hex('#179eff')(text),
    pinkBold: (text) => chalk.hex('#f04bb5')(text),
  },
  numberOfMaxPlayers: 4,
  numberOfQuestionsPerPlayer: 2,
};

