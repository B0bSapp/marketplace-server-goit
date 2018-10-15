const userValidationProfile = require('./users/validation_profile');
const productValidationProfile = require('./products/validation_profile');
const categoryValidationProfile = require('./categories/validation_profile');

const validatePayload = (request) => {
  const errors = {
    missing: [],
    wrongType: []
  };
  const validationProfile = getValidationProfile(request.url);
  const incomingEntity = request.body;
  Object.entries(validationProfile).forEach(entry => {
    const validatedField = entry[0];
    const validationFunction = entry[1];
    if (!incomingEntity[validatedField]) {
      errors.missing.push(validatedField);
    } else if (validationFunction(incomingEntity[validatedField])) {
      errors.wrongType.push(validatedField);
    }
  })
  return errors
}

const getValidationProfile = (url) => {
  const validationProfile = availableValidationProfiles.find(validationEntity =>
      validationEntity.path.test(url)
  ).profile;
  return validationProfile ? validationProfile : () => {
  }
}

const availableValidationProfiles = [
  {
    path: /^\/products\/?$/,
    profile: productValidationProfile
  },
  {
    path: /^\/products\/\w+\/?$/,
    profile: productValidationProfile
  },
  {
    path: /^\/users\/?$/,
    profile: userValidationProfile
  },
  {
    path: /^\/users\/\w+\/?$/,
    profile: userValidationProfile
  },
  {
    path: /^\/categories\/?$/,
    profile: categoryValidationProfile
  },
  {
    path: /^\/categories\/\w+\/?$/,
    profile: categoryValidationProfile
  }
];

module.exports = validatePayload;
