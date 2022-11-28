const {User} = require('../models');

const userContoller = {
    // creating a new user
    createUser(req, res){
        User.create(req.body)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get all user
    getUsers(req, res) {
        User.find()
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // get single user
    getOneUser (req,res) {
        User.findOne({_id: req.parsms.userId})
        .populate('though')
        .populate('friends')
        .select('-__V')
        .then((user) => {
            if(!user) {
                return res.status(404).json({ message: 'No id found!'});
            }
            res.json(user);
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // update user
    updateUser (req,res) {
        User.findOneAndUpdate(
            {_id: req.parsms.userId},
            {$set:req.body},
            {runValidators: true, new:true}
        )
        .then((user) =>{
            if(!user) {
                return res.status(404).json({ message: 'No id found!'});
            }
            res.json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    // add friends
    addFriends (req,res) {
        User.FindOneAndUpdate (
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {runValidators: true, new:true}
        )
        .then((user) =>{
            if(!user) {
                return res.status(404).json({ message: 'No id found!'});
            }
            res.json(user);
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
    },
    // remove friends
    removeFriends (req,res) {
        User.FindOneAndUpdate (
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new:true}
        )
        .then((user) =>{
            if(!user) {
                return res.status(404).json({ message: 'No id found!'});
            }
            res.json(user);
        })
        .catch((err) =>{
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userContoller;