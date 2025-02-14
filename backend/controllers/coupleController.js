const Couple = require('../models/Couple');
const User = require('../models/User');
const Moment = require('../models/Moment');

exports.createCouple = async (req, res) => {
    try {
        const { partnerId, anniversaryDate } = req.body;
        const userId = req.user.id;

        // Verificar que ambos usuarios existan
        const [user1, user2] = await Promise.all([
            User.findById(userId),
            User.findById(partnerId)
        ]);

        if (!user1 || !user2) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Crear la pareja
        const couple = new Couple({
            partner1: userId,
            partner2: partnerId,
            anniversaryDate
        });

        await couple.save();

        // Actualizar referencias en usuarios
        user1.partner = partnerId;
        user2.partner = userId;
        await Promise.all([user1.save(), user2.save()]);

        res.json(couple);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

exports.addMoment = async (req, res) => {
    try {
        const { title, description, type, photos, location, mood, tags } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user.partner) {
            return res.status(400).json({ message: 'Necesitas tener una pareja para añadir momentos' });
        }

        const couple = await Couple.findOne({
            $or: [
                { partner1: userId, partner2: user.partner },
                { partner1: user.partner, partner2: userId }
            ]
        });

        const moment = new Moment({
            couple: couple._id,
            title,
            description,
            type,
            photos,
            location,
            mood,
            tags
        });

        await moment.save();

        // Actualizar estadísticas
        if (type === 'date') user.stats.datesCount++;
        if (type === 'movie') user.stats.moviesWatched++;
        await user.save();

        res.json(moment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};