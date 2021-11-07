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
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (started && (!event.target.classList.contains("flipped", "matched"))){
    let checker = document.getElementsByClassName("flipped");

    if (checker.length < 2){
      event.target.style.backgroundColor = `${event.target.classList}`
      event.target.classList.add("flipped");
    }

    if (checker.length === 2){
      if (checker[0].style.backgroundColor === checker[1].style.backgroundColor){
        console.log("match found");
        checker[1].classList.add("matched");
        checker[0].classList.add("matched");
        checker[1].removeEventListener("click", handleCardClick);
        checker[0].removeEventListener("click", handleCardClick);
        checker[1].classList.remove("flipped");
        checker[0].classList.remove("flipped")
        checker = []
      } else {
        console.log("No Match!");
        setTimeout(function(){
          checker[1].style.backgroundColor = "";
          checker[0].style.backgroundColor = "";
          checker[1].classList.remove("flipped");
          checker[0].classList.remove("flipped")
          checker = [];
        }, 1000)
        
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
