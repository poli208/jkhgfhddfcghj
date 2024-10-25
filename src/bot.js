const {session} = require("telegraf");
const {Telegraf, Stage} = require('telegraf')
const TelegrafI18n = require('telegraf-i18n')
const path = require("node:path");
const botActions = require('./actions');
const CitySelector = require('./scenes/citySelector')
const { Postgres } = require("@telegraf/session/pg");
const {POSTGRES_CONNECTION} = require("./constants");
const {middleware, parseSubscribers} = require('./subscription')

module.exports = {
  runBot: async () => {

    const bot = new Telegraf(process.env.BOT_TOKEN)

    const i18n = new TelegrafI18n({
      defaultLanguage: 'ru',
      allowMissing: false, // Default true
      directory: path.resolve(__dirname, '../locales')
    })

    const store = Postgres(POSTGRES_CONNECTION);

    const citySelector = CitySelector()
    const stage = new Stage([citySelector])

    bot.context.stage = stage

    bot.use(i18n.middleware())
    bot.use(session({ store }));
    bot.use(middleware(bot))
    bot.use(stage)

    botActions(bot)

    await bot.launch()

    await parseSubscribers(bot, i18n)


    console.log('[INFO]: BOT launched')

    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
  }
}
