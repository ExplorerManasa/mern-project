const path = require("path");
const express = require("express")
const app = express()
const cors=require("cors")
const mongoose = require("mongoose")
const header_middleware = require("./middlewares/header")
const PORT = process.env.PORT || 3001
const postRouter = require("./Routes/post");
const userRoutes = require("./Routes/user");
const profileRoutes = require("./Routes/profile");

const url = "mongodb+srv://MERNSTACK:176165@cluster0.pvezxaj.mongodb.net/blog?retryWrites=true&w=majority"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("MongoDB Connection Succeeded.")
}).catch( (err) => {
  console.log('Error in DB connection: ' + err)
})

app.use(cors())

app.use(express.json())
const directory = path.join(__dirname, './images');
app.use("/images", express.static(directory));
// app.use("/", express.static(path.join(__dirname, 'angular')));

app.use("/api/posts", postRouter)
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);


app.get('/test', (req,res) => {
    res.send('Hello World!')
})

// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname, "angular", "index.html"))
// });
app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})