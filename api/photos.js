/**
 * /api/photos.js  — Vercel serverless endpoint
 *
 * Returns author metadata + an array of 15 photo objects.
 * Run locally with: vercel dev
 * Access at:        http://localhost:3000/api/photos
 */

module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  const data = {
    author: {
      name: "Mara Solano",
      image: "https://i.pravatar.cc/150?img=47",
      userSince: "2019-04-12",
      channel: "mara.in.the.wild"
    },
    photos: [
      {
        id: 1,
        title: "Golden Hour on the Ridge",
        description: "Caught this light just before it vanished behind the treeline. Worth the 4 a.m. alarm.",
        dateTaken: "2023-07-14",
        thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90"
      },
      {
        id: 2,
        title: "Fog Over the Valley",
        description: "A slow morning fog rolling through. No filter — the world just looked like this.",
        dateTaken: "2023-08-02",
        thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=90"
      },
      {
        id: 3,
        title: "Desert Bloom",
        description: "After the rain, the desert surprises you. These wildflowers showed up overnight.",
        dateTaken: "2023-03-21",
        thumbnail: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=90"
      },
      {
        id: 4,
        title: "Still Water",
        description: "A lake that barely moves. You can hear the silence.",
        dateTaken: "2023-05-09",
        thumbnail: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200&q=90"
      },
      {
        id: 5,
        title: "The Old Lighthouse",
        description: "Decommissioned in 1987, still standing like it owns the coastline.",
        dateTaken: "2023-09-30",
        thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=90"
      },
      {
        id: 6,
        title: "Winter Silence",
        description: "Snowfall turns forests into cathedrals. Every branch is a sentence.",
        dateTaken: "2023-12-18",
        thumbnail: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=90"
      },
      {
        id: 7,
        title: "Canyon Light",
        description: "The slot canyon filters light into something that doesn't look real.",
        dateTaken: "2023-06-03",
        thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=90"
      },
      {
        id: 8,
        title: "Field of Lavender",
        description: "Provence in July. Bees everywhere. Wouldn't change a thing.",
        dateTaken: "2023-07-28",
        thumbnail: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1200&q=90"
      },
      {
        id: 9,
        title: "Tide Pools at Dusk",
        description: "Low tide reveals tiny worlds. Every pool is its own universe.",
        dateTaken: "2023-10-15",
        thumbnail: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=90"
      },
      {
        id: 10,
        title: "Alpine Meadow",
        description: "Above the treeline everything simplifies. Sky, grass, and you.",
        dateTaken: "2023-08-19",
        thumbnail: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=90"
      },
      {
        id: 11,
        title: "Salt Flats Horizon",
        description: "The flattest place I've ever stood. The horizon feels impossibly far.",
        dateTaken: "2023-04-05",
        thumbnail: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=1200&q=90"
      },
      {
        id: 12,
        title: "Forest Path",
        description: "Light through old growth Douglas fir. Felt like stepping into a myth.",
        dateTaken: "2023-11-07",
        thumbnail: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=90"
      },
      {
        id: 13,
        title: "Waterfall at Noon",
        description: "The mist alone is worth the two-mile hike. The falls are a bonus.",
        dateTaken: "2023-05-31",
        thumbnail: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200&q=90"
      },
      {
        id: 14,
        title: "Rocky Shoreline",
        description: "The Atlantic in October. Cold, dramatic, and completely indifferent to me.",
        dateTaken: "2023-10-22",
        thumbnail: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=1200&q=90"
      },
      {
        id: 15,
        title: "Starfield Above the Pines",
        description: "30-second exposure, 11 PM, no moon. The Milky Way showed up for it.",
        dateTaken: "2023-08-11",
        thumbnail: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80",
        fullSize:  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=90"
      }
    ]
  };

  res.status(200).json(data);
}