const createError = require('http-errors');
const Company = require('../models/company');

exports.isLoggedIn = () => (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    next(
      createError(401)
    );
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(422))
  } else {
    next();
  }
}

exports.isSuperAdmin = () => (req, res, next) => {
  if (req.session.currentUser._id == process.env.SUPERADMIN) {
    next();
  } else {
    next(
      createError(401)
    );
  }
};

exports.isAdmin = (id) => async (req, res, next) => {
  const currentUser = req.session.currentUser._id
  try {
    const company = await Company.find({ admin: currentUser })
    console.log(id)
    if (company._id == id) {
      next();
    } else {
      next(
        createError(401)
      );
    }
  }
  catch{

  }
};
