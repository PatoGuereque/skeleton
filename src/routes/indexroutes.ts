/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';

const router = express();

// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.
router.get('/', (_req, res) => {
  res.render('index');
});

// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post. Una vez enviada la tarea podemos redireccionar a la pagina principal con res.redirect('/')
router.post('/add', (req, res) => {});

// Ruta para editar los datos. Primero necesitamos buscarlos en base a un id que ya me llega desde la ruta. Metodo de busqueda findById().
// Los editaremos en una pagina aparte llamada 'edit'
router.get('/edit/:id', (req, res) => {});

// Ruta para efectuar la actualizacion de los datos utilizando el metodo update()
router.post('/edit/:id', (req, res) => {});

// Esta ruta permita modificar el estatus de una tarea por medio de su propiedad status.
// Necesitamos buscar el task en la BD por medio de findById, una vez encontrado el registro hay que modificar el status y guardar con save().
router.get('/turn/:id', (req, res, next) => {});

// Ruta que nos permita eliminar tareas con el método "deleteOne"
router.get('/delete/:id', (req, res) => {});

export { router };
