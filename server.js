// localhost:8080/click?mine=https://axi-shorten-url.site/11o84/02216Eze.php&url=https://www.goodreads.com/book/show/40885164-unshakeable%3Fsome%3D1%26utm_term%3Dtest1%26utm_content%3Dcheat___make_money&parallelTrackingEnabled=false&x=2
const express = require("express");
const queryString = require("query-string");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    res.render("cloak");
});

app.get("/click", async (req, res) => {
    const extractparameters = (string, queries) => {
        const decoded = decodeURI(string);
        const splited = decoded.split("?");
        if (splited.length == 1) {
            return [splited[0], queries];
        }
        for (let i in splited) {
            if (i == 0) continue;
            const parsed = queryString.parse(splited[i]);
            queries = { ...queries, ...parsed };
        }
        // console.log("queries", queries);
        return [splited[0], queries];
    };
    console.log("incoming url:", req.baseUrl, req.originalUrl);
    const queries = req.query;
    let tail = "?";
    const [mine, queries1] = extractparameters(queries.mine, queries);
    const [url, queries2] = extractparameters(queries.url, queries1);
    console.log("queries2", queries2);
    // console.log("url", url);
    // let tail = queries.url ? (queries.url.includes("?") ? "" : "?") : "";
    // console.log("tail 1", tail);
    const keys = Object.keys(queries2);
    for (let i in keys) {
        const key = keys[i];
        if (key == "mine") continue;
        if (key == "url") continue;
        // if (key !== "url") {
        if (i !== 0) {
            tail += "&";
        }
        tail += `${key}=${queries2[key]}`;

        // }
    }
    // console.log(tail);
    if (mine) {
        // if (tail[0] == "&") tail[0] = "?";
        // const newMines = queries.mine.split("&");
        // const urlMineRedirect = newMines[0];
        // for (let i in newMines) {
        //     tail += `&${newMines[i]}`;
        // }
        const redirectUrl = mine + tail;
        console.log("redirect to:", redirectUrl);
        return res.redirect(redirectUrl);
    }
    if (url) {
        const redirectUrl = url + tail;
        console.log("redirect to:", redirectUrl);
        return res.redirect(redirectUrl);
    }

    return res.render("cloak");
});

app.listen(process.env.PORT || 8080);
