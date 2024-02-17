const { app } = require('./app')
const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost:27017/revolBank'

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('connected to db');
    }).catch(err => {
        console.log(err);
    })

const PORT = process.env.PORT || 3115
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})