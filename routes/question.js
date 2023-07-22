import express from "express";
import Question from "../models/question.js";

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    await Question.find()
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.get('/generate', async (req, res) => {
  try {
    const questions = await Question.find({ level: req.body.level })
    if (!questions) return res.status(200).json("No Question found!")

    return res.status(200).json(questions[(Math.floor(Math.random() * questions.length))])
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.get('/:id', async (req, res) => {
  try {
    await Question.findById(req.params.id)
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.post('/', async (req, res) => {
  try {
    const newQuestion = new Question({
      question: req.body.question,
      answers: req.body.answers,
      correct_answer: req.body.correct,
      category: req.body.category,
      level: req.body.level
    })

    await newQuestion.save()
      .then((resp) => { return res.status(201).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await Question.findByIdAndUpdate({ _id: req.params.id }, {
      question: req.body.question,
      answers: req.body.answers,
      correct_answer: req.body.correct,
      category: req.body.category,
      level: req.body.level
    })
      .then((resp) => { res.status(200).json(resp) })
      .catch((err) => { res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id)
      .then((resp) => { return res.sendStatus(200) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

export default router