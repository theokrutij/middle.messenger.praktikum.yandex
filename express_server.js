const express = require("express");

const app = express();
app.use(express.static("dist"));

app.get(
	"/", 
	(req, res) => {}
);
app.listen(
	3000,
	() => console.log("Express server is running on port http://0.0.0.0:3000")
);



