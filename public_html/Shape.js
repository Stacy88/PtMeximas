// type 1
// state a         state b         state c         state d
// [-][-][-][-]    [1][-][-][-]    [-][-][-][-]    [4][-][-][-]
// [-][-][-][-]    [2][-][-][-]    [-][-][-][-]    [3][-][-][-]
// [-][-][-][-]    [3][-][-][-]    [-][-][-][-]    [2][-][-][-]
// [1][2][3][4]    [4][-][-][-]    [4][3][2][1]    [1][-][-][-]
// 
// type 2
// state a         state b         state c         state d
// [-][-][-][-]    [-][-][-][-]    [-][-][-][-]    [-][-][-][-]
// [-][-][-][-]    [-][-][-][-]    [-][-][-][-]    [-][-][-][-]
// [1][2][-][-]    [3][1][-][-]    [4][3][-][-]    [2][4][-][-]
// [3][4][-][-]    [4][2][-][-]    [2][1][-][-]    [1][3][-][-]
// 
// type 3
// state a         state b         state c         state d
// [-][-][-][-]    [-][-][-][-]    [-][-][-][-]    [-][-][-][-]
// [-][-][-][-]    [2][1][-][-]    [-][-][-][-]    [-][4][-][-]
// [1][-][-][-]    [3][-][-][-]    [4][3][2][-]    [-][3][-][-]
// [2][3][4][-]    [4][-][-][-]    [-][-][1][-]    [1][2][-][-]
// 
// type 4
// state a         state b         state c         state d
// [-][-][-][-]    [-][-][-][-]    [-][-][-][-]    [-][-][-][-]
// [-][-][-][-]    [4][1][-][-]    [-][-][-][-]    [3][-][-][-]
// [1][2][3][-]    [-][2][-][-]    [-][-][4][-]    [2][-][-][-]
// [4][-][-][-]    [-][3][-][-]    [3][2][1][-]    [1][4][-][-]
// 
// type 5
// state a         state b         state c         state d
// [-][-][-][-]    [-][-][-][-]    [-][-][-][-]    [-][-][-][-]
// [-][-][-][-]    [-][1][-][-]    [-][-][-][-]    [-][4][-][-]
// [1][2][-][-]    [3][2][-][-]    [4][3][-][-]    [2][3][-][-]
// [-][3][4][-]    [4][-][-][-]    [-][2][1][-]    [1][-][-][-]
// 
// type 6
// state a         state b         state c         state d
// [-][-][-][-]    [-][-][-][-]    [-][-][-][-]    [-][-][-][-]
// [-][-][-][-]    [3][-][-][-]    [-][-][-][-]    [2][-][-][-]
// [-][1][2][-]    [4][1][-][-]    [-][4][3][-]    [1][4][-][-]
// [3][4][-][-]    [-][2][-][-]    [2][1][-][-]    [-][3][-][-]
//
// type 7
// state a         state b         state c         state d
// [-][-][-][-]    [-][-][-][-]    [-][-][-][-]    [-][-][-][-]
// [-][-][-][-]    [2][-][-][-]    [-][-][-][-]    [-][4][-][-]
// [-][1][-][-]    [3][1][-][-]    [4][3][2][-]    [1][3][-][-]
// [2][3][4][-]    [4][-][-][-]    [-][1][-][-]    [-][2][-][-]

var Shape = function() {
    this.type;
    this.state;
    this.last;
    this.x1;
    this.x2;
    this.x3;
    this.x4;
    this.y1;
    this.y2;
    this.y3;
    this.y4;
    this.c1;
    this.c2;
    this.c3;
    this.c4;
};
Shape.prototype.init = function() {
    this.type=0;
    this.state=0;
    this.last=new Date();
    this.x1=0;
    this.x2=0;
    this.x3=0;
    this.x4=0;
    this.y1=0;
    this.y2=0;
    this.y3=0;
    this.y4=0;
    this.c1=0;
    this.c2=0;
    this.c3=0;
    this.c4=0;
};

Shape.prototype.create = function(t,c1,c2,c3,c4) {
    this.init();
    this.state=1;
        
    if(t>0) this.type=t; 
    else {
        t=getRandom(1,10);
        switch (t) {
            case 1: this.type=1; break;
            case 2: this.type=2; break;
            case 3: this.type=3; break;
            case 4: this.type=4; break;
            case 5: this.type=5; break;
            case 6: this.type=6; break;
            case 7: this.type=7; break;
            case 8: this.type=1; break;
            case 9: this.type=2; break;
            case 10: this.type=7;
        }
    }
        
    if(c1>0 && c2>0 && c3>0 && c4>0) {
        this.c1=c1; this.c2=c2; this.c3=c3; this.c4=c4;
    }
    else { // РЎРіРµРЅРµСЂРёСЂСѓРµРј 4 СЂР°Р·Р»РёС‡РЅС‹Рµ РєР°СЂС‚С‹ РґР»СЏ С„РёРіСѓСЂС‹
        var rd=getRandom(1,52);
        this.c1=rd;
        while (true) {
            rd=getRandom(1,52);
            if(rd!=this.c1) { this.c2=rd; break; }
        }
        while (true) {
            rd=getRandom(1,52);
            if(rd!=this.c1 && rd!=this.c2) { this.c3=rd; break; }
        }
        while (true) {
            rd=getRandom(1,52);
            if(rd!=this.c1 && rd!=this.c2 && rd!=this.c3) { this.c4=rd; break; }
        } 
    }
    // РџРµСЂРІРѕРЅР°С‡Р°Р»СЊРЅРѕРµ РїРѕР»РѕР¶РµРЅРёРµ С„РёРіСѓСЂС‹
    switch (this.type) {
        case 1: this.x1=2; this.x2=3; this.x3=4; this.x4=5; this.y1=-1; this.y2=-1; this.y3=-1; this.y4=-1; break;
        case 2: this.x1=2; this.x2=3; this.x3=2; this.x4=3; this.y1=-2; this.y2=-2; this.y3=-1; this.y4=-1; break;
        case 3: this.x1=2; this.x2=2; this.x3=3; this.x4=4; this.y1=-2; this.y2=-1; this.y3=-1; this.y4=-1; break;
        case 4: this.x1=2; this.x2=3; this.x3=4; this.x4=2; this.y1=-2; this.y2=-2; this.y3=-2; this.y4=-1; break;
        case 5: this.x1=2; this.x2=3; this.x3=3; this.x4=4; this.y1=-2; this.y2=-2; this.y3=-1; this.y4=-1; break;
        case 6: this.x1=3; this.x2=4; this.x3=2; this.x4=3; this.y1=-2; this.y2=-2; this.y3=-1; this.y4=-1; break;
        case 7: this.x1=3; this.x2=2; this.x3=3; this.x4=4; this.y1=-2; this.y2=-1; this.y3=-1; this.y4=-1;
    }
};

Shape.prototype.toCopy = function(source) {
    this.create(source.type, source.c1, source.c2, source.c3, source.c4);
};

Shape.prototype.rotare = function() {
    switch (this.type) {
        case 1: return this.rotare1();
        case 2: return this.rotare2();
        case 3: return this.rotare3();
        case 4: return this.rotare4();
        case 5: return this.rotare5();
        case 6: return this.rotare6();
        case 7: return this.rotare7();
        default: return false;
    }
};

Shape.prototype.rotare1 = function() {
    switch (this.state) {
        case 1:
            // РїСЂРѕРІРµСЂРєР° РЅР° РІС‹С…РѕРґ С„РёРіСѓСЂС‹ (РїСЂРё РїРѕРІРѕСЂРѕС‚Рµ) Р·Р° РїСЂР°РІСѓСЋ РіСЂР°РЅРёС†Сѓ РїРѕР»СЏ
            if(this.x1>W-1 || this.x2-1>W-1 || this.x3-2>W-1 || this.x4-3>W-1) return false;
            // РїСЂРѕРІРµСЂРєР° СЃРІРѕР±РѕРґРЅРѕР№ СЏС‡РµР№РєРё РёРіСЂРѕРІРѕРіРѕ РїРѕР»СЏ
            if(this.y1-3>=0 && Tetris[this.x1][this.y1-3]>0) return false;
            if(this.y2-2>=0 && Tetris[this.x2-1][this.y2-2]>0) return false;
            if(this.y3-1>=0 && Tetris[this.x3-2][this.y3-1]>0) return false;
            if(this.y4>=0 && Tetris[this.x4-3][this.y4]>0) return false;
            this.y1-=3; this.x2--; this.y2-=2; this.x3-=2; this.y3--; this.x4-=3; this.state=2; return true;
        case 2:
            if(this.x1==W-3) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1+3>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1+3>=0 && Tetris[this.x1+3][this.y1+3]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2+2>=0 && Tetris[this.x2+2][this.y2+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3+1>=0 && Tetris[this.x3+1][this.y3+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4>=0 && Tetris[this.x4][this.y4]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.x1+=3; this.y1+=3; this.x2+=2; this.y2+=2; this.x3++; this.y3++; this.state=3; return true;
            }
            else if(this.x1==W-2) {
                this.x1-=2; this.x2-=2; this.x3-=2; this.x4-=2;
                if(this.x1+3>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y1+3>=0 && Tetris[this.x1+3][this.y1+3]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y2+2>=0 && Tetris[this.x2+2][this.y2+2]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y3+1>=0 && Tetris[this.x3+1][this.y3+1]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y4>=0 && Tetris[this.x4][this.y4]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                this.x1+=3; this.y1+=3; this.x2+=2; this.y2+=2; this.x3++; this.y3++; this.state=3; return true;
            }
            else if(this.x1==W-1) {
                this.x1-=3; this.x2-=3; this.x3-=3; this.x4-=3;
                if(this.x1+3>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y1+3>=0 && Tetris[this.x1+3][this.y1+3]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y2+2>=0 && Tetris[this.x2+2][this.y2+2]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y3+1>=0 && Tetris[this.x3+1][this.y3+1]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y4>=0 && Tetris[this.x4][this.y4]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                this.x1+=3; this.y1+=3; this.x2+=2; this.y2+=2; this.x3++; this.y3++; this.state=3; return true;
            }
            else {
                if(this.x1+3>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) return false;
                if(this.y1+3>=0 && Tetris[this.x1+3][this.y1+3]>0) return false;
                if(this.y2+2>=0 && Tetris[this.x2+2][this.y2+2]>0) return false;
                if(this.y3+1>=0 && Tetris[this.x3+1][this.y3+1]>0) return false;
                if(this.y4>=0 && Tetris[this.x4][this.y4]>0) return false;
                this.x1+=3; this.y1+=3; this.x2+=2; this.y2+=2; this.x3++; this.y3++; this.state=3; return true;
            }
        case 3:
            if(this.x1-3>W-1 || this.x2-2>W-1 || this.x3-1>W-1 || this.x4>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1-3][this.y1]>0) return false;
            if(this.y2-1>=0 && Tetris[this.x2-2][this.y2-1]>0) return false;
            if(this.y3-2>=0 && Tetris[this.x3-1][this.y3-2]>0) return false;
            if(this.y4-3>=0 && Tetris[this.x4][this.y4-3]>0) return false;
            this.x1-=3; this.x2-=2; this.y2--; this.x3--; this.y3-=2; this.y4-=3; this.state=4; return true;
        case 4:
            if(this.x4==W-3) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3+2>W-1 || this.x4+3>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1>=0 && Tetris[this.x1][this.y1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2+1>=0 && Tetris[this.x2+1][this.y2+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3+2>=0 && Tetris[this.x3+2][this.y3+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4+3>=0 && Tetris[this.x4+3][this.y4+3]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.x2++; this.y2++; this.x3+=2; this.y3+=2; this.x4+=3; this.y4+=3; this.state=1; return true;
            }
            else if(this.x4==W-2) {
                this.x1-=2; this.x2-=2; this.x3-=2; this.x4-=2;
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3+2>W-1 || this.x4+3>W-1) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y1>=0 && Tetris[this.x1][this.y1]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y2+1>=0 && Tetris[this.x2+1][this.y2+1]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y3+2>=0 && Tetris[this.x3+2][this.y3+2]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                if(this.y4+3>=0 && Tetris[this.x4+3][this.y4+3]>0) { this.x1+=2; this.x2+=2; this.x3+=2; this.x4+=2; return false; }
                this.x2++; this.y2++; this.x3+=2; this.y3+=2; this.x4+=3; this.y4+=3; this.state=1; return true;
            }
            else if(this.x4==W-1) {
                this.x1-=3; this.x2-=3; this.x3-=3; this.x4-=3;
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3+2>W-1 || this.x4+3>W-1) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y1>=0 && Tetris[this.x1][this.y1]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y2+1>=0 && Tetris[this.x2+1][this.y2+1]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y3+2>=0 && Tetris[this.x3+2][this.y3+2]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                if(this.y4+3>=0 && Tetris[this.x4+3][this.y4+3]>0) { this.x1+=3; this.x2+=3; this.x3+=3; this.x4+=3; return false; }
                this.x2++; this.y2++; this.x3+=2; this.y3+=2; this.x4+=3; this.y4+=3; this.state=1; return true;
            }
            else {
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3+2>W-1 || this.x4+3>W-1) return false;
                if(this.y1>=0 && Tetris[this.x1][this.y1]>0) return false;
                if(this.y2+1>=0 && Tetris[this.x2+1][this.y2+1]>0) return false;
                if(this.y3+2>=0 && Tetris[this.x3+2][this.y3+2]>0) return false;
                if(this.y4+3>=0 && Tetris[this.x4+3][this.y4+3]>0) return false;
                this.x2++; this.y2++; this.x3+=2; this.y3+=2; this.x4+=3; this.y4+=3; this.state=1; return true;
            }
    }
};
Shape.prototype.rotare2 = function() {
    switch (this.state) {
        case 1:
            if(this.x1+1>W-1 || this.x2>W-1 || this.x3>W-1 || this.x4-1>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1+1][this.y1]>0) return false;
            if(this.y2+1>=0 && Tetris[this.x2][this.y2+1]>0) return false;
            if(this.y3-1>=0 && Tetris[this.x3][this.y3-1]>0) return false;
            if(this.y4>=0 && Tetris[this.x4-1][this.y4]>0) return false;
            this.x1++; this.y2++; this.y3--; this.x4--; this.state=2; return true;
        case 2:
            if(this.x1>W-1 || this.x2-1>W-1 || this.x3+1>W-1 || this.x4>W-1) return false;
            if(this.y1+1>=0 && Tetris[this.x1][this.y1+1]>0) return false;
            if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) return false;
            if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) return false;
            if(this.y4-1>=0 && Tetris[this.x4][this.y4-1]>0) return false;
            this.y1++; this.x2--; this.x3++; this.y4--; this.state=3; return true;
        case 3:
            if(this.x1-1>W-1 || this.x2>W-1 || this.x3>W-1 || this.x4+1>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1-1][this.y1]>0) return false;
            if(this.y2-1>=0 && Tetris[this.x2][this.y2-1]>0) return false;
            if(this.y3+1>=0 && Tetris[this.x3][this.y3+1]>0) return false;
            if(this.y4>=0 && Tetris[this.x4+1][this.y4]>0) return false;
            this.x1--; this.y2--; this.y3++; this.x4++; this.state=4; return true;
        case 4:
            if(this.x1>W-1 || this.x2+1>W-1 || this.x3-1>W-1 || this.x4>W-1) return false;
            if(this.y1-1>=0 && Tetris[this.x1][this.y1-1]>0) return false;
            if(this.y2>=0 && Tetris[this.x2+1][this.y2]>0) return false;
            if(this.y3>=0 && Tetris[this.x3-1][this.y3]>0) return false;
            if(this.y4+1>=0 && Tetris[this.x4][this.y4+1]>0) return false;
            this.y1--; this.x2++; this.x3--; this.y4++; this.state=1; return true;
    }
};
Shape.prototype.rotare3 = function() {
    switch (this.state) {
        case 1:
            if(this.x1+1>W-1 || this.x2>W-1 || this.x3-1>W-1 || this.x4-2>W-1) return false;
            if(this.y1-1>=0 && Tetris[this.x1+1][this.y1-1]>0) return false;
            if(this.y2-2>=0 && Tetris[this.x2][this.y2-2]>0) return false;
            if(this.y3-1>=0 && Tetris[this.x3-1][this.y3-1]>0) return false;
            if(this.y4>=0 && Tetris[this.x4-2][this.y4]>0) return false;
            this.x1++; this.y1--; this.y2-=2; this.x3--; this.y3--; this.x4-=2; this.state=2; return true;
        case 2:
            if(this.x1==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1+1>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1+2>=0 && Tetris[this.x1+1][this.y1+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2+1>=0 && Tetris[this.x2+2][this.y2+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4-1>=0 && Tetris[this.x4][this.y4-1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.x1++; this.y1+=2; this.x2+=2; this.y2++; this.x3++; this.y4--; this.state=3; return true;
            }
            else {
                if(this.x1+1>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) return false;
                if(this.y1+2>=0 && Tetris[this.x1+1][this.y1+2]>0) return false;
                if(this.y2+1>=0 && Tetris[this.x2+2][this.y2+1]>0) return false;
                if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) return false;
                if(this.y4-1>=0 && Tetris[this.x4][this.y4-1]>0) return false;
                this.x1++; this.y1+=2; this.x2+=2; this.y2++; this.x3++; this.y4--; this.state=3; return true;
            }
        case 3:
            if(this.x1-2>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4+1>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1-2][this.y1]>0) return false;
            if(this.y2+1>=0 && Tetris[this.x2-1][this.y2+1]>0) return false;
            if(this.y3>=0 && Tetris[this.x3][this.y3]>0) return false;
            if(this.y4-1>=0 && Tetris[this.x4+1][this.y4-1]>0) return false;
            this.x1-=2; this.x2--; this.y2++; this.x4++; this.y4--; this.state=4; return true;
        case 4:
            if(this.x4==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4+1>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1-1>=0 && Tetris[this.x1][this.y1-1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3+1>=0 && Tetris[this.x3][this.y3+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4+2>=0 && Tetris[this.x4+1][this.y4+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.y1--; this.x2--; this.y3++; this.x4++; this.y4+=2; this.state=1; return true;
            }
            else {
                if(this.x1>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4+1>W-1) return false;
                if(this.y1-1>=0 && Tetris[this.x1][this.y1-1]>0) return false;
                if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) return false;
                if(this.y3+1>=0 && Tetris[this.x3][this.y3+1]>0) return false;
                if(this.y4+2>=0 && Tetris[this.x4+1][this.y4+2]>0) return false;
                this.y1--; this.x2--; this.y3++; this.x4++; this.y4+=2; this.state=1; return true;
            }
    }
};
Shape.prototype.rotare4 = function() {
    switch (this.state) {
        case 1:
            if(this.x1+1>W-1 || this.x2>W-1 || this.x3-1>W-1 || this.x4>W-1) return false;
            if(this.y1-1>=0 && Tetris[this.x1+1][this.y1-1]>0) return false;
            if(this.y2>=0 && Tetris[this.x2][this.y2]>0) return false;
            if(this.y3+1>=0 && Tetris[this.x3-1][this.y3+1]>0) return false;
            if(this.y4-2>=0 && Tetris[this.x4][this.y4-2]>0) return false;
            this.x1++; this.y1--; this.x3--; this.y3++; this.y4-=2; this.state=2; return true;
        case 2:
            if(this.x1==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1+1>W-1 || this.x2>W-1 || this.x3-1>W-1 || this.x4+2>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1+2>=0 && Tetris[this.x1+1][this.y1+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2+1>=0 && Tetris[this.x2][this.y2+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3>=0 && Tetris[this.x3-1][this.y3]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4+1>=0 && Tetris[this.x4+2][this.y4+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.x1++; this.y1+=2; this.y2++; this.x3--; this.x4+=2; this.y4++; this.state=3; return true;
            }
            else {
                if(this.x1+1>W-1 || this.x2>W-1 || this.x3-1>W-1 || this.x4+2>W-1) return false;
                if(this.y1+2>=0 && Tetris[this.x1+1][this.y1+2]>0) return false;
                if(this.y2+1>=0 && Tetris[this.x2][this.y2+1]>0) return false;
                if(this.y3>=0 && Tetris[this.x3-1][this.y3]>0) return false;
                if(this.y4+1>=0 && Tetris[this.x4+2][this.y4+1]>0) return false;
                this.x1++; this.y1+=2; this.y2++; this.x3--; this.x4+=2; this.y4++; this.state=3; return true;
            }
        case 3:
            if(this.x1-2>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4-1>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1-2][this.y1]>0) return false;
            if(this.y2-1>=0 && Tetris[this.x2-1][this.y2-1]>0) return false;
            if(this.y3-2>=0 && Tetris[this.x3][this.y3-2]>0) return false;
            if(this.y4+1>=0 && Tetris[this.x4-1][this.y4+1]>0) return false;
            this.x1-=2; this.x2--; this.y2--; this.y3-=2; this.x4--; this.y4++; this.state=4; return true;
        case 4:
            if(this.x4==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3+2>W-1 || this.x4-1>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1-1>=0 && Tetris[this.x1][this.y1-1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2>=0 && Tetris[this.x2+1][this.y2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3+1>=0 && Tetris[this.x3+2][this.y3+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4>=0 && Tetris[this.x4-1][this.y4]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.y1--; this.x2++; this.x3+=2; this.y3++; this.x4--; this.state=1; return true;
            }
            else {
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3+2>W-1 || this.x4-1>W-1) return false;
                if(this.y1-1>=0 && Tetris[this.x1][this.y1-1]>0) return false;
                if(this.y2>=0 && Tetris[this.x2+1][this.y2]>0) return false;
                if(this.y3+1>=0 && Tetris[this.x3+2][this.y3+1]>0) return false;
                if(this.y4>=0 && Tetris[this.x4-1][this.y4]>0) return false;
                this.y1--; this.x2++; this.x3+=2; this.y3++; this.x4--; this.state=1; return true;
            }
    }
};
Shape.prototype.rotare5 = function() {
    switch (this.state) {
        case 1:
            if(this.x1+1>W-1 || this.x2>W-1 || this.x3-1>W-1 || this.x4-2>W-1) return false;
            if(this.y1-1>=0 && Tetris[this.x1+1][this.y1-1]>0) return false;
            if(this.y2>=0 && Tetris[this.x2][this.y2]>0) return false;
            if(this.y3-1>=0 && Tetris[this.x3-1][this.y3-1]>0) return false;
            if(this.y4>=0 && Tetris[this.x4-2][this.y4]>0) return false;
            this.x1++; this.y1--; this.x3--; this.y3--; this.x4-=2; this.state=2; return true;
        case 2:
            if(this.x1==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1+1>W-1 || this.x2>W-1 || this.x3+1>W-1 || this.x4>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1+2>=0 && Tetris[this.x1+1][this.y1+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2+1>=0 && Tetris[this.x2][this.y2+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4-1>=0 && Tetris[this.x4][this.y4-1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.x1++; this.y1+=2; this.y2++; this.x3++; this.y4--; this.state=3; return true;
            }
            else {
                if(this.x1+1>W-1 || this.x2>W-1 || this.x3+1>W-1 || this.x4>W-1) return false;
                if(this.y1+2>=0 && Tetris[this.x1+1][this.y1+2]>0) return false;
                if(this.y2+1>=0 && Tetris[this.x2][this.y2+1]>0) return false;
                if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) return false;
                if(this.y4-1>=0 && Tetris[this.x4][this.y4-1]>0) return false;
                this.x1++; this.y1+=2; this.y2++; this.x3++; this.y4--; this.state=3; return true;
            }
        case 3:
            if(this.x1-2>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4+1>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1-2][this.y1]>0) return false;
            if(this.y2-1>=0 && Tetris[this.x2-1][this.y2-1]>0) return false;
            if(this.y3>=0 && Tetris[this.x3][this.y3]>0) return false;
            if(this.y4-1>=0 && Tetris[this.x4+1][this.y4-1]>0) return false;
            this.x1-=2; this.x2--; this.y2--; this.x4++; this.y4--; this.state=4; return true;
        case 4:
            if(this.x4==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3>W-1 || this.x4+1>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1-1>=0 && Tetris[this.x1][this.y1-1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2>=0 && Tetris[this.x2+1][this.y2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3+1>=0 && Tetris[this.x3][this.y3+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4+2>=0 && Tetris[this.x4+1][this.y4+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.y1--; this.x2++; this.y3++; this.x4++; this.y4+=2; this.state=1; return true;
            }
            else {
                if(this.x1>W-1 || this.x2+1>W-1 || this.x3>W-1 || this.x4+1>W-1) return false;
                if(this.y1-1>=0 && Tetris[this.x1][this.y1-1]>0) return false;
                if(this.y2>=0 && Tetris[this.x2+1][this.y2]>0) return false;
                if(this.y3+1>=0 && Tetris[this.x3][this.y3+1]>0) return false;
                if(this.y4+2>=0 && Tetris[this.x4+1][this.y4+2]>0) return false;
                this.y1--; this.x2++; this.y3++; this.x4++; this.y4+=2; this.state=1; return true;
            }
    }
};
Shape.prototype.rotare6 = function() {
    switch (this.state) {
        case 1:
            if(this.x1>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4-1>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1][this.y1]>0) return false;
            if(this.y2+1>=0 && Tetris[this.x2-1][this.y2+1]>0) return false;
            if(this.y3-2>=0 && Tetris[this.x3][this.y3-2]>0) return false;
            if(this.y4-1>=0 && Tetris[this.x4-1][this.y4-1]>0) return false;
            this.x2--; this.y2++; this.y3-=2; this.x4--; this.y4--; this.state=2; return true;
        case 2:
            if(this.x1==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1>W-1 || this.x2-1>W-1 || this.x3+2>W-1 || this.x4+1>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1+1>=0 && Tetris[this.x1][this.y1+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3+1>=0 && Tetris[this.x3+2][this.y3+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4>=0 && Tetris[this.x4+1][this.y4]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.y1++; this.x2--; this.x3+=2; this.y3++; this.x4++; this.state=3; return true;
            }
            else {
                if(this.x1>W-1 || this.x2-1>W-1 || this.x3+2>W-1 || this.x4+1>W-1) return false;
                if(this.y1+1>=0 && Tetris[this.x1][this.y1+1]>0) return false;
                if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) return false;
                if(this.y3+1>=0 && Tetris[this.x3+2][this.y3+1]>0) return false;
                if(this.y4>=0 && Tetris[this.x4+1][this.y4]>0) return false;
                this.y1++; this.x2--; this.x3+=2; this.y3++; this.x4++; this.state=3; return true;
            }
        case 3:
            if(this.x1-1>W-1 || this.x2>W-1 || this.x3-1>W-1 || this.x4>W-1) return false;
            if(this.y1-1>=0 && Tetris[this.x1-1][this.y1-1]>0) return false;
            if(this.y2-2>=0 && Tetris[this.x2][this.y2-2]>0) return false;
            if(this.y3+1>=0 && Tetris[this.x3-1][this.y3+1]>0) return false;
            if(this.y4>=0 && Tetris[this.x4][this.y4]>0) return false;
            this.x1--; this.y1--; this.y2-=2; this.x3--; this.y3++; this.state=4; return true;
        case 4:
            if(this.x4==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1+1>W-1 || this.x2+2>W-1 || this.x3-1>W-1 || this.x4>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1>=0 && Tetris[this.x1+1][this.y1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2+1>=0 && Tetris[this.x2+2][this.y2+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3>=0 && Tetris[this.x3-1][this.y3]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4+1>=0 && Tetris[this.x4][this.y4+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.x1++; this.x2+=2; this.y2++; this.x3--; this.y4++; this.state=1; return true;
            }
            else {
                if(this.x1+1>W-1 || this.x2+2>W-1 || this.x3-1>W-1 || this.x4>W-1) return false;
                if(this.y1>=0 && Tetris[this.x1+1][this.y1]>0) return false;
                if(this.y2+1>=0 && Tetris[this.x2+2][this.y2+1]>0) return false;
                if(this.y3>=0 && Tetris[this.x3-1][this.y3]>0) return false;
                if(this.y4+1>=0 && Tetris[this.x4][this.y4+1]>0) return false;
                this.x1++; this.x2+=2; this.y2++; this.x3--; this.y4++; this.state=1; return true;
            }
    }
};
Shape.prototype.rotare7 = function() {
    switch (this.state) {
        case 1:
            if(this.x1>W-1 || this.x2>W-1 || this.x3-1>W-1 || this.x4-2>W-1) return false;
            if(this.y1>=0 && Tetris[this.x1][this.y1]>0) return false;
            if(this.y2-2>=0 && Tetris[this.x2][this.y2-2]>0) return false;
            if(this.y3-1>=0 && Tetris[this.x3-1][this.y3-1]>0) return false;
            if(this.y4>=0 && Tetris[this.x4-2][this.y4]>0) return false;
            this.y2-=2; this.x3--; this.y3--; this.x4-=2; this.state=2; return true;
        case 2:
            if(this.x1==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1+1>=0 && Tetris[this.x1][this.y1+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2+1>=0 && Tetris[this.x2+2][this.y2+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4-1>=0 && Tetris[this.x4][this.y4-1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.y1++; this.x2+=2; this.y2++; this.x3++; this.y4--; this.state=3; return true;
            }
            else {
                if(this.x1>W-1 || this.x2+2>W-1 || this.x3+1>W-1 || this.x4>W-1) return false;
                if(this.y1+1>=0 && Tetris[this.x1][this.y1+1]>0) return false;
                if(this.y2+1>=0 && Tetris[this.x2+2][this.y2+1]>0) return false;
                if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) return false;
                if(this.y4-1>=0 && Tetris[this.x4][this.y4-1]>0) return false;
                this.y1++; this.x2+=2; this.y2++; this.x3++; this.y4--; this.state=3; return true;
            }
        case 3:
            if(this.x1-1>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4+1>W-1) return false;
            if(this.y1-1>=0 && Tetris[this.x1-1][this.y1-1]>0) return false;
            if(this.y2+1>=0 && Tetris[this.x2-1][this.y2+1]>0) return false;
            if(this.y3>=0 && Tetris[this.x3][this.y3]>0) return false;
            if(this.y4-1>=0 && Tetris[this.x4+1][this.y4-1]>0) return false;
            this.x1--; this.y1--; this.x2--; this.y2++; this.x4++; this.y4--; this.state=4; return true;
        case 4:
            if(this.x4==W-1) {
                this.x1--; this.x2--; this.x3--; this.x4--;
                if(this.x1+1>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4+1>W-1) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y1>=0 && Tetris[this.x1+1][this.y1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y3+1>=0 && Tetris[this.x3][this.y3+1]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                if(this.y4+2>=0 && Tetris[this.x4+1][this.y4+2]>0) { this.x1++; this.x2++; this.x3++; this.x4++; return false; }
                this.x1++; this.x2--; this.y3++; this.x4++; this.y4+=2; this.state=1; return true;
            }
            else {
                if(this.x1+1>W-1 || this.x2-1>W-1 || this.x3>W-1 || this.x4+1>W-1) return false;
                if(this.y1>=0 && Tetris[this.x1+1][this.y1]>0) return false;
                if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) return false;
                if(this.y3+1>=0 && Tetris[this.x3][this.y3+1]>0) return false;
                if(this.y4+2>=0 && Tetris[this.x4+1][this.y4+2]>0) return false;
                this.x1++; this.x2--; this.y3++; this.x4++; this.y4+=2; this.state=1; return true;
            }
    }
};

Shape.prototype.left = function() {
    if(this.x1-1<0 || this.x2-1<0 || this.x3-1<0 || this.x4-1<0) return false;
    if(this.y1>=0 && Tetris[this.x1-1][this.y1]>0) return false;
    if(this.y2>=0 && Tetris[this.x2-1][this.y2]>0) return false;
    if(this.y3>=0 && Tetris[this.x3-1][this.y3]>0) return false;
    if(this.y4>=0 && Tetris[this.x4-1][this.y4]>0) return false;
    this.x1--; this.x2--; this.x3--; this.x4--; return true;
};

Shape.prototype.right = function() {
    if(this.x1+1>W-1 || this.x2+1>W-1 || this.x3+1>W-1 || this.x4+1>W-1) return false;
    if(this.y1>=0 && Tetris[this.x1+1][this.y1]>0) return false;
    if(this.y2>=0 && Tetris[this.x2+1][this.y2]>0) return false;
    if(this.y3>=0 && Tetris[this.x3+1][this.y3]>0) return false;
    if(this.y4>=0 && Tetris[this.x4+1][this.y4]>0) return false;
    this.x1++; this.x2++; this.x3++; this.x4++; return true;
};

Shape.prototype.down = function(refresh) {
    if(this.y1+1>H-1 || this.y2+1>H-1 || this.y3+1>H-1 || this.y4+1>H-1) return false;
    if(Tetris[this.x1][this.y1+1]>0) return false;
    if(Tetris[this.x2][this.y2+1]>0) return false;
    if(Tetris[this.x3][this.y3+1]>0) return false;
    if(Tetris[this.x4][this.y4+1]>0) return false;
    this.y1++; this.y2++; this.y3++; this.y4++;
    if(refresh) this.last = new Date();
    return true;
};


