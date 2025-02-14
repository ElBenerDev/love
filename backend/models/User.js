const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    relationshipStartDate: Date,
    stats: {
        datesCount: { type: Number, default: 0 },
        moviesWatched: { type: Number, default: 0 },
        iLoveYouCount: { type: Number, default: 0 },
        giftsGiven: { type: Number, default: 0 }
    },
    notifications: [{
        message: String,
        date: Date,
        read: { type: Boolean, default: false }
    }],
    achievements: [{
        name: String,
        date: Date,
        description: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);