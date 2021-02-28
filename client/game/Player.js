class Player {
    constructor(nick, socketId) {
        this.nick = nick;
        this.id = socketId;
        this.gameObjects = new Array();
        this.stats = {
            gold: 50,
            wood: 2,
            stone: 2,
            food: 52
        };
        this.workers = {
            gold: 0,
            wood: 0,
            stone: 0,
            food: 0
        };
        this.statsBoxes = {
            gold: document.querySelector('#gold'),
            wood: document.querySelector('#wood'),
            stone: document.querySelector('#stone'),
            food: document.querySelector('#food')
        };
    }
};

Player.prototype.createBuilding = function(name) {
    const buildings = document.querySelector('.buildings');
    const building = document.createElement('div');
    building.id = `create${name}`;
    building.className = `buildingPrototype`;
    building.innerHTML = `
        <div class="buildingBox">
            <img src="../src/img/${name}01.png" alt="">
            ${name}
        </div>
    `;
    building.addEventListener('click', () => {
        localStorage.setItem('action', JSON.stringify({ type: 'drag', target: `${name.toLowerCase()}` }));
    });
    buildings.appendChild(building);
};

Player.prototype.init = function() {
    const tower = this.createBuilding('Tower');
    const mine = this.createBuilding('Mine');
    const sawmill = this.createBuilding('Sawmill');
    const quarry = this.createBuilding('Quarry');
    const farm = this.createBuilding('Farm');
};

Player.prototype.printStats = function() {
    Object.keys(this.stats).forEach(key => {
        this.statsBoxes[key].innerHTML = `${this.stats[key]}(+${this.workers[key]})`;
    });
};

Player.prototype.addToStats = function() {
    Object.keys(this.stats).forEach(key => {
        this.stats[key] += this.workers[key];
    });
};

Player.prototype.updateStats = function() {
    let player = JSON.parse(localStorage.getItem('player'));
    Object.entries(player.stats).forEach(entry => {
        const [key, value] = entry;
        this.stats[key] = player.stats[key];
    });
};

Player.prototype.getStats = function() {
    return this.stats;
};

Player.prototype.getWorkers = function() {
    return this.workers;
};