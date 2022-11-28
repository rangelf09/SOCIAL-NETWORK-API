const router = require('express').Router();

const  {
    createThought,
    getThoughts,
    getOneThought,
    updateThought
} = require('../controllers/thought-controller');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).post(updateThought);

module.exports = router;