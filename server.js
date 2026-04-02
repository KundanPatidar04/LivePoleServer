import { connectDb } from "./db/connect.js";
import express from "express";
import cors from 'cors';
import { userRegistrationControler , userLoginControler } from "./controlers/userControler.js";
import { activeElection, electionCreatControler, getElectionsControler, getOneElectionControler, voterElectionsControler } from "./controlers/electionControler.js";
import { addCandidateControler, getCandidateControler } from "./controlers/candidateControler.js";
import { addVoteControler } from "./controlers/voteControler.js";
import { verifyUser } from "./meddileware/userAuth.js";

process.loadEnvFile();
connectDb();
const app = express();

const Port = process.env.Port || 4000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());

// ---- server routers ----
app.get('/', (req, res) => {
    // res.send("<h1>hello world sender</h1>")
    res.render("home", { title: "Home page" });
})

app.post('/registor', userRegistrationControler);    // Add user to Database 

app.post('/login', userLoginControler);    // login user to page

app.use(verifyUser);    // user JWT verification meddilware

app.post('/createElection', electionCreatControler);    // create new election 

app.post("/addCandidate", addCandidateControler);    // add candidate for election 

app.get("/electionList", getElectionsControler);    // get all elections list from database

app.get("/electionList/:id", getOneElectionControler);    // get election of id in URL

app.post("/electionList/:id", activeElection);    // active election of givrn id

app.get("/Elections/:voterId", voterElectionsControler);    // get elections list not voted by logedIn user

app.get("/Candidate/:id", getCandidateControler);    // get candidates of election id in URL

app.post("/addVote", addVoteControler )    // add vote in database 

// ---- running server ----
app.listen(Port, () => {
    console.log(`server is running on http://localhost:${Port}`);
})