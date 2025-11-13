# VR Planets Backend API

RESTful API for the VR Planets mobile application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Configure environment variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vr_planets
```

4. Seed the database:
```bash
node seed.js
```

5. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### Planets

**Get all planets**
```
GET /api/planets
```

**Get planet by ID**
```
GET /api/planets/:id
```

**Create planet**
```
POST /api/planets
Content-Type: application/json

{
  "name": "earth",
  "title": "Our Home\nEarth",
  "description": "Planet Earth is...",
  "imageUrl": "https://...",
  "category": "Our Home",
  "order": 1,
  "facts": [
    { "label": "Distance", "value": "149.6M km" }
  ]
}
```

#### Locations

**Get all locations**
```
GET /api/locations
```

**Get locations by planet**
```
GET /api/locations?planetId=:planetId
```

**Find location by coordinates**
```
POST /api/locations/find-by-coordinates
Content-Type: application/json

{
  "planetId": "507f1f77bcf86cd799439011",
  "latitude": 27.9881,
  "longitude": 86.9250,
  "threshold": 5
}
```

## Models

### Planet Schema
```javascript
{
  name: String,
  title: String,
  description: String,
  imageUrl: String,
  category: String,
  order: Number,
  facts: [{ label: String, value: String }]
}
```

### Location Schema
```javascript
{
  planetId: ObjectId,
  name: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  description: String,
  imageUrl: String,
  facts: [{ label: String, value: String }]
}
```
