const { Schema, model } = require('mongoose'); //Importamos lo necesario para crear un schema

const imageSchema = new Schema({ //creo schema con los parametros que quiero
    title: { type: String }, 
    description: { type: String },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: Date, default: Date.now() } //si no especifica crea con fecha now.
});

module.exports = model('Image', imageSchema); //paso el imageSchema creado bajo el nombre Image