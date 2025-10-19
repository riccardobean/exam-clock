const time = document.getElementById('current-time');
const start = document.getElementById('start-time');
const end = document.getElementById('end-time');
const info1 = document.getElementById('info1');
const info2 = document.getElementById('info2');
const course_name = document.getElementById('course-name');
const room_name = document.getElementById('room-name');
const new_course_name = document.getElementById('course-name-input');
const new_room_name = document.getElementById('room-name-input');
const new_start = document.getElementById('start-time-input');
const new_end = document.getElementById('end-time-input');
var played1 = false;
var played2 = false;
var played3 = false;
var played4 = false;

function playAudio(id) {
    document.getElementById(id).play();
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    time.textContent = `${hours}:${minutes}:${seconds}`;

    if (hours === start.textContent.split(':')[0] && String(now.getMinutes() + 1).padStart(2, '0') === start.textContent.split(':')[1]) {
        info1.textContent = 'Exam Starting in 1 Minute';
        info2.textContent = 'Exam Starting in 1 Minute';
        info1.style.color = 'orange';
        info2.style.color = 'orange';
        if (played1 === false) {
            playAudio('start-in-one-minute');
            played1 = true;
        }
    } else if (String(now.getHours() + 1).padStart(2, '0') === start.textContent.split(':')[0] && minutes === '59' && start.textContent.split(':')[1] === '00') {
        info1.textContent = 'Exam Starting in 1 Minute';
        info2.textContent = 'Exam Starting in 1 Minute';
        info1.style.color = 'orange';
        info2.style.color = 'orange';
        if (played1 === false) {
            playAudio('start-in-one-minute');
            played1 = true;
        }
    }
    if (hours === start.textContent.split(':')[0] && minutes === start.textContent.split(':')[1]) {
        info1.textContent = 'Exam Started';
        info2.textContent = 'Exam Started';
        time.style.color = 'green';
        start.style.color = 'green';
        info1.style.color = 'green';
        info2.style.color = 'green';
        if (played2 === false) {
            playAudio('exam-started');
            played2 = true;
        }
    }
    if (hours === start.textContent.split(':')[0] && String(now.getMinutes() - 1).padStart(2, '0') === start.textContent.split(':')[1]) {
        info1.textContent = '';
        info2.textContent = '';
        time.style.color = 'white';
        start.style.color = 'white';
        course_name.textContent = new_course_name.value || 'Course Name';
        room_name.textContent = new_room_name.value || 'Room Name';
    } else if (String(now.getHours() + 1).padStart(2, '0') === start.textContent.split(':')[0] && minutes === '00' && start.textContent.split(':')[1] === '59') {
        info1.textContent = '';
        info2.textContent = '';
        time.style.color = 'white';
        start.style.color = 'white';
        course_name.textContent = new_course_name.value || 'Course Name';
        room_name.textContent = new_room_name.value || 'Room Name';
    }
    if (hours === end.textContent.split(':')[0] && String(now.getMinutes() + 1).padStart(2, '0') === end.textContent.split(':')[1]) {
        info1.textContent = '1 Minute Remaining';
        info2.textContent = '1 Minute Remaining';
        info1.style.color = 'orange';
        info2.style.color = 'orange';
        start.style.color = 'white';
        end.style.color = 'orange';
        time.style.color = 'orange';
        if (played3 === false) {
            playAudio('one-minute-remaining');
            played3 = true;
        }
    } else if (String(now.getHours() + 1).padStart(2, '0') === end.textContent.split(':')[0] && minutes === '59' && end.textContent.split(':')[1] === '00') {
        info1.textContent = '1 Minute Remaining';
        info2.textContent = '1 Minute Remaining';
        info1.style.color = 'orange';
        info2.style.color = 'orange';
        start.style.color = 'white';
        end.style.color = 'orange';
        time.style.color = 'orange';
        if (played3 === false) {
            playAudio('one-minute-remaining');
            played3 = true;
        }
    }
    if (hours === end.textContent.split(':')[0] && minutes === end.textContent.split(':')[1]) {
        info1.textContent = 'Exam Ended';
        info2.textContent = 'Exam Ended';
        info1.style.color = 'red';
        info2.style.color = 'red';
        start.style.color = 'white';
        end.style.color = 'red';
        time.style.color = 'red';
        if (played4 === false) {
            playAudio('exam-ended');
            played4 = true;
        }
    }
}

setInterval(updateTime, 100);


updateTime()



function requestFullScreen() {
    const element = document.documentElement;

    window.scrollTo(0, 0)

    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}


function setElements() {
    course_name.textContent = new_course_name.value || 'Course Name'
    room_name.textContent = new_room_name.value || 'Room Name'
    start.textContent = new_start.value || '00:00'
    end.textContent = new_end.value || '00:00'
}

setInterval(setElements, 1000);

function resetElements() {
    new_course_name.value = ''
    new_room_name.value = ''
    new_start.value = ''
    new_end.value = ''
    info1.textContent = ''
    info2.textContent = ''
    info1.style.color = 'white'
    info2.style.color = 'white'
    start.style.color = 'white'
    end.style.color = 'white'
    time.style.color = 'white'
    played1 = false;
    played2 = false;
    played3 = false;
    played4 = false;
    setElements();
}

document.addEventListener("contextmenu", (e) => { e.preventDefault() });

document.addEventListener('dblclick', (e) => {
    e.preventDefault();
    if (document.fullscreenElement == null) {
        requestFullScreen()
    }
    else {
        document.exitFullscreen();
    }
});

let wakeLock = null;

async function requestWakeLock() {
    try {
        if ('wakeLock' in navigator && !wakeLock) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake lock active');

            // Reacquire if the system temporarily releases it
            wakeLock.addEventListener('release', () => {
                console.log('Wake lock released');
                wakeLock = null;
            });
        }
    } catch (err) {
        console.warn('Wake lock request failed:', err);
    }
}

async function releaseWakeLock() {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
        console.log('Wake lock manually released');
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && document.fullscreenElement) {
        requestWakeLock();
    } else {
        releaseWakeLock();
    }
});

document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        requestWakeLock();
    } else {
        releaseWakeLock();
    }
});