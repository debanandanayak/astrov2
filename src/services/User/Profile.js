const client = require("../../../database/client")

class Profile{
    static async getProfile(id){
        const user = await client.user.findUnique({
            where: {ID: id},select:{
                ID: true,
                name: true,
                image:true,
                gender:true,
                place_of_birth:true,
                date_of_birth:true,
                time_of_birth:true,
            }
        })
        return user
    }

    static async updateProfile(id, profile){
        console.log(profile.date_of_birth);
        const date = new Date(profile.date_of_birth).toISOString()
        console.log(date);
        const user = await client.user.update(
            {where:{ID: id},data:{
                name: profile?.name,
                date_of_birth: date,
                gender:profile?.gender,
                image:profile?.image,
                place_of_birth: profile?.place_of_birth,
                time_of_birth: date,
            },select:{
                ID:true,
                name:true,
                date_of_birth:true,
                time_of_birth:true,
                image:true,
                gender:true,
            }}
        )
        return user
    }
}

module.exports = Profile