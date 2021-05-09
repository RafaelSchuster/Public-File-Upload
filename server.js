const express = require('express');
const app = express();
const port = 5000;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const images = require('./images.json');
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Math.random()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage});
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(cors());

app.post('/upload', upload.single('fileuploaded'), (req, res, next) => {
    const logObj = {
        "FileName": req.file.filename,
        "Caption": req.body.caption,
        "FilePath": req.file.path
    }
    images.push(logObj);
    fs.writeFile('./images.json', JSON.stringify(images, null, 2), (err, data) => {
        if (err) console.log('Errorrr');
    })
    res.redirect('http://127.0.0.1:5500/photo-gallery/public/gallery.html')
    res.send('Done');
});

app.get('/getLog', (req, res) => {
    res.send(images);
});


app.listen(port, () => {
    console.log('Running');
});