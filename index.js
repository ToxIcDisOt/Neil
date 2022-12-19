const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/outfit", (req, res) => {
	//fetch reddit posts
	fetch("https://www.reddit.com/r/memes/random/.json").then((response) => response.json())
		.then((data) => {
			//get the image url
			const url = data[0].data.children[0].data.url;

			//get comments
			const comments = data[1].data.children.map((comment) => comment.data.body);
			 if (comments.length === 0) {
				comments === "No comments";
			}
			//get the image extension
			const ext = path.extname(url);

			//get ups and downs
			const ups = data[0].data.children[0].data.ups;
			const downs = data[0].data.children[0].data.downs;

			//send the image url and comments
			res.json({ url, comments, ext, ups, downs });
		});
});

app.listen(3000, () => console.log("API Server is running..."));