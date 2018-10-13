const validationProfile = {
    sku: (incomingValue) => {
        return (typeof incomingValue) !== 'number'
    },
    name: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    },
    description: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    },
    price: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    },
    currency: (incomingValue) => {
        return (typeof incomingValue) !== 'string'
    },
    creatorId: (incomingValue) => {
        return (typeof incomingValue) !== 'number'
    },
    categories: (incomingValue) => {
        return !Array.isArray(incomingValue)
    }
}
module.exports = validationProfile;