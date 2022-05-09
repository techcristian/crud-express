const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async(req, res) => {
    console.log(req.body);
    const { title, description } = (req.body);
    const errors = [];
    if (!title) {
        errors.push({ text: 'please insert a title' });
    }
    if (!description) {
        errors.push({ text: 'please insert a description' })
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'Nota guardada exitosamente');
        res.redirect('/notes');
    }
});

router.get('/notes', isAuthenticated, async(req, res) => {
    await Note.find({ user: req.user.id }).sort({ date: 'desc' })
        .then(documentos => {
            const contexto = {
                notes: documentos.map(documento => {
                    return {
                        title: documento.title,
                        description: documento.description,
                        id: documento.id
                    }
                })
            }
            res.render('notes/all-notes', { notes: contexto.notes })
        })
});
//ruta hacia el form de editar nota
router.get('/notes/edit/:id', isAuthenticated, async(req, res) => {
    const note = await Note.findById(req.params.id);

    const nada = Object.assign({}, note);
    res.render('notes/edit-note', { nada });
});

//ruta que viene del form desde donde le pasamos los datos para editar
router.put('/notes/edit-note/:id', isAuthenticated, async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'nota editada exitosamente');
    res.redirect('/notes');
});

// ruta que borra notas
router.delete('/notes/delete/:id', isAuthenticated, async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Nota borrada exitosamente');
    res.redirect('/notes');
});





module.exports = router;