const cards = document.querySelectorAll('.card');
const popup = document.getElementById('win-popup')


function shuffle() {
 
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}





let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;


function flipCard() {
    
    if (lockBoard || this.classList.contains('flipped')) return;
    timerActive = true;
    if(this === firstCard){return};
    this.classList.add('flipped')
    
    if(!firstCard){
        playSound(flipSound)
        firstCard = this;   
    }else{
        secondCard = this;
        
        checkForMatch();
    }

    console.log(this.querySelector('span').textContent)
}

function checkForMatch() {
    const firstCardContent = firstCard.querySelector('span').textContent;
    const secondCardContent = secondCard.querySelector('span').textContent;

    if(firstCardContent == secondCardContent){
        console.log("MATCH");
        playSound(matchSound);
        resetCards(false);   
        checkWin(); 
        
    }
    else{
        console.log("MISS")
        playSound(missSound)
        lockBoard = true;
        resetCards(true);
    }
}

function resetCards(miss){
    
    if(miss == true){
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
    
            [firstCard, secondCard] = [null, null];
            lockBoard = false;
        }, 1000);
    }
    else{
        [firstCard, secondCard] = [null, null]
    }
}

function checkWin() {
    let allFlipped = true;
    cards.forEach(card => {
        if (!card.classList.contains('flipped')) {
            allFlipped = false;
        }
    });
    
    if (allFlipped) {
        timerActive = false;    
        console.log("Parabéns! Você ganhou!");
        popup.classList.add('visible');
    }
}




function resetGame() {
    timer.textContent = "00:00"
    timerActive = false;
    seconds = 0;
    minutes = 0;
    if(popup.classList.contains('visible')){
        popup.classList.remove('visible');
    }

    cards.forEach(card => {
        card.style.transition="none";
    });

    cards.forEach(card => {
        if (card.classList.contains('flipped')) {
            card.classList.remove('flipped');
        }
    });

    setTimeout(() => {
        shuffle();
        cards.forEach(card => {
            card.style.transition="";
        });
    }, 100);
    // [firstCard, secondCard] = [null, null]
    // return;
    resetCards(miss);
}

const flipSound = document.getElementById("flip");
const matchSound = document.getElementById("match");
const missSound = document.getElementById("miss")
const music = document.getElementById("music");

function playSound(sound){
    sound.play();
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        playSound(music);
    }, 100)
});

const musicBtn = document.getElementById("musicBtn");

function toggleMusic(){
    if(music.muted){
        musicBtn.textContent = "🔊";
    }
    else{
        musicBtn.textContent = "🔇";
    }
    music.muted = !music.muted;
}

const timer = document.getElementById("timer");
let timerActive = false;
let minutes = 0;
let seconds = 0;

function updateTimer(){

    if(timerActive){
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
        }
        
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
        timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
    }
}

const interval = setInterval(updateTimer, 1000);



cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();