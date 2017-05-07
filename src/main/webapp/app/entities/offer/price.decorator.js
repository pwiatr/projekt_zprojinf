var PriceDecorator = (function () {
    var Price = function(price) {
        this.price = price;
        this.discounts = [];
        this.decorators_list = [];
    }

    Price.decorators = {};

    Price.prototype.decorate = function (decorator) {
        this.decorators_list.push(decorator);
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
