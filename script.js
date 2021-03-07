alert("work");
var Stats = /** @class */ (function () {
    function Stats() {
        this.getElements();
        this.bindEvent();
    }
    Stats.prototype.getElements = function () {
        this.data1 = document.getElementById("data1");
        this.data2 = document.getElementById("data2");
        this.data3 = document.getElementById("data3");
        this.data4 = document.getElementById("data4");
        this.min = document.getElementById("min");
        this.max = document.getElementById("max");
        this.avg = document.getElementById("avg");
        this.sum = document.getElementById("sum");
    };
    Stats.prototype.bindEvent = function () {
        var _this = this;
        this.data1.addEventListener("input", function () { return _this.calculateAndShow(); });
        this.data2.addEventListener("input", function () { return _this.calculateAndShow(); });
        this.data3.addEventListener("input", function () { return _this.calculateAndShow(); });
        this.data4.addEventListener("input", function () { return _this.calculateAndShow(); });
    };
    Stats.prototype.calculateAndShow = function () {
        var val1 = +this.data1.innerText;
        var val2 = +this.data2.innerText;
        var val3 = +this.data3.innerText;
        var val4 = +this.data4.innerText;
        console.log(val1);
        this.sum = val1 + val2 + val3 + val4;
    };
    return Stats;
}());
var stats = new Stats;
