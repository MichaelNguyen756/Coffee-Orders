function Order() {
	this.coffeeList = [];
}

Order.prototype.add = function(coffeeToAdd){
	this.coffeeList.push(coffeeToAdd);
	return this;
};

Order.prototype.total = function(){
	var total = this.coffeeList.reduce(function (sum, coffee) { return sum += coffee.getPrice(); }, 0);

	if(this.isTwoForOneVoucherApplied && this.coffeeList.length != 2)
		throw new Error("cannot apply two for one voucher if the number of coffees ordered is not 2");
	if(this.isTwoForOneVoucherApplied && this.coffeeList.length == 2)
		return Math.max(this.coffeeList[0].getPrice(), this.coffeeList[1].getPrice());
	else if(this.isTenPercentOffVoucherApplied)
		return total * 0.9;
	else
		return total;
};

Order.prototype.gst = function(){
	return this.coffeeList.length === 0 ? 0 : this.total() / 10;
};

Order.prototype.addTenPercentOffVoucher = function(){
	this.isTenPercentOffVoucherApplied = true;
	this.isTwoForOneVoucherApplied = false;
};

Order.prototype.addTwoForOneVoucher = function(){
	this.isTenPercentOffVoucherApplied = false;
	this.isTwoForOneVoucherApplied = true;
};

Order.prototype.hasTenPercentOffVoucherApplied = function(){
	return this.isTenPercentOffVoucherApplied;
};

Order.prototype.hasTwoForOneVoucherApplied = function(){
	return this.isTwoForOneVoucherApplied;
};

module.exports = Order;