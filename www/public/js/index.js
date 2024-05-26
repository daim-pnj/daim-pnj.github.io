export function init_element(app, setting, prayTimes){
    let offsetIcon = setting.timezoneOffset > 0 ? '+' : (setting.timezoneOffset == 0) ? '' : '-';
    let now = new Date(); // today
    prayTimes.setMethod(setting.methodCalc);
    prayTimes.tune(setting.tune);
    let times = prayTimes.getTimes(now, [setting.latitude, setting.longitude], setting.timezoneOffset, setting.dst);
    let masterTime = [times.imsak, times.fajr, times.sunrise, times.dhuhr, times.asr, times.maghrib, times.isha];
    let masterName = setting.aliasName;
    let tempShalat = masterTime;
    $('.IMSAK').text(times.imsak);
    $('.SUBUH').text(times.fajr);
    $('.SYURUQ').text(times.sunrise);
    $('.ZHUHUR').text(times.dhuhr);
    $('.ASHAR').text(times.asr);
    $('.MAGHRIB').text(times.maghrib);
    $('.ISYA').text(times.isha);
    //console.log(times);			
    $('.tz-offset').text(offsetIcon + setting.timezoneOffset);
    $('.latitude').text(setting.latitude);
    $('.longitude').text(setting.longitude);
    $('.altitude').text(setting.altitude);
    $('.middle1').text(setting.nama);
    $('.middle2').text(setting.alamat);
    $('.version').text(app.version);
    $('.appname').text(app.name);

    return masterName, tempShalat
}

export async function getImages(ref, storage, getDownloadURL, listAll) {
    // get reference of /images/ path from firebase storage
    let listRef = ref(storage, '/images/')
    // list all content in /images/ folder
    let res = await listAll(listRef)
    // return an array where url of each item in res.items are retrieved
    return await res.items.map(async item => {
        return await getDownloadURL(ref(storage, item))
    });
}