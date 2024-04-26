const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/resumes")
    },
    filename: function(req, file, cb) {
        const uniqueFilename = uuidv4() + '.pdf'; 
        cb(null, uniqueFilename);
    }
});

const upload = multer({ storage });

app.post('/upload', upload.array('selectedFiles'), (req, res) => {
    console.log(req.body) 
    console.log(req.files)
    res.send('Files uploaded successfully.')
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3001, () => {
    console.log("Server is running");
});
