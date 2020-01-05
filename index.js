require('dotenv').config()

const weatherToken = process.env.WEATHER_API_TOKEN

console.log(weatherToken)

const fetch = require('node-fetch')
const telegram = require('node-telegram-bot-api')
const bot = new telegram(process.env.TELEGRAM_TOKEN)

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')

weatherURL.searchParams.set('zip', '87000,fr')
weatherURL.searchParams.set('appid', weatherToken)
weatherURL.searchParams.set('units', 'metric')
weatherURL.searchParams.set('lang', 'fr')

const getWeaterData = async () => {
  console.log(weatherURL.toString())
    
  const resp = await fetch(weatherURL.toString())
  const body = await resp.json()
  return body
}

const generateWeatherMessage = weatherData =>
    `Le temps à ${weatherData.name} : ${weatherData.weather[0].description} .
    la temperature en cours est ${weatherData.main.temp} degré 
    avec une temperature mininum de ${weatherData.main.temp_min} degré 
    et maximum ${weatherData.main.temp_max} degré.`

const main = async () => {
  const weatherData = await getWeaterData()
  const weatherString = generateWeatherMessage(weatherData)
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
}

main()
