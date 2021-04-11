var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var soundsTable;
var isRecording = false;
var timeStartRecording;
var tempRecordingChannel = 0;
var channel1 = [];
var channel2 = [];
appStart();
function appStart() {
    window.addEventListener('keypress', onKeyDown);
    bindGetPlayStopRecord();
    getAudioTags();
}
function onPlayChannel(ev) {
    eval('channel' + ev.currentTarget.dataset.play).forEach(function (sound) {
        setTimeout(function () { return playSound(sound.key); }, sound.time);
    });
}
function bindGetPlayStopRecord() {
    var btnsPlay = document.querySelectorAll("[data-play]");
    var btnsStop = document.querySelectorAll("[data-stop]");
    var btnsRecord = document.querySelectorAll("[data-record]");
    // trzeba to jakoś zamienieć bo wygląda bardzo źle
    btnsRecord.forEach(function (element) {
        element.addEventListener("click", startRecord);
    });
    btnsStop.forEach(function (element) {
        element.addEventListener("click", stopRecord);
    });
    btnsPlay.forEach(function (element) {
        element.addEventListener("click", onPlayChannel);
    });
}
function startRecord(ev) {
    tempRecordingChannel = ev.currentTarget.dataset.record;
    isRecording = true;
    timeStartRecording = ev.timeStamp;
}
function stopRecord() {
    isRecording = false;
}
function getAudioTags() {
    soundsTable = document.querySelectorAll('[data-sound]');
    console.log(soundsTable);
}
function onKeyDown(ev) {
    if (isRecording)
        record(ev);
    playSound(ev.key);
}
function record(ev) {
    var key = ev.key;
    var time = ev.timeStamp - timeStartRecording;
    eval("channel" + tempRecordingChannel).push({ key: key, time: time });
}
function playSound(key) {
    switch (key) {
        case 'a':
            soundsTable[0].currentTime = 0;
            soundsTable[0].play();
            tempPlaySound("clap");
            break;
        case 's':
            soundsTable[1].currentTime = 0;
            soundsTable[1].play();
            break;
    }
}
function tempPlaySound(name) {
    var sound = __spreadArray([], soundsTable).filter(function (el) { return el.dataset.sound == name; });
    sound.currentTime = 0;
    console.log(sound);
}
