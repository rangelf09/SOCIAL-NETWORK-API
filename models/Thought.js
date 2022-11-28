const { Schema, model } = require('mongoose');

const moment = require('moment');


const schemaReaction = new Schema (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        Username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm:a")
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);
const schemaThought = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm:a")
        },
        username: {
            type: String,
            required: true,
        },
        reaction: [schemaReaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

schemaThought.virtual('reactionCount').get(function(){
    return this.reaction.length;
});

const Thought = (model('Thought', schemaThought))

module.exports = Thought;