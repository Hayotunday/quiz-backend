import express from "express";
import Player from '../models/player.js'

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    await Player.find()
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.get('/:id', async (req, res) => {
  try {
    await Player.findById(req.params.id)
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.post('/', async (req, res) => {
  try {
    const isExist = await Player.findOne({ email: req.body.id })

    if (isExist) return res.status(401).json({ message: "Player already registered!." })

    const newPlayer = new Player({
      user: req.body.id
    })

    await newPlayer.save()
      .then((resp) => { return res.status(201).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await Player.findByIdAndUpdate(req.params.id, {
      score: req.body.score,
      question: req.body.question
    })
      .then((resp) => { res.status(200).json(resp) })
      .catch((err) => { res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.patch('/disable/:id', async (req, res) => {
  try {
    await Player.updateMany({}, {
      enabled: false
    })
    await Player.findByIdAndUpdate(req.params.id, {
      enabled: true
    })
      .then((resp) => { res.status(200).json("Successful") })
      .catch((err) => { res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id)
      .then((resp) => { return res.sendStatus(200) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

export default router