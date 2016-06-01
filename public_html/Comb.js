////////////////////////////////////////////////////////////////////////////////
function getRank(c) {
    switch(c) {
        case 1: return 1;   // 2c
        case 2: return 2;   // 3c
        case 3: return 3;   // 4c
        case 4: return 4;   // 5c
        case 5: return 5;   // 6c
        case 6: return 6;   // 7c
        case 7: return 7;   // 8c
        case 8: return 8;   // 9c
        case 9: return 9;   // tc
        case 10: return 10; // jc
        case 11: return 11; // qc
        case 12: return 12; // kc
        case 13: return 13; // ac
        case 14: return 1;  // 2d
        case 15: return 2;  // 3d
        case 16: return 3;  // 4d
        case 17: return 4;  // 5d
        case 18: return 5;  // 6d
        case 19: return 6;  // 7d
        case 20: return 7;  // 8d
        case 21: return 8;  // 9d
        case 22: return 9;  // td
        case 23: return 10; // jd
        case 24: return 11; // qd
        case 25: return 12; // kd
        case 26: return 13; // ad
        case 27: return 1;  // 2h
        case 28: return 2;  // 3h
        case 29: return 3;  // 4h
        case 30: return 4;  // 5h
        case 31: return 5;  // 6h
        case 32: return 6;  // 7h
        case 33: return 7;  // 8h
        case 34: return 8;  // 9h
        case 35: return 9;  // th
        case 36: return 10; // jh
        case 37: return 11; // qh
        case 38: return 12; // kh
        case 39: return 13; // ah
        case 40: return 1;  // 2s
        case 41: return 2;  // 3s
        case 42: return 3;  // 4s
        case 43: return 4;  // 5s
        case 44: return 5;  // 6s
        case 45: return 6;  // 7s
        case 46: return 7;  // 8s
        case 47: return 8;  // 9s
        case 48: return 9;  // ts
        case 49: return 10; // js
        case 50: return 11; // qs
        case 51: return 12; // ks
        case 52: return 13; // as
        default : return 0;
    }
}
function getSuit(c) {
    switch(c) {
        case 1:  // 2c
        case 2:  // 3c
        case 3:  // 4c
        case 4:  // 5c
        case 5:  // 6c
        case 6:  // 7c
        case 7:  // 8c
        case 8:  // 9c
        case 9:  // tc
        case 10: // jc
        case 11: // qc
        case 12: // kc
        case 13: return 1; // ac
        case 14: // 2d
        case 15: // 3d
        case 16: // 4d
        case 17: // 5d
        case 18: // 6d
        case 19: // 7d
        case 20: // 8d
        case 21: // 9d
        case 22: // td
        case 23: // jd
        case 24: // qd
        case 25: // kd
        case 26: return 2; // ad
        case 27: // 2h
        case 28: // 3h
        case 29: // 4h
        case 30: // 5h
        case 31: // 6h
        case 32: // 7h
        case 33: // 8h
        case 34: // 9h
        case 35: // th
        case 36: // jh
        case 37: // qh
        case 38: // kh
        case 39: return 3; // ah
        case 40: // 2s
        case 41: // 3s
        case 42: // 4s
        case 43: // 5s
        case 44: // 6s
        case 45: // 7s
        case 46: // 8s
        case 47: // 9s
        case 48: // ts
        case 49: // js
        case 50: // qs
        case 51: // ks
        case 52: return 4; // as
        default : return 0;
    }
}

////////////////////////////////////////////////////////////////////////////////
// straight flush   k1
// four of a kind   k1  k2
// full house       k1  k2
// flush            k1  k2  k3  k4  k5
// straight         k1
// three of kind    k1  k2  k3
// two pairs        k1  k2  k3
// pair             k1  k2  k3  k4
// high card        k1  k2  k3  k4  k5
var Comb = function() {
    this.type; // 1-9
    this.k1;   // 1-13
    this.k2;
    this.k3;
    this.k4;
    this.k5;
    this.value;
};

Comb.prototype.init = function() {
    this.type=0;
    this.k1=0;
    this.k2=0;
    this.k3=0;
    this.k4=0;
    this.k5=0;
    this.value=0;
};

Comb.prototype.isBusy = function() {
    if(this.type==0) return false;
    else return true;
};

Comb.prototype.defineCombo = function(c1,c2,c3,c4,c5,c6,c7) {
    this.init();
    if(c1===c2 || c1===c3 || c1===c4 || c1===c5 || c1===c6 || c1===c7 || c2===c3 || c2===c4 || c2===c5 || c2===c6 ||
    c2===c7 || c3===c4 || c3===c5 || c3===c6 || c3===c7 || c4===c5 || c4===c6 || c4===c7 || c5===c6 || c5===c7 || c6===c7) {
        this.type=-1; return;
    }
    
    var nranks = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    var nsuits = [0,0,0,0];
    var fl = [0,0,0,0,0,0,0];
    var i,j,x,y,z;
    nranks[getRank(c1)-1]++;
    nranks[getRank(c2)-1]++;
    nranks[getRank(c3)-1]++;
    nranks[getRank(c4)-1]++;
    nranks[getRank(c5)-1]++;
    nranks[getRank(c6)-1]++;
    nranks[getRank(c7)-1]++;
    
    nsuits[getSuit(c1)-1]++;
    nsuits[getSuit(c2)-1]++;
    nsuits[getSuit(c3)-1]++;
    nsuits[getSuit(c4)-1]++;
    nsuits[getSuit(c5)-1]++;
    nsuits[getSuit(c6)-1]++;
    nsuits[getSuit(c7)-1]++;
    
    // straight flush
    for(i=0; i<=4-1; i++) {
        if(nsuits[i]>=5) {
            if(getSuit(c1)===i+1) fl[0]=getRank(c1); else fl[0]=0;
            if(getSuit(c2)===i+1) fl[1]=getRank(c2); else fl[1]=0;
            if(getSuit(c3)===i+1) fl[2]=getRank(c3); else fl[2]=0;
            if(getSuit(c4)===i+1) fl[3]=getRank(c4); else fl[3]=0;
            if(getSuit(c5)===i+1) fl[4]=getRank(c5); else fl[4]=0;
            if(getSuit(c6)===i+1) fl[5]=getRank(c6); else fl[5]=0;
            if(getSuit(c7)===i+1) fl[6]=getRank(c7); else fl[6]=0;
                
            for(j=13; j>=4; j--) {
                if(j===4 &&
                nranks[4-1]>=1 && (fl[0]===4 || fl[1]===4 || fl[2]===4 || fl[3]===4 || fl[4]===4 || fl[5]===4 || fl[6]===4) &&
                nranks[3-1]>=1 && (fl[0]===3 || fl[1]===3 || fl[2]===3 || fl[3]===3 || fl[4]===3 || fl[5]===3 || fl[6]===3) &&
                nranks[2-1]>=1 && (fl[0]===2 || fl[1]===2 || fl[2]===2 || fl[3]===2 || fl[4]===2 || fl[5]===2 || fl[6]===2) &&        
                nranks[1-1]>=1 && (fl[0]===1 || fl[1]===1 || fl[2]===1 || fl[3]===1 || fl[4]===1 || fl[5]===1 || fl[6]===1) &&        
                nranks[13-1]>=1 && (fl[0]===13 || fl[1]===13 || fl[2]===13 || fl[3]===13 || fl[4]===13 || fl[5]===13 || fl[6]===13)
                ) {
                    this.type=9; this.k1=j; return;
                }
                       
                if(j!==4 &&
                nranks[j-1]>=1 && (fl[0]===j || fl[1]===j || fl[2]===j || fl[3]===j || fl[4]===j || fl[5]===j || fl[6]===j) &&
                nranks[j-1-1]>=1 && (fl[0]===j-1 || fl[1]===j-1 || fl[2]===j-1 || fl[3]===j-1 || fl[4]===j-1 || fl[5]===j-1 || fl[6]===j-1) &&
                nranks[j-2-1]>=1 && (fl[0]===j-2 || fl[1]===j-2 || fl[2]===j-2 || fl[3]===j-2 || fl[4]===j-2 || fl[5]===j-2 || fl[6]===j-2) &&        
                nranks[j-3-1]>=1 && (fl[0]===j-3 || fl[1]===j-3 || fl[2]===j-3 || fl[3]===j-3 || fl[4]===j-3 || fl[5]===j-3 || fl[6]===j-3) &&        
                nranks[j-4-1]>=1 && (fl[0]===j-4 || fl[1]===j-4 || fl[2]===j-4 || fl[3]===j-4 || fl[4]===j-4 || fl[5]===j-4 || fl[6]===j-4)
                ) {
                    this.type=9; this.k1=j; return;
                }
            }
        }    
    }
    
    // four of a kind
    for(i=13; i>=1; i--) {
        if(nranks[i-1]>=4) {
            for(j=13; j>=1; j--) {
                if(nranks[j-1]>=1 && j!==i) {
                    this.type=8; this.k1=i; this.k2=j; return;
                }
            }
        }
    }
    
    // full house
    for(i=13; i>=1; i--) {
        if(nranks[i-1]>=3) {
            for(j=13; j>=1; j--) {
                if(nranks[j-1]>=2 && j!==i) {
                    this.type=7; this.k1=i; this.k2=j; return;
                }
            }
        }
    }
        
    // flush
    for(i=0; i<=4-1; i++) {
        if(nsuits[i]>=5) {
            if(getSuit(c1)===i+1) fl[0]=getRank(c1); else fl[0]=0;
            if(getSuit(c2)===i+1) fl[1]=getRank(c2); else fl[1]=0;
            if(getSuit(c3)===i+1) fl[2]=getRank(c3); else fl[2]=0;
            if(getSuit(c4)===i+1) fl[3]=getRank(c4); else fl[3]=0;
            if(getSuit(c5)===i+1) fl[4]=getRank(c5); else fl[4]=0;
            if(getSuit(c6)===i+1) fl[5]=getRank(c6); else fl[5]=0;
            if(getSuit(c7)===i+1) fl[6]=getRank(c7); else fl[6]=0;
            fl.sort(compareNumeric);
            this.type=6; this.k1=fl[0]; this.k2=fl[1]; this.k3=fl[2]; this.k4=fl[3]; this.k5=fl[4]; return;
        }
    }
    
    // straight
    for(i=13; i>=4; i--) {
        if(i===4 &&
        nranks[4-1]>=1 && (fl[0]===4 || fl[1]===4 || fl[2]===4 || fl[3]===4 || fl[4]===4 || fl[5]===4 || fl[6]===4) &&
        nranks[3-1]>=1 && (fl[0]===3 || fl[1]===3 || fl[2]===3 || fl[3]===3 || fl[4]===3 || fl[5]===3 || fl[6]===3) &&
        nranks[2-1]>=1 && (fl[0]===2 || fl[1]===2 || fl[2]===2 || fl[3]===2 || fl[4]===2 || fl[5]===2 || fl[6]===2) &&        
        nranks[1-1]>=1 && (fl[0]===1 || fl[1]===1 || fl[2]===1 || fl[3]===1 || fl[4]===1 || fl[5]===1 || fl[6]===1) &&        
        nranks[13-1]>=1 && (fl[0]===13 || fl[1]===13 || fl[2]===13 || fl[3]===13 || fl[4]===13 || fl[5]===13 || fl[6]===13)
        ) {
            this.type=5; this.k1=i; return;
        }
                       
        if(i!==4 &&
        nranks[i-1]>=1 && (fl[0]===i || fl[1]===i || fl[2]===i || fl[3]===i || fl[4]===i || fl[5]===i || fl[6]===i) &&
        nranks[i-1-1]>=1 && (fl[0]===i-1 || fl[1]===i-1 || fl[2]===i-1 || fl[3]===i-1 || fl[4]===i-1 || fl[5]===i-1 || fl[6]===i-1) &&
        nranks[i-2-1]>=1 && (fl[0]===i-2 || fl[1]===i-2 || fl[2]===i-2 || fl[3]===i-2 || fl[4]===i-2 || fl[5]===i-2 || fl[6]===i-2) &&        
        nranks[i-3-1]>=1 && (fl[0]===i-3 || fl[1]===i-3 || fl[2]===i-3 || fl[3]===i-3 || fl[4]===i-3 || fl[5]===i-3 || fl[6]===i-3) &&        
        nranks[i-4-1]>=1 && (fl[0]===i-4 || fl[1]===i-4 || fl[2]===i-4 || fl[3]===i-4 || fl[4]===i-4 || fl[5]===i-4 || fl[6]===i-4)
        ) {
            this.type=5; this.k1=i; return;
        }
    }
        
    // three of a kind
    for(i=13; i>=1; i--) {
        if(nranks[i-1]>=3) {
            for(j=13; j>=1; j--) {
                if(nranks[j-1]>=1 && j!==i) {
                    for(x=13; x>=1; x--) {
                        if(nranks[x-1]>=1 && x!==j && x!==i) {
                            this.type=4; this.k1=i; this.k2=j; this.k3=x; return;
                        }
                    }
                }
            }
        }
    }
        
    // two pairs
    for(i=13; i>=1; i--) {
        if(nranks[i-1]>=2) {
            for(j=13; j>=1; j--) {
                if(nranks[j-1]>=2 && j!==i) {
                    for(x=13; x>=1; x--) {
                        if(nranks[x-1]>=1 && x!==j && x!==i) {
                            this.type=3; this.k1=i; this.k2=j; this.k3=x; return;
                        }
                    }
                }
            }
        }
    }
        
    // pair
    for(i=13; i>=1; i--) {
        if(nranks[i-1]>=2) {
            for(j=13; j>=1; j--) {
                if(nranks[j-1]>=1 && j!==i) {
                    for(x=13; x>=1; x--) {
                        if(nranks[x-1]>=1 && x!==j && x!==i) {
                            for(y=13; y>=1; y--) {
                                if(nranks[y-1]>=1 && y!==x && y!==j && y!==i) {
                                    this.type=2; this.k1=i; this.k2=j; this.k3=x; this.k4=y; return;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    // high card
    for(i=13; i>=1; i--) {
        if(nranks[i-1]>=1) {
            for(j=13; j>=1; j--) {
                if(nranks[j-1]>=1 && j!==i) {
                    for(x=13; x>=1; x--) {
                        if(nranks[x-1]>=1 && x!==j && x!==i) {
                            for(y=13; y>=1; y--) {
                                if(nranks[y-1]>=1 && y!==x && y!==j && y!==i) {
                                    for(z=13; z>=1; z--) {
                                        if(nranks[z-1]>=1 && z!==y && z!==x && z!==j && z!==i) {
                                            this.type=2; this.k1=i; this.k2=j; this.k3=x; this.k4=y; this.k5=z; return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
        
    // Р•СЃР»Рё РґРѕ СЃРёС… РїРѕСЂ РЅРµ РІРѕР·СЂР°С‚РёР»Рѕ, Р·РЅР°С‡РёС‚ РѕС€РёР±РєР° - РЅРµРёР·РІРµСЃС‚РЅР°СЏ РєРѕРјР±РёРЅР°С†РёСЏ
};

Comb.prototype.getComboType = function() {
    switch (this.type) {
        case 1: return "HIGH CARD";
        case 2: return "PAIR";
        case 3: return "TWO PAIRS";
        case 4: return "THREE OF A KIND";
        case 5: return "STRAIGHT";
        case 6: return "FLUSH";
        case 7: return "FULL HOUSE";
        case 8: return "FOUR OF A KIND";
        case 9:
            if(this.k1==13) return "ROYAL FLUSH";
            else return "STRAIGHT FLUSH";
        default : return "";
    }
};

Comb.prototype.getComboName = function() {
    var arr = [ "","2","3","4","5","6","7","8","9","T","J","Q","K","A"];
    switch (this.type) {
        case 1:
        case 6: return arr[this.k1]+" "+arr[this.k2]+" "+arr[this.k3]+" "+arr[this.k4]+" "+arr[this.k5];
        case 2: return arr[this.k1]+arr[this.k1]+" "+arr[this.k2]+" "+arr[this.k3]+" "+arr[this.k4];
        case 3: return arr[this.k1]+arr[this.k1]+" "+arr[this.k2]+arr[this.k2]+" "+arr[this.k3];
        case 4: return arr[this.k1]+arr[this.k1]+arr[this.k1]+" "+arr[this.k2]+" "+arr[this.k3];
        case 5:
        case 9:
            if(this.k1==4) return "5 4 3 2 A";
            else return arr[this.k1]+" "+arr[this.k1-1]+" "+arr[this.k1-2]+" "+arr[this.k1-3]+" "+arr[this.k1-4];
        case 7: return arr[this.k1]+arr[this.k1]+arr[this.k1]+" "+arr[this.k2]+arr[this.k2];
        case 8: return arr[this.k1]+arr[this.k1]+arr[this.k1]+arr[this.k1]+" "+arr[this.k2];
        default : return "";
    }
};

Comb.prototype.defineValue = function() {
    this.value=0;
    if(this.type==1) { // high card
        this.value+=0;
        switch (this.k1) {
            case 13: this.value+=40; break;
            case 12: this.value+=35; break;
            case 11: this.value+=30; break;
            case 10: this.value+=25; break;
            case 9: this.value+=20; break;
            case 8: this.value+=15; break;
            case 7: this.value+=10; break;
            case 6: this.value+=5; 
        }
    }
    else if(this.type==2) { // pair
        this.value+=100;
        switch (this.k1) {
            case 13: this.value+=130; break;
            case 12: this.value+=120; break;
            case 11: this.value+=110; break;
            case 10: this.value+=100; break;
            case 9: this.value+=90; break;
            case 8: this.value+=80; break;
            case 7: this.value+=70; break;
            case 6: this.value+=60; break;
            case 5: this.value+=50; break;
            case 4: this.value+=40; break;
            case 3: this.value+=30; break;
            case 2: this.value+=20; break;
            case 1: this.value+=10;
        }
    }
    else if(this.type==3) { // two pairs
        this.value+=300;
        switch (this.k1) {
            case 13: this.value+=120; break;
            case 12: this.value+=110; break;
            case 11: this.value+=100; break;
            case 10: this.value+=90; break;
            case 9: this.value+=80; break;
            case 8: this.value+=70; break;
            case 7: this.value+=60; break;
            case 6: this.value+=50; break;
            case 5: this.value+=40; break;
            case 4: this.value+=30; break;
            case 3: this.value+=20; break;
            case 2: this.value+=10;
        }
    }
    else if(this.type==4) { // three oak
        this.value+=500;
        switch (this.k1) {
            case 13: this.value+=130; break;
            case 12: this.value+=120; break;
            case 11: this.value+=110; break;
            case 10: this.value+=100; break;
            case 9: this.value+=90; break;
            case 8: this.value+=80; break;
            case 7: this.value+=70; break;
            case 6: this.value+=60; break;
            case 5: this.value+=50; break;
            case 4: this.value+=40; break;
            case 3: this.value+=30; break;
            case 2: this.value+=20; break;
            case 1: this.value+=10;
        }
    }
    else if(this.type==5) { // straight
        this.value+=750;
        switch (this.k1) {
            case 13: this.value+=100; break;
            case 12: this.value+=90; break;
            case 11: this.value+=80; break;
            case 10: this.value+=70; break;
            case 9: this.value+=60; break;
            case 8: this.value+=50; break;
            case 7: this.value+=40; break;
            case 6: this.value+=30; break;
            case 5: this.value+=20; break;
            case 4: this.value+=10;
        }
    }
    else if(this.type==6) { // flush
        this.value+=1000;
        switch (this.k1) {
            case 13: this.value+=160; break;
            case 12: this.value+=140; break;
            case 11: this.value+=120; break;
            case 10: this.value+=100; break;
            case 9: this.value+=80; break;
            case 8: this.value+=60; break;
            case 7: this.value+=40; break;
            case 6: this.value+=20; 
        }
    }
    else if(this.type==7) { // full house
        this.value+=1500;
        switch (this.k1) {
            case 13: this.value+=260; break;
            case 12: this.value+=240; break;
            case 11: this.value+=220; break;
            case 10: this.value+=200; break;
            case 9: this.value+=180; break;
            case 8: this.value+=160; break;
            case 7: this.value+=140; break;
            case 6: this.value+=120; break;
            case 5: this.value+=100; break;
            case 4: this.value+=80; break;
            case 3: this.value+=60; break;
            case 2: this.value+=40; break;
            case 1: this.value+=20;
        }
    }
    else if(this.type==8) { // four oak
        this.value+=2500;
        switch (this.k1) {
            case 13: this.value+=650; break;
            case 12: this.value+=600; break;
            case 11: this.value+=550; break;
            case 10: this.value+=500; break;
            case 9: this.value+=450; break;
            case 8: this.value+=400; break;
            case 7: this.value+=350; break;
            case 6: this.value+=300; break;
            case 5: this.value+=250; break;
            case 4: this.value+=200; break;
            case 3: this.value+=150; break;
            case 2: this.value+=100; break;
            case 1: this.value+=50;
        }
    }
    else if(this.type==9) { // straight flush
        this.value+=4000;
        switch (this.k1) {
            case 13: this.value+=1000; break;
            case 12: this.value+=900; break;
            case 11: this.value+=800; break;
            case 10: this.value+=700; break;
            case 9: this.value+=600; break;
            case 8: this.value+=500; break;
            case 7: this.value+=400; break;
            case 6: this.value+=300; break;
            case 5: this.value+=200; break;
            case 4: this.value+=100;
        }
    }
};

