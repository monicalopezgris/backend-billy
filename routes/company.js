const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Company = require('../models/company');
const { isLoggedIn } = require('../helpers/middelwares');

router.get('/company', isLoggedIn(), async (req, res, next) => {
  try {
    const list = await Company.find();
    return res.status(200).json(list)
  } catch (error) {
    next(error)
  }
});

router.get('/company/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    return res.status(200).json(company);
  } catch (error) {
    next(error)
  }
});

router.post('/company', isLoggedIn(), async (req, res, next) => {
  const { admin, users, name, cif, street, streetNum, postalCode, country } = req.body;

  try {
    const company = await Company.create({
      admin,
      users,
      name,
      cif,
      address: {
        street,
        number: streetNum,
        postalCode,
        country,
      }
    });
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
},
);

router.put('/company/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const { admin, users, name, cif, street, streetNum, postalCode, country } = req.body;
  try {
    let company = await Company.findById(id);
    if (company.admin !== idUser) {
      res.status(500).send('You are not admin of the company')
    } else {
      company = await Company.findByIdAndUpdate(id, {
        admin,
        users,
        name,
        cif,
        address: {
          street,
          number: streetNum,
          postalCode,
          country,
        }
      });
      res.status(200).json(company)
    }
  } catch (error) {
    next(error)
  }
});

router.delete('/company/:id', isLoggedIn(), async (req, res, next) => {
  const { id, idUser } = req.params;
  try {
    let company = await Company.findById(id);
    if (company.admin !== idUser) {
      res.status(500).send('You are not admin of the company')
    } else {
      company = await Company.findByIdAndDelete(id);
      res.status(200).json(company)
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;
