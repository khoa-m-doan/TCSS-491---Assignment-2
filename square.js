function Square(game, player) {
	this.player = player;
    this.side = 50;
    //this.visualside = 500;
    this.clockTick = 0;
    this.isAlive = true; // square is always alive, but this variable is needed to determine
    					 // whether an entity needs to be removed from world

    switch(player) {
    	case 1:
    		Entity.call(this, game, 0, 0); 
    		this.x = 0; 
    		this.y = 0;
    		this.color = "Red";
    		this.team = 1;
    		break;
    	case 2: 
    		Entity.call(this, game, 800, 400); 
    		this.x = 0; 
    		this.y = 750;
    		this.color = "Green";
    		this.team = 1;
    		break;
    	case 3:
    		Entity.call(this, game, 400, 800);
    		this.x = 750;
    		this.y = 0;
    		this.color = "Blue";
    		this.team = 2;
    		break;
    	case 4: 
    		Entity.call(this, game, 400, 0);
    		this.x = 750;
    		this.y = 750;
    		this.color = "Yellow";
    		this.team = 2;
    		break;
    	default: console.log("something else");
    }
};

Square.prototype = new Entity();
Square.prototype.constructor = Square;

Square.prototype.collide = function (other) {
    return distance(this, other) < this.side + other.radius;
};

Square.prototype.collideLeft = function () {
    return (this.x - this.side) < 0;
};

Square.prototype.collideRight = function () {
    return (this.x + this.side) > 800;
};

Square.prototype.collideTop = function () {
    return (this.y - this.side) < 0;
};

Square.prototype.collideBottom = function () {
    return (this.y + this.side) > 800;
};

Square.prototype.update = function () {
	
    Entity.prototype.update.call(this);

    this.clockTick++;
    if(this.clockTick > 120) {
    	var size = Math.floor(Math.random() * 3 + 1) * 10;
    	var circle = new Circle(this.game, size, this.player);

    	this.game.addEntity(circle);
        this.clockTick = 0;
    	//this.lastClockTick = this.game.clockTick;
    }
    // for (var i = 0; i < this.game.entities.length; i++) {
    //     var ent = this.game.entities[i];
    //     if (ent !== this && this.collide(ent)) {
        	
    //     }
    // }
};

Square.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    //ctx.arc(this.x, this.y, this.side, 0, Math.PI * 2, false);
    ctx.rect(this.x, this.y, this.side, this.side);
    ctx.fill();
    ctx.closePath();
    Entity.prototype.draw.call(this)
};