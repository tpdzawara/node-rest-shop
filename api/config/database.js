if (process.env.NODE_ENV === 'production') {
    module.exports = { mongoURI: 'mongodb+srv://online-shop:aoshop@aotech-smafp.mongodb.net/Shop?retryWrites=true&w=majority' }
} else {
    module.exports = { mongoURI: 'mongodb://localhost:27017/aoshop' }
}