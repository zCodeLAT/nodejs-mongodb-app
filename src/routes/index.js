const{ Router } = require('express'); 
const router =  Router(); //instancia objeto para definir rutas.
const path = require('path');
const { unlink }=require('fs-extra'); // importa para borrar las imagenes del disco

const Image = require('../models/Image');
//¿que necesita mi app?: Formulario, manera de listar img, perfil de cada img, etc
//Definir las rutas es el paso siguiente a configurar el servidor basico.

router.get('/', async (req, res)=>{
    const images = await Image.find();
    res.render('index', { images });
})

router.get('/upload', (req, res)=>{
    res.render('upload');
})

router.post('/upload', async (req,res)=>{
    const image = new Image(); //creo imagen
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.body.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save(); //metodo de image() que guarda el archivo ** es async **

    res.redirect('/');
})

router.get('/image/:id', async (req,res)=>{
    const{ id }=req.params;
    const image = await Image.findById(id);
    res.render('edit', {image});
})

router.get('/image/:id/delete', async (req, res)=>{
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id); //elimina de la db y devuelve objeto de imagen eliminada, neceito la ruta
    console.log(image.path);
    await unlink(path.resolve('./src/public' + image.path)); 
    res.redirect('/');
})

module.exports = router;