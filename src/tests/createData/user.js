const User = require("../../models/User")

const user = async () => {
const body = {
    firstName: "Jose",
    lastName: "Pavon",
    email: "jose@gmail.com",
    password: "1234Jose",
    phone: "1234"
}

await User.create(body)
}

module.exports = user