describe("Coffee", function() {
	var Coffee = require('../src/Coffee');

	var coffee;

	beforeEach(function() {
		coffee = new Coffee();
	});

	it("should be at a default price of $3.50", function() {
		expect(coffee.getPrice()).toEqual(3.5);
	});

	it("should add 50c when soy is added", function() {
		coffee.addSoy();
		expect(coffee.getPrice()).toEqual(4);
	});

	it("should be a large coffee if it is not espresso", function() {
		coffee.makeLarge();
		expect(coffee.getPrice()).toEqual(4);
	});

	it("should be an espresso", function() {
		coffee.makeEspresso();
		expect(coffee.getPrice()).toEqual(3);
	});

	describe("makeLarge() on an espresso coffee", function() {
		it("should throw an exception to make a large coffee if the coffee was an espresso", function() {
			coffee.makeEspresso();
			expect(function () { coffee.makeLarge() }).toThrowError(Error, "cannot make large if the coffee is espresso");
		});
	});	
});