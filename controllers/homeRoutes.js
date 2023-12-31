const router = require('express').Router();
const sequelize = require('../config/connection');
const dayjs = require('dayjs');
const Highscore = require('../models/Highscore');
const Map = require('../models/Map');
const User = require('../models/User');
const Tile = require('../models/Tile')

// Send the rendered Handlebars.js template back as the response
router.get('/login', async (req, res) => {
    res.render('login');
  });

// Send the highscores for specific map id
router.get('/highscores/:id', async (req, res) => {
  res.cookie('user', 1, { expires: new Date(Number(new Date()) + 300000)})
  try {
    // find map by its id
    // include highscores along with their owners
    const scoreData = await Map.findOne({ 
      where: { id: req.params.id },
      include: {model: Highscore, include: { model: User, attributes: ['user_name']}},
      order: sequelize.literal('score ASC')
    });

    // map highscores and send them to highscores.handlebars template
    const highscores = scoreData.highscores.map((score) => score.get({plain: true}));
    const mapData = scoreData.get({plain: true})

    highscores.map((score) => score.score = dayjs(score.score).format('mm:ss.SSS')) 
    // res.json(highscores)
    res.render('highScore', { highscores, mapData })  

  } catch (err) {
    res.json(err);
  }

});

// Send the rendered Handlebars.js template back as the response
router.get('/room/', async (req, res) => { 
  res.cookie('user', 1, { expires: new Date(Number(new Date()) + 300000)})
  try {
    const mapData = await Map.findOne({
      where: { id: req.session.map},
      include: {model: Tile, where: { x: req.session.x, y: req.session.y }}
    })

    // const Data = mapData.get({plain: true})

    const newTile = mapData.tiles[0].get({plain: true})
    res.render('room', { newTile });
    // res.json(mapData.tiles[0])
  } catch (err) {
    res.status(400).json(err)
  }
});

  router.get('/', async (req, res) => {
    // Send the rendered Handlebars.js template back as the response
    res.cookie('user', 1, { expires: new Date(Number(new Date()) + 300000)})

    try {
      const mapData = await Map.findAll()

      const maps = mapData.map((map) => map.get({plain: true}));
      res.render('mazeSelect', { maps })
    } catch (err) {
      res.json(err)
    }
    // res.render('enterGame');
  });

  router.get('/highscores', async (req, res) => {
    res.cookie('user', 1, { expires: new Date(Number(new Date()) + 300000)})

    // Send the rendered Handlebars.js template back as the response
    res.render('highScore');
  });


module.exports = router;
