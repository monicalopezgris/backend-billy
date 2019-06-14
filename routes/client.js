const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Clients = require('../models/client');
const { isLoggedIn } = require('../helpers/middelwares');


router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const list = await Clients.find();
    return res.status(200).json(list)
  } catch (error) {
    next(createError(404))
  }
});

router.get('/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Clients.findById(id);
    return res.status(200).json(client);
  } catch (error) {
    next(createError(404))
  }
});

router.post('/', isLoggedIn(), async (req, res, next) => {
  const { name, cif, contact, street, streetNum, postalCode, country } = req.body;

  try {
    const client = await Clients.create({
      name,
      cif,
      contact,
      address: {
        street,
        number: streetNum,
        postalCode,
        country,
      }
    });
    res.status(200).json(client);
  } catch (error) {
    next(createError(404))
  }
},
);

router.put('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const { name, cif, contact, street, streetNum, postalCode, country } = req.body;
  try {
    const client = await Doc.findByIdAndUpdate(id, {
      name,
      cif,
      contact,
      address: {
        street,
        number: streetNum,
        postalCode,
        country,
      }
    });
    res.status(200).json(client)
  } catch (error) {
    next(createError(404))
  }
});

router.delete('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  try {
    // const docInit = await Doc.findById(id);
    // if (!docInit){
    //   res.status(500).send()
    // }else{
    const client = await Clients.findByIdAndDelete(id);
    res.status(200).json(client)
    // }
  } catch (error) {
    next(createError(404))
  }
});

module.exports = router;
