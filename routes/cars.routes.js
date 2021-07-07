const express = require('express');

const knex = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cars = await knex.select('*').from('cars');
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: `Error retrieving cars from the database` });
  }
});

router.post('/', async (req, res) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    res.status(400).json({ message: `Car vin required` });
  } else if (!make) {
    res.status(400).json({ message: `Car make required` });
  } else if (!model) {
    res.status(400).json({ message: `Car model required` });
  }
  else if (!mileage) {
    res.status(400).json({ message: `Car mileage required` });
  }
  else if (typeof mileage !== 'number') {
    res.status(400).json({ message: `Car mileage type must be number` });
  } else {
    try {
      const carExists = await (await knex.select('vin').from('cars')).find(
        n => n.vin === vin
      );
      if (carExists) {
        res.status(400).json({ message: `Car with vin # ${vin} already exists.` });
      } else {
        try {
          const newCar = await knex.insert(req.body, 'id').into('cars');
          const car = await knex
            .select('*')
            .from('cars')
            .where('id', '=', newCar[0])
            .first();
          console.log(newCar[0], car);
          res.status(200).json(car);
        } catch (error) {
          res.status(500).json({ message: `Error retrieving cars from the database` });
        }
      }
    } catch (error) {
      res.status(500).json({ message: `Error validating unique vin of car` });
    }
  }
});

module.exports = router