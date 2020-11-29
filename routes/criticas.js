const express = require('express');
const router = express.Router();
const criticaController = require('../controllers/criticaController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// crear una critica
// api/critica
router.post('/', 
    auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('detalle', 'El Nombre es obligatorio').not().isEmpty(),
        check('fechaEnVerla', 'El Nombre es obligatorio').not().isEmpty(),
        check('espectadores', 'El Nombre es obligatorio').not().isEmpty(),
        check('calificacion', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty()
    ],
    criticaController.crearCritica 
);

// Obtener las criticas por proyecto
router.get('/',
    auth,
    criticaController.obtenerCriticas
);

// Actualizar critica
router.put('/:id', 
    auth,
    criticaController.actualizarCritica
);

// Eliminar critica
router.delete('/:id', 
    auth,
    criticaController.eliminarCritica
);

module.exports = router;

// buscar critica por nombre
router.get('/',
    auth,
    criticaController.obtenerCriticaPorNombre
);