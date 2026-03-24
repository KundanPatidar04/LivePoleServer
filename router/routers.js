import express from "express";
import { userRegistrationControler } from "../controlers/userControler.js";

const router = express.Router();

const app = express();

app.get('/', (req, res) => {
    // res.send("<h1>hello world sender</h1>")
    res.render("home", { title: "Home page" });
})

// app.post('/registor', userRegistrationControler);
app.post('/registor', userRegistrationControler);

export default router;