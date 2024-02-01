let setting = {
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
    runningTextFile: "text/runningtext.txt" , ////"https://herifauzan.github.io/public-site/",
    runningTextSpeed: 15000, //15 detik
    slideInterval: 17000,  //17 detik waktu interval slide
    slideImageCount: 7, //jumlah maximum slide file (jgn lupa rename semua file di dalam folder slide jadi 1.jpg, 2.jpg dst)
    adzanTime: 300000, // 5 menit lama tulisan adzan
    iqomahTime: 6000, //1 menit lama waktu tulisan iqomah
    shalatSunnahTime: 600000, //10 menit lama waktu tulisan sholat sunnah
    shalatSunnahTimeSubuh: 900000,
    aliasName: ['IMSAK', 'SUBUH', 'SYURUQ', 'ZHUHUR', 'ASHAR', 'MAGHRIB', 'ISYA']
}


function inArray(needle, haystack) {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

let finalTime;

function beep(){
    $('#player')[0].play();
}

let offsetIcon = setting.timezoneOffset>0?'+':(setting.timezoneOffset==0)?'':'-';
let now = new Date(); // today
prayTimes.setMethod(setting.methodCalc);
prayTimes.tune(setting.tune);
let times = prayTimes.getTimes(now, [setting.latitude, setting.longitude], setting.timezoneOffset, setting.dst);
let masterTime = [times.imsak, times.fajr, times.sunrise, times.dhuhr, times.asr, times.maghrib, times.isha];
let masterName = setting.aliasName;
let tempShalat = masterTime;			


//$('.masehi').text(moment().format('ddd, DD/MM/YYYY'));
//$('.hijriah').text(moment().format('iD iMMMM iYYYY'));			

function countdownShalat(time, name, desc, shalatName =''){
    $('.myprayer').removeClass('highlight');
    $('.'+ name).closest('.myprayer').addClass('highlight');
    $('.desc').text(desc);
    finalTime = time;
    let x = setInterval(function() {
        let distance = finalTime - moment().unix();
        let hours = Math.floor((distance % (60 * 60 * 24)) / ( 60 * 60));
        let minutes = Math.floor((distance % ( 60 * 60)) / 60);
        let seconds = Math.floor(distance % ( 60) );
                            
        if (distance < 0) {
            clearInterval(x);
            if(name=='adzan'){
                countdownShalat(moment().add(setting.shalatSunnahTime).unix(), 'shalat_sunnah', 'MENJELANG IQOMAH '+shalatName, shalatName);
                    if(shalatName=='SUBUH'){ countdownShalat(moment().add(setting.shalatSunnahTimeSubuh).unix(),'shalat_sunnah','MENJELANG IQOMAH ' +shalatName,shalatName); }
            }else if(name=='shalat_sunnah'){
                beep();
                countdownShalat(moment().add(setting.iqomahTime).unix(), 'iqomah', 'IQOMAH '+shalatName, shalatName);
            }else if(inArray(name, ['SUBUH', 'ZHUHUR', 'ASHAR', 'MAGHRIB', 'ISYA'])){
                beep();
                countdownShalat(moment().add(setting.adzanTime).unix(), 'adzan', 'ADZAN '+name, name);
            }else{
                nextSchedule();
            }
        }else{
            $(".countdown-event").text(moment().second(seconds).minute(minutes).hour(hours).format('HH:mm:ss'));
        }
        // Mengambil waktu terkini di zona waktu WIB menggunakan WorldTimeAPI
        fetch('https://worldtimeapi.org/api/timezone/Asia/Jakarta')
        .then(response => response.json())
        .then(data => {
            // Mendapatkan waktu dari data yang diterima
            let currentTime = new Date(data.utc_datetime);
            
            // Membuat format HH:mm:ss
            let formattedTime = currentTime.toLocaleTimeString('en-US', {hour12: false});

            // $('.masehi').html(moment().format('HH:mm:ss'));
            $('.masehi').html(formattedTime);
            $('.hijriah').text(moment().format('ddd, DD/MM/YYYY')+' - '+moment().format('iD iMMMM iYYYY'));
        })
        .catch(error => {
            console.error('Error fetching time:', error);
        });
        // let currentTime = new Date();
        // let formattedTime = currentTime.toLocaleTimeString('en-US', {hour12: false});
        // console.log("Waktu hari ini: " + formattedTime);
        // // $('.masehi').html(moment().format('HH:mm:ss'));
        // $('.masehi').html(formattedTime);
        // $('.hijriah').text(moment().format('ddd, DD/MM/YYYY')+' - '+moment().format('iD iMMMM iYYYY'));
        // $('.hijriah').text(moment().format('ddd, DD/MM/YYYY')+' - '+moment().format('iD iMMMM iYYYY'));
    }, 1000);
}
        
function nextSchedule(){
    let found=false;
    for(a=0;a<tempShalat.length;a++){
        let now = moment().unix();
        let next = moment(moment().format('YYYY-MM-DD ['+tempShalat[a]+':00]'), 'YYYY-MM-DD HH:mm:ss').unix();
        if(now <next){//console.log(moment.unix(next).format('YYYY/MM/DD HH:mm:ss'));
            countdownShalat(next, masterName[a], 'MENJELANG '+masterName[a]);
            found=true;
            //console.log([masterName[a], masterTime[a]]);
            return false;
        }else{
            //console.log(tempShalat);
            //console.log('lewat'+a +masterName[a]);
            //tempShalat.shift();
        }
        
    }
    let splt = tempShalat[0].split(':');
    next = moment().add(1, 'day').hour(splt[0]).minute(splt[1]).second(0).unix();
    if(!found) countdownShalat(next, masterName[0], 'MENJELANG '+masterName[0]);
}

// 	function refreshApps(){
// 		if(moment().format('h')==0){
// 			location.reload();
// 		}
// 		setInterval(refreshApps, 18000);
// 	}
// 	refreshApps();

