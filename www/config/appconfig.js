export let app = {
    version: '1.1.0',
    name: 'Bilal App',
    autoLocation: true //jika anda ingin menggunakan autolocation, setelah memilih opsi enable GPS pada browser, lalukan refresh pada browser. Fitur ini hanya berfungsi jika device terkoneksi dengan internet saja.
};
//general setting
export let setting = {
    nama: 'MASJID DARUL ILMI',
    alamat: 'Politeknik Negeri Jakarta',
    //settingan latitude longitude altitude timezone jika app.autoLocation=false atau jika browser tidak support HTML5 Geolocation
    latitude: -6.223723,
    longitude: 106.897179,
    altitude: 100,
    timezoneOffset:7,
    methodCalc:'Kemenag', //metode perhitungan adzan http://praytimes.org/wiki/Calculation_Methods .Script test metode test_metode.html . Valid value: MWL, ISNA, Egypt, Makkah, Karachi, Tehran, Jafari
    dst: 'auto', //Daylight Saving Time: 1 if date is in daylight saving time, 0 otherwise. If omitted or set to 'auto', dst is extracted from the system.
    tune: {imsak: +3, fajr: +3, sunrise: +3, dhuhr: +3, asr: +3, sunset: +3, maghrib:+3, isha:+3, midnight:+3}, //- By default, PrayTimes rounds minutes to the nearest values. To round a specific time up, you can tune it by +0.5 minutes, and to round it down, you can tune it by -0.5 minutes. - Tuning is the last step after calculating step, and thus, it has no effect on the calculation parameters. For example, if Isha is set to be 90 minutes after sunset, tuning sunset by 5 minutes will not push Isha forward.
    runningTextFile: "www/public/Bilal/text/runningtext.txt" , ////"https://herifauzan.github.io/public-site/",
    runningTextSpeed: 15000, //15 detik
    slideInterval: 17000,  //17 detik waktu interval slide
    slideImageCount: 8, //jumlah maximum slide file (jgn lupa rename semua file di dalam folder slide jadi 1.jpg, 2.jpg dst)
    adzanTime: 300000, // 5 menit lama tulisan adzan
    iqomahTime: 6000, //1 menit lama waktu tulisan iqomah
    shalatSunnahTime: 600000, //10 menit lama waktu tulisan sholat sunnah
    shalatSunnahTimeSubuh: 900000,
    aliasName: ['IMSAK', 'SUBUH', 'SYURUQ', 'ZHUHUR', 'ASHAR', 'MAGHRIB', 'ISYA']
}

