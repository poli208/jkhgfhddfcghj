module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  POSTGRES_CONNECTION: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DATABASE,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  WEATHER_EMOJIS: [
    {
      min: 200,
      max: 232,
      emoji: "⛈️"
    },
    {
      min: 300,
      max: 531,
      emoji: "🌧️"
    },
    {
      min: 600,
      max: 622,
      emoji: "🌨️"
    },
    {
      min: 701,
      max: 781,
      emoji: "😶‍🌫️"
    },
    {
      min: 800,
      max: 800,
      emoji: "☀️"
    },
    {
      min: 801,
      max: 804,
      emoji: "☁️"
    },
  ],
  FREQUENCY_VALUES:{
    one_minute: 60000,
    half_hour: 1800000,
    one_hour: 3600000,
    four_hours: 14400000,
    half_day: 43200000,
    full_day: 86400000
  }
}
