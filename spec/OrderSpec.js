describe("Order", function() {
	var Coffee = require('../src/Coffee');
	var Order = require('../src/Order');

	var coffee;
	var order;

	beforeEach(function() {
		coffee = new Coffee();
		order = new Order();
	});

	it("should be at a default price of $0", function() {
		expect(order.total()).toEqual(0);
	});

	it("should return a GST of $0 if there are no coffees", function() {
		expect(order.gst()).toEqual(0);
	});

	it("should contain two normal coffees and the total and gst are correct", function() {
		order.add(new Coffee());
		order.add(new Coffee());

		expect(order.total()).toEqual(7);
		expect(order.gst()).toEqual(7/10);
	});

	it("should contain an espresso, large capuccino, soy flat white, and capuccino, and the total and gst are correct", function() {
		var espresso = new Coffee();
		var largeCappuccino = new Coffee();
		var soyFlatWhite = new Coffee();
		var cappuccino = new Coffee();

		espresso.makeEspresso();
		largeCappuccino.makeLarge();
		soyFlatWhite.addSoy();

		order.add(espresso);
		order.add(largeCappuccino);
		order.add(soyFlatWhite);
		order.add(cappuccino);

		expect(order.total()).toEqual(14.50);
		expect(order.gst()).toEqual(14.50/10);
	});

	describe("test order chaining", function() {
		it("should chain multiple orders together, with the total and gst are correct", function() {
			var espresso = new Coffee();
			var largeCappuccino = new Coffee();
			var soyFlatWhite = new Coffee();
			var cappuccino = new Coffee();

			espresso.makeEspresso();
			largeCappuccino.makeLarge();
			soyFlatWhite.addSoy();

			order.add(espresso).add(largeCappuccino).add(soyFlatWhite).add(cappuccino);

			expect(order.total()).toEqual(14.50);
			expect(order.gst()).toEqual(14.50/10);
		});
	});
});