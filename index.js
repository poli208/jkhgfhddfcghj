require('dotenv').config();
const {runBot} = require("./src/bot");

runBot().catch(console.error);
