const { Schema, model } = require('mongoose');

const schemaUser = new Schema (
    {
        username: {
            type: String, 
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Does not match any email'],
        },
        thought:[
             {
            type: Schema.Types.ObjectId,
            reference: 'Thought'
        },
    ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            reference: 'User'
        },
    ],
    },

    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

schemaUser.virtual('friendCount').get(function() {
    return this.friends.lenght;

});

const User = model('User', schemaUser);

module.exports = User;