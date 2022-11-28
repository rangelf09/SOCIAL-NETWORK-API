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
        thoughts:[
             {
            type: Schema.Types.array_id,
            reference: 'Thought'
        },
    ],
        friends: [
            {
            type: Schema.Types.array_id,
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

schemaUser.virtuals('friendCount').get(function() {
    return this.friends.lenght;

});

const User = model('User', schemaUser);

module.exports = User;