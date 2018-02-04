const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser');

const config = require('../config');
const {GymGoerModel} = new require('../models/GymGoerModel');
const {routerUtils} = require('./routerUtils');

const createAuthToken = function(gymGoer) {
  return jwt.sign({gymGoer}, config.JWT_SECRET, {
    subject: gymGoer.email,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};
const jwtAuth = passport.authenticate('jwt', { session: false });
const localAuth = passport.authenticate('local', {session: false});

router.get('/', (req, res) => {
  const filters = routerUtils.getFilters(req.query, ['email']);
  const limit = routerUtils.getLimit(req.query, 10);

  GymGoerModel
    .find(filters)
    .limit(limit)
    .then(results => {
      res.json({
        gymGoers: results.map((gymGoer) => {
          return gymGoer.serialize();
        })
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({message: 'Internal Server Error'});
    });
});

router.get('/:id', [cookieParser(), jwtAuth], (req, res) => {
  GymGoerModel
    .findById(req.params.id)
    .then(gymGoer => {
      if (gymGoer) {
        res.status(200).json(gymGoer.serializeAll());
      } else {
        console.error(`Cannot GET gym goer. Invalid id supplied (${req.params.id})`);
        res.status(400).json({ error: 'Invalid id supplied' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        console.error(`Cannot GET gym goer. Invalid id supplied (${req.params.id})`);
        res.status(400).json({ error: 'Invalid id supplied' });
      }
      console.error('ERROR:', err);
      res.status(500).json({message: 'Internal Server Error'});
    });
});

router.post('/login', [jsonParser, localAuth], (req, res) => {
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

module.exports = router;