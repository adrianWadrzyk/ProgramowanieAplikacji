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
        this.inputs_elements = [];
        for (var i = 0; i < number_of_inputs; i++) {
            var input = document.createElement("input");
            this.inputs_elements.push(input);
        }
        this.generateInputsAndCheckbo();
    };
    Stats.prototype.generateInputsAndCheckbo = function () {
        var conteiner = document.querySelector("#conteiner");
        conteiner.innerHTML = "";
        this.inputs_elements.forEach(function (input, index) {
            input.id = "input" + index.toString();
            conteiner.appendChild(input);
            input.value = index.toString();
            var checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.value = index.toString();
            input.after(checkBox);
        });
        this.bindEvent();
    };
    Stats.prototype.bindEvent = function () {
        var _this = this;
        this.inputs_elements.forEach(function (input) {
            input.addEventListener("input", function () { return _this.calculateData(); });
        });
        this.deleteButton = document.querySelector("#delete");
        this.deleteButton.addEventListener("click", function () { return _this.deleteInput(); });
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
    Stats.prototype.deleteInput = function () {
        var checked = this.getChecked();
        checked.forEach(function (index) {
            var elementToDelete = document.querySelector("#input" + index);
            elementToDelete.remove();
        });
    };
    Stats.prototype.getChecked = function () {
        var indexses = [];
        var checked = document.querySelectorAll('input[type="checkbox"]:checked');
        checked.forEach(function (checkbox) {
            checkbox.remove();
            indexses.push(parseInt(checkbox.value));
        });
        return indexses;
    };
    return Stats;
}());
var stats = new Stats();
