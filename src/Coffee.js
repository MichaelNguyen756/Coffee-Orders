function Coffee() {
	this.Price = 3.5;
}

Coffee.prototype.makeEspresso = function(){
	this.isEspresso = true;
};

Coffee.prototype.makeLarge = function(){
	if (this.isEspresso) {
		throw new Error("cannot make large if the coffee is espresso");
    }

	this.isCoffeeLarge = true;
};

Coffee.prototype.addSoy = function(){
	this.hasSoy = true;
};

Coffee.prototype.getPrice = function(){
	return this.Price + (this.isCoffeeLarge ? 0.5 : 0) - (this.isEspresso ? 0.5 : 0) + (this.hasSoy ? 0.5 : 0);
};

module.exports = Coffee;