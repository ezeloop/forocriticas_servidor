const mongoose = require('mongoose');

const CriticaSchema = mongoose.Schema({
    nombre: {
        type: String, 
        required: true,
        trim: true
    },
    detalle: {
        type: String,
        required: true,
        trim: true
    },
    yearMovie: {
        type: Date,
        
    },
    posterMovie: {
        type: String,

    },
    fechaEnVerla: {
        type: Date,
        required: true
    },
    espectadores: {
        type: String,
        required: true,
        trim: true
    },
    calificacion: {
        type: Number,
        required: true,
        trim: true
    },
    /* estado: {
        type: Boolean,
        default: false
    }, */
    creado: {
        type: Date,
        default: Date.now()
    }, 
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    }
});

module.exports = mongoose.model('Critica', CriticaSchema);