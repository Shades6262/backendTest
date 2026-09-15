    require('dotenv').config()
    const cors = require("cors");
    const express = require("express");
    const fs = require("fs");
    const path = require("path");
    // const { register } = require("module");
    // const authModel = require('./models/authModel');
    const authRoute = require('./routes/authRoute');
    const blogRoute = require('./routes/blogRoute');
    const connectDB = require('../config/database');

    connectDB()


    const app = express();

    const PORT = process.env.PORT || 5050;

    //middleware
    app.use(cors({ origin: true, credentials: true }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(__dirname))

    const logger = (req, res, next) => {
        console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
        next()
    }
    app.use(logger)

    app.use('/api/auth', authRoute)
    app.use('/api/blog', blogRoute)
    app.get("/", (req, res) => {
    res.send("Welcome to Backend");
    });
    app.get("/about", (req, res) => {
    res.send(
            [
                {
                    id: 1,
                    name: "Jimmy",
                },
                {
                    id: 2,
                    name: "Timothy",
                },
                {
                    id: 3,
                    name: "Richard",
                },
            ]

    )
    });

    app.get("/jobs", (req, res) => {
    res.send(
        [
            {
                id: 1,
                name: "Product Design",
            },
            
            {
                id: 2,
                name: "Full Stack instructor",
            },
        ]
    )
    });

    // fs.writeFile(
    //   "data.json",
    //   ` {
    //         users: [
    //             {
    //                 id: 1,
    //                 name: "Product-Design"
    //             },
    //             {
    //                 id: 2,
    //                 name: "Graphics-Designer"
    //             }
    //         ]
    //     }`,
    //   (err) => {
    //     if (!err) {
    //       console.log("File created successfully");
    //     } else {
    //       console.log("Error while Creating API");
    //     }
    //   },
    // );

    app.use((req, res, next)=> {
        res.status(404).sendFile(__dirname + '/404.html')
    })
    app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    });

