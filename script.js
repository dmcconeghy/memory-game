const gameContainer = document.getElementById("game");
let started = false; 

const start = document.querySelector("#start")
const reset = document.querySelector("#reset");

const IMAGES = [
  'url("AvatarMemory/aang.jpg")',
  'url("AvatarMemory/appa.jpg")',
  'url("AvatarMemory/asami.jpg")',
  'url("AvatarMemory/azula.jpg")',
  'url("AvatarMemory/bolin.jpg")',
  'url("AvatarMemory/bumi.jpg")',
  'url("AvatarMemory/iroh.jpg")',
  'url("AvatarMemory/jeongjeong.jpg")',
  'url("AvatarMemory/katara.jpg")',
  'url("AvatarMemory/korra.jpg")',
  'url("AvatarMemory/kuruk.jpg")',
  'url("AvatarMemory/lin.jpg")',
  'url("AvatarMemory/madamwu.jpg")',
  'url("AvatarMemory/mako.jpg")',
  'url("AvatarMemory/mechanist.jpg")',
  'url("AvatarMemory/meiling.jpg")',
  'url("AvatarMemory/meng.jpg")',
  'url("AvatarMemory/momo.jpg")',
  'url("AvatarMemory/ozai.jpg")',
  'url("AvatarMemory/pabu.jpg")',
  'url("AvatarMemory/paindao.jpg")',
  'url("AvatarMemory/pakku.jpg")',
  'url("AvatarMemory/roku.jpg")',
  'url("AvatarMemory/suki.jpg")',
  'url("AvatarMemory/sokka.jpg")',
  'url("AvatarMemory/tenzin.jpg")',
  'url("AvatarMemory/toph.jpg")',
  'url("AvatarMemory/tylee.jpg")',
  'url("AvatarMemory/yangchen.jpg")',
  'url("AvatarMemory/yue.jpg")',
  'url("AvatarMemory/zuko.jpg")']

let TILESET = [];
let numPairs = null;
let choices = [];
let flipChecker = null;

function generateTiles(){
  numPairs = document.querySelector("#myRange").value;

  // pick the # of tiles from the range slider
    while(choices.length < numPairs){
      let random = Math.ceil(Math.random()*IMAGES.length)
    if (choices.indexOf(random) === -1){
      choices.unshift(random)
    }
    
  }
  
  console.log(choices)
  // set the deck with two of everything
  for (let i = 0; i < numPairs; i++){
    TILESET.unshift(IMAGES[choices[i]])
    TILESET.unshift(IMAGES[choices[i]])
  } 

}

start.addEventListener("click", function(e){
  started = true;
  generateTiles();
  createDivsForColors(shuffle(TILESET));
})

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

function createDivsForColors(tileArray) {
  for (let tile of tileArray) {

    const sceneDiv = document.createElement("div");
    sceneDiv.classList.add("scene", "scene--card")
    sceneDiv.addEventListener("click", handleCardClick);
    gameContainer.append(sceneDiv);
    
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    sceneDiv.appendChild(cardDiv);

    const cardFront = document.createElement("div");
    cardFront.classList.add("card__face", "card__face--front");
    cardDiv.appendChild(cardFront)

    const cardBack = document.createElement("div");
    cardBack.classList.add("card__face", "card__face--back");
    cardDiv.appendChild(cardBack)
    cardDiv.setAttribute("src", `${tile}`);
    cardBack.style.backgroundImage = tile;
  }
}

function handleCardClick(event) {
  if (started && (!event.currentTarget.firstChild.classList.contains("is-flipped"))){

    flipChecker = document.getElementsByClassName("is-flipped")
   
    if (flipChecker.length < 2){
    
      event.currentTarget.firstChild.classList.toggle("is-flipped");
      }

    if (flipChecker.length === 2){

      if (flipChecker[0].getAttribute("src") === flipChecker[1].getAttribute("src")){
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