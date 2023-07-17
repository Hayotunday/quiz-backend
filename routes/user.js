import express from "express";
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    await User.find()
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.get('/:id', async (req, res) => {
  try {
    await User.findById(req.params.id)
      .then((resp) => { return res.status(200).json(resp) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.post('/register', async (req, res) => {

  try {
    // const salt = 12
    // const pass = await bcrypt.hash(req.body.password, salt)

    const isExist = await User.findOne({ email: req.body.email })

    if (isExist) return res.status(401).json({ message: "Email already used. Please use a different email to register." })

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      church: req.body.church,
      email: req.body.email,
      password: req.body.password,
      // password: pass,
      // why: value
    })

    await newUser.save()
      .then((user) => { return res.status(201).json({ user, message: "Successfully saved" }) })
      .catch((err) => { console.log(err); return res.status(500).json(err) })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error)
  }
});

router.post('/login', async (req, res) => {
  try {
    const result = await User.findOne({ email: req.body.email })
    if (!result) return res.status(401).json({ message: "User not found!" })

    // compare password
    // const checkPassword = await bcrypt.compare(req.body.password, result.password)
    const checkPassword = (req.body.password === result.password)

    // incorrect password
    if (!checkPassword || result.email !== req.body.email) {
      // "User Email or Password doesn't match" 401
      return res.status(401).json({ message: "User Email or Password doesn't match" })
    }
    return res.status(200).json(result)
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      church: req.body.church,
      why: req.body.why
    })
      .then((resp) => { res.status(200).json(resp) })
      .catch((err) => { res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
      .then((resp) => { return res.sendStatus(200) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});

export default router