const validationProfile = {
    name: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    },
    phone: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    },
    password: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    }
}
module.exports = validationProfile;