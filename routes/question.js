import express from "express";
import Question from "../models/question.js";

const router = express.Router();


router.get('/', async (req, res) => {
  await Question.find()
    .then((resp) => { res.status(200).json(resp) })
    .catch((err) => { res.status(500).json(err) })
});

router.get('/:id', async (req, res) => {
  await Question.findById(req.params.id)
    .then((resp) => { res.status(200).json(resp) })
    .catch((err) => { res.status(500).json(err) })
});

router.post('/', async (req, res) => {
  const newQuestion = new Question({
    question: req.body.question,
    answers: req.body.answers,
    correct_answer: req.body.correct,
    category: req.body.category,
    level: req.body.level
  })

  await newQuestion.save()
    .then((resp) => { res.status(201).json(resp) })
    .catch((err) => { res.status(500).json(err) })
});

router.patch('/:id', async (req, res) => {
  await Question.findByIdAndUpdate({ _id: req.params.id }, {
    question: req.body.question,
    answers: req.body.answers,
    correct_answer: req.body.correct,
    category: req.body.category,
    level: req.body.level
  })
    .then((resp) => { res.status(200).json(resp) })
    .catch((err) => { res.status(500).json(err) })
});

router.delete('/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id)
    .then((resp) => { res.sendStatus(200) })
    .catch((err) => { res.status(500).json(err) })
});


// PROFILE TYPE ROUTES
router.get('/profile-type', async (req, res) => {
});

router.get('/profile-type/my-profile', async (req, res) => {
});

router.get('/profile-type/:id', async (req, res) => {
});

router.patch('/profile-type', async (req, res) => {
});

router.post('/profile-type/add', async (req, res) => {
});


// PASSWORD
router.patch('/password', async (req, res) => {
});

export default router