const chalk = require('chalk');


module.exports = constants = {
  difficulty: {
    BAJA: 1,
    MEDIA: 2,
    ALTA: 3,
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
    alentameGreen: (text) => chalk.hex('#128069')(text),
    successGreen: (text) => chalk.hex('00A227').bold(text),
    wrongRed: (text) => chalk.hex('#ec4758').bold(text),
    yellow:(text) => chalk.hex('#8e8200').bold(text),
    orange: (text) => chalk.hex('#e8a409')(text),
    lightBlueBold: (text) => chalk.hex('#179eff')(text),
    pinkBold: (text) => chalk.hex('#f04bb5')(text),
  },
  numberOfPlayers: [1, 2, 3, 4],
  numberOfQuestionsPerPlayer: 2,
};

