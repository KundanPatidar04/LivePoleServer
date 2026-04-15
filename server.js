import { connectDb } from "./db/connect.js";
import express from "express";
import cors from 'cors';
import { userRegistrationControler , userLoginControler } from "./controlers/userControler.js";
import { activeElection, electionCreatControler, getElectionsControler, getOneElectionControler, stopElection, voterElectionsControler } from "./controlers/electionControler.js";
import { addCandidateControler, getCandidateControler } from "./controlers/candidateControler.js";
import { addVoteControler } from "./controlers/voteControler.js";
import { checkRole, verifyUser } from "./meddileware/userAuth.js";
import { getResultControler } from "./controlers/resultControler.js";

process.loadEnvFile();
connectDb();
const app = express();

const Port = process.env.Port || 4000;

app.set('view engine', 'ejs');

const corsOptions = {
    origin: 'https://livepole.netlify.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

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

app.post('/createElection', checkRole('admin'), electionCreatControler);    // create new election 

app.post("/addCandidate", checkRole('admin'), addCandidateControler);    // add candidate for election 

app.get("/electionList", checkRole('admin'), getElectionsControler);    // get all elections list from database

app.get("/election/:id", checkRole('admin'), getOneElectionControler);    // get election of id in URL

app.post("/startElection/:id", checkRole('admin'), activeElection);    // activate election of given id

app.post("/stopElection/:id", checkRole('admin'), stopElection);    // stope election of given id

app.get("/electionResult", checkRole('admin'), getResultControler)    // fetching election results

app.get("/Elections/:voterId", checkRole('voter'), voterElectionsControler);    // get elections list not voted by logedIn user

app.get("/Candidate/:id", checkRole('voter'), getCandidateControler);    // get candidates of election id in URL

app.post("/addVote", checkRole('voter'), addVoteControler )    // add vote in database 

// ---- running server ----
app.listen(Port, () => {
    console.log(`server is running on http://localhost:${Port}`);
})