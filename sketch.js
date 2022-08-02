let dataServer;
let pubKey = "pub-c-e6d6b188-2161-4733-b37f-f44d63bf7fe4";
let subKey = "sub-c-5caa329c-e813-4681-8c6a-f07d9dfa7856";
let secretKey = "sec-c-OWU3MmViMjMtYjg0Yi00MTUzLTgzMmEtNDBiMDJlMzVkZGU0";


//name used to sort your messages. used like a radio station. can be called anything
let channelName = "voteOnColours";

// array that we keep all the cursors in
let cursors = [];

// counters for showing the vote on the screen
//let leftCounter = 0;
//let rightCounter = 0;
let first = 0;
let second = 0;
let third = 0;
let fourth = 0;
let vote;
let sendVote;

// refresh every 10 seconds variables
let refresh = 10000;
let lastRefresh = 0;

let countDown = 10;
let lastCountDownRefresh = 0;
let countDownRefresh = 1000;

// colour variables
let r;
let g;
let b;

let r2;
let g2;
let b2;

let r3;
let g3;
let b3;

let r4;
let g4;
let b4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // initialize pubnub
  dataServer = new PubNub({
    subscribeKey: subKey,
    publishKey: pubKey,
    uuid: "Your Name Here",
    secretKey: "secretKey",
    heartbeatInterval: 0,
  });

  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({ channels: [channelName] });

  // randomly select colours for the screen to show right away
  r = random(0,255);
  g = random(0,255);
  b = random(0,255);
  r2 = random(0,255);
  g2 = random(0,255);
  b2 = random(0,255);
  r3 = random(0,255);
  g3 = random(0,255);
  b3 = random(0,255);
  r4 = random(0,255);
  g4 = random(0,255);
  b4 = random(0,255);

}

function draw() {

  background(255);
  // every 10 seconds choose new colours and restart the counters and countdown
  /*if (millis() - lastRefresh > refresh )  {

    r = random(0,255);
    g = random(0,255);
    b = random(0,255);
    r2 = random(0,255);
    g2 = random(0,255);
    b2 = random(0,255);
    r3 = random(0,255);
    g3 = random(0,255);
    b3 = random(0,255);
    r4 = random(0,255);
    g4 = random(0,255);
    b4 = random(0,255);

    leftCounter = 0;
    rightCounter = 0;

    first = 0;
    second = 0;
    third = 0;
    fourth = 0;
    
    countDown = 10;

    lastRefresh = millis();
  }*/

  // text styles
  textSize(50);
  textAlign(CENTER);

  //background(r2, g2, b2);

  fill(r,g,b);
  noStroke();
  rect(0, 0, windowWidth/4, windowHeight); // half the background
  
  fill(r2, g2, b2);
  noStroke();
  rect(windowWidth/4, 0, windowWidth/4, windowHeight); // half the background

  fill(r3, g3, b3);
  noStroke();
  rect(windowWidth/4*2, 0, windowWidth/4, windowHeight); // half the background

  fill(r4, g4, b4);
  noStroke();
  rect(windowWidth/4*3, 0, windowWidth/4, windowHeight); // half the background

  fill(255);
  text("Hot \r\n Boiled Egg", windowWidth/8, windowHeight/2);
  text("Votes: " + first, windowWidth/8, (windowHeight/2) + 300);


  fill(255);
  text("Elegant \r\n Tiramisu", windowWidth/8*3, windowHeight/2);
  text("Votes: " + second, windowWidth/8*3, (windowHeight/2) + 300);

  
  fill(255);
  text("Fresh Fruits", windowWidth/8*5, windowHeight/2);
  text("Votes: " + third, windowWidth/8*5, (windowHeight/2) + 300);


  fill(255);
  text("Pizza \r\n or \r\n Chicken Wings ", windowWidth/8*7, windowHeight/2);
  text("Votes: " + fourth, windowWidth/8*7, (windowHeight/2) + 300);


  text("After a long hard working day, \r\n you want to get some snacks to relax, \r\n which one would you pick?", windowWidth/2, windowHeight*0.2);

  textSize(30);

  submitButton = createButton("Read Explaination");
  submitButton.position(100, 100);
  submitButton.style('font-size', '30px');
  submitButton.mousePressed(viewExplain);
  
  //Hot Boiled Egg
  //Elegant Tiramisu
  //Fresh Fruit
  //Pizza or Chicken Wings

  //
  //
  //
  //
  
  // every 10 seconds restart the countdown for choosing the colours
  if (millis() - lastCountDownRefresh > countDownRefresh) {

    countDown--;
    lastCountDownRefresh = millis();
  }

  //text("Count down: " + countDown + " seconds left", windowWidth/2, windowHeight*0.7);
}

function viewExplain() {
  window.location.href = "/../_pageTwo/index.html";
}

function mousePressed() {


  /*if (mouseX < windowWidth/2) { 
    // if mouse is pressed while on the left side of the screen, send the left vote 

     sendVote = "left";
  } else {
    // if mouse is pressed while on the right side of the screen, send the right vote 

     sendVote = "right";
  }*/

  if (mouseX < windowWidth / 4 ){
    sendVote = "first";
  }else if (mouseX > windowWidth / 4 && mouseX < windowWidth / 4 * 2){
    sendVote = "second";
  }else if (mouseX > windowWidth / 4 * 2 && mouseX < windowWidth / 4 * 3){
    sendVote = "third";
  }else if (mouseX > windowWidth / 4  * 3&& mouseX < windowWidth / 4 * 4){
    sendVote = "fourth";
  }

  sendTheMessage(sendVote); // send the message

} 
/// PubNub logic below

function sendTheMessage(vote) {
  dataServer.publish({
    channel: channelName,
    message: {
      vote: vote
    },
  });
}

function readIncoming(inMessage) {
  
  if (inMessage.channel == channelName) {

   let incomingVote = inMessage.message.vote;
   
   /*if (incomingVote == "left") {

    leftCounter++;

   } else if (incomingVote == "right") {

    rightCounter++;

   }*/

   if (incomingVote == "first"){
     first++;
   }else if (incomingVote == "second"){
     second++;
   }else if (incomingVote == "third"){
    third++;
  }else if (incomingVote == "fourth"){
    fourth++;
  }
 
  }
}
