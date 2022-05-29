window.addEventListener('load', () => {
    guess();
});

// Game variables 
const amassing = document.getElementById("guess");
const amassingWord = document.getElementById("guessWord");
const usingWord = document.getElementById("words");
const chance = document.getElementById("chance");
const result = document.getElementById("result");
const replay = document.getElementById("replay");
const gameChance = document.getElementById("game");
const notif = document.getElementById("notif");

// Hang variables 
const hangBottom = document.getElementById("bottom");
const hangTop = document.getElementById("top");
const hangLeft = document.getElementById("left");
const hangRight = document.getElementById("right");

// Man variables 
const manHead = document.getElementById("head");
const manBody = document.getElementById("body");
const manHandLeft = document.getElementById("handLeft");
const manHandRight = document.getElementById("handRight");
const manLegLeft = document.getElementById("legLeft");
const manlegRight = document.getElementById("legRight");

// Others variables
const errors = [hangBottom, hangRight, hangTop, hangLeft, manHead, manBody, manHandLeft, manHandRight, manLegLeft, manlegRight];

// Guess variables
const guessAnswer = ["mur", "banane", "bougie", "conjoints", "ascenseur", "barrage", "coeur", "farce"];
const guessTarget = ["Qu’est-ce que peut faire le tour de la maison sans bouger", "Qu’est-ce qui est jaune avec une cape ?", "Qu’est-ce qui né grand et meurt petit", "Comment appelez-vous deux sorcières qui vivent ensemble ?", "Qui a la forme d’une boîte, n’a pas de pieds il  monte et descend ?", "Que dit un poisson lorsqu’il se heurte à un mur de béton ?", "Ce n’est pas dans votre ventre mais quelque part au-dessus. Beaucoup pensent que c’est le symbole de l’amour.", "Je suis une plaisanterie très utilisée en cuisine !"];

let typing, answer, arrayWords, game = 1;

function guess() {
    
    hangManHidden();
    newChance(game);
    window.addEventListener('keydown', e => {
        logKey(e, answer, arrayWords);
    });
}
function logKey(e, answer, arrayWords) {
    if (lettersOnly(e)) {
        typing.push(e.key.toLowerCase());
    } else {
        notif.textContent = 'Seuls les alphabets qui sont autorisés';
        notif.style.marginTop = notif.style.padding = '5px';
        setInterval(() => {
            notif.textContent = "";
            notif.style.marginTop = notif.style.padding = 0;
        }, 5000);
    }

    const noDuplicate = [...new Set(typing)];
    let vie = 0;

    for (let i = 0; i < noDuplicate.length; i++) {
        (noDuplicate.length == 1) ? hangManHidden() : '';

        if (vie < 10) {
            const index = getAllIndexes(answer, noDuplicate[i]);
            if (index.length == 0) {
                errors[vie].style.visibility = 'visible';
                vie++;
            }
            for (let j = 0; j < index.length; j++) {
                arrayWords[index[j]] = noDuplicate[i];
            }
        } else {
            result.innerHTML = 'You L🤪se';
            replay.textContent = 'Press Any Key to Replay';
            game++;
            newChance(game);
        }
        chance.textContent = parseInt(10 - vie);
    }
    amassingWord.textContent = arrayWords.join(' ').replace(/,/g, '');
    usingWord.textContent = noDuplicate.join();
    if (arrayWords.join('').replace(/,/g, '') == answer) {
        result.innerHTML = 'You w<i class="fa-brands fa-linkedin"></i>';
        replay.textContent = 'Press Any Key to Replay';
        game++;
        newChance(game);
    }
}

function lettersOnly(e) {
    const letters = /^[A-Za-z]+$/;
    if (e.key.match(letters) != null && e.key != 'Backspace') {
        return true;
    } else {
        return false;
    }
}

function getAllIndexes(arr, val) {
    let indexes = [], i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            indexes.push(i);
        }
    }
    return indexes;
}

function newChance(game) {
    typing = [];
    const underscore = "_";
    const answerIndex = Math.floor(Math.random() * guessAnswer.length);
    answer = guessAnswer[answerIndex];
    amassing.textContent = guessTarget[answerIndex];
    const underscoreMultiple = underscore.repeat(answer.length).trim();
    arrayWords = underscoreMultiple.split('');
    amassingWord.textContent = arrayWords.join(' ');
    chance.textContent = '10';
    usingWord.textContent = '';
    gameChance.textContent = game;
}

function hangManHidden(){
    for(error of errors){
        error.style.visibility = 'hidden';
    }
    result.innerHTML = replay.textContent = '';
}