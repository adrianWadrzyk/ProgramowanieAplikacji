var Stats = /** @class */ (function () {
    function Stats() {
        this.getElements();
        this.bindEvent();
    }
    Stats.prototype.getElements = function () {
        this.data1 = document.querySelector("#data1");
        this.data2 = document.querySelector("#data2");
        this.data3 = document.querySelector("#data3");
        this.data4 = document.querySelector("#data4");
        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
        this.avg = document.querySelector("#avg");
        this.sum = document.querySelector("#sum");
    };
    Stats.prototype.bindEvent = function () {
        var _this = this;
        this.data1.addEventListener("input", function () { return _this.calculateData(); });
        this.data2.addEventListener("input", function () { return _this.calculateData(); });
        this.data3.addEventListener("input", function () { return _this.calculateData(); });
        this.data4.addEventListener("input", function () { return _this.calculateData(); });
    };
    Stats.prototype.calculateData = function () {
        var val1 = +this.data1.value;
        var val2 = +this.data2.value;
        var val3 = +this.data3.value;
        var val4 = +this.data4.value;
        console.log(val1);
        var sum = val1 + val2 + val3 + val4;
        var avg = sum / 4;
        var min = Math.min(val1, val2, val3, val4);
        var max = Math.max(val1, val2, val3, val4);
        this.showStats(sum, min, max, avg);
    };
    Stats.prototype.showStats = function (sum, min, max, avg) {
        this.max.value = max.toString();
        this.min.value = min.toString();
        this.avg.value = avg.toString();
        this.sum.value = sum.toString();
    };
    return Stats;
}());
var stats = new Stats();
