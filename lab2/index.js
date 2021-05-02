var soundsTable;
var isRecording = false;
var timeStartRecording;
var tempRecordingChannel = 0;
var channel1 = [];
var channel2 = [];
var channel3 = [];
var channel4 = [];
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
            break;
        case 's':
            soundsTable[1].currentTime = 0;
            soundsTable[1].play();
            break;
        case 'd':
            soundsTable[2].currentTime = 0;
            soundsTable[2].play();
            break;
        case 'q':
            soundsTable[3].currentTime = 0;
            soundsTable[3].play();
            break;
        case 'w':
            soundsTable[4].currentTime = 0;
            soundsTable[4].play();
            break;
    }
}
