import express from "express";
import Game from "../models/game.js";
import Question from "../models/question.js";
import Player from "../models/player.js";

const router = express.Router();

router.get('/reveal', async (req, res) => {
  try {
    const presentGame = await Game.findOne()

    await Question.findById(req.params.id)
      .then((resp) => { return res.status(200).json(resp.correct_answer) })
      .catch((err) => { return res.status(500).json(err) })
  } catch (error) {
    return res.sendStatus(500)
  }
});



router.post('/next', async (req, res) => {
  const {playerId, passed} = req.body
  try {
    const presentPlayer = await Player.findById(playerId)

    const { user, enabled, level, numOfLoss } = presentPlayer

    if (!passed && numOfLoss >= 2) {
      await Player.findByIdAndUpdate(playerId, {disqualified: true})
      .then(() => {return res.status(200).json({message: "PLAYER DISQUALIFIED!"})})
      .catch(err => {return res.status(500).json({error: err})})
    }

    if (!passed && numOfLoss < 2) {
      let newLevel

      if (level >= 1 && level <= 5) {
        newLevel = 1
      } else if (level > 5 && level <= 11) {
        newLevel = 6
      } else if (level > 11 && level <= 15) {
        newLevel = 12
      }
      await Player.findByIdAndUpdate(playerId, {
        level: newLevel,
        numOfLoss: numOfLoss + 1
      })
      .then(() => {return res.status(200).json({message: "PLAYER ADVANCED!"})})
      .catch(err => {return res.status(500).json({error: err})})
    }
 
    if (passed && numOfLoss < 2) {
      const newLevel = level + 1
      await Player.findByIdAndUpdate(playerId, {
        level: newLevel
      })
      .then(() => {return res.status(200).json({message: "PLAYER ADVANCED!"})})
      .catch(err => {return res.status(500).json({error: err})})
    }

  } catch (error) {
    return res.sendStatus(500)
  }
});
