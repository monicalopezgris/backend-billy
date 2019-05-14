const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Clients = require('../models/client');


router.get('/clients', async (req, res, next) => {
  try {
    const list = await Clients.find();
    return res.status(200).json(list)
  } catch (error) {
    next(error)
  }
});

router.get('/clients/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Clients.findById(id);
    return res.status(200).json(client);
  } catch (error) {
    next(error)
  }
});

router.post('/clients', async (req, res, next) => {
  const { name, cif, street, streetNum, postalCode, country } = req.body;

  try {
    const client = await Clients.create({
      name,
      cif,
      address: {
        street,
        number: streetNum,
        postalCode,
        country,
      }
    });
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
},
);

router.put('/clients/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, cif, street, streetNum, postalCode, country } = req.body;
  try {
    const client = await Doc.findByIdAndUpdate(id, {
      name,
      cif,
      address: {
        street,
        number: streetNum,
        postalCode,
        country,
      }
    });
    res.status(200).json(client)
  } catch (error) {
    next(error)
  }
});

router.delete('/clients/:id', async (req, res, next) => {
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
    next(error)
  }
});

module.exports = router;
