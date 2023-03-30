const btnPlay = document.getElementById("btn");

const select = document.getElementById("select");

const container = document.querySelector(".container");

const output = document.getElementById("output");

const blackList = [];

let bombs = [];

let randomNumber;

let points = 0;

btnPlay.addEventListener("click", generatePlayArea)

function generatePlayArea(){
  reset(blackList);
  container.classList.add("fade-in");

  let boxNumber;

  switch (parseInt(select.value)){
    case 1:
      boxNumber = 100;
    break;
    
    case 2:
      boxNumber = 81;
    break;

    case 3:
      boxNumber = 49;
    break;

    default:
      boxNumber = 100;
  }
  
  do{
    randomNumber = verifyRandomNumber(blackList, boxNumber);
    blackList.push(randomNumber)
  }while(blackList.length !== boxNumber)
  
  for(let i = 0; i < boxNumber; i++){
    const box = createElement(blackList[i], parseInt(select.value), bombs, boxNumber);
    container.appendChild(box);
  }

  bombs = createBomb(boxNumber);

}

/**
 * This function does 3 actions:
 * - It creates an element then adds the class "box" to it and, depending on the "lvl" value it adds "lvlmedium" if lvl = 2 or "lvlsimple" if lvl = 3, otherwise it adds only "box".
 * - It saves "randomNumber" in a custom tag that is saved inside the element.
 * - It toggles the class "clicked" and shows in a "console.log" the custom tag that was generated before; this is done by an "EventListener" on the element that is activated when the single element is clicked.
 * 
 * @param {number} randomNumber 
 * @param {number} lvl 
 * @returns element
 */
function createElement(randomNumber, lvl, bombs, limit){
  const box = document.createElement("div");
  box.className = "box";
  switch (lvl){
    case 1:
      box.classList.add("lvlsimple");
    break;

    case 2:
      box.classList.add("lvlmedium");
    break;

    case 3:
      box.classList.add("lvlhard");
    break;
  }
  box.setAttribute("tagRandomNumber", randomNumber);

  box.innerHTML =`${box.getAttribute("tagRandomNumber")}`
  box.addEventListener("click", function(){
    clickHandler(box, bombs, limit);
  })
  return box;
}

/**
 * This funcition generates a random number between 1 and "limit".
 * 
 * @param {number} limit 
 * @returns random number between 1 and "limit"
 */
function getRandomNumber(limit){
  const number = Math.floor(Math.random() * limit) + 1;
  return number;
}

/**
 * This function verifies by comparing the generated number to an array that the number generated is unique, if it is it returns it, otherwise it keeps generating numbers.
 * 
 * @param {array} array 
 * @param {number} limit 
 * @returns unique random number
 */
function verifyRandomNumber(array, limit){
  let number;
  do{
    number = getRandomNumber(limit);
  }while(array.includes(number))
  return number;
}

function createBomb(limit){
    while(bombs.length !== 16){
      const bombId = Math.floor(Math.random() * limit) + 1;
      if(!bombs.includes(bombId)) bombs.push(bombId);
      console.log(bombs);
    }
}

function clickHandler(box, bombs, limit){
  const boxCollection = document.querySelectorAll(".box");
  if(bombs.includes(parseInt(box.getAttribute("tagRandomNumber")))){
    gameEnd(box, bombs, limit,boxCollection, false);
  }else if(points === boxCollection.length - bombs.length){
    gameEnd(box, bombs, limit,boxCollection, true)
  }else{
    const classArray = box.className;
    if(!classArray.includes("clicked")) points++;
    console.log(points);
    box.classList.add("clicked");
    points++;
    box.removeEventListener("click", function(){});
  }
}

function gameEnd(box, bombs, limit, boxCollection, flag){
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  container.appendChild(overlay);
  let message = "";
  if(flag){
    message =`
    Hai vinto! Hai ottenuto ${points} punti su ${boxCollection.length - bombs.length}
    `
  }else{
    for(let j = 0; j < bombs.length; j++){
      for(let i = 0; i < limit; i++){
        if(bombs[j] === parseInt(boxCollection[i].getAttribute("tagRandomNumber"))){
          boxCollection[i].classList.add("bomb");
        }
      }
    }

    message =`
    Hai perso! Hai ottenuto ${points} punti su ${boxCollection.length - bombs.length}
    `
  }
  output.innerHTML = message;
}

function reset(array){
  array.splice(0,array.length);
  bombs = [];
  points = 0;
  container.innerHTML = "";
}