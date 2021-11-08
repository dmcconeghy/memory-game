const gameContainer = document.getElementById("game");
let started = false; 
const COLORS = ["red","blue","green","orange","purple","red","blue","green","orange","purple"];

const start = document.querySelector("#start")
start.addEventListener("click", function(e){
  started = true;
})

const reset = document.querySelector("#reset");
reset.addEventListener("click", function(e){
  //localStorage.clear();
  location.reload();
 });
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {

    const sceneDiv = document.createElement("div");
    sceneDiv.classList.add("scene", "scene--card")
    sceneDiv.addEventListener("click", handleCardClick);
    gameContainer.append(sceneDiv);
    
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    sceneDiv.appendChild(cardDiv);

// This function makes flipping work, but needs to limit to 2
// Probably move it inside handleCardClick()
    // cardDiv.addEventListener("click", function(){
    //   cardDiv.classList.toggle("is-flipped");
    // }); 
    

    const cardFront = document.createElement("div");
    cardFront.classList.add("card__face", "card__face--front");
    cardDiv.appendChild(cardFront)

    const cardBack = document.createElement("div");
    cardBack.classList.add("card__face", "card__face--back");
    cardDiv.appendChild(cardBack)
    cardDiv.setAttribute("color", `${color}`);
    // cardDiv.style.backgroundColor = color;
  }
}

let flipChecker
function handleCardClick(event) {
  if (started){

    flipChecker = document.getElementsByClassName("is-flipped")
    let pair = 0;
   
    if (flipChecker.length < 2){
      pair = 1;
      event.currentTarget.firstChild.classList.toggle("is-flipped");
      }

    if (flipChecker.length === 2){
      if (flipChecker[0].getAttribute("color") === flipChecker[1].getAttribute("color")){
        console.log("match found");
        flipChecker[1].classList.toggle("is-flipped-matched");
        flipChecker[0].classList.toggle("is-flipped-matched");
        flipChecker[1].classList.toggle("is-flipped");
        flipChecker[0].classList.toggle("is-flipped");
       
      
      } else {
        console.log("No Match!");
        setTimeout(function(){
         
          flipChecker[1].classList.toggle("is-flipped");
          flipChecker[0].classList.toggle("is-flipped");
          
         
        }, 1000)
        
      }
    }
   }
}

// when the DOM loads
createDivsForColors(shuffledColors);

