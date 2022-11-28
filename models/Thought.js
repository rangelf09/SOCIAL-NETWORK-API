const { Schema, model } = require('mongoose');


const schemaThought = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

schemaThought.virtuals('reactionCount').get(function(){
    return this.reaction.length;
});

const Thought = (model('Thought', schemaThought))

module.exports = Thought;