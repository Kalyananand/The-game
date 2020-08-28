var player, enemy1, enemy2, enemy3, enemy4;

function preload(){
    playerleftImage = loadImage("Sprites/Playerleft.png");
    playerrightImage = loadImage("Sprites/Playerright.png");
    playerupImage = loadImage("Sprites/Playerup.png");
    playerdownImage = loadImage("Sprites/Playerdown.png");
    bulletleftImage = loadImage("Sprites/Bullet left.png");
    bulletrightImage = loadImage("Sprites/Bullet right.png");
    bulletdownImage = loadImage("Sprites/Bullet down.png");
    bulletupImage = loadImage("Sprites/Bullet up.png");
    backgroundImage = loadImage("Sprites/backgroundimg.jpg");
    enemy1Image = loadImage("Sprites/Zombieleft.png");
    enemy2Image = loadImage("Sprites/Zombieright.png");
    enemy3Image = loadImage("Sprites/Zombieup.png");
    enemy4Image = loadImage("Sprites/Zombiedown.png");
}

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
     player = createSprite(displayWidth/2,displayHeight/2);
     player.addImage(playerleftImage); 
     //player.addImage(playerrightImage);
     //player.addImage(playerdownImage);
     //player.addImage(playerupImage);
     leftButton = createButton("←");
     rightButton = createButton("→");
     upButton = createButton("↑");
     downButton = createButton("↓");
     upperleftButton = createButton("↖");
     upperrightButton = createButton("↗");
     lowerleftButton = createButton("↙");
     lowerrightButton = createButton("↘");
     leftButton.position(windowWidth/35,windowHeight*4/5);
     rightButton.position(windowWidth/15,windowHeight*4/5);
     downButton.position(windowWidth/20,windowHeight*5/6);
     upButton.position(windowWidth/20,windowHeight*3/4);
     upperleftButton.position(windowWidth/30,windowHeight*3/4);
     upperrightButton.position(windowWidth/15,windowHeight*3/4);
     lowerleftButton.position(windowWidth/30,windowHeight*5/6);
     lowerrightButton.position(windowWidth/15,windowHeight*5/6);
     gameState = "start";
     
    start = createButton("▶");
    restart = createButton("🔄");
    start.position(windowWidth/2,windowHeight/3);
    restart.position(windowWidth/2,windowHeight/4);
    player.visible = false;
    restart.hide();
    start.size(60,60);
    textSize(30);
    restart.size(60,60);

    enemy1Group = createGroup();
    enemy2Group = createGroup();
    enemy3Group = createGroup();
    enemy4Group = createGroup();
    bulletGroup = createGroup();
}


function draw(){
    background(0);
    if(gameState==="start"){
        leftButton.hide();
     rightButton.hide();
     upButton.hide();
     downButton.hide();
     lowerleftButton.hide();
     lowerrightButton.hide();
     upperleftButton.hide();
     upperrightButton.hide();
     text("Click on the start button to start",windowWidth/3,windowHeight/2);
        start.mousePressed(()=>{
            gameState = "play";
        });
    }
    if(gameState==="play"){
    start.hide();
    leftButton.show();
     rightButton.show();
     upButton.show();
     downButton.show();
     lowerleftButton.show();
     lowerrightButton.show();
     upperleftButton.show();
     upperrightButton.show();
    //background(backgroundImage);
    player.visible = true;
    //player.addImage(playerleftImage);
    leftButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(-4,0);
        bulletGroup.add(bullet);
        //player.addImage(playerleftImage);
    });
    rightButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(4,0);
        bulletGroup.add(bullet);
        //player.changeImage(playerrightImage);
    });
    upButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(0,-4);
        bulletGroup.add(bullet);
        //player.addImage(playerupImage);
    });
    downButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(0,4);
        bulletGroup.add(bullet);
       // player.addImage(playerdownImage);
    });
    upperrightButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(4,-4);
        bulletGroup.add(bullet);
    });
    upperleftButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(-4,-4);
        bulletGroup.add(bullet);
    });
    lowerrightButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(4,4);
        bulletGroup.add(bullet);
    });
    lowerleftButton.mousePressed(()=>{
        bullet = createSprite(windowWidth/2,windowHeight/2,10,10);
        bullet.setVelocity(-4,4);
        bulletGroup.add(bullet);
    });
    spawnEnemy();
    if(enemy1Group.isTouching(player)||enemy2Group.isTouching(player)||enemy3Group.isTouching(player)||enemy4Group.isTouching(player)){
        player.destroy();
        gameState = "end";
    }
    if(bulletGroup.isTouching(enemy1Group)||bulletGroup.isTouching(enemy2Group)||bulletGroup.isTouching(enemy3Group)||bulletGroup.isTouching(enemy4Group)){
        enemy1Group.destroy();
        enemy2Group.destroy();
        enemy3Group.destroy();
        enemy4Group.destroy();
        bulletGroup.destroy();
        gameState = "end";
    }
}
else if(gameState==="end"){
     restart.show();
     background(0);
     text("click on restart to play the game again",windowWidth/3,windowHeight/2);
     enemy1Group.destroy();
     enemy2Group.destroy();
     enemy3Group.destroy();
     enemy4Group.destroy();
     leftButton.hide();
     rightButton.hide();
     upButton.hide();
     downButton.hide();
     lowerleftButton.hide();
     lowerrightButton.hide();
     upperleftButton.hide();
     upperrightButton.hide();
}
restart.mousePressed(()=>{
    gameState = "start";
    restart.hide();
    start.show();
    start.mousePressed(()=>{
        gameState = "play";
    });
 });
    drawSprites();
}
function spawnEnemy(){
    if(World.frameCount%120===0){
        r = Math.round(random(50,windowHeight-50));
        enemy1 = createSprite(0,r,50,50);
        rvx = Math.round(random(2,4));
        enemy1.addImage(enemy1Group);
        rvy = Math.round(random(-4,4));
        enemy1.setVelocity(rvx,rvy);
        enemy1.lifetime = 1000;
        enemy1.addImage(enemy1Image);
        enemy1Group.add(enemy1);
    }
    if(World.frameCount%240===0){
        r = Math.round(random(50,windowWidth-50));
        enemy2 = createSprite(r,0,50,50);
        rvx = Math.round(random(-4,4));
        enemy2.addImage(enemy2Group);
        rvy = Math.round(random(2,4));
        enemy2.setVelocity(rvx,rvy);
        enemy2.lifetime = 1000;
        enemy2.addImage(enemy2Image);
        enemy2Group.add(enemy2);
    }
    if(World.frameCount%300===0){
        r = Math.round(random(50,windowWidth-50));
        enemy3 = createSprite(windowWidth,r,50,50);
        rvx = Math.round(random(-2,-4));
        enemy3.addImage(enemy3Group);
        rvy = Math.round(random(-4,4));
        enemy3.setVelocity(rvx,rvy);
        enemy3.lifetime = 1000;
        enemy3.addImage(enemy3Image);
        enemy3Group.add(enemy3);
    }
    if(World.frameCount%380===0){
        r = Math.round(random(50,windowHeight-50));
        enemy4 = createSprite(r,windowHeight,50,50);
        rvx = Math.round(random(-4,4));
        enemy4.addImage(enemy4Group);
        rvy = Math.round(random(-2,-4));
        enemy4.setVelocity(rvx,rvy);
        enemy4.lifetime = 1000;
        enemy4.addImage(enemy4Image);
        enemy4Group.add(enemy4);
    }
}


