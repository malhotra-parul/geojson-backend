const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;
const busStopsSchema = new Schema({
    type: {
        type: String,
    },
    properties: {
        name: { type: String},
        degree: { type: Number}
    },
    geometry: {
        type: {
            type: String,
            default: "Point",
            enum: ['Point']
        },
        coordinates: [Number]
    }
});

busStopsSchema.index({geometry: '2dsphere'});

module.exports = mongoose.model("BusStops", busStopsSchema, "bus_stops");