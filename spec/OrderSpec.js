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

	describe("Applying vouchers to orders", function() {
		it("should apply a 10% voucher", function() {
			order.addTenPercentOffVoucher();

			expect(order.hasTenPercentOffVoucherApplied()).toBe(true);
		});

		it("should apply a 2 for 1 voucher", function() {
			order.addTwoForOneVoucher();
			expect(order.hasTwoForOneVoucherApplied()).toBe(true);
		});

		it("should apply a 10% voucher while the other voucher is removed", function() {
			order.addTwoForOneVoucher();
			order.addTenPercentOffVoucher();

			expect(order.hasTenPercentOffVoucherApplied()).toBe(true);
		});

		it("should apply a 2 for 1 voucher while the other voucher is removed", function() {
			order.addTenPercentOffVoucher();
			order.addTwoForOneVoucher();

			expect(order.hasTwoForOneVoucherApplied()).toBe(true);
		});

		it("should apply a 10% discount on the total order", function() {
			var largeCappuccino = new Coffee();
			var soyFlatWhite = new Coffee();

			largeCappuccino.makeLarge();
			soyFlatWhite.addSoy();

			order.add(largeCappuccino).add(soyFlatWhite);
			order.addTenPercentOffVoucher();

			expect(order.hasTenPercentOffVoucherApplied()).toBe(true);

			expect(order.total()).toEqual(7.20);
			expect(order.gst()).toEqual(0.72);
		});

		it("should apply a 2 for 1 voucher on the total order (i.e. only the cheapest coffee is not considered)", function() {
			var largeCappuccino = new Coffee();
			var flatWhite = new Coffee();

			largeCappuccino.makeLarge();

			order.add(largeCappuccino).add(flatWhite);
			order.addTwoForOneVoucher();

			expect(order.hasTwoForOneVoucherApplied()).toBe(true);

			expect(order.total()).toEqual(4);
			expect(order.gst()).toEqual(0.4);
		});

		it("should throw an exception if a 2 and 1 voucher is applied, however the number of coffees on the order is 1", function() {
			order.add(coffee);
			order.addTwoForOneVoucher();
			expect(function () { order.total() }).toThrowError(Error, "cannot apply two for one voucher if the number of coffees ordered is not 2");
		});

		it("should throw an exception if a 2 and 1 voucher is applied, however the number of coffees on the order is more than 2", function() {
			var cappuccino = new Coffee();
			var flatWhite = new Coffee();

			order.add(coffee).add(cappuccino).add(flatWhite);
			order.addTwoForOneVoucher();
			expect(function () { order.total() }).toThrowError(Error, "cannot apply two for one voucher if the number of coffees ordered is not 2");
		});
	});
});