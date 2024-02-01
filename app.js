const express = require('express');

const app = express()

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs')

app.use(express.static('public'))

const appSetting = {
    version: '1.0.0',
    name: 'Bilal App',
    autoLocation: true //jika anda ingin menggunakan autolocation, setelah memilih opsi enable GPS pada browser, lalukan refresh pada browser. Fitur ini hanya berfungsi jika device terkoneksi dengan internet saja.
};

app.get('/', (req, res) => {
    res.render('index', {
        app : appSetting
    });
});



app.listen(PORT, () => { console.log(`Server listenig in port ${PORT}`); });

module.exports = app;