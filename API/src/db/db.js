const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_ROUTE)
        console.log('[+] DB connected')
    } catch (err) {
        console.log('[!] Connection error')
    }
}

dbConnection()
