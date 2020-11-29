const Critica = require('../models/Critica');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

// Crea una nueva critica
exports.crearCritica = async (req, res) => {

    // Revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }
    

    try {

        // Extraer el proyecto y comprobar si existe
        const { proyecto } = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'})
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Creamos la critica
        const critica = new Critica(req.body);
        await critica.save();
        res.json({ critica });
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }

}

// Obtiene las criticas por proyecto
exports.obtenerCriticas = async (req, res) => {

        try {
            // Extraer el proyecto y comprobar si existe
            const { proyecto } = req.query;


            const existeProyecto = await Proyecto.findById(proyecto);
            if(!existeProyecto) {
                return res.status(404).json({msg: 'Proyecto no encontrado'})
            }

            // Revisar si el proyecto actual pertenece al usuario autenticado
            if(existeProyecto.creador.toString() !== req.usuario.id ) {
                return res.status(401).json({msg: 'No Autorizado'});
            }

            // Obtener las criticas por proyecto
            const criticas = await Critica.find({ proyecto }).sort({ creado: -1 });
            res.json({ criticas });

        } catch (error) {
            console.log(error);
            res.status(500).send('Hubo un error');
        }
}

//buscar critica por nombre
exports.obtenerCriticaPorNombre = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { nombre } = req.query;

        const existeCritica = await Critica.findOne({nombre});
            if(!existeCritica) {
                return res.status(404).json({msg: 'Critica no encontrada'})
            }

            /* // Revisar si el proyecto actual pertenece al usuario autenticado
            if(existeCritica.nombre.toString() !== req.usuario.id ) {
                return res.status(401).json({msg: 'No Autorizado'});
            } */

            // Obtener las criticas por proyecto
            const criticaBuSC = await Critica.find({ proyecto }).sort({ creado: -1 });
            res.json({ criticas });


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error') 
    }
}

// Actualizar una critica
exports.actualizarCritica = async (req, res ) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, detalle, fechaEnVerla, espectadores, calificacion } = req.body;


        // Si la critica existe o no
        let critica = await Critica.findById(req.params.id);

        if(!critica) {
            return res.status(404).json({msg: 'No existe esa critica'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        // Crear un objeto con la nueva información
        const nuevaCritica = {};
        nuevaCritica.nombre = nombre;
        nuevaCritica.detalle = detalle;
        nuevaCritica.fechaEnVerla = fechaEnVerla;
        nuevaCritica.espectadores = espectadores;
        nuevaCritica.calificacion = calificacion;

        // Guardar la critica
        critica = await Critica.findOneAndUpdate({_id : req.params.id }, nuevaCritica, { new: true } );

        res.json({ critica });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}


// Elimina una critica
exports.eliminarCritica = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto  } = req.query;

        // Si la critica existe o no
        let critica = await Critica.findById(req.params.id);

        if(!critica) {
            return res.status(404).json({msg: 'No existe esa critica'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar
        await Critica.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Critica Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error') 
    }
}

