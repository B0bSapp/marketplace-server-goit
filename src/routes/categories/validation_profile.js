const validationProfile = {
    name: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    },
    description: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    }
}
module.exports = validationProfile;