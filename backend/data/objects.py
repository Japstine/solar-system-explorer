PLANETS = [
    { "id": "199", "name": "Mercury", "color": "#b5b5b5", "size": 8,   "type": "planet",      "description": "Closest planet to the Sun.", "agency": "—" },
    { "id": "299", "name": "Venus",   "color": "#e8cda0", "size": 14,  "type": "planet",      "description": "Hottest planet. Thick toxic atmosphere of CO2.", "agency": "—" },
    { "id": "399", "name": "Earth",   "color": "#1a6bb5", "size": 15,  "type": "planet",      "description": "Our home. Only known planet with life.", "agency": "—" },
    { "id": "499", "name": "Mars",    "color": "#c1440e", "size": 10,  "type": "planet",      "description": "The Red Planet.", "agency": "—" },
    { "id": "599", "name": "Jupiter", "color": "#c88b3a", "size": 40,  "type": "planet",      "description": "Largest planet. Great Red Spot storm.", "agency": "—" },
    { "id": "699", "name": "Saturn",  "color": "#e4d191", "size": 34,  "type": "planet",      "description": "Famous for its spectacular ring system.", "agency": "—" },
    { "id": "799", "name": "Uranus",  "color": "#7de8e8", "size": 25,  "type": "planet",      "description": "Rotates on its side with 98 degree axial tilt.", "agency": "—" },
    { "id": "899", "name": "Neptune", "color": "#3f54ba", "size": 24,  "type": "planet",      "description": "Farthest planet. Fastest winds in the solar system.", "agency": "—" },
]

PROBES = [
    { "id": "-31",     "name": "Voyager 1",          "color": "#FFD700", "size": 12, "type": "probe",    "launch_date": "1977-09-05", "description": "Farthest man-made object from Earth. Now in interstellar space.", "agency": "NASA" },
    { "id": "-32",     "name": "Voyager 2",          "color": "#FFA040", "size": 12, "type": "probe",    "launch_date": "1977-08-20", "description": "Only spacecraft to visit all four outer planets.", "agency": "NASA" },
    { "id": "-98",     "name": "New Horizons",       "color": "#00BFFF", "size": 10, "type": "probe",    "launch_date": "2006-01-19", "description": "First spacecraft to fly by Pluto in July 2015.", "agency": "NASA" },
    { "id": "-143205", "name": "Tesla Roadster",     "color": "#FF4444", "size": 10, "type": "vehicle",  "launch_date": "2018-02-06", "description": "Elon Musk's Tesla Roadster launched on Falcon Heavy.", "agency": "SpaceX" },
    { "id": "-234",    "name": "Parker Solar Probe", "color": "#FF8C00", "size": 9,  "type": "probe",    "launch_date": "2018-08-12", "description": "Closest spacecraft to the Sun ever built.", "agency": "NASA" },
    { "id": "-48",     "name": "Pioneer 10",         "color": "#DA70D6", "size": 10, "type": "probe",    "launch_date": "1972-03-03", "description": "First spacecraft through the asteroid belt.", "agency": "NASA" },
    { "id": "-49",     "name": "Pioneer 11",         "color": "#BA55D3", "size": 10, "type": "probe",    "launch_date": "1973-04-06", "description": "First spacecraft to visit Saturn.", "agency": "NASA" },
    { "id": "-486",    "name": "JWST",               "color": "#90EE90", "size": 9,  "type": "telescope","launch_date": "2021-12-25", "description": "Most powerful space telescope ever built.", "agency": "NASA/ESA" },
]

DWARF_PLANETS = [
    { "id": "999",     "name": "Pluto",  "color": "#c2a882", "size": 7, "type": "dwarf_planet", "description": "Largest known dwarf planet.", "agency": "—" },
    { "id": "2000001", "name": "Ceres",  "color": "#9a9a9a", "size": 6, "type": "dwarf_planet", "description": "Largest object in the asteroid belt.", "agency": "—" },
]

ALL_OBJECTS = PLANETS + PROBES + DWARF_PLANETS
