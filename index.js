










// SELECT AUDIO MODAL : 

const saveModal = document.getElementById("save-modal");

const shootAudioSelect = document.getElementById("shootAudioSelect");
const defaultAudioSelect = document.getElementById("dafaultAudioSelect");
const reloadAudioSelect = document.getElementById("reloadAudioSelect");

let shootAudioSelected;
let defaultButtonAudioSelected;
let reloadAudioSelected;

let isModal = false;

saveModal.addEventListener("click", function () {
    isModal = false;
    modalShild.style.display = "none";
    modalContainer.style.animation = "modalDown 0.3s linear both";
    settingsIcon.className = "ri-settings-4-fill"
    setTimeout(() => {
        modalContainer.style.display = "none";
    }, 100);
});

shootAudioSelect.addEventListener("change", function (event) {
    const fileInput = event.target;
    const shootAudoSource = document.getElementById("shootAudioSelect"); 

    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        const objectURL = URL.createObjectURL(selectedFile);
        shootAudoSource.src = objectURL;
        shootAudioSelected = objectURL;
    }
});

defaultAudioSelect.addEventListener("change", function (event) {
    const fileInput = event.target;
    const defaultAudioSource = document.getElementById("dafaultAudioSelect"); 

    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        const objectURL = URL.createObjectURL(selectedFile);
        defaultAudioSource.src = objectURL;
        defaultButtonAudioSelected = objectURL;
    }
});

reloadAudioSelect.addEventListener("change", function (event) {
    const fileInput = event.target;
    const reloadAudioSource = document.getElementById("reloadAudioSelect"); 

    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        const objectURL = URL.createObjectURL(selectedFile);
        reloadAudioSource.src = objectURL;
        reloadAudioSelected = objectURL;
    }
});

// JOYSTICK : 

const joystickContainer = document.getElementById('joystick-container');
const joystick = document.getElementById('joystick');

let isDragging = false;

joystick.addEventListener('mousedown', startDragging);
document.addEventListener('mousemove', handleDragging);
document.addEventListener('mouseup', stopDragging);

function startDragging(event) {
    isDragging = true;
    handleDragging(event); 
}

function handleDragging(event) {
    if (isDragging) {
        const containerRect = joystickContainer.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        const joystickX = mouseX - joystick.clientWidth / 2;
        const joystickY = mouseY - joystick.clientHeight / 2;

        const maxX = joystickContainer.clientWidth - joystick.clientWidth;
        const maxY = joystickContainer.clientHeight - joystick.clientHeight;

        joystick.style.left = `${Math.min(Math.max(joystickX, 0), maxX)}px`;
        joystick.style.top = `${Math.min(Math.max(joystickY, 0), maxY)}px`;
    }
}

function stopDragging() {
    if (isDragging) {
        joystick.style.left = 'auto';
        joystick.style.top = 'auto';

        isDragging = false;
    }
}

// HOT BAR : 

const changeGunButton = document.getElementById("change-gun-button");
const hotBarSelect = document.getElementById("hotbar-select");

let hotBarState = 1;

changeGunButton.addEventListener("click", function () {
    hotBarState++;

    if (hotBarState > 3) {
        hotBarState = 1;
    }

    if (hotBarState === 1) {
        hotBarSelect.style.left = "55px";
    } else if (hotBarState === 2) {
        hotBarSelect.style.left = "95px";
    } else if (hotBarState === 3) {
        hotBarSelect.style.left = "132px";
    }
});

// DEFAULT BUTTON : 

const defaultButtons = document.querySelectorAll(".default-button");

defaultButtons.forEach(function (dButton) {
    dButton.addEventListener("click", function () {
        let selectedDefaultAudio = defaultButtonAudioSelected || "./assets/button-effect.m4a";

        const defaultAudioButton = new Audio(selectedDefaultAudio);
        defaultAudioButton.play();
    });
});


// BULLET SYSTEM : 

const bulletSlot = document.getElementById("bullet-slot");
const shootButton = document.getElementById("shoot-button");
const bulletValueLabel = document.getElementById("bullet-value-label");
const reloadGunButton = document.getElementById("reload-gun-button");

let bullets = [
    { bullet: 20 },
    { bullet: 20 },
    { bullet: 20 },
    { bullet: 20 }
];

for (let b = 0; b < bullets.length; b++) {
    const bullet = document.createElement("img");
    bullet.className = "bullet";
    bullet.src = "./assets/HUD - BULLET ICON.png";

    bulletValueLabel.textContent = `${bullets.length}`;

    bulletSlot.appendChild(bullet);

    bullet.addEventListener("click", createBulletClickHandler(bullet, b));

    reloadGunButton.addEventListener("click",function(){
        reloadGunButton.style.animation = "reloadGun 1s linear both";
    
        setTimeout(() => {
            reloadGunButton.style.animation = "";
            bullets = [
                { bullet: 20 },
                { bullet: 20 },
                { bullet: 20 },
                { bullet: 20 }
            ];
            bulletSlot.appendChild(bullet);
            bulletValueLabel.textContent = `${bullets.length}`;
            const audio = new Audio("./assets/gun-reload-effect.m4a");

            audio.volume = 0.1;

            audio.play();

        }, 1000);
        
    
    });
}

function createBulletClickHandler(bullet, index) {
    return function () {
        bullet.remove();

        bullets.splice(index, 1);
    };
}


shootButton.addEventListener("click", function () {
    if (hotBarState === 1) {
        const audio = new Audio("./assets/shoot-effect.m4a");

        audio.volume = 0.1;

        if (bullets.length > 0) {
            audio.src = shootAudioSelected || "./assets/shoot-effect.m4a";
        } else if (bullets.length === 0) {
            audio.src = reloadAudioSelected || "./assets/empty-bullet-effect.m4a";
        }

        audio.play();

        if (bullets.length > 0) {
            const bullet = bullets.shift();
            bulletSlot.firstChild.remove();
            bulletValueLabel.textContent = `${bullets.length}`;
        } else {
            console.log("Sem balas!");
        }
    }
});


// DEV INPUT : 

const lifeValueLabel = document.getElementById("life-value-label");
const shildValueLabel = document.getElementById("shild-value-label");

const lifeInput = document.getElementById("life-input");
const shildInput = document.getElementById("shild-input");

lifeInput.addEventListener("input",function(){
    lifeValueLabel.textContent = `${lifeInput.value}`;
});

shildInput.addEventListener("input",function(){
    shildValueLabel.textContent = `${shildInput.value}`;
});


// FULLSCREEN : 

const toggleFullscreenButton = document.getElementById("toggle-fullscreen");
const smartphone = document.getElementById("smartphone");
const fullscreenIcon = document.getElementById("fullscreen-icon");
const devContainer = document.querySelector(".dev-container");
const castleRainLogo = document.querySelector(".castle-rain-logo");

let fullscreen = false;

toggleFullscreenButton.addEventListener("click", function () {
    fullscreen = !fullscreen;

    if (fullscreen) {
        smartphone.style.transition = "0.3s all";
        smartphone.style.transform = "scale(1.5)";
        fullscreenIcon.className = "ri-fullscreen-exit-line";
        devContainer.style.display = "none";
        castleRainLogo.style.display = "none";
        setTimeout(() => {
            smartphone.style.transition = "";
        }, 1000);
    }else{
        smartphone.style.transition = "0.3s all";
        smartphone.style.transform = "scale(1)";
        fullscreenIcon.className = "ri-fullscreen-line";
        devContainer.style.display = "flex";
        castleRainLogo.style.display = "flex";
        setTimeout(() => {
            smartphone.style.transition = "";
        }, 1000);
    }
});


// MODAL : 

const openModalButton = document.getElementById("openModal");
const modalContainer = document.getElementById("modal-container");
const settingsIcon = document.getElementById("settings-icon");
const modalShild = document.getElementById("modal-shild");

openModalButton.addEventListener("click",function(){
    isModal = !isModal;

    if (isModal){
        modalShild.style.display = "flex";
        modalContainer.style.display = "flex";
        modalContainer.style.animation = "modalUp 0.3s linear both";
        settingsIcon.className = "ri-close-line";
    }else{
        modalShild.style.display = "none";
        modalContainer.style.animation = "modalDown 0.3s linear both";
        settingsIcon.className = "ri-settings-4-fill"
        setTimeout(() => {
            modalContainer.style.display = "none";
        }, 100);
    }
});



