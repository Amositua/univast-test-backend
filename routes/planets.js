const express = require('express');
const router = express.Router();
const Planet = require('../models/Planet');

router.get('/', async (req, res) => {
  try {
    const planets = await Planet.find().sort({ order: 1 });
    res.json(planets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    res.json(planet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const planet = new Planet(req.body);
  try {
    const newPlanet = await planet.save();
    res.status(201).json(newPlanet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    res.json(planet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByIdAndDelete(req.params.id);
    if (!planet) {
      return res.status(404).json({ message: 'Planet not found' });
    }
    res.json({ message: 'Planet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
