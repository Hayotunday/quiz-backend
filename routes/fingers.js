import express from "express";
import Fingers from '../models/fastestfinger.js'

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    await Fingers.find().populate('user')
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.post('/', async (req, res) => {
  try {
    // const newFingers = new Fingers({
    //   user: req.body.id,
    //   time: req.body.time
    // })

    // await newFingers.save()
    await Fingers.findOneAndUpdate(
      { user: req.body.id, },
      {
        time: req.body.time
      },
      { upsert: true }
    )
      .then((resp) => { return res.status(201).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.delete('/', async (req, res) => {
  try {
    await Fingers.deleteMany({})
      .then((resp) => { return res.sendStatus(200) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
})

export default router