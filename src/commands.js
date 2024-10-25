const {Stage} = require('telegraf')
const {unsubscribe} = require("./subscription");

module.exports = {
  commands: [
    {
      name: 'start',
      callback: async (ctx)=>{
        const {i18n} = ctx
        await ctx.replyWithMarkdown(i18n.t('greeting'))
        await ctx.scene.enter("CitySelector")
      }
    },
    {
      name: 'weather',
      callback: async (ctx)=>{
        const {i18n} = ctx
        await ctx.replyWithMarkdown(i18n.t('greeting'))
        await ctx.scene.enter("CitySelector")
      }
    },
    {
      name: 'stop',
      callback: async (ctx)=>{
        const {i18n} = ctx
        await ctx.replyWithMarkdown(i18n.t('clean_weather'))
        await unsubscribe(ctx.from.id)
      }
    },
  ],
}
