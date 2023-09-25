class Character {
  _life = 1;
  maxLife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }

  get life() {
    return this._life;
  }

  set life(newLife) {
    this._life = newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defense = 8;
    this.maxLife = this.life;
  }
}
class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.life = 80;
    this.attack = 15;
    this.defense = 3;
    this.maxLife = this.life;
  }
}
class Rogue extends Character {
  constructor(name) {
    super(name);
    this.life = 75;
    this.attack = 18;
    this.defense = 2;
    this.maxLife = this.life;
  }
}
class LitteMonster extends Character {
  constructor() {
    super("Litte Monster");
    this.life = 40;
    this.attack = 4;
    this.defense = 4;
    this.maxLife = this.life;
  }
}
class BigMonster extends Character {
  constructor() {
    super("Big Monster");
    this.life = 120;
    this.attack = 16;
    this.defense = 6;
    this.maxLife = this.life;
  }
}


class Stage{
    constructor(fighter1, fighter2, fighter1El, fighter2El,logObject){
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.fighter1El = fighter1El
        this.fighter2El = fighter2El
        this.log = logObject;
    }

    start() {
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update(){
        //1
        this.fighter1El.querySelector('.name').innerText = `${this.fighter1.name} - ${this.fighter1.life.toFixed(0)} HP`;
        let f1Pct = (this.fighter1.life/ this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%` 
        //2
        this.fighter2El.querySelector('.name').innerText = `${this.fighter2.name} - ${this.fighter2.life.toFixed(0)} HP`;
        let f2Pct = (this.fighter2.life/ this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`    

        if(this.fighter1.life === 0){
          this.log.addMessage('😔 Monstros, ganharam 😔');
        } else if (this.fighter2.life === 0){
          this.log.addMessage('🎉 Humanos, ganharam 🎉');
        }
        }

      doAttack(attacking, attacked){
        if (attacked.life <= 0 ){
          this.log.addMessage('☠️ Atacando cachorro morto...');
          return;
        } else if(attacking.life <= 0){
          this.log.addMessage('☠️ Você morreu chefia...');
          return;
        }

        let attackFactor = (Math.random() *2).toFixed(0);
        let defenseFactor = (Math.random() *2).toFixed(0);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense){
          attacked.life -= actualAttack;
          this.log.addMessage(` ⚔️ ${attacking.name} causou ${actualAttack.toFixed(0)} de dano em ${attacked.name}`);
        } else{
          this.log.addMessage(` 🛡️ ${attacked.name} conseguiu defender`);
        }

        this.update();
      }
}

class Log{
    list = [];

    constructor(listEl){
      this.listEl = listEl;
    }

    addMessage(msg){
      this.list.push(msg);
      this.render();
    }

    render() {
      this.listEl.innerHTML = '';

      for (let i in this.list){
        this.listEl.innerHTML += `<li>${this.list[i]}</li>`
      }
    }
}