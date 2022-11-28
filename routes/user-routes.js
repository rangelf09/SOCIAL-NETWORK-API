const router = require('express').Router();

const {
    createUser,
    getUsers,
    getOneUser,
    updateUser,
} = require('../controllers/user-contoller');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).put(updateUser);

module.exports = router;