"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Schema = require("../infoModel/models");
async function scrapper(req, res, url) {
    try {
        const result = await Schema.getScrapper(url);
        res.end(JSON.stringify(result));
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = {
    scrapper,
};
