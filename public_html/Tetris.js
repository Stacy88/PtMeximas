////////////////////////////////////////////////////////////////////////////////
function getRandom(min,max) {
    return min + Math.floor(Math.random()*(max+1-min));
}
function compareNumeric(a,b) {
  if(a>b) return -1;
  if(a<b) return 1;
  return 0;
}

var Anim = function() {
    this.row; // 0-14
    this.last; // new Date()
    this.frame; // 0, 1-14, 15
    this.src;
};

Anim.prototype.load = function() {
    this.row=0;
    this.last=new Date();
    this.frame=0;
    this.src=new Array();
    var images = Array("img01.png","img02.png","img03.png","img04.png","img05.png","img06.png","img07.png","img08.png","img09.png","img10.png");
    for(var i=0; i<=images.length-1; i++) {
        this.src[i]=new Image();
        this.src[i].src=images[i];
    } 
};

Anim.prototype.draw = function() {
    if(this.frame>0 && this.frame<11) { 
        Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
        Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
        Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
        Context.drawImage(this.src[this.frame-1], tetrisx(0-0.96), tetrisy(this.row-1.1), 94, 125);
        Context.drawImage(this.src[this.frame-1], tetrisx(1-0.96), tetrisy(this.row-1.1), 94, 125);
        Context.drawImage(this.src[this.frame-1], tetrisx(2-0.96), tetrisy(this.row-1.1), 94, 125);
        Context.drawImage(this.src[this.frame-1], tetrisx(3-0.96), tetrisy(this.row-1.1), 94, 125);
        Context.drawImage(this.src[this.frame-1], tetrisx(4-0.96), tetrisy(this.row-1.1), 94, 125);
        Context.drawImage(this.src[this.frame-1], tetrisx(5-0.96), tetrisy(this.row-1.1), 94, 125);
        Context.drawImage(this.src[this.frame-1], tetrisx(6-0.96), tetrisy(this.row-1.1), 94, 125);
        this.last=new Date();
        if(this.frame===10) Redraw=true;
        this.frame++;
    }
};

Anim.prototype.start = function(row) {
    this.row=row;
    this.frame=1;
};
Anim.prototype.finish = function() {
    this.frame=0;
};

function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires : "") +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  }

function getCookie(name) {
  var cookie = " " + document.cookie;
  var search = " " + name + "=";
  var setStr = null;
  var offset = 0;
  var end = 0;
  if (cookie.length > 0) {
    offset = cookie.indexOf(search);
    if (offset != -1) {
      offset += search.length;
      end = cookie.indexOf(";", offset)
      if (end == -1) {
        end = cookie.length;
      }
      setStr = unescape(cookie.substring(offset, end));
    }
  }
  return(setStr);
}

function delCookie(name) {
  document.cookie = name + "=" + "; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}
////////////////////////////////////////////////////////////////////////////////
// РЎРѕСЃС‚РѕСЏРЅРёРµ РёРіСЂРѕРІРѕРіРѕ РїРѕР»СЏ С…СЂР°РЅРёС‚СЃСЏ РІ РґРІСѓРјРµСЂРЅРѕРј РјР°СЃСЃРёРІРµ
// Р—РЅР°С‡РµРЅРёСЏРј РјР°СЃСЃРёРІР° РѕС‚ 1 РґРѕ 52 СЃРѕРѕС‚РІРµС‚СЃС‚РІСѓСЋС‚ РєР°СЂС‚Рµ РІ РєРѕР»РѕРґРµ, 0 - РѕС‚СЃСѓС‚СЃРІРёСЋ РєР°СЂС‚С‹ РЅР° РїРѕР»Рµ
var Tetris = [ [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] ];
var Timer;      // С‚Р°Р№РјРµСЂ СЃР»СѓР¶Р°С‰РёР№ РіР»Р°РІРЅС‹Рј С†РёРєР»РѕРј РёРіСЂС‹
var Canvas=document.getElementById("tetris"); // СЌР»РµРјРµРЅС‚С‹ СЃС‚СЂР°РЅРёС†С‹ canvas, С…РѕР»СЃС‚ РґР»СЏ СЂРёСЃРѕРІР°РЅРёСЏ
var Context=Canvas.getContext("2d");

var W=7;        // С€РёСЂРёРЅР° С‚РµС‚СЂРёСЃР°, РєРѕР»РёС‡РµСЃС‚РІРѕ СЏС‡РµРµРє
var H=16;       // РІС‹СЃРѕС‚Р° С‚РµС‚СЂРёСЃР°, РєРѕР»РёС‡РµСЃС‚РІРѕ СЏС‡РµРµРє
var Penalty=250; // С€С‚СЂР°С„РЅС‹Рµ РѕС‡РєРё Р·Р° РѕРґРёРЅР°РєРѕРІС‹Рµ РєР°СЂС‚С‹
var Current; // 0 РёРіСЂР° РЅРµ РЅР°С‡Р°С‚Р°, 1 РёРіСЂР°, 2 РёРіСЂР° РЅР° РїР°СѓР·Рµ, 3 РёРіСЂР° РѕРєРѕРЅС‡РµРЅР°
var Level; // 1-30, С‚РµРєСѓС‰РёР№ СѓСЂРѕРІРµРЅСЊ
var Score; // С‚РµРєСѓС‰РёР№ СЂРµР·СѓР»СЊС‚Р°С‚
var Best; // Р»СѓС‡С€РёР№ СЂРµР·СѓР»СЊС‚Р°С‚

var Redraw; // Р·РЅР°Рє РЅРµРјРµРґР»РµРЅРЅРѕР№ РїРµСЂРµСЂРёСЃРѕРІРєРё
var Currshape=new Shape(); // РѕР±СЉРµРєС‚С‹ РєР»Р°СЃСЃР° С„РёРіСѓСЂС‹ С‚РµС‚СЂРёСЃР°
var Nextshape1=new Shape();
var Nextshape2=new Shape();
var Nextshape3=new Shape();
var Combo1=new Comb(); // РѕР±СЉРµРєС‚С‹ РєР»Р°СЃСЃР° РїРѕРєРµСЂРЅРѕР№ РєРѕРјР±РёРЅР°С†РёРё
var Combo2=new Comb();
var Combo3=new Comb();
var Combo4=new Comb();
var Anim1=new Anim(); // РѕР±СЉРµРєС‚С‹ РєР»Р°СЃСЃР° Р°РЅРёРјР°С†РёРё РёСЃС‡РµР·РЅРѕРІРµРЅРёСЏ РєРѕРјР±РёРЅР°С†РёРё
var Anim2=new Anim();
var Anim3=new Anim();
var Anim4=new Anim();
var Anim5=new Anim();
var Anim6=new Anim();
var Anim7=new Anim();
var Anim8=new Anim();
var Anim9=new Anim();
var Anim10=new Anim();
var Anim11=new Anim();
var Anim12=new Anim();
var Anim13=new Anim();
var Anim14=new Anim();
var Anim15=new Anim();
var Anim16=new Anim();
Anim1.load(); Anim2.load(); Anim3.load(); Anim4.load(); Anim5.load(); Anim6.load(); Anim7.load(); Anim8.load();
Anim9.load(); Anim10.load(); Anim11.load(); Anim12.load(); Anim13.load(); Anim14.load(); Anim15.load(); Anim16.load();

var Comboname1,Comboname2,Comboname3,Comboname4; // РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ СЃРѕР±СЂР°РЅРЅС‹С… РєРѕРјР±РёРЅР°С†РёСЏС…
var Combotype1,Combotype2,Combotype3,Combotype4;
var Comboscore1,Comboscore2,Comboscore3,Comboscore4;
var Combolast1,Combolast2,Combolast3,Combolast4;
var Countshape; // РѕР±С‰РµРµ РєРѕР»РёС‡РµСЃС‚РІРѕ СѓРїР°РІС€РёС… С„РёРіСѓСЂ
var Highcard; // СЃС‚Р°С‚РёСЃС‚РёРєР° Рѕ СЃРѕР±СЂР°РЅРЅС‹С… РєРѕРјР±РёРЅР°С†РёСЏС…
var Pair;
var Twopairs;
var Threeoak;
var Straight;
var Flush;
var Fullhouse;
var Fouroak;
var Straightflush;
var Royalflush;
var Identical;
var Levellast; // new Date()
var Levelframe;

var NewGame = document.getElementById('pressNewGame'); // СЌР»РµРјРµРЅС‚С‹ СЃС‚СЂР°РЅРёС†С‹ - РєРЅРѕРїРєРё РЅРѕРІРѕР№ РёРіСЂС‹ Рё РїР°СѓР·С‹
var PauseResume = document.getElementById('pressPauseResume');
var ElemLevel = document.getElementById("level"); // СЌР»РµРјРµРЅС‚С‹ СЃС‚СЂР°РЅРёС†С‹ - РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ С‚РµРєСѓС‰РµРј СѓСЂРѕРІРЅРµ, СЂРµР·СѓР»СЊС‚Р°С‚Рµ, СЂРµРєРѕСЂРґРµ
var ElemScore = document.getElementById("score");
var ElemBest = document.getElementById("best");

var Sounds=new Array();
var SoundsNames = Array("SoundButton.wav","SoundCombo.mp3","SoundCreateshape.mp3","SoundError.mp3","SoundLeftRight.mp3",
"SoundLevelup.mp3","SoundRotare.mp3");
for(var i=0; i<=SoundsNames.length-1; i++) {
    Sounds[i]=new Audio();
    Sounds[i].src=SoundsNames[i];
    Sounds.preload="auto";
}
////////////////////////////////////////////////////////////////////////////////
NewGame.onclick = function() {
    Sounds[0].currentTime=0; Sounds[0].play();
    Current=1;
    initialize();
    Timer = setInterval("mainCycle()",0);
};

PauseResume.onclick = function() {
    Sounds[0].currentTime=0; Sounds[0].play();
    
    if(Current===1) {
        clearInterval(Timer);
        drawstat();
        Current=2;
        PauseResume.innerHTML="RESUME";
        return;
    }
    if(Current===2) {
        Timer = setInterval("mainCycle()",0);
        Current=1;
        PauseResume.innerHTML="PAUSE";
        Redraw=true;
        return;
    }
    
};

window.onload = function() {
    var res=getCookie("ptetris_best");
    if(res!=null) Best=res; else Best="0";
    Level=0; Score=0;
    this.drawinit();
    
};

document.onkeyup=function(e) { // СѓРїСЂР°РІР»РµРЅРёРµ РєР»Р°РІРёС€Р°РјРё РєР»Р°РІРёР°С‚СѓСЂС‹
    switch (e.which) {
        case 87: // w
        case 38: // up
        case 13: eventRotate(); break; // enter
        case 65: // a
        case 37:  eventLeft(); break; // left
        case 68: // d
        case 39: eventRight(); break; // right
        case 83: // s
        case 40: eventDown(); // down
    }
};

////////////////////////////////////////////////////////////////////////////////
function initialize() { // РїРµСЂРµРґ РЅР°С‡Р°Р»РѕРј РЅРѕРІРѕР№ РёРіСЂС‹
    var res;
    var date=new Date();
    Currshape.create();
    Nextshape1.create();
    Nextshape2.create();
    Nextshape3.create();
    
    Highcard=0;
    Pair=0;
    Twopairs=0;
    Threeoak=0;
    Straight=0;
    Flush=0;
    Fullhouse=0;
    Fouroak=0;
    Straightflush=0;
    Royalflush=0;
    Identical=0;
    
    Level=1;
    Score=0;
    res=getCookie("ptetris_best");
    if(res!=null) Best=res; else Best="0";
    
           
    var i,j;
    for(i=0; i<=W-1; i++) {
        for(j=0; j<=H-1; j++) {
            Tetris[i][j]=0;
        }
    }
    
    Redraw=false;
    
    Comboname1=""; Comboname2=""; Comboname3=""; Comboname4="";
    Combotype1=""; Combotype2=""; Combotype3=""; Combotype4="";
    Comboscore1=0; Comboscore2=0; Comboscore3=0; Comboscore4=0;
    Combolast1=date; Combolast2=date; Combolast3=date; Combolast4=date;
    
    Countshape=0;
    Levellast=date-3000;
    Levelframe=0;
}

function mainCycle() {
    var date=new Date();
    if(Current===3) {
        if(Anim1.frame>0 && Anim1.frame<11 && date-Anim1.last>=20) {
            this.drawtetris(); return;
        }
        else if(Anim1.frame===11 && date-Anim1.last>=500) {
            this.drawtetris();
            Anim1.finish(); Anim2.finish(); Anim3.finish(); Anim4.finish(); Anim5.finish(); Anim6.finish(); Anim7.finish(); Anim8.finish();
            Anim9.finish(); Anim10.finish(); Anim11.finish(); Anim12.finish(); Anim13.finish(); Anim14.finish(); Anim15.finish(); Anim16.finish();
            
            clearInterval(Timer);
            this.drawgameover();
            return;
        }
        // РЅРµРјРµРґР»РµРЅРЅР°СЏ РїСЂРѕСЂРёСЃРѕРІРєР°
        if(Redraw) {
           this.drawtetris();
           Redraw=false;
           return;
        }
    }
    else if(Current===1) {
        // Р°РЅРёРјР°С†РёСЏ РёСЃС‡РµР·РЅРѕРІРµРЅРёСЏ РєРѕРјР±РёРЅР°С†РёРё
        if(Anim1.frame>0 && Anim1.frame<11 && date-Anim1.last>=20) {
            this.drawtetris(); return;
        }
        else if(Anim1.frame===11 && date-Anim1.last>=500) {
            this.drawtetris();
            Anim1.finish(); Anim2.finish(); Anim3.finish(); Anim4.finish();
            return;
        }
        
        // СЃРѕРѕР±С‰РµРЅРёРµ Рѕ РїРѕРІС‹С€РµРЅРёРё СѓСЂРѕРІРЅСЏ
        if(Levelframe>0 && date-Levellast>=200) {
            this.drawtetris();
            return;
        }
        // РїСЂРѕСЂРёСЃРѕРІРєР° РїР°РґРµРЅРёСЏ С„РёРіСѓСЂС‹ РІРЅРёР·
        if(date-Currshape.last>=getSpeed()) {
            if(Currshape.down(true)) {
                this.drawtetris(); return;
            }
            else {
                if(secureShape()) { this.drawtetris(); return; }
            }
        }
        
        // РЅРµРјРµРґР»РµРЅРЅР°СЏ РїСЂРѕСЂРёСЃРѕРІРєР°
        if(Redraw) {
           this.drawtetris();
           Redraw=false;
        }
        
    }
}
////////////////////////////////////////////////////////////////////////////////
function eventDown() {
    var cnt=0;
    while (Currshape.down(false)) {
        cnt++;
    }
    if(cnt>0) {
        Sounds[4].currentTime=0; Sounds[4].play();
        Redraw=true;
    }
    else {
        Sounds[3].currentTime=0; Sounds[3].play();
    }
}
function eventLeft() {
    if(Currshape.left()) {
        Sounds[4].currentTime=0; Sounds[4].play();
        Redraw=true;
    }
    else {
        Sounds[3].currentTime=0; Sounds[3].play();
    }
}
function eventRight() {
    if(Currshape.right()) {
        Sounds[4].currentTime=0; Sounds[4].play();
        Redraw=true;
    }
    else {
        Sounds[3].currentTime=0; Sounds[3].play();
    }
}
function eventRotate() {
    if(Currshape.rotare()) {
        Sounds[6].currentTime=0; Sounds[6].play();
        Redraw=true;
    }
    else {
        Sounds[3].currentTime=0; Sounds[3].play();
    }
}
////////////////////////////////////////////////////////////////////////////////
function identicalCards(i,j) {
    if((Tetris[i][j]!==Tetris[0][j] || i===0) &&  
       (Tetris[i][j]!==Tetris[1][j] || i===1) &&  
       (Tetris[i][j]!==Tetris[2][j] || i===2) &&
       (Tetris[i][j]!==Tetris[3][j] || i===3) &&
       (Tetris[i][j]!==Tetris[4][j] || i===4) &&
       (Tetris[i][j]!==Tetris[5][j] || i===5) &&
       (Tetris[i][j]!==Tetris[6][j] || i===6)) return false;     
    if((Tetris[i][j]===Tetris[0][j] && i!==0) ||
       (Tetris[i][j]===Tetris[1][j] && i!==1) ||
       (Tetris[i][j]===Tetris[2][j] && i!==2) ||
       (Tetris[i][j]===Tetris[3][j] && i!==3) ||
       (Tetris[i][j]===Tetris[4][j] && i!==4) ||
       (Tetris[i][j]===Tetris[5][j] && i!==5) ||
       (Tetris[i][j]===Tetris[6][j] && i!==6)) return true;    
    return undefined;
}

function identicalShape() {
    // Р·Р°РїРѕРјРёРЅР°РµРј С‚РµРєСѓС‰РёРµ РєРѕРѕСЂРґРёРЅР°С‚С‹ С„РёРіСѓСЂС‹
    var oldx1=Currshape.x1;
    var oldx2=Currshape.x2;
    var oldx3=Currshape.x3;
    var oldx4=Currshape.x4;
    var oldy1=Currshape.y1;
    var oldy2=Currshape.y2;
    var oldy3=Currshape.y3;
    var oldy4=Currshape.y4;
    
    if(Currshape.y1>=0) drawcard(Currshape.c1,Currshape.x1,Currshape.y1);
    if(Currshape.y2>=0) drawcard(Currshape.c2,Currshape.x2,Currshape.y2);
    if(Currshape.y3>=0) drawcard(Currshape.c3,Currshape.x3,Currshape.y3);
    if(Currshape.y4>=0) drawcard(Currshape.c4,Currshape.x4,Currshape.y4);
    
    var cnt=0;
    while (Currshape.down(false)) {   
        cnt++;
    }
    
    // Р·Р°С‚РµРјРЅРµРЅРёРµ
    Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.fillStyle="rgba(0,0,0,0.25)";
    
    if(cnt>0) {
        Context.fillRect(tetrisx(Currshape.x1),tetrisy(Currshape.y1),35,35);
        Context.fillRect(tetrisx(Currshape.x2),tetrisy(Currshape.y2),35,35);
        Context.fillRect(tetrisx(Currshape.x3),tetrisy(Currshape.y3),35,35);
        Context.fillRect(tetrisx(Currshape.x4),tetrisy(Currshape.y4),35,35);
    
    }
    
    for(var i=0; i<=6; i++) {
        if(Currshape.c1==Tetris[i][Currshape.y1]) {
           
            drawcardd(Currshape.c1,Currshape.x1,oldy1);
            drawcardd(Tetris[i][Currshape.y1],i,Currshape.y1);
        }
        if(Currshape.c2==Tetris[i][Currshape.y2]) {
            drawcardd(Currshape.c2,Currshape.x2,oldy2);
            drawcardd(Tetris[i][Currshape.y2],i,Currshape.y2);
        }
        if(Currshape.c3==Tetris[i][Currshape.y3]) {
            drawcardd(Currshape.c3,Currshape.x3,oldy3);
            drawcardd(Tetris[i][Currshape.y3],i,Currshape.y3);
        }
        if(Currshape.c4==Tetris[i][Currshape.y4]) {
            drawcardd(Currshape.c4,Currshape.x4,oldy4);
            drawcardd(Tetris[i][Currshape.y4],i,Currshape.y4);
        }
    }
    
    Currshape.x1=oldx1;
    Currshape.x2=oldx2;
    Currshape.x3=oldx3;
    Currshape.x4=oldx4;
    Currshape.y1=oldy1;
    Currshape.y2=oldy2;
    Currshape.y3=oldy3;
    Currshape.y4=oldy4;
    
    
}

function tetrisx(x) {
    return x*35;
}
function tetrisy(y) {
    return y*35;
}

function drawtetris() {
   // console.log(+Currshape.last);
    // Р±СЌРєРіСЂР°СѓРЅРґ (С‚РµРјРЅРѕ-Р·РµР»РµРЅС‹Р№)
    Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.fillStyle="rgb(0,64,0)";
    Context.fillRect(0, 0, Canvas.width, Canvas.height);
    // РїРѕР»Рµ С‚РµС‚СЂРёСЃР° РІРјРµСЃС‚Рµ СЃ СЃРµС‚РєРѕР№
    Context.fillStyle="rgb(181,230,29)";
    Context.strokeStyle="rgb(161,206,24)";
    var i,j;
    for(i=0; i<=6; i++) {
        for(j=0; j<=H-1; j++) {
            Context.fillRect(tetrisx(i),tetrisx(j),35,35);
            Context.strokeRect(tetrisx(i),tetrisx(j),35,35);
        }
    }
    // С‚РµРєСЃС‚РѕРІР°СЏ РЅР°РґРїРёСЃСЊ next shape
    Context.shadowOffsetX = 1.25; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 1.25; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1.25; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 24px aeromatics_b";
    Context.fillStyle="rgb(250,250,250)";
    Context.fillText("NEXT SHAPE:",tetrisx(9),tetrisy(1));
    
    // 3 СЃР»РµРґСѓСЋС‰РёРµ С„РёРіСѓСЂС‹
    drawcard(Nextshape1.c1,Nextshape1.x1+7,Nextshape1.y1+4);
    drawcard(Nextshape1.c2,Nextshape1.x2+7,Nextshape1.y2+4);
    drawcard(Nextshape1.c3,Nextshape1.x3+7,Nextshape1.y3+4);
    drawcard(Nextshape1.c4,Nextshape1.x4+7,Nextshape1.y4+4);
    drawcard(Nextshape2.c1,Nextshape2.x1+7,Nextshape2.y1+7);
    drawcard(Nextshape2.c2,Nextshape2.x2+7,Nextshape2.y2+7);
    drawcard(Nextshape2.c3,Nextshape2.x3+7,Nextshape2.y3+7);
    drawcard(Nextshape2.c4,Nextshape2.x4+7,Nextshape2.y4+7);
    drawcard(Nextshape3.c1,Nextshape3.x1+7,Nextshape3.y1+10);
    drawcard(Nextshape3.c2,Nextshape3.x2+7,Nextshape3.y2+10);
    drawcard(Nextshape3.c3,Nextshape3.x3+7,Nextshape3.y3+10);
    drawcard(Nextshape3.c4,Nextshape3.x4+7,Nextshape3.y4+10);
    
    // СѓРґР°Р»РёРј РїСѓСЃС‚РѕС‚Сѓ РѕС‚ Р·Р°РїРѕР»РЅРµРЅРЅС‹С… РєРѕРјР±РёРЅР°С†РёР№
    if(Anim1.frame===11 && Redraw==false && Current===1) {
        for(i=0; i<=H-1; i++) {
            if(Tetris[0][i]==0 && Tetris[1][i]==0 && Tetris[2][i]==0 && Tetris[3][i]==0 && Tetris[4][i]==0 && Tetris[5][i]==0 && Tetris[6][i]==0) {
                j=i-1;
                while (j>=0) {
                    if(Tetris[0][j]>0) { Tetris[0][j+1]=Tetris[0][j]; Tetris[0][j]=0; }
                    if(Tetris[1][j]>0) { Tetris[1][j+1]=Tetris[1][j]; Tetris[1][j]=0; }
                    if(Tetris[2][j]>0) { Tetris[2][j+1]=Tetris[2][j]; Tetris[2][j]=0; }
                    if(Tetris[3][j]>0) { Tetris[3][j+1]=Tetris[3][j]; Tetris[3][j]=0; }
                    if(Tetris[4][j]>0) { Tetris[4][j+1]=Tetris[4][j]; Tetris[4][j]=0; }
                    if(Tetris[5][j]>0) { Tetris[5][j+1]=Tetris[5][j]; Tetris[5][j]=0; }
                    if(Tetris[6][j]>0) { Tetris[6][j+1]=Tetris[6][j]; Tetris[6][j]=0; }
                    j--;
                }
            }
        }
    }
    // РїРѕР»Рµ С‚РµС‚СЂРёСЃР°
    if(Current===1) {
        for(i=0; i<=W-1; i++) {
            for(j=0; j<=H-1; j++) {
                if(Tetris[i][j]>0) {
                    if(identicalCards(i,j)===false) drawcard(Tetris[i][j],i,j);
                    if(identicalCards(i,j)===true) drawcardd(Tetris[i][j],i,j);
                }
            }
        }
    }
    
    // С‚РµРєСѓС‰Р°СЏ С„РёРіСѓСЂР°, С‚РµРЅСЊ РїР°РґР°СЋС‰РµР№ С„РёРіСѓСЂС‹
    if(Current===1) identicalShape();
    
    // С„СЂРµР№Рј Р°РЅРёРјР°С†РёРё РёСЃС‡РµР·РЅРѕРІРµРЅРёСЏ РєРѕРјР±РёРЅР°С†РёРё
    if(Anim1.frame>0 && Anim1.frame<11) {
        Anim1.draw(); Anim2.draw(); Anim3.draw(); Anim4.draw(); Anim5.draw(); Anim6.draw(); Anim7.draw(); Anim8.draw();
        Anim9.draw(); Anim10.draw(); Anim11.draw(); Anim12.draw(); Anim13.draw(); Anim14.draw(); Anim15.draw(); Anim16.draw();
        // Р·Р°РїР»Р°С‚РєР° РѕС‚ Р·Р°Р»РµР·Р°РЅРёСЏ Р·Р° РїСЂРµРґРµР»С‹ РїРѕР»СЏ Р°РЅРёРјР°С†РёРё РёСЃС‡РµР·РЅРѕРІРµРЅРёСЏ РєРѕРјР±РёРЅР°С†РёРё
        Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
        Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
        Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
        Context.fillStyle="rgb(0,64,0)";
        for(i=0; i<=H-1; i++) Context.fillRect(tetrisx(7), tetrisy(i), 35, 35);
        
    }
    
    // РёРЅС„РѕСЂРјР°С†РёСЏ Рѕ СЃРѕР±СЂР°РЅРЅС‹С… РєРѕРјР±РёРЅР°С†РёСЏС…
    Context.shadowOffsetX = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1.5; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 28px aeromatics_b";
    Context.fillStyle="rgb(250,250,250)";
    if(Combotype1!=="" && Combotype2==="" && Combotype3==="" && Combotype4==="" && new Date()-Combolast1<2500) {
        Context.fillText(Combotype1,tetrisx(0.5),tetrisy(4));
        Context.fillText(Comboname1,tetrisx(1.5),tetrisy(5));
        Context.fillText(Comboscore1,tetrisx(2.5),tetrisy(6));
    }
    if(Combotype1!=="" && Combotype2!=="" && Combotype3==="" && Combotype4==="" && new Date()-Combolast2<3250) {
        Context.fillText(Combotype1,tetrisx(0.5),tetrisy(3));
        Context.fillText(Comboname1,tetrisx(1.5),tetrisy(4));
        Context.fillText(Comboscore1,tetrisx(2.5),tetrisy(5));
        
        Context.fillText(Combotype2,tetrisx(0.5),tetrisy(7));
        Context.fillText(Comboname2,tetrisx(1.5),tetrisy(8));
        Context.fillText(Comboscore2,tetrisx(2.5),tetrisy(9));
    }
    if(Combotype1!=="" && Combotype2!=="" && Combotype3!=="" && Combotype4==="" && new Date()-Combolast3<3750) {
        Context.fillText(Combotype1,tetrisx(0.5),tetrisy(2));
        Context.fillText(Comboname1,tetrisx(1.5),tetrisy(3));
        Context.fillText(Comboscore1,tetrisx(2.5),tetrisy(4));
        
        Context.fillText(Combotype2,tetrisx(0.5),tetrisy(6));
        Context.fillText(Comboname2,tetrisx(1.5),tetrisy(7));
        Context.fillText(Comboscore2,tetrisx(2.5),tetrisy(8));
        
        Context.fillText(Combotype3,tetrisx(0.5),tetrisy(10));
        Context.fillText(Comboname3,tetrisx(1.5),tetrisy(11));
        Context.fillText(Comboscore3,tetrisx(2.5),tetrisy(12));
    }
    if(Combotype1!=="" && Combotype2!=="" && Combotype3!=="" && Combotype4!=="" && new Date()-Combolast4<4500) {
        Context.fillText(Combotype1,tetrisx(0.5),tetrisy(1));
        Context.fillText(Comboname1,tetrisx(1.5),tetrisy(2));
        Context.fillText(Comboscore1,tetrisx(2.5),tetrisy(3));
        
        Context.fillText(Combotype2,tetrisx(0.5),tetrisy(5));
        Context.fillText(Comboname2,tetrisx(1.5),tetrisy(6));
        Context.fillText(Comboscore2,tetrisx(2.5),tetrisy(7));
        
        Context.fillText(Combotype3,tetrisx(0.5),tetrisy(9));
        Context.fillText(Comboname3,tetrisx(1.5),tetrisy(10));
        Context.fillText(Comboscore3,tetrisx(2.5),tetrisy(11));
        
        Context.fillText(Combotype4,tetrisx(0.5),tetrisy(13));
        Context.fillText(Comboname4,tetrisx(1.5),tetrisy(14));
        Context.fillText(Comboscore4,tetrisx(2.5),tetrisy(15));
    }
    
    // СЃРѕРѕР±С‰РµРЅРёРµ Рѕ РїРѕРІС‹С€РµРЅРёРё СѓСЂРѕРІРЅСЏ
    Context.shadowOffsetX = 1.25; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 1.25; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1.25; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 28px aeromatics_b";
    Context.fillStyle="rgb(250,250,250)";
    var date=new Date();
    if(Levelframe>0 && date-Levellast>=200) {
        if(Levelframe===4) {
            Sounds[5].currentTime=0; Sounds[5].play();
        }
        if(Levelframe%2!==0) { // С‡РёСЃР»Рѕ РЅРµ С‡РµС‚РЅРѕРµ
            Context.fillText("LEVEL UP!",tetrisx(2),tetrisy(2));
        }
        Levelframe++;
        if(Levelframe>12) Levelframe=0;
        Levellast=new Date();
    }
    
    // С‚РµРєСѓС‰РёР№ СѓСЂРѕРІРµРЅСЊ, РѕС‡РєРё Рё Р»СѓС‡С€РёР№ СЂРµР·СѓР»СЊС‚Р°С‚
    ElemLevel.innerHTML="<div class='level'>LEVEL</div>"+Level.toString();
    ElemScore.innerHTML="<div class='level'>SCORE</div>"+Score.toString();
    ElemBest.innerHTML="<div class='level'>BEST</div>"+Best;
}

function drawcard(c,x,y) {
    var rank = ["", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
    var suit = ["", "\u2663", "\u2666", "\u2665", "\u2660"];
    var bg_col = ["", "rgb(0,140,0)", "rgb(0,97,226)", "rgb(240,0,0)", "rgb(90,90,90)"];
    var st_col = ["", "rgb(0,199,118)", "rgb(0,178,243)", "rgb(255,131,129)", "rgb(174,174,174)"];
    var r=getRank(c);
    var s=getSuit(c);
    
    // Р±СЌРєРіСЂР°СѓРЅРґ С„РѕРЅ СЏС‡РµР№РєРё РІР·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ РјР°СЃС‚Рё
    Context.fillStyle=bg_col[s];
    Context.fillRect(tetrisx(x),tetrisy(y),35,35);
    
    // С‚РµРєСЃС‚РѕРІР°СЏ РЅР°РґРїРёСЃСЊ РјР°СЃС‚Рё
    Context.shadowOffsetX = 0.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "rgb(64,64,64)"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 24px aeromatics_b";
    Context.fillStyle=st_col[s];
    Context.fillText(suit[s],tetrisx(x+0.4),tetrisy(y+0.75));
    
    // С‚РµРєСЃС‚РѕРІР°СЏ РЅР°РґРїРёСЃСЊ СЂР°РЅРєР°
    Context.shadowOffsetX = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1.5; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 32px aeromatics_b";
    Context.fillStyle="rgb(255,255,255)";
    Context.fillText(rank[r],tetrisx(x+0.075),tetrisy(y+0.8));
    
    // С‡РµСЂРЅР°СЏ СЂР°РјРєР°
    Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.strokeStyle="rgb(0,0,0)";    
    Context.strokeRect(tetrisx(x),tetrisy(y),35,35);
}

function drawcardd(c,x,y) {
    var rank = ["", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
    var suit = ["", "\u2663", "\u2666", "\u2665", "\u2660"];
    var bg_col = ["", "rgb(0,140,0)", "rgb(0,97,226)", "rgb(240,0,0)", "rgb(90,90,90)"];
    var st_col = ["", "rgb(0,199,118)", "rgb(0,178,243)", "rgb(255,131,129)", "rgb(174,174,174)"];
    var r=getRank(c);
    var s=getSuit(c);
    
    // Р±СЌРєРіСЂР°СѓРЅРґ С„РѕРЅ СЏС‡РµР№РєРё РІР·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ РјР°СЃС‚Рё
    Context.fillStyle=bg_col[s];
    Context.fillRect(tetrisx(x),tetrisy(y),35,35);
    
    // С‚РµРєСЃС‚РѕРІР°СЏ РЅР°РґРїРёСЃСЊ РјР°СЃС‚Рё
    Context.shadowOffsetX = 0.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "rgb(64,64,64)"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 24px aeromatics_b";
    Context.fillStyle=st_col[s];
    Context.fillText(suit[s],tetrisx(x+0.4),tetrisy(y+0.75));
    
    // С‚РµРєСЃС‚РѕРІР°СЏ РЅР°РґРїРёСЃСЊ СЂР°РЅРєР°
    Context.shadowOffsetX = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1.5; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 32px aeromatics_b";
    Context.fillStyle=st_col[s];
    Context.fillText(rank[r],tetrisx(x+0.075),tetrisy(y+0.8));
    
    // Р·Р°С‚РµРјРЅРµРЅРёРµ
    Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.fillStyle="rgba(0,0,0,0.5)";
    Context.fillRect(tetrisx(x),tetrisy(y),35,35);
    
    // С‡РµСЂРЅР°СЏ СЂР°РјРєР°
    Context.strokeStyle="rgb(0,0,0)";
    Context.strokeRect(tetrisx(x),tetrisy(y),35,35);
}

function drawstat() {
    // Р±СЌРєРіСЂР°СѓРЅРґ (С‚РµРјРЅРѕ-Р·РµР»РµРЅС‹Р№)
    Context.fillStyle="rgb(0,64,0)";
    Context.fillRect(0, 0, Canvas.width, Canvas.height);
    // С‚РµРєСѓС‰РёР№ СѓСЂРѕРІРµРЅСЊ, РѕС‡РєРё Рё Р»СѓС‡С€РёР№ СЂРµР·СѓР»СЊС‚Р°С‚
    ElemLevel.innerHTML="<div class='level'>LEVEL</div>"+Level.toString();
    ElemScore.innerHTML="<div class='level'>SCORE</div>"+Score.toString();
    ElemBest.innerHTML="<div class='level'>BEST</div>"+Best;
    
    var total = Highcard + Pair + Twopairs + Threeoak + Straight + Flush + Fullhouse + Fouroak +
            Royalflush + Straightflush + Identical;
    
    // СЃС‚Р°С‚РёСЃС‚РёРєР° РєРѕР»РёС‡РµСЃС‚РІР° РєРѕРјР±РёРЅР°С†РёР№
    Context.shadowOffsetX = 1; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 1; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 20px aeromatics_b";
    Context.fillStyle="rgb(255,255,255)";
    Context.fillText("HIGH CARD:",      tetrisx(0),tetrisy(1));
    Context.fillText("PAIR:",           tetrisx(0),tetrisy(2));
    Context.fillText("TWO PAIRS:",      tetrisx(0),tetrisy(3));
    Context.fillText("THREE OF A KIND:",tetrisx(0),tetrisy(4));
    Context.fillText("STRAIGHT:",       tetrisx(0),tetrisy(5));
    Context.fillText("FLUSH:",          tetrisx(0),tetrisy(6));
    Context.fillText("FULL HOUSE:",     tetrisx(0),tetrisy(7));
    Context.fillText("FOUR OF A KIND:", tetrisx(0),tetrisy(8));
    Context.fillText("STRAIGHT FLUSH:", tetrisx(0),tetrisy(9));
    Context.fillText("ROYAL FLUSH:",    tetrisx(0),tetrisy(10));
    Context.fillText("IDENTICAL CARDS:",tetrisx(0),tetrisy(11));
    Context.fillText("TOTAL:",          tetrisx(0),tetrisy(12.5));
    
    Context.fillText(Highcard,      tetrisx(5),tetrisy(1));
    Context.fillText(Pair,          tetrisx(5),tetrisy(2));
    Context.fillText(Twopairs,      tetrisx(5),tetrisy(3));
    Context.fillText(Threeoak,      tetrisx(5),tetrisy(4));
    Context.fillText(Straight,      tetrisx(5),tetrisy(5));
    Context.fillText(Flush,         tetrisx(5),tetrisy(6));
    Context.fillText(Fullhouse,     tetrisx(5),tetrisy(7));
    Context.fillText(Fouroak,       tetrisx(5),tetrisy(8));
    Context.fillText(Straightflush, tetrisx(5),tetrisy(9));
    Context.fillText(Royalflush,    tetrisx(5),tetrisy(10));
    Context.fillText(Identical,     tetrisx(5),tetrisy(11));
    Context.fillText(total,         tetrisx(5),tetrisy(12.5));
    
    if(total>0) {
        Context.fillText((Highcard/total*100.0).toFixed(2)+"%",      tetrisx(8),tetrisy(1));
        Context.fillText((Pair/total*100.0).toFixed(2)+"%",          tetrisx(8),tetrisy(2));
        Context.fillText((Twopairs/total*100.0).toFixed(2)+"%",      tetrisx(8),tetrisy(3));
        Context.fillText((Threeoak/total*100.0).toFixed(2)+"%",      tetrisx(8),tetrisy(4));
        Context.fillText((Straight/total*100.0).toFixed(2)+"%",      tetrisx(8),tetrisy(5));
        Context.fillText((Flush/total*100.0).toFixed(2)+"%",         tetrisx(8),tetrisy(6));
        Context.fillText((Fullhouse/total*100.0).toFixed(2)+"%",     tetrisx(8),tetrisy(7));
        Context.fillText((Fouroak/total*100.0).toFixed(2)+"%",       tetrisx(8),tetrisy(8));
        Context.fillText((Straightflush/total*100.0).toFixed(2)+"%", tetrisx(8),tetrisy(9));
        Context.fillText((Royalflush/total*100.0).toFixed(2)+"%",    tetrisx(8),tetrisy(10));
        Context.fillText((Identical/total*100.0).toFixed(2)+"%",     tetrisx(8),tetrisy(11));
        Context.fillText((total/total*100.0).toFixed(2)+"%",         tetrisx(8),tetrisy(12.5));
    }
    else {
        Context.fillText("0%",tetrisx(8),tetrisy(1));
        Context.fillText("0%",tetrisx(8),tetrisy(2));
        Context.fillText("0%",tetrisx(8),tetrisy(3));
        Context.fillText("0%",tetrisx(8),tetrisy(4));
        Context.fillText("0%",tetrisx(8),tetrisy(5));
        Context.fillText("0%",tetrisx(8),tetrisy(6));
        Context.fillText("0%",tetrisx(8),tetrisy(7));
        Context.fillText("0%",tetrisx(8),tetrisy(8));
        Context.fillText("0%",tetrisx(8),tetrisy(9));
        Context.fillText("0%",tetrisx(8),tetrisy(10));
        Context.fillText("0%",tetrisx(8),tetrisy(11));
        Context.fillText("0%",tetrisx(8),tetrisy(12.5));
    }
}

function drawgameover() {
    // Р±СЌРєРіСЂР°СѓРЅРґ (С‚РµРјРЅРѕ-Р·РµР»РµРЅС‹Р№)
    Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.fillStyle="rgb(0,64,0)";
    Context.fillRect(0, 0, Canvas.width, Canvas.height);
    // РїРѕР»Рµ С‚РµС‚СЂРёСЃР° РІРјРµСЃС‚Рµ СЃ СЃРµС‚РєРѕР№
    Context.fillStyle="rgb(181,230,29)";
    Context.strokeStyle="rgb(161,206,24)";
    var i,j;
    for(i=0; i<=6; i++) {
        for(j=0; j<=H-1; j++) {
            Context.fillRect(tetrisx(i),tetrisx(j),35,35);
            Context.strokeRect(tetrisx(i),tetrisx(j),35,35);
        }
    }
    
    // С‚РµРєСѓС‰РёР№ СѓСЂРѕРІРµРЅСЊ, РѕС‡РєРё Рё Р»СѓС‡С€РёР№ СЂРµР·СѓР»СЊС‚Р°С‚
    ElemLevel.innerHTML="<div class='level'>LEVEL</div>"+Level.toString();
    ElemScore.innerHTML="<div class='level'>SCORE</div>"+Score.toString();
    ElemBest.innerHTML="<div class='level'>BEST</div>"+Best;
    // РЅР°РґРїРёСЃСЊ РѕР± РѕРєРѕРЅС‡Р°РЅРёРё РёРіСЂС‹
    Context.shadowOffsetX = 3.25; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 3.25; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 3; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 72px aeromatics_b";
    Context.fillStyle="rgb(250,250,250)";
    Context.fillText("GAME",tetrisx(0.5),tetrisy(4));
    Context.fillText("OVER",tetrisx(2),tetrisy(6));
} 

function drawinit() {
    // Р±СЌРєРіСЂР°СѓРЅРґ (С‚РµРјРЅРѕ-Р·РµР»РµРЅС‹Р№)
    Context.shadowOffsetX = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 0; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 0; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.fillStyle="rgb(0,64,0)";
    Context.fillRect(0, 0, Canvas.width, Canvas.height);
    // РїРѕР»Рµ С‚РµС‚СЂРёСЃР° РІРјРµСЃС‚Рµ СЃ СЃРµС‚РєРѕР№
    Context.fillStyle="rgb(181,230,29)";
    Context.strokeStyle="rgb(161,206,24)";
    var i,j;
    for(i=0; i<=6; i++) {
        for(j=0; j<=H-1; j++) {
            Context.fillRect(tetrisx(i),tetrisx(j),35,35);
            Context.strokeRect(tetrisx(i),tetrisx(j),35,35);
        }
    }
    
    // С‚РµРєСѓС‰РёР№ СѓСЂРѕРІРµРЅСЊ, РѕС‡РєРё Рё Р»СѓС‡С€РёР№ СЂРµР·СѓР»СЊС‚Р°С‚
    ElemLevel.innerHTML="<div class='level'>LEVEL</div>"+Level.toString();
    ElemScore.innerHTML="<div class='level'>SCORE</div>"+Score.toString();
    ElemBest.innerHTML="<div class='level'>BEST</div>"+Best;
    // РЅР°РґРїРёСЃСЊ
    Context.shadowOffsetX = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё X
    Context.shadowOffsetY = 1.5; // РћС‚СЃС‚СѓРї РїРѕ РѕСЃРё Y
    Context.shadowBlur = 1.5; // Р Р°РґРёСѓСЃ СЂР°Р·РјС‹С‚РёСЏ
    Context.shadowColor = "black"; // Р¦РІРµС‚ С‚РµРЅРё
    Context.font="normal 36px aeromatics_b";
    Context.fillStyle="rgb(250,250,250)";
    Context.fillText("TO START THE",tetrisx(0.5),tetrisy(2));
    Context.fillText("GAME",tetrisx(3.5),tetrisy(3));
    Context.fillText("CLICK ON THE",tetrisx(0.5),tetrisy(4));
    Context.fillText("BUTTON",tetrisx(2.5),tetrisy(5));
    Context.fillText('"NEW GAME"',tetrisx(0.5),tetrisy(6));
    //To start the game, click on the button ""
}
////////////////////////////////////////////////////////////////////////////////
function getSpeed() {
    switch (Level) {
        case 1: return 1550;
        case 2: return 1500;
        case 3: return 1450;
        case 4: return 1400;
        case 5: return 1350;
        case 6: return 1300;
        case 7: return 1250;
        case 8: return 1200;
        case 9: return 1150;
        case 10: return 1100;
        case 11: return 1050;
        case 12: return 1000;
        case 13: return 950;
        case 14: return 900;
        case 15: return 850;
        case 16: return 800;
        case 17: return 750;
        case 18: return 700;
        case 19: return 650;
        case 20: return 600;
        case 21: return 550;
        case 22: return 500;
        case 23: return 450;
        case 24: return 400;
        case 25: return 350;
        case 26: return 300;
        case 27: return 250;
        case 28: return 200;
        case 29: return 150;
        case 30: return 100;
        default: return 1550;
    }
}

// РћР±РЅРѕРІРёС‚СЊ СЃС‚Р°С‚РёСЃС‚РёРєСѓ РєРѕР»РёС‡РµСЃС‚РІР° РєРѕРјР±РёРЅР°С†РёР№, С‚РµРєСѓС‰РёР№ СЃС‡РµС‚
function refreshStats(Combo,anim) {
    if(Combo.value>0) {
        Score+=Combo.value;
        switch (Combo.type) {
            case 1: Highcard++; break;
            case 2: Pair++; break;
            case 3: Twopairs++; break;
            case 4: Threeoak++; break;
            case 5: Straight++; break;
            case 6: Flush++; break;
            case 7: Fullhouse++; break;
            case 8: Fouroak++; break;
            case 9:
                if(Combo.k1===13) Royalflush++;
                else Straightflush++;
        }
        switch (anim) {
            case 1: Combotype1=Combo.getComboType(); Comboname1=Combo.getComboName(); Comboscore1="+"+Combo.value.toString(); Combolast1=new Date(); break;
            case 2: Combotype2=Combo.getComboType(); Comboname2=Combo.getComboName(); Comboscore2="+"+Combo.value.toString(); Combolast2=new Date(); break;
            case 3: Combotype3=Combo.getComboType(); Comboname3=Combo.getComboName(); Comboscore3="+"+Combo.value.toString(); Combolast3=new Date(); break;
            case 4: Combotype4=Combo.getComboType(); Comboname4=Combo.getComboName(); Comboscore4="+"+Combo.value.toString(); Combolast4=new Date();
        }
    }
    else {
        Score-=Penalty;
        Identical++;
        switch (anim) {
            case 1: Combotype1="IDENTICAL CARDS"; Comboname1="PENALTY"; Comboscore1="-"+Penalty.toString(); Combolast1=new Date(); break;
            case 2: Combotype2="IDENTICAL CARDS"; Comboname2="PENALTY"; Comboscore2="-"+Penalty.toString(); Combolast2=new Date(); break;
            case 3: Combotype3="IDENTICAL CARDS"; Comboname3="PENALTY"; Comboscore3="-"+Penalty.toString(); Combolast3=new Date(); break;
            case 4: Combotype4="IDENTICAL CARDS"; Comboname4="PENALTY"; Comboscore4="-"+Penalty.toString(); Combolast4=new Date();
        }
    }
}

function checkCombination() {
    Combo1.init(); Combo2.init(); Combo3.init(); Combo4.init();
    Combotype1=""; Combotype2=""; Combotype3=""; Combotype4="";
    for(var i=H-1; i>=0; i--) {
        if(!Combo1.isBusy() && !Combo2.isBusy() && !Combo3.isBusy() && !Combo4.isBusy() && // РїРµСЂРІР°СЏ РєРѕРјР±РёРЅР°С†РёСЏ
        Tetris[0][i]>0 && Tetris[1][i]>0 && Tetris[2][i]>0 && Tetris[3][i]>0 && Tetris[4][i]>0 && Tetris[5][i]>0 && Tetris[6][i]>0) {
            Combo1.defineCombo(Tetris[0][i],Tetris[1][i],Tetris[2][i],Tetris[3][i],Tetris[4][i],Tetris[5][i],Tetris[6][i]);
            Combo1.defineValue();
            refreshStats(Combo1,1);
            Tetris[0][i]=0; Tetris[1][i]=0; Tetris[2][i]=0; Tetris[3][i]=0; Tetris[4][i]=0; Tetris[5][i]=0; Tetris[6][i]=0;
            Anim1.start(i);
            
            Sounds[1].currentTime=0; Sounds[1].play();
        }
        
        else if(Combo1.isBusy() && !Combo2.isBusy() && !Combo3.isBusy() && !Combo4.isBusy() && // РІС‚РѕСЂР°СЏ РєРѕРјР±РёРЅР°С†РёСЏ
        Tetris[0][i]>0 && Tetris[1][i]>0 && Tetris[2][i]>0 && Tetris[3][i]>0 && Tetris[4][i]>0 && Tetris[5][i]>0 && Tetris[6][i]>0) {
            Combo2.defineCombo(Tetris[0][i],Tetris[1][i],Tetris[2][i],Tetris[3][i],Tetris[4][i],Tetris[5][i],Tetris[6][i]);
            Combo2.defineValue();
            refreshStats(Combo2,2);
            Tetris[0][i]=0; Tetris[1][i]=0; Tetris[2][i]=0; Tetris[3][i]=0; Tetris[4][i]=0; Tetris[5][i]=0; Tetris[6][i]=0;
            Anim2.start(i);
        }
        
        else if(Combo1.isBusy() && Combo2.isBusy() && !Combo3.isBusy() && !Combo4.isBusy() && // С‚СЂРµС‚СЊСЏ РєРѕРјР±РёРЅР°С†РёСЏ
        Tetris[0][i]>0 && Tetris[1][i]>0 && Tetris[2][i]>0 && Tetris[3][i]>0 && Tetris[4][i]>0 && Tetris[5][i]>0 && Tetris[6][i]>0) {
            Combo3.defineCombo(Tetris[0][i],Tetris[1][i],Tetris[2][i],Tetris[3][i],Tetris[4][i],Tetris[5][i],Tetris[6][i]);
            Combo3.defineValue();
            refreshStats(Combo3,3);
            Tetris[0][i]=0; Tetris[1][i]=0; Tetris[2][i]=0; Tetris[3][i]=0; Tetris[4][i]=0; Tetris[5][i]=0; Tetris[6][i]=0;
            Anim3.start(i);
        }
        
        else if(Combo1.isBusy() && Combo2.isBusy() && Combo3.isBusy() && !Combo4.isBusy() && // С‡РµС‚РІРµСЂС‚Р°СЏ РєРѕРјР±РёРЅР°С†РёСЏ
        Tetris[0][i]>0 && Tetris[1][i]>0 && Tetris[2][i]>0 && Tetris[3][i]>0 && Tetris[4][i]>0 && Tetris[5][i]>0 && Tetris[6][i]>0) {
            Combo4.defineCombo(Tetris[0][i],Tetris[1][i],Tetris[2][i],Tetris[3][i],Tetris[4][i],Tetris[5][i],Tetris[6][i]);
            Combo4.defineValue();
            refreshStats(Combo4,4);
            Tetris[0][i]=0; Tetris[1][i]=0; Tetris[2][i]=0; Tetris[3][i]=0; Tetris[4][i]=0; Tetris[5][i]=0; Tetris[6][i]=0;
            Anim4.start(i);
        }
    }
}

function secureShape() {
    if(Currshape.y1>=0 && Currshape.y2>=0 && Currshape.y3>=0 && Currshape.y4>=0) {
        Tetris[Currshape.x1][Currshape.y1]=Currshape.c1;
        Tetris[Currshape.x2][Currshape.y2]=Currshape.c2;
        Tetris[Currshape.x3][Currshape.y3]=Currshape.c3;
        Tetris[Currshape.x4][Currshape.y4]=Currshape.c4;
        this.checkCombination();
        this.createNewShape();
        return true;
    }
    else { 
        Current=3;
        for(var i=0; i<=W-1; i++) {
            for(var j=0; j<=H-1; j++) {
                Tetris[i][j]=0;
            }
        }
        Currshape.c1=0; Currshape.c2=0; Currshape.c3=0; Currshape.c4=0;
        
        Anim1.start(0); Anim2.start(1); Anim3.start(2); Anim4.start(3); Anim5.start(4); Anim6.start(5); Anim7.start(6); Anim8.start(7);
        Anim9.start(8); Anim10.start(9); Anim11.start(10); Anim12.start(11); Anim13.start(12); Anim14.start(13); Anim15.start(14); Anim16.start(15);
        if(Score>Best) setCookie("ptetris_best",Score,new Date()+90*24*60*60*1000);
        Sounds[1].currentTime=0; Sounds[1].play();
        return false;
    }
}

function createNewShape() {
    Currshape.toCopy(Nextshape1);
    Nextshape1.toCopy(Nextshape2);
    Nextshape2.toCopy(Nextshape3);
    Nextshape3.create();
    
    Countshape++;
    Sounds[2].currentTime=0; Sounds[2].play();
    if(Countshape>=35*Level && Level<30) { 
        Level++; Levellast=new Date(); Levelframe=1;
    }
}
////////////////////////////////////////////////////////////////////////////////


