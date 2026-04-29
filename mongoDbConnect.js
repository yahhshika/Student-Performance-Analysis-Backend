let mongoose = require("mongoose");
const ExpressError = require("./utils/ExxpressError");
let MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
    throw new Error("MONGO_URL is not defined in environment variables");
}
async function main() {
    await mongoose.connect(MONGO_URL);

}

module.exports = main;