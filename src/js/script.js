let log = new Log(document.querySelector('.log'));

let char = new Knight(`Julio  (${Knight.name})`);
let monster = new BigMonster();

const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#moster'),
    log
);

stage.start();