const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Doc = require('../models/doc');
const { isLoggedIn } = require('../helpers/middelwares');


router.get('/', isLoggedIn(), async (req, res, next) => {
  try {
    const list = await Doc.find();
    return res.status(200).json(list)
  } catch (error) {
    next(error)
  }
});

router.get('/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    const doc = await Doc.findById(id);
    return res.status(200).json(doc);
  } catch (error) {
    next(createError(404))
  }
});

router.post('/', isLoggedIn(), async (req, res, next) => {
  const { status, items } = req.body;
  const clientId = req.body.clientId ? req.body.clientId : undefined;

  try {
    if (clientId) {
      const doc = await Doc.create({
        status,
        data: {
          clientId,
        },
        items: items
      });
      res.status(200).json(doc);
    } else {
      const { name, cif, street, streetNum, postalCode, country } = req.body;
      const doc = await Doc.create({
        status,
        data: {
          client: {
            name,
            cif,
            address: {
              street,
              streetNum,
              postalCode,
              country,
            }
          },
          items: items
        }
      });
      res.status(200).json(doc);
    }

  } catch (error) {
    next(createError(404))
  }
},
);

router.put('/:id', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const clientId = req.body.clientId ? req.body.clientId : false;

  try {
    const actualDoc = await Doc.findById(id);
    if (actualDoc.status === "draft") {
      if (clientId) {
        const doc = await Doc.findByIdAndUpdate(id, {
          status,
          clientId,
          data: {
            items: items
          }
        });
        res.status(200).json(doc)
      } else {
        const { name, status, cif, street, streetNum, postalCode, country, items } = req.body;
        const doc = await Doc.findByIdAndUpdate(id, {
          status,
          data: {
            client: {
              name,
              cif,
              address: {
                street,
                streetNum,
                postalCode,
                country,
              }
            },
            items: items
          }
        });
        res.status(200).json(doc);
      }
    }
    else {
      next(createError(500))
      // res.status(500).json(doc)
    }
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
    const doc = await Doc.findByIdAndDelete(id);
    res.status(200).json(doc)
    // }
  } catch (error) {
    next(createError(404))
  }
});

module.exports = router;
