var Stats = /** @class */ (function () {
    function Stats() {
        this.inputs_elements = [];
        this.getElements();
        this.bindNumberOfInputs();
    }
    Stats.prototype.getElements = function () {
        this.number_of_inputs_element = document.querySelector("#number_of_inputs");
        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
        this.avg = document.querySelector("#avg");
        this.sum = document.querySelector("#sum");
    };
    Stats.prototype.bindNumberOfInputs = function () {
        var _this = this;
        this.number_of_inputs_element.addEventListener("input", function () {
            _this.number_of_inputs = parseInt(_this.number_of_inputs_element.value);
            _this.pushInputsToTable(_this.number_of_inputs);
        });
    };
    Stats.prototype.pushInputsToTable = function (number_of_inputs) {
        for (var i = 0; i < number_of_inputs; i++) {
            var input = document.createElement("input");
            this.inputs_elements.push(input);
        }
        this.generateInputs();
    };
    Stats.prototype.generateInputs = function () {
        var body = document.querySelector("body");
        this.inputs_elements.forEach(function (input) {
            body.appendChild(input);
        });
        this.bindEvent();
    };
    Stats.prototype.bindEvent = function () {
        var _this = this;
        this.inputs_elements.forEach(function (input) {
            input.addEventListener("input", function () { return _this.calculateData(); });
        });
    };
    Stats.prototype.calculateData = function () {
        var max = Math.max(parseInt(this.number_of_inputs_element.value));
        var min = Math.min(parseInt(this.number_of_inputs_element.value));
        var avg = 0;
        var sum = 0;
        this.inputs_elements.forEach(function (input) {
            sum += +input.value;
            if (+input.value > max)
                max = +input.value;
            if (+input.value < min)
                min = +input.value;
        });
        avg = sum / this.number_of_inputs;
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
