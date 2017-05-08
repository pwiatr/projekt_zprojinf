var PriceDecorator = (function () {
    var Price = function(price) {
        this.price = price;
        this.discounts = [];
        this.decorators_list = [];
    }

    Price.decorators = {};

    Price.decorators.handicapped = {
        value: "5%",
        getPrice: function (price) {
            return price + price * 5 / 100;
        }
    };

    Price.prototype.decorate = function (decorator) {
        this.decorators_list.push(decorator);
    }

    Price.prototype.getDiscounts = function() {
        var discounts = this.discounts,
            i,
            max = this.decorators_list.length,
            name;

        for (i = 0; i < max; i += 1) {
            name = this.decorators_list[i];
            discounts.push(Price.decorators[name].value);
        }
        return price;
    }

    Price.prototype.getPrice = function () {
        var price = this.price,
            i,
            max = this.decorators_list.length,
            name;

        for (i = 0; i < max; i += 1) {
            name = this.decorators_list[i];
            price = Price.decorators[name].getPrice(price);
        }
        return price;
    }

    return Price;
})();
