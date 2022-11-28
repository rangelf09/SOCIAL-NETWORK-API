const { Thought, User } = require('../models');


const thoughtController = {
// create thought
createThought (req, res) {
    Thought.create(req, body)
    .then((thought)=>{
        return User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: {thoughts: thought._id} },
            {new: true}
        );
    })
    .then((user)=>{
    if(!user) {
        return res.status(400).json({message: 'No user found with this id!'})
    }
    res.json({messgae: 'Created thought'});
})
.catch((err) => {
    console.log(err);
    res.status(500).json(err);
});
},

// get all thought
getThoughts(req, res) {
    Thought.find() 
    .then((thought)=>{
        res.json(thought);
    })
    .catch ((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

// get single thought
getOneThought (req, res) {
    Thought.findOne({ _id:req.params.thoughtId})
    .then((thought) => {
        if(!thought) {
            return res.status(400).json({message: 'No thought find with this ID!'})
        }
        res.json(thought);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
},

// update thought
updateThought (req, res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        {runValidators: true, new: true}
    )
   .then((thought)=>{
    if(!thought) {
        return res.status(400).json({message: 'No thought find with this ID!'})
    }
    res.json(thought);
   })
   .catch((err) => {
        console.log(err);
        res.status(500).json(err);
   });
},

// create reaction 
createReaction (req,res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {runValidators: true, new: true}
    )
    .then((thought) => {
        if(!thought) {
            return res.status(404).json({message: "No thought find with this ID!"});
        }
        res.json(thought);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    },
// remove reaction 
createReaction (req,res) {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: req.body}},
        {runValidators: true, new: true}
    )
    .then((thought) => {
        if(!thought) {
            return res.status(404).json({message: "No thought find with this ID!"});
        }
        res.json(thought);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
    },
};


module.exports = thoughtController;