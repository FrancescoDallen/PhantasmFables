// Script untuk Game-page (Memory Card)
const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const moreButton = document.getElementById("moreButton");
const backsound = document.getElementById("backsound");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");

let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Array items
const items = [
    {name: "BlackClover", image: "Cards_Game/BlackClover.jpg"}, 
    {name: "BloomingLove", image: "Cards_Game/BloomingLove.png"}, 
    {name: "Dr.Stone", image: "Cards_Game/Dr.Stone.jpg"}, 
    {name: "HatarakuMaou-sama", image: "Cards_Game/HatarakuMaou-sama.jpg"}, 
    {name: "HighSchoolFamily", image: "Cards_Game/HighSchoolFamily.png"}, 
    {name: "HonzukinoGekokujou", image: "Cards_Game/HonzukinoGekokujou.png"}, 
    {name: "JujutsuKaisen", image: "Cards_Game/JujutsuKaisen.jpg"}, 
    {name: "OnePiece", image: "Cards_Game/OnePiece.jpg"}, 
    {name: "SakamotoDays", image: "Cards_Game/SakamotoDays.png"}, 
    {name: "VolcanicAge", image: "Cards_Game/VolcanicAge.png"}
];

// Inisialisasi Time
let seconds = 0,minutes = 0;

// Inisialisasi Moves dan Win Count
let movesCount = 0,winCount = 0;

// Bagian Timer
const timeGenerator = () => {
    seconds += 1;
    // Bagian logic dari timer
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    // Format dari Timer sebelum main
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time: </span>${minutesValue}:${secondsValue}`;
};

// Untuk menghitung jumlah moves
const movesCounter = () => {
    movesCount += 1;
    moves.innerHTML = `<span>Moves: </span>${movesCount}`;
};

// Random objek dari array items
const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;
    
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);

        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

// Fungsi untuk hidden tombol MORE
const hideMoreButton = () => {
    if (moreButton) {
        moreButton.style.display = "none";
    }
};

// Fungsi untuk show tombol MORE
const showMoreButton = () => {
    if (moreButton) {
         moreButton.style.display = "block"
    }
};

// Fungsi untuk Play Backsound
const playBacksound = () => {
    backsound.play();
};

// Fungsi untuk Stop Backsound
const stopBacksound = () => {
    backsound.pause();
    backsound.currentTime = 0;
};

// Fungsi untuk mengatur margin tombol MORE
const setMoreButtonMargin = (marginValue) => {
    const moreButton = document.getElementById("moreButton");
    moreButton.style.marginTop = marginValue;
};

const handleGameWin = () => {
    setMoreButtonMargin("460px");
};

const matrixGenerator = (cardValues, size = 4) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    // Untuk mengocok atau merandom card
    cardValues.sort(() => Math.random() - 0.5);
    for (let i = 0; i < size * size; i++) {
        gameContainer.innerHTML += `<div class="card-container" data-card-value="${cardValues[i].name}">
            <div class="card-before">?</div>
            <div class="card-after"><img src="${cardValues[i].image}" class="image"/></div>
        </div>`;
    }
    // Bagian Grid
    gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

    // Bagian Cards
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");

                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                }
                else {
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
    
                        firstCard = false;
                        winCount += 1;
    
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>You Won</h2>
                            <h4>Moves: ${movesCount}</h4>`;
                            handleGameWin();
                            stopGame();
                        }
                    }
                    else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                }
            }
        });
    });
};

// Bagian Start Game
startButton.addEventListener("click", () => {
    movesCount = 0;
    // Agar ketik start game, time menjadi 0
    seconds = 0;
    minutes = 0;
    // Bagian control dan button
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");

    // Memanggil fungsi hideMoreButton()
    hideMoreButton();
    // Memanggil fungsi playBacksound()
    playBacksound();

    // Bagian Start Timer
    interval = setInterval(timeGenerator, 1000);
    // Moves
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    initializer();
});

// Bagian Stop Game
stopButton.addEventListener("click", 
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");

        // Memanggil fungsi showMoreButton
        showMoreButton();
        // Memanggil fungsi stopBacksound
        stopBacksound();

        clearInterval(interval);
    })
);

// Main Program
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};

// Akhir dari Script untuk Game-page (Memory Card)

// Search Bar
const searchInput = document.getElementById("search-form");
const mangaCards = document.getElementById("cardMangas");
const listCard = mangaCards.getElementsByClassName("card__article");

searchInput.addEventListener("keyup", function (e) {
    const listTerm = e.target.value.toLowerCase();
    for (let i = 0; i < listCard.length; i++) {
        const text = listCard[i].getElementsByClassName("card__title")[0].textContent.toLowerCase();
        if (text.includes(listTerm)) {
            listCard[i].style.display = "block";
        }
        else {
            listCard[i].style.display = "none";
        }
    }
});
// Search Bar selesai