const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://intellishelf-786b0.web.app",
      "https://intellishelf-786b0.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser())

const verifyJWT = async(req, res, next)=>{
  const token = req?.cookies?.token;
  if(!token){
    return res.status(401).send({message: 'unauthorized access '})
  }
  jwt.verify(token, process.env.TOKEN_ACCESS, (err, decode)=>{
    if(err){
      return res.status(401).send({message: 'unauthorized access'})
    }
    req.user = decode;
    next();
  })
}

// const uri = `mongodb://127.0.0.1:27017`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fdrrfs0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const intelliDB = client.db("intelliShelf");
    const bookCategories = intelliDB.collection("categories");
    const bookCollection = intelliDB.collection("books");
    const borrowedCollection = intelliDB.collection("borrowed");
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    };

    // jwt
    app.post('/jwt', async(req, res)=>{
      const user = req.body;
      const token = jwt.sign(user, process.env.TOKEN_ACCESS, { expiresIn: '1h'});

      res.cookie("token", token, cookieOptions).send(token);
    })
    app.post('/logout', async(req, res)=>{
      const user = req.body;
      console.log("logged user", user)

      res.clearCookie("token", { ...cookieOptions, maxAge: 0 }).send({success: true})
     })

    // apis
    app.get("/categories", async (req, res) => {
      const result = await bookCategories.find().toArray();
      res.send(result);
    });

    app.get("/borrowed", verifyJWT, async (req, res) => {
      const userEmail = req.query?.email;
      const borrowedBook = req.query?.book;
      if (borrowedBook) {
        let query = { userEmail: userEmail, bookCollectionId: borrowedBook };
        const result = await borrowedCollection.findOne(query);
        res.send({found: result?true:false});
      } else {
        let query = { userEmail: userEmail };
        const result = await borrowedCollection.find(query).toArray();
        console.log(result);

        res.send(result);
      }
    });

    // add book
    app.post("/addbook", verifyJWT, async (req, res) => {
      const newbook = req.body;
      console.log(newbook);

      const result = await bookCollection.insertOne(newbook);

      res.send(result);
    });

    // update book
    app.patch("/updatebook/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          authorName: req.body.authorName,
          bookName: req.body.bookName,
          category: req.body.category,
          rating: req.body.rating,
          image_url: req.body.image_url,
        },
      };
      const result = await bookCollection.updateOne(query, updateDoc, options);

      res.send(result);
    });

    // add to borrow
    app.post("/borrow/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const borrowData = req.body;
      console.log(borrowData);

      const result = await borrowedCollection.insertOne(borrowData);
      const query = { _id: new ObjectId(id) };
      const decQuantity = await bookCollection.updateOne(query, {
        $inc: {
          quantity: -1,
        },
      });
      console.log(query, decQuantity);

      res.send(result);
    });

    app.delete("/returnbook/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const {bookCollectionId} = req.body;
      console.log("retun",bookCollectionId)

      const query = { _id: new ObjectId(id) };

      // 2 collection has two diffarent id
      const result = await borrowedCollection.deleteOne(query);

      const incQuantity = await bookCollection.updateOne(
        { _id: new ObjectId(bookCollectionId) },
        {
          $inc: {
            quantity: 1,
          },
        }
      );
      console.log(incQuantity);
      res.send(result);
    });

    // read all books
    app.get("/books", async (req, res) => {
      const category = req.query?.category;
      const search = req.query?.search;

      if (category) {
        let query = { category: category };
        const result = await bookCollection.find(query).toArray();
        res.send(result);
      } else {
        if(search){
          const query = {
            $or: [
              {bookName: {$regex: search, $options: 'i'} },
              {authorName: {$regex: search, $options: 'i'}},
              {shortDescription: {$regex: search, $options: 'i'}},
            ]
          }
          const result = await bookCollection.find(query).toArray();
          res.send(result);
          return;
        }

        const result = await bookCollection.find().toArray();
        res.send(result);
      }
    });

    app.get("/book/:id", verifyJWT, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookCollection.findOne(query);
      console.log(result);

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Alhamdulillah server is running.");
});

app.listen(port, () => {
  console.log(`Bismillah, server is running on port: ${port}`);
});
