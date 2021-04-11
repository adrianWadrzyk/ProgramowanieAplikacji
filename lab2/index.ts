let soundsTable : NodeListOf<HTMLAudioElement>;

let isRecording : boolean = false;
let timeStartRecording;
let tempRecordingChannel: number = 0;

const channel1: any[] = [];
const channel2: any[] = [];

appStart();

function appStart(): void {
    window.addEventListener('keypress', onKeyDown);
    bindGetPlayStopRecord();
    getAudioTags();
}

function onPlayChannel(ev): void {
    eval('channel' + ev.currentTarget.dataset.play).forEach(sound => {
        setTimeout(() => playSound(sound.key), sound.time)
    })
}

function bindGetPlayStopRecord():void { 
    const btnsPlay = document.querySelectorAll(`[data-play]`);
    const btnsStop : NodeListOf<Element> = document.querySelectorAll(`[data-stop]`);
    const btnsRecord : NodeListOf<Element> = document.querySelectorAll(`[data-record]`);

    // trzeba to jakoś zamienieć bo wygląda bardzo źle
    btnsRecord.forEach(element => {
        element.addEventListener("click", startRecord);
    });
    
    btnsStop.forEach(element => {
        element.addEventListener("click", stopRecord);
    });

    btnsPlay.forEach(element => {
        element.addEventListener("click", onPlayChannel);
    });
}

function startRecord(ev) { 
    tempRecordingChannel = ev.currentTarget.dataset.record;
    isRecording = true;
    timeStartRecording = ev.timeStamp
}

function stopRecord(){ 
    isRecording = false;
}

function getAudioTags() {
    soundsTable = document.querySelectorAll('[data-sound]');
    console.log(soundsTable);
}

function onKeyDown(ev: KeyboardEvent): void {
    if(isRecording)
        record(ev);
    playSound(ev.key);
}

function record(ev) { 
    const key = ev.key;
    const time = ev.timeStamp - timeStartRecording;
    eval("channel"+tempRecordingChannel).push({ key, time })
}

function playSound(key: string) {
    switch (key) {
        case 'a':
            soundsTable[0].currentTime = 0;
            soundsTable[0].play();
            break;
        case 's':
            soundsTable[1].currentTime = 0;
            soundsTable[1].play();
            break;
    }
}

