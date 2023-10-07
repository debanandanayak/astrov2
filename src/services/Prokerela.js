const { default: axios } = require("axios")
require('dotenv').config()
class Prokerela {
  static async getConfig() {
    let data = await axios
      .post(`https://api.prokerala.com/token`, {
        grant_type: "client_credentials",
        client_id: process.env.PROKERALA_CLIENT_ID,
        client_secret: process.env.PROKERALA_CLIENT_SECRET,
      })
      .then(res => {
        console.log(res.status);
        return res.data
      })
    const token = `${data.token_type} ${data.access_token}`
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
    return config
  }
  static async getPanchang() {
    const config = await this.getConfig()
    const ayanamsa = 1
    const coordinates = "10.214747,78.097626"
    const datetime = new Date().toISOString()
    const la = "en"
    const data = await axios
      .get(
        `https://api.prokerala.com/v2/astrology/panchang?ayanamsa=${ayanamsa}&coordinates=${coordinates}&datetime=${datetime}&la=${la}`,
        config
      )
    return data.data
  }
  static async getHoroscope(sign='aries',date=(new Date()).toISOString()){
    const config = await this.getConfig()
    const data = await axios.get(`https://api.prokerala.com/v2/horoscope/daily?sign=${sign}&datetime=${date}`,config)
     return data.data
  }
}


module.exports = Prokerela