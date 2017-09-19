const express = require('express');
kongreso = require('../controllers/kongreso');
const app = express();

var router = express.Router();

// kongreso routes
app.use('/', router);

app.route('/')
    .get(kongreso.getKongresoj);
app.route('/:id')
    .get(kongreso.getKongreso);
router.route('/:id/kromaj/')
    .get(kongreso.getKromaj);
router.route('/:id/aligxintoj')
    .get(kongreso.getAligxintoj);
router.route('/:id/aligxkotizoj')
    .get(kongreso.getAligxkotizoj);
router.route('/:id/programeroj')
    .get(kongreso.getProgrameroj);
router.route('/:id/programejoj')
    .get(kongreso.getProgramejoj);
router.route('/programkategorioj')
    .get(kongreso.getProgramkategorioj);


module.exports = app;
