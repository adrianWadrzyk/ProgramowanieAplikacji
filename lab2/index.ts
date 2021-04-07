let clapSound: HTMLAudioElement
let boomSound: HTMLAudioElement



let isRecording : boolean = false;
let timeStartRecording;
let tempRecordingCannal: number = 0;

const channel1: any[] = [];
const channel2: any[] = [];

appStart();

function appStart(): void {
    window.addEventListener('keypress', onKeyDown);
    bindGetPlayStopRecord();
    getAudioTags();
}

function onPlayChannel1(ev): void {
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
        element.addEventListener("click", onPlayChannel1);
    });
}

function startRecord(ev) { 
    tempRecordingCannal = ev.currentTarget.dataset.record;
    isRecording = true;
    timeStartRecording = ev.timeStamp
}

function stopRecord(){ 
    isRecording = false;
}

function getAudioTags() {
    clapSound = document.querySelector('[data-sound="clap"]');
    boomSound = document.querySelector('[data-sound="boom"]');
}

function onKeyDown(ev: KeyboardEvent): void {
    if(isRecording)
        record(ev);
    playSound(ev.key);
}

function record(ev) { 
    const key = ev.key;
    const time = ev.timeStamp - timeStartRecording;
    eval("channel"+tempRecordingCannal).push({ key, time })
}

function playSound(key: string) {
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
