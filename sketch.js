//Create variables here
var dog , dogImg
var happyDog , happyDogImg
var milk
var database
var foodStock = 0
var currentTime
var gmaeState = "Playing"
var lastFed = 0
var Bedroom, Drawingroom, garden, washroom

function preload()
{
  //load images here
  dogImg = loadImage("images/DogImg.png")
happyDogImg = loadImage("images/happydog.png")  
milk = loadImage("images/Milk.png")
BedRoom = loadImage("images/Bedroom.png")
Drawingroom = loadImage("images/LivingRoom.png")
garden = loadImage("images/Garden.png")
washroom = loadImage("images/WashRoom.png")
foodStock = loadImage("images/FoodStock.png")
}

function setup() {
  database = firebase.database()
  updateFood = createButton("Buy more food")
  reduceFood = createButton("Feed your pet Guru's Milk")
  updateFood.position(400,60)
  reduceFood.position(600,60)
  food = new Food()
  createCanvas(500,500);
  dog = createSprite(600,350,40,40)
  dog.addImage("dogImg", dogImg)
  dog.scale = 0.4
}


function draw() {  
  background("green")
  drawSprites()
  food.getFoodStock()
  food.display()
currentTime = hour()
food.getlastFedTime()

  updateFood.mousePressed(()=>{
    foodStock++
    food.updateFoodStock(foodStock)
  })

  reduceFood.mousePressed(()=>{
  food.deductFoodStock()
  food.updateFoodStock(Food.foodStock)
  food.lastFedTime(hour())
  })

  textSize(20)
  fill("black")
  text("Food Remaining",+food.foodStock,350,30)
  if(hour()>=12){
  time = "pm"
  }
  else if(hour()<=12){
  time = "am"
  }
  text("Last Fed At",+food.lastFed+time,550,30)
}
if(currentTime === "Hungry"){
updateFood.show()
reduceFood.show()
dog.visible = true
}
else{
updateFood.hide()
reduceFood.hide()
dog.visible = false
}
console.log(currentTime+","+lastFed)
if(currentTime === (food.lastFed+1)){
gameState = "Playing"
updateGameState(gameState)
food.Garden()
}

else if(currentTime === lastfed+2){
gameState = "Sleeping"
updateGameState(gameState)
food.Bedroom()
}
else if(currentTime === (lastFed+2) && currentTime <=(lastFed+4)){
gameState = "Bathing"
updateGameState(gameState)
food.Washroom()
}
else if(currentTime === lastFed+5){
GameState = "Living"
updateGameState(gameState)
food.Hall()
}
else{
gameState = "Hungry"
updateGameState(gameState)
food.display
}

function getGameState(){
database.ref('GameState').on("value", (data)=>{
gameState = data.val()
})
}

function updateGameState(gameState){
database.ref('/').update({
gamestate : gameState
})
}