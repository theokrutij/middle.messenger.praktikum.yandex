const express = require("express");
const path = require("path");

const app = express();
app.use(express.static("dist"));

app.get(
	"*", 
	(req, res) => res.sendFile(path.join(__dirname, "dist", "index.html"))
);
app.listen(
	3000,
	() => console.log("Express server is running on port http://0.0.0.0:3000")
);



