const validatePayload = (incomingEntity, validationProfile) => {
    console.log(incomingEntity);
    const errors = [];
    Object.entries(validationProfile).forEach(entry => {
        const validatedField = entry[0];
        const validationFunction = entry[1];
        if (!incomingEntity[validatedField]) {
            errors.push({message: `Missing mandatory parameter '${validatedField}'`});
        } else if (validationFunction(incomingEntity[validatedField])) {
            errors.push({message: `Wrong type of parameter '${validatedField}'`});
        }
    })
    return errors
}


module.exports = validatePayload;
