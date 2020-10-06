const express = require("express");
const mongoose = require("mongoose");
const BUS_STOPS = require("./popular_bus_stops.json");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5001;
const BusStops = require("./models/busStops");

app.use(express());
require('dotenv').config();
app.use(cors());
app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGOURI , {
            useUnifiedTopology: true,
            useNewUrlParser: true
          });
        console.log('db connected..!');
    }
    catch(err){
        console.log(err);
    }
};
connectDB();

app.get("/", async (req, res) => {
    // const document = BUS_STOPS.features;
    // await BusStops.insertMany(document);
    // const data = await BusStops.find({});
    // console.log(data);
    res.status(200).send("Done!");
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