module.exports = {
  validateCity: async (city) => {
    try {
      const req = await fetch(`https://suggest-maps.yandex.ru/v1/suggest?text=${city}&lang=en&apikey=${process.env.GEOSADGET_KEY}&types=locality`)
      const {results} = await req.json();
      return results ?? null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
