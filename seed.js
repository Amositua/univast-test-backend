const mongoose = require('mongoose');
const Planet = require('./models/Planet');
const Location = require('./models/Location');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vr_planets';

const seedPlanets = [
  {
    name: 'earth',
    title: 'Our Home\nEarth',
    description: 'Planet Earth is the third planet from the Sun in our solar system. It is a unique and diverse world, home to a wide variety of life forms. The Earth has a dynamic atmosphere that sustains life, vast oceans, and diverse landscapes much of its landmass, and a remarkable and beautiful planet.',
    imageUrl: 'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg',
    category: 'Our Home',
    order: 1,
    facts: [
      { label: 'Distance from Sun', value: '149.6 million km' },
      { label: 'Diameter', value: '12,742 km' },
      { label: 'Mass', value: '5.972 × 10^24 kg' },
      { label: 'Gravity', value: '9.807 m/s²' }
    ]
  },
  {
    name: 'mars',
    title: 'Red Land\nMars',
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often referred to as the "Red Planet" due to its reddish appearance caused by iron oxide on its surface.',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA03620/PIA03620~small.jpg',
    category: 'Red Land',
    order: 2,
    facts: [
      { label: 'Distance from Sun', value: '227.9 million km' },
      { label: 'Diameter', value: '6,779 km' },
      { label: 'Mass', value: '6.39 × 10^23 kg' },
      { label: 'Gravity', value: '3.721 m/s²' }
    ]
  },
  {
    name: 'saturn',
    title: 'Beautiful Planet\nSaturn',
    description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It is best known for its spectacular ring system, which is made up of ice particles and rocky debris.',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA03161/PIA03161~medium.jpg',
    category: 'Beautiful Planet',
    order: 3,
    facts: [
      { label: 'Distance from Sun', value: '1.4 billion km' },
      { label: 'Diameter', value: '116,460 km' },
      { label: 'Mass', value: '5.683 × 10^26 kg' },
      { label: 'Gravity', value: '10.44 m/s²' }
    ]
  },
  {
    name: 'jupiter',
    title: 'Giant Planet\nJupiter',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets combined.',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA22946/PIA22946~medium.jpg',
    category: 'Giant Planet',
    order: 4,
    facts: [
      { label: 'Distance from Sun', value: '778.5 million km' },
      { label: 'Diameter', value: '139,820 km' },
      { label: 'Mass', value: '1.898 × 10^27 kg' },
      { label: 'Gravity', value: '24.79 m/s²' }
    ]
  },
   // 5. Mercury
  {
    name: 'mercury',
    title: 'Swift Planet\nMercury',
    description:
      'Mercury is the smallest planet and closest to the Sun. It has a rocky, cratered surface similar to Earth’s moon. NASA’s MESSENGER spacecraft mapped Mercury in high detail.',
    imageUrl: 'https://svs.gsfc.nasa.gov/vis/a030000/a030300/a030340/mercury-messenger_print.jpg',
    category: 'Swift Planet',
    order: 5,
    facts: [
      { label: 'Distance from Sun', value: '57.9 million km' },
      { label: 'Diameter', value: '4,879 km' },
      { label: 'Mass', value: '3.30 × 10^23 kg' },
      { label: 'Gravity', value: '3.7 m/s²' }
    ]
  },

  // 6. Venus
  {
    name: 'venus',
    title: 'Cloudy Planet\nVenus',
    description:
      'Venus is the second planet and is similar in size to Earth but covered by thick, toxic clouds. Surface temperatures exceed 460°C, making it the hottest planet.',
    imageUrl: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/pia00271/PIA00271~large.jpg',
    category: 'Cloudy Planet',
    order: 6,
    facts: [
      { label: 'Distance from Sun', value: '108.2 million km' },
      { label: 'Diameter', value: '12,104 km' },
      { label: 'Mass', value: '4.87 × 10^24 kg' },
      { label: 'Gravity', value: '8.87 m/s²' }
    ]
  },

  // 7. Uranus
  {
    name: 'uranus',
    title: 'Ice Giant\nUranus',
    description:
      'Uranus is an ice giant with a pale blue color due to methane in its atmosphere. It rotates on its side, making its seasons extreme. Voyager 2 captured the best images of Uranus.',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA18182/PIA18182~medium.jpg',
    category: 'Ice Giant',
    order: 7,
    facts: [
      { label: 'Distance from Sun', value: '2.87 billion km' },
      { label: 'Diameter', value: '50,724 km' },
      { label: 'Mass', value: '8.68 × 10^25 kg' },
      { label: 'Gravity', value: '8.69 m/s²' }
    ]
  },

  // 8. Neptune
  {
    name: 'neptune',
    title: 'Windy Planet\nNeptune',
    description:
      'Neptune is the farthest known planet from the Sun. It has deep blue coloration and the fastest winds in the Solar System, reaching over 2,000 km/h.',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA01492/PIA01492~medium.jpg',
    category: 'Windy Planet',
    order: 8,
    facts: [
      { label: 'Distance from Sun', value: '4.50 billion km' },
      { label: 'Diameter', value: '49,244 km' },
      { label: 'Mass', value: '1.02 × 10^26 kg' },
      { label: 'Gravity', value: '11.15 m/s²' }
    ]
  },

  // 9. Pluto (Dwarf Planet)
  {
    name: 'pluto',
    title: 'Dwarf Planet\nPluto',
    description:
      'Pluto is a dwarf planet in the Kuiper Belt. NASA’s New Horizons mission provided the first close-up images of Pluto’s icy mountains and heart-shaped region.',
    imageUrl: 'https://images-assets.nasa.gov/image/PIA19952/PIA19952~medium.jpg',
    category: 'Dwarf Planet',
    order: 9,
    facts: [
      { label: 'Distance from Sun', value: '5.9 billion km (average)' },
      { label: 'Diameter', value: '2,377 km' },
      { label: 'Mass', value: '1.31 × 10^22 kg' },
      { label: 'Gravity', value: '0.62 m/s²' }
    ]
  }
];

const seedLocations = async (earthId) => [
  {
    planetId: earthId,
    name: 'Mount Everest',
    coordinates: { latitude: 27.9881, longitude: 86.9250 },
    description: 'The highest mountain on Earth, standing at 8,848.86 meters above sea level. Located in the Himalayas on the border between Nepal and Tibet.',
    imageUrl: 'https://images.pexels.com/photos/2743287/pexels-photo-2743287.jpeg',
    facts: [
      { label: 'Height', value: '8,848.86 m' },
      { label: 'First Summit', value: '1953' },
      { label: 'Location', value: 'Nepal/Tibet' }
    ]
  },
  {
    planetId: earthId,
    name: 'Amazon Rainforest',
    coordinates: { latitude: -3.4653, longitude: -62.2159 },
    description: 'The world\'s largest tropical rainforest, covering approximately 5.5 million square kilometers across nine countries in South America.',
    imageUrl: 'https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg',
    facts: [
      { label: 'Area', value: '5.5 million km²' },
      { label: 'Countries', value: '9' },
      { label: 'Biodiversity', value: '10% of species' }
    ]
  },
  {
    planetId: earthId,
    name: 'Great Barrier Reef',
    coordinates: { latitude: -18.2871, longitude: 147.6992 },
    description: 'The world\'s largest coral reef system, located in the Coral Sea off the coast of Queensland, Australia. It can be seen from space.',
    imageUrl: 'https://images.pexels.com/photos/2404370/pexels-photo-2404370.jpeg',
    facts: [
      { label: 'Length', value: '2,300 km' },
      { label: 'Area', value: '344,400 km²' },
      { label: 'Coral Species', value: '400+' }
    ]
  },
  {
    planetId: earthId,
    name: 'Sahara Desert',
    coordinates: { latitude: 23.8065, longitude: 11.2887 },
    description: 'The world\'s largest hot desert, covering most of North Africa. It spans approximately 9 million square kilometers.',
    imageUrl: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg',
    facts: [
      { label: 'Area', value: '9 million km²' },
      { label: 'Temperature', value: 'Up to 58°C' },
      { label: 'Age', value: '2-3 million years' }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await Planet.deleteMany({});
    await Location.deleteMany({});
    console.log('Cleared existing data');

    const planets = await Planet.insertMany(seedPlanets);
    console.log('Seeded planets');

    const earthPlanet = planets.find(p => p.name === 'earth');
    if (earthPlanet) {
      const locations = await seedLocations(earthPlanet._id);
      await Location.insertMany(locations);
      console.log('Seeded locations');
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
