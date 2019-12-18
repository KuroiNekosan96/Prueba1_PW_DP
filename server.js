const express = require('express');
const app = express();
const hbs = require('hbs');
const axios = require('axios');
const ubicacion = require('./controlador/ubicacion');
const clima = require('./controlador/clima');
require('./hbs/helpers');
const port = process.env.PORT || 3000;

//Clima
let getInfo = async(pa1, pa2) => {
    try {

        let coords = await ubicacion.getCiudadLatLon(pa1);
        let temp1 = await clima.getClima(coords.lat, coords.lon);

        let coords1 = await ubicacion.getCiudadLatLon(pa2);
        let temp2 = await clima.getClima(coords1.lat, coords1.lon);

        return {
            temp1,
            temp2
        }
    } catch (error) {
        console.log(`No se puede obtener el clima de: ${pais}`);
    }
};
hbs.registerPartials(__dirname + '/views/parciales')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//helpers
let temp1
let temp2

getInfo("Quito", "Madrid").then(res => {
    temp1 = res.temp1;
    temp2 = res.temp2;
    console.log(res.temp, res.temp1);
}).catch(err => console.log(err));
//-------------------------------------------------------
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home', {
        nombre: "DoRiVaL PicHaMba",
        pais1: "Quito",
        temperatura1: temp1,

    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        nombre: "DoRiVal",
        pais2: "Madrid",
        temperatura2: temp2
    });
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});