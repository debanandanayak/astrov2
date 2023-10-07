const client = require("./database/client")
const moment = require("moment")
const Prokerela = require("./src/services/Prokerela")
const Blog = require("./src/services/Blog")
const { default: axios } = require("axios")
const f = async () => {
  try {
    const data = await Prokerela.getHoroscope()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  
  // console.log(data)
}
f()
