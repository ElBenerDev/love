const mongoose = require('mongoose');

const momentSchema = new mongoose.Schema({
    couple: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Couple',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        enum: ['date', 'movie', 'gift', 'milestone', 'other'],
        required: true
    },
    photos: [{
        url: String,
        caption: String
    }],
    location: {
        name: String,
        coordinates: {
            latitude: Number,
            longitude: Number
        }
    },
    mood: {
        type: String,
        enum: ['happy', 'romantic', 'fun', 'peaceful', 'adventurous']
    },
    tags: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Moment', momentSchema);