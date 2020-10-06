const express = require("express");
const BUS_STOPS = require("./popular_bus_stops.json");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;
require("./dbConnect");
const BusStops = require("./models/busStops");

app.use(cors());
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));

app.get("/", async (req, res) => {
    const document = BUS_STOPS.features;
    await BusStops.insertMany(document);
    const data = await BusStops.find({});
    console.log(data);
    res.send("Done!");
})

app.post("/find", async (req, res) => {
    console.log("request", req.body);
    const { geometry, radiusFromBody } = req.body;
    
    const [lat, lng] = geometry;
    const radius = radiusFromBody/6378.1;

    const found = await BusStops.find({
        geometry: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius]
            }
        }
    }).limit(40);

    console.log(found, found.length);

    res.status(201).json({
        total: found.length,
        found
    });
})

app.listen(port, () => {
    console.log(`Server started on port #${port}`);
})