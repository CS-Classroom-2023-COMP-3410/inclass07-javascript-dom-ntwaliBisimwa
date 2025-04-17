// Preparing the cards

const allCards = [];
const excludeCards = [];

for (let i = 127137; i <= 127172; i++) {
  if (excludeCards.includes(i)) {
    continue;
  }
  allCards.push(i);
}
console.log(allCards);

//Randomize 8 cards for pairs
const selected = allCards.sort(() => 0.5 - Math.random()).slice(0, 8);
console.log(selected);
const gameCards = [...selected, ...selected];
console.log(gameCards);

// Now I want to shuffle them

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
const shuffledCards = shuffle([...gameCards]); // passing a copy
console.log("Original (unshuffled):", gameCards);
console.log("Shuffled:", shuffledCards);
shuffle(gameCards);

const gameArea = document.getElementById("game-board");
let flipped = [];
let matched = [];

let moves = 0;
let allowClick = true;

// I now want to render the cards
gameCards.forEach((code, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.code = code;
  card.innerHTML = `<div class="card-inner">
    <div class="card-front">&#${code};</div>
    <div class="card-back">🂠</div>
  </div>`;
  card.addEventListener("click", () => flipCard(card));
  gameArea.appendChild(card);
});


function flipCard(card) {
    if(!allowClick || card.classList.contains("matched") || card.classList.contains("flipped")) return;
    card.classList.add("flipped");
    flipped.push(card);

    if (flipped.length === 2) {
        moves++
        allowClick = false;
        const [card1, card2] = flipped;
        if (card1.dataset.code === card2.dataset.code) {
            card1.classList.add("matched");
            card2.classList.add("matched");
            matched.push(card1, card2);
            flipped = [];
            allowClick = true;
        } else {
            setTimeout(() => {
              card1.classList.remove("flipped");
              card2.classList.remove("flipped");
              flipped = [];
              allowClick = true;
            }, 1000);
    }
}
}
