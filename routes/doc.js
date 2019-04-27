const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Doc = require('../models/doc');


router.get('/doc', async (req, res, next) => {
  try{
    const list = await Doc.find();
    console.log(list[0].data.client)
    return res.status(200).json(list)
  }catch(error){
    next(error)
  }
});

router.post('/doc', async (req, res, next) => {
    const { ref, name, nif, street, streetNum, postalCode, country, item, units, priceUnit} = req.body;

    try {
      const doc = await Doc.create({
        ref,
        data:{
          client:{
            name,
            nif,
            address:{
              street,
              number:streetNum,
              postalCode,
              country,
            }
          },
          service:{
            item,
            units,
            priceUnit,
          },
        }
      });
      res.status(200).json(doc);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/doc/:id', async (req, res, next) => {
  const {id} = req.params;
  const { ref, name, nif, street, streetNum, postalCode, country, item, units, priceUnit} = req.body;
  try {
    const doc = await Doc.findByIdAndUpdate(id,{
      ref,
        data:{
          client:{
            name,
            nif,
            address:{
              street,
              number:streetNum,
              postalCode,
              country,
            }
          },
          service:{
            item,
            units,
            priceUnit,
          },
        }
    });
    res.status(200).json(doc)
  } catch (error) {
    next(error)
  }
});

router.delete('/doc/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    // const docInit = await Doc.findById(id);
    // if (!docInit){
    //   res.status(500).send()
    // }else{
      const doc = await Doc.findByIdAndDelete(id);
      res.status(200).json(doc)
    // }
  } catch (error) {
    next(error)
  }
});

module.exports = router;