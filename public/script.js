let pelinKorkeus;
let pelinLeveys;

let taustakuva;
let pelastettavakuva
let mailanYSijainti;
let mailanKorkeus = 40;
let mailanLeveys = 40;

let olioLista = [];
let olioAjastin;

let pisteet = 0;
let elamat = 10;

function preload(){
    taustakuva = loadImage('kuvat/tausta.jpg');
    pelastettavakuva = loadImage('kuvat/koala.png');
}

function setup(){
    pelinLeveys = windowWidth;
    pelinKorkeus = windowWidth / 3;
    mailanYSijainti = pelinKorkeus - mailanKorkeus;
    createCanvas(pelinLeveys,pelinKorkeus);
    
    
}

function start(){
    olioLista = []
    pisteet = 0;
    elamat = 10
    clearTimeout(olioAjastin);
    loop();
    luoOlio();
    
}
function draw(){
    background("#8a769c");
    image(taustakuva,0,0,pelinLeveys,pelinKorkeus);
   //image(pelastettavakuva,50,50,50,50);
    
    liikutaOlioita();
    piirraMaila();
    PiirraUI();
    
}

function piirraMaila(){
    rect(mouseX,mailanYSijainti,mailanLeveys,mailanKorkeus);

}


function luoOlio(){
    let uusiOlio = new Pelastettava();
    olioLista.unshift(uusiOlio);
    olioAjastin = setTimeout(luoOlio,2000);
}

function liikutaOlioita(){
    olioLista.forEach(function(olio,index){
        olio.liiku();

        if(olio.Y > pelinKorkeus){
            olioLista.splice(index,1);
            elamat --;
            if(elamat <= 0){
                gameOver();
            }
        }
        if(olio.X > pelinLeveys){
            olioLista.splice(index,1);
            pisteet ++;
        }
    });
}

function PiirraUI(){
    textSize(25);
    textAlign(screenLeft,TOP);
    fill("#4d596e");
    text("Score: " + pisteet + "\nLives: " + elamat,5, 10);
}

function gameOver(){
    noLoop();
    textSize(50);
    fill("#322e3b")
    textAlign(CENTER);
    text("GAME OVER",pelinLeveys / 2, pelinKorkeus / 2);
}

class Pelastettava{
    constructor(){
        this.X = -1;
        this.Xnopeus = random(1,5);
        this.Y = random(0,50);
        this.size = pelinKorkeus / 10;
        this.Ynopeus = -2.5;
        this.painovoima = 0.05;
    }

    liiku(){
        this.X = this.X + this.Xnopeus;
        this.Ynopeus += this.painovoima;
        if(this.Y + this.size / 2 > mailanYSijainti){
            if(this.X > mouseX && this.X < mouseX + mailanLeveys){
                this.Ynopeus = -abs(this.Ynopeus);

            }
        }
        this.Y = this.Y + this.Ynopeus;
        image(pelastettavakuva,this.X, this.Y,this.size,this.size);
    }
}
