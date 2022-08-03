"use strict";
const cheerio = require("cheerio");
const http = require("node:https");
const axios = require("axios");
async function getScrapper(url) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let result = {
        title: "No title found",
        description: "No description",
        images: [],
    };
    const $title = $("title").text();
    const $description = $('meta[name="description"]').attr("content");
    const $image = $("img");
    if ($title) {
        result.title = $title;
    }
    if ($description) {
        result.description = $description;
    }
    if ($image) {
        $('img').each((index, image) => {
            let imgSrc = $(image).attr('src');
            result.images.push(imgSrc);
        });
    }
    return result;
}
module.exports = {
    getScrapper,
};
