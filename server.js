const express = require('express');
const app = express();
const hbs = require('hbs');
const axios = require('axios');

const ubicacion = require('./controlador/ubicacion');
const clima = require('./controlador/clima');

require('./hbs/helpers');

const port = process.env.PORT || 3000;



//Clima
let getInfo = async(pa1, pa2, pa3, pa4) => {
    try {

        let coords = await ubicacion.getCiudadLatLon(pa1);
        let temp1 = await clima.getClima(coords.lat, coords.lon);

        let coords1 = await ubicacion.getCiudadLatLon(pa2);
        let temp2 = await clima.getClima(coords1.lat, coords1.lon);

        let coords2 = await ubicacion.getCiudadLatLon(pa3);
        let temp3 = await clima.getClima(coords2.lat, coords2.lon);

        let coords3 = await ubicacion.getCiudadLatLon(pa4);
        let temp4 = await clima.getClima(coords3.lat, coords3.lon);
        return {
            temp1,
            temp2,
            temp3,
            temp4
        }
    } catch (error) {
        console.log(`No se puede obtener el clima de: ${pais}`);
    }
};

//Express hbs engine
hbs.registerPartials(__dirname + '/views/parciales')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
//helpers
let temp1
let temp2
let temp3
let temp4
getInfo("Quito", "Guayaquil", "Madrid", "Paris").then(res => {
    temp1 = res.temp1;
    temp2 = res.temp2;
    temp3 = res.temp3
    temp4 = res.temp4
    console.log(res.temp, res.temp1);
}).catch(err => console.log(err));

//


app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {

    //estamos usando plantilaaY
    res.render('home', {
        nombre: "DoRiVaL PicHaMba",
        pais1: "Quito",
        pais2: "Guayaquil",
        temperatura1: temp1,
        temperatura2: temp2
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        nombre: "DoRiVal",
        pais3: "Madrid",
        pais4: "Paris",
        temperatura3: temp3,
        temperatura4: temp4
    });
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});