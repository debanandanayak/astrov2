const client = require("../../../database/client")


class Support {
    static async createSupport(phone_number, subject, description, image) {
        let support = await client.support.create({
            data: {
                phone_number: phone_number,
                subject: subject,
                description: description,
                image: image,
            }
        })
        return support
    }
    static async getSupport(phone_number) {
        const support = await client.support.findMany({
            where: {
                phone_number: phone_number
            },
        })
        return support
    }
    static async deleteSupport(id) {
        const support = await client.support.delete({
            where: {
                ID: id,

            }
        })
        return support
    }

}

module.exports = Support