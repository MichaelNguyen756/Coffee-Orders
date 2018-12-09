function Order() {
	this.coffeeList = [];
}

Order.prototype.add = function(coffeeToAdd){
	this.coffeeList.push(coffeeToAdd);
	return this;
};

Order.prototype.total = function(){
	return this.coffeeList.reduce(function (sum, coffee) { return sum += coffee.getPrice(); }, 0);
};

Order.prototype.gst = function(){
	return this.coffeeList.length === 0 ? 0 : this.coffeeList.reduce(function (sum, coffee) { return sum += coffee.getPrice(); }, 0) / 10;
};

module.exports = Order;