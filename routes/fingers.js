import express from "express";
import Fingers from '../models/fastestfinger.js'

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    await Fingers.find()
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.post('/', async (req, res) => {
  try {
    const newFingers = new Fingers({
      user: req.body.id,
      time: req.body.time
    })

    await newFingers.save()
      .then((resp) => { return res.status(201).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

export default router