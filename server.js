const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    res.render("cloak");
});

app.get("/click", async (req, res) => {
    console.log("incoming url:", req.baseUrl, req.originalUrl);
    const queries = req.query;
    // console.log(queries);
    let tail = queries.url ? (queries.url.includes("?") ? "" : "?") : "";
    const keys = Object.keys(queries);
    for (let i in keys) {
        const key = keys[i];
        // if (key !== "url") {
        if (i !== 0) {
            tail += "&";
        }
        tail += `${key}=${queries[key]}`;
        // }
    }
    // console.log(tail);
    if (queries.mine) {
        const redirectUrl = queries.mine + tail;
        console.log("redirect to:", redirectUrl);
        return res.redirect(redirectUrl);
    }
    if (queries.url) {
        const redirectUrl = queries.url + tail;
        console.log("redirect to:", redirectUrl);
        return res.redirect(redirectUrl);
    }

    return res.render("cloak");
});

app.listen(process.env.PORT || 8080);
