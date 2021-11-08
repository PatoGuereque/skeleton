import express from 'express';
import { isValidObjectId } from 'mongoose';
import TaskModel from '../db/models/task';

const router = express();

// Nos regresaria las tareas guardadas en la BD con el método find(). Una vez obtenidas las tareas las regresamos a la pagina principal.
router.get('/', async (_req, res) => {
  const tasks = await TaskModel.find();
  res.render('index', {
    tasks,
  });
});

// Ruta que nos permita agregar nuevas tareas que vienen desde un metodo post. Una vez enviada la tarea podemos redireccionar a la pagina principal con res.redirect('/')
router.post('/add', async (req, res) => {
  const { title, description } = req.body;
  const task = new TaskModel({
    title,
    description,
  });

  await task.save();
  return res.redirect('/');
});

// Ruta para editar los datos. Primero necesitamos buscarlos en base a un id que ya me llega desde la ruta. Metodo de busqueda findById().
// Los editaremos en una pagina aparte llamada 'edit'
router.get('/edit/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  const task = await TaskModel.findById(id);

  if (!task) {
    return res.status(400).json({
      status: 'error',
      message: `id ${id} not found!`,
    });
  }

  return res.render('edit', {
    task,
  });
});

// Ruta para efectuar la actualizacion de los datos utilizando el metodo update()
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  const task = await TaskModel.findById(id);

  if (!task) {
    return res.status(400).json({
      status: 'error',
      message: `id ${id} not found`,
    });
  }

  task.title = title;
  task.description = description;

  await task.save();
  return res.redirect('/');
});

// Esta ruta permita modificar el estatus de una tarea por medio de su propiedad status.
// Necesitamos buscar el task en la BD por medio de findById, una vez encontrado el registro hay que modificar el status y guardar con save().
router.get('/turn/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  const task = await TaskModel.findById(id);

  if (!task) {
    return res.status(400).json({
      status: 'error',
      message: `id ${id} not found`,
    });
  }

  task.status = !task.status;

  await task.save();
  return res.redirect('/');
});

// Ruta que nos permita eliminar tareas con el método "deleteOne"
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: `Invalid id ${id}!`,
    });
  }

  await TaskModel.findByIdAndDelete(id);
  return res.redirect('/');
});

export { router };
