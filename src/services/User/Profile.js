const client = require("../../../database/client")

class Profile{
    static async getProfile(id){
        const user = await client.user.findUnique({
            where: {ID: id},select:{
                name: true,
                image:true,
                gender:true,
                place_of_birth:true,
            }
        })
        return user
    }

    static async updateProfile(id, profile){
        const user = await client.user.update(
            {where:{ID: id},data:{
                name: profile?.name,
                date_of_birth: profile?.date_of_birth,
                gender:profile?.gender,
                image:profile?.image,
                place_of_birth: profile?.place_of_birth,
                time_of_birth: profile?.time_of_birth,
            },select:{
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