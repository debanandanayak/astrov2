const client = require("./database/client")

const f = async ()=>{
    const data = await client.message.findMany({
        where:{
        }
    })
    console.log(data);
}
f()