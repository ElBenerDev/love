const mongoose = require('mongoose');

const coupleSchema = new mongoose.Schema({
    partner1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    partner2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    anniversaryDate: {
        type: Date,
        required: true
    },
    goals: [{
        title: String,
        description: String,
        completed: { type: Boolean, default: false },
        dueDate: Date
    }],
    sharedAlbums: [{
        name: String,
        description: String,
        photos: [{
            url: String,
            caption: String,
            date: Date
        }]
    }],
    specialDates: [{
        title: String,
        date: Date,
        type: String,
        reminder: Boolean
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Couple', coupleSchema);