const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Company = require('../models/company');
const User = require('../models/user');
const { isLoggedIn, isSuperAdmin, isAdmin } = require('../helpers/middelwares');
const { validationResult, companyValidator } = require('../helpers/validators/company');

router.get('/',
  isLoggedIn(),
  isSuperAdmin(),
  async (req, res, next) => {
    try {
      const list = await Company.find();
      return res.status(200).json(list)
    } catch (error) {
      next(createError(404))
    }
  });

router.get('/:id',
  isLoggedIn(),
  async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser._id
      const { id } = req.params;
      const company = await Company.find({ _id: id, admin: currentUser })
      return res.status(200).json(company);
    } catch (error) {
      next(createError(404))
    }
  });

router.put('/:idCompany/addUser/:idUser',
  isLoggedIn(),
  async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser._id
      const { idCompany, idUser } = req.params;
      const user = await User.find({ _id: idUser })
      if (user) {
        const company = await Company.findOneAndUpdate(
          { _id: idCompany, admin: currentUser },
          { $push: { users: idUser } }
        )
        return res.status(200).json(company)
      } else {
        next(createError(401))
      }
    } catch (error) {
      next(createError(404))
    }

  })

router.get('/:idCompany/bills',
  isLoggedIn(),
  async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser._id
      const { idCompany } = req.params;
      const { docs: companyDocs } = await Company
        .find({ _id: idCompany, admin: currentUser })
      return res.status(200).json(companyDocs);
    } catch (error) {
      next(createError(404))
    }
  });

router.post('/',
  isLoggedIn(),
  isSuperAdmin(),
  companyValidator,
  async (req, res, next) => {
    const { admin, users, name, cif, street, streetNum, postalCode, country } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

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
      next(createError(404))
    }
  },
);

router.put('/:id',
  isLoggedIn(),
  companyValidator, async (req, res, next) => {
    const { id } = req.params;
    const { admin, users, name, cif, street, streetNum, postalCode, country } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    }

    try {
      let company = await Company.findById(id);
      if (company.admin !== idUser) {
        next(createError(500))
        // res.status(500).send('You are not admin of the company')
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
      next(createError(404))
    }
  });

// router.delete('/:id',
//   isLoggedIn(),
//   async (req, res, next) => {
//     const { id, idUser } = req.params;
//     try {
//       let company = await Company.findById(id);
//       if (company.admin !== idUser) {
//         next(createError(500))
//         // res.status(500).send('You are not admin of the company')
//       } else {
//         company = await Company.findByIdAndDelete(id);
//         res.status(200).json(company)
//       }
//     } catch (error) {
//       next(createError(404))
//     }
//   });

module.exports = router;
