const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

router.get('/', async (req, res) => {
  try {
    const { planetId } = req.query;
    const query = planetId ? { planetId } : {};
    const locations = await Location.find(query).populate('planetId');
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate('planetId');
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const location = new Location(req.body);
  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/find-by-coordinates', async (req, res) => {
  try {
    const { planetId, latitude, longitude, threshold = 5 } = req.body;

    const locations = await Location.find({ planetId }).populate('planetId');

    const nearbyLocation = locations.find(loc => {
      const latDiff = Math.abs(loc.coordinates.latitude - latitude);
      const lonDiff = Math.abs(loc.coordinates.longitude - longitude);
      return latDiff <= threshold && lonDiff <= threshold;
    });

    if (!nearbyLocation) {
      return res.status(404).json({ message: 'No location found at these coordinates' });
    }

    res.json(nearbyLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('planetId');
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
