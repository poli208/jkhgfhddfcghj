const {commands} = require('./commands');
function botActions(bot) {
  for(let i=0; i<commands.length; i++){
    bot.command(commands[i].name, commands[i].callback)
  }
}

module.exports = botActions;
