const client = require("./database/client")
const moment = require('moment')
const Prokerela = require("./src/services/Prokerela")
const f = async ()=>{
    const data = await fetch('http://localhost:3000/heltcheck')
    const res = data
    console.log(res);
    // const exist = await client.user.findFirst({
    //     where:{
    //         ID:1,
    //     }
    // })

    // //otp expires check
    // const otpExpireQuery =  await client.user.findFirst({
    //     where:{
    //         ID:1,
    //         otp_expired_in:{
    //             gte:moment()
    //         }
    //     }
    // })
    // console.log(otpExpireQuery);
    //otp expire time update to 5 minuit
    // const data = await client.user.update({
    //     where:{
    //         ID:1
    //     },data:{
    //         otp:1234,
    //         otp_expired_in:moment().add({minute:1})
    //     }
    // })

    const dt = await Prokerela.getHoroscope()
    console.log(dt);
}
f()

