const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Fetch marios
app.get('/mario', async(req,res)=>{
    try{
        const {page, search} = req.query;
        const perPage = 10;
        const skip = (page - 1)*perPage;

        let query = {};

        if (search) {
            query.topic = { $regex: this.search, $options: 'i' };
        }

        const game = await marioModel.find(query)
        .skip(skip)
        .limit(perPage);

        res.json({
            satus: 'success',
            result: game,
        });

    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({
            status: 'error',
            message:'server_error',
    });
    }
});

// Fetch mario id
app.get('/mario/:id', async(req,res)=>{
    try{
        const {page, search} = req.query;
        const perPage = 1;
        const skip = (page - 1)*perPage;

        let query = {};

        if (search) {
            query.topic = { $regex: this.search, $options: 'i' };
        }

        const game = await marioModel.find(query)
        .skip(skip)
        .limit(perPage);

        res.json({
            satus: 'success',
            result: game,
        });

    } catch (error) {
        console.error('Error fetching game:', error);
        res.status(500).json({
            status: 'error',
            message:'server_error',
    });
    }
});

// Create a mario
app.post('/mario', async(req, res) =>{
    try {
        const {name, weight} = req.body;

        const mario = new marioModel ({
            name,
            weight
        });

        const savedMario = await mario.save();

        res.json ({
            satus: 'success',
            result: savedMario,
        });

    } catch (error) {
        console.log("Error creating the game:", error);
        res.status(500).json({
            status: "error",
            message:"server_error"
            
        });
    }
});

// Update mario
app.patch('/mario/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const {name, weight} = req.body;

        const updateMario = await marioModel.findByIdAndUpdate(
            id,
            {
            name,
            weight
            },
            { new: true}
        );

        res.json ({
            status: 'success',
            result: updateMario,
        });

    } catch (error) {
        console.log('Error updating a game:', error);
        res.status(500).json({
            status: "error",
            message:"server_error"
            
        });
        
    }

});

// Delete mario
app.delete('/mario/:id', async (req, res) =>{
    try {
        const {id} = req.params;

        const deletedMario = await marioModel.findByIdAndDelete(id);

        res.json ({
            status:'success',
            result:deletedMario,
        });
    } catch (error) {
        console.log("Error deleting the post:", error);
        console.log('Error updating a game:', error);
        res.status(500).json({
            status: "error",
            message:"server_error"
            
        });
    }
});


module.exports = app;