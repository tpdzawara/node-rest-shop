if (process.env.NODE_ENV === 'production') {
    module.exports = { JWT_KEY: 'secret' }
}