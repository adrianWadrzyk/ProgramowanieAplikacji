var clapSound;
var boomSound;
var isRecording = false;
var timeStartRecording;
var tempRecordingCannal = 0;
var channel1 = [];
var channel2 = [];
appStart();
function appStart() {
    window.addEventListener('keypress', onKeyDown);
    bindGetPlayStopRecord();
    getAudioTags();
}
function onPlayChannel1(ev) {
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
        element.addEventListener("click", onPlayChannel1);
    });
}
function startRecord(ev) {
    tempRecordingCannal = ev.currentTarget.dataset.record;
    isRecording = true;
    timeStartRecording = ev.timeStamp;
}
function stopRecord() {
    isRecording = false;
}
function getAudioTags() {
    clapSound = document.querySelector('[data-sound="clap"]');
    boomSound = document.querySelector('[data-sound="boom"]');
}
function onKeyDown(ev) {
    if (isRecording)
        record(ev);
    playSound(ev.key);
}
function record(ev) {
    var key = ev.key;
    var time = ev.timeStamp - timeStartRecording;
    eval("channel" + tempRecordingCannal).push({ key: key, time: time });
}
function playSound(key) {
    switch (key) {
        case 'a':
            clapSound.currentTime = 0;
            clapSound.play();
            break;
        case 's':
            boomSound.currentTime = 0;
            boomSound.play();
            break;
    }
}
