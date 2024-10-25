const {POSTGRES_CONNECTION} = require("./constants");
const {setIntervalAsync, clearIntervalAsync} = require('set-interval-async/dynamic');
const {getWeather} = require('./openWeatherMap')

const knex = require("knex")({
  client: "postgresql",
  connection: POSTGRES_CONNECTION
})

let subscribers = {}

function middleware(bot) {
  return (ctx, next) => {
    ctx.newSubscriber = async (id, config) => {
      if (subscribers[id]?.interval) {
        await clearIntervalAsync(subscribers[id].interval)
      }

      subscribers[id] = {
        config: config,
        interval: null
      }


      subscribers[id].interval = createUserIntervals(
        subscribers[id].config,
        bot,
        ctx.from.id,
        ctx.i18n
      )
    }
    return next()
  }
}

async function parseSubscribers(bot, i18n) {
  const rows = await knex('telegraf-sessions')
    .select('key', 'session')
    .where(knex.raw("session::json ->'session' -> 'config' is not null"))

  const result = rows.map(row => ({
    key: row.key,
    config: JSON.parse(row.session).session?.config
  }))

  for (let i = 0; i < result.length; i++) {
    const id = result[i].key.split(':')[0]
    subscribers[id] = {config: result[i].config}
    subscribers[id].interval = createUserIntervals(
      subscribers[id].config,
      bot,
      Number(id),
      i18n
    )
  }

  return result
}

function createUserIntervals(config, bot, id, i18n) {
  return setIntervalAsync(async () => {
    try {
      const weather = await getWeather(config)
      let message
      try {
        message = i18n.t('ru', 'weather', weather)
      } catch (e) {
        message = i18n.t('weather', weather)
      }
      await bot.telegram.sendMessage(id, message)
    }catch (e) {

    }
  }, config.frequency)
}

async function unsubscribe(id) {
  await clearIntervalAsync(subscribers[id].interval)
  
  subscribers[id] = undefined

  await knex('telegraf-sessions')
    .where('key', '=', `${id}:${id}`)
    .del()
}

module.exports = {middleware, parseSubscribers, unsubscribe};
