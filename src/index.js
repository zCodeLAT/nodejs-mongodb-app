const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4'); //genera ids únicos para las imagenes
//inicializaciones

const app = express();
require('./database');

// Settings
app.set('port', process.env.PORT || 3000); //config port: tomar puerto definido si es q existe y sino usar 3000
app.set('views', path.join(__dirname, 'views')); // path de carpeta views
app.set('view engine', 'ejs'); // Motor de plantillas

// Middlewares

app.use(morgan('dev')); //muestra datos de peticions
app.use(express.urlencoded({extended: false})); //ayuda a poder entender los datos de los formularios
const storage = multer.diskStorage({ //Metodo de multer para configurar cómo guardar los archivos
    destination: path.join(__dirname, '/public/img/uploads'),
    filename: (req, file, cb, filename) => { //se ejecuta antes de guarda las imágenes
        cb(null, uuid() + path.extname(file.originalname)); //path.extname extrae la extensión
    }
})
app.use(multer({storage: storage}).single('image'));

// Global Variables

// Routes

app.use(require('./routes/index'));

// Static filess
app.use(express.static(path.join(__dirname, 'public'))); //añado contenido de /public


// Start the server

app.listen(app.get('port'), ()=> {
    console.log(`Server on port ${app.get('port')}`);
});