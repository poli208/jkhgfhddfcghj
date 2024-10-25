const {BaseScene, Markup} = require("telegraf")
const {validateCity} = require('../geosadget')
const {geocode} = require('../openWeatherMap')
const {FREQUENCY_VALUES} = require('../constants')
const Config = require('../models/Config')
const {unsubscribe} = require("../subscription");

module.exports = () => {
  //TODO implement leave handler
  const scenarioTypeScene = new BaseScene('CitySelector',)

  scenarioTypeScene.command("start", async (ctx)=>{
    const {i18n} = ctx

    await ctx.replyWithMarkdown(i18n.t('greeting'))
  })

  scenarioTypeScene.command("weather", async (ctx)=>{
    const {i18n} = ctx

    await ctx.replyWithMarkdown(i18n.t('greeting'))
  })

  scenarioTypeScene.command("stop", async (ctx)=>{
    const {i18n} = ctx

    await ctx.replyWithMarkdown(i18n.t('clean_weather'))
    await unsubscribe(ctx.from.id)
  })

  scenarioTypeScene.on("text", async (ctx) => {
    const {i18n} = ctx

    const text = ctx.message.text

    if (!(/^[А-я-. ][^0-9]+$/i.test(text))) {
      await ctx.reply(i18n.t('city_format_error'))
      return
    }

    const validatedCity = await validateCity(text)

    if (!validatedCity) {
      ctx.reply(i18n.t('city_not_found'))
      return
    }

    const coordinates = await geocode(text)

    if (!coordinates) {
      ctx.reply(i18n.t('city_not_found'))
      return
    }

    ctx.session.pre_city = coordinates.city
    ctx.session.pre_lat = coordinates.lat
    ctx.session.pre_lon = coordinates.lon

    await ctx.reply(i18n.t('frequency_question'), {
      reply_markup: {
        inline_keyboard: [
          [
            {text: i18n.t('one_minute'), callback_data: 'one_minute'},
            {text: i18n.t('half_hour'), callback_data: 'half_hour'},
          ],
          [
            {text: i18n.t('one_hour'), callback_data: 'one_hour'},
            {text: i18n.t('four_hours'), callback_data: 'four_hours'},
          ],
          [
            {text: i18n.t('half_day'), callback_data: 'half_day'},
            {text: i18n.t('full_day'), callback_data: 'full_day'},
          ],
        ]
      }
    })
  })

  scenarioTypeScene.on('callback_query', async (ctx) => {
    const {i18n} = ctx

    const frequency = FREQUENCY_VALUES[ctx.callbackQuery.data]

    const config = new Config(ctx.session.pre_lat, ctx.session.pre_lon, ctx.session.pre_city, frequency)

    ctx.session.config = config

    await ctx.newSubscriber(ctx.from.id, config)

    await ctx.replyWithMarkdown(i18n.t('city_setted', {frequency: i18n.t(ctx.callbackQuery.data), city: config.city}))

    await ctx.scene.leave()
  })

  return scenarioTypeScene
}
