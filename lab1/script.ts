class Stats { 
    number_of_inputs_element:HTMLInputElement;
    min: HTMLInputElement;
    max: HTMLInputElement;
    avg: HTMLInputElement;
    sum: HTMLInputElement;

    number_of_inputs: number;
    inputs_elements : Array<HTMLInputElement> = [];
    deleteButton: HTMLElement;

    constructor() { 
        this.getElements();
        this.bindNumberOfInputs();
    }

    getElements() { 
        this.number_of_inputs_element = document.querySelector("#number_of_inputs");
        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
        this.avg = document.querySelector("#avg");
        this.sum = document.querySelector("#sum");
    }

    bindNumberOfInputs() { 
        this.number_of_inputs_element.addEventListener("input", () => {
            this.number_of_inputs = parseInt(this.number_of_inputs_element.value);
            this.pushInputsToTable(this.number_of_inputs);
        })
    }

    pushInputsToTable(number_of_inputs : number) { 
        this.inputs_elements = []; // clear table
        for(let i = 0; i < number_of_inputs; i++) { 
            let input = document.createElement("input");
            this.inputs_elements.push(input);
        }
        this.generateInputsAndCheckbo();
    }

    generateInputsAndCheckbo() { 
        let conteiner = document.querySelector("#conteiner");
        conteiner.innerHTML = ""; // clear conteiner
        this.inputs_elements.forEach((input, index) => {
            let div = document.createElement("div");
            conteiner.appendChild(div);
            input.id = "input"+index.toString(); 
            div.appendChild(input);
            input.value = index.toString();
            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.value = index.toString();
            input.before(checkBox);
        });

        this.bindEvent();
    }

    bindEvent() { 
        this.inputs_elements.forEach(input => {
            input.addEventListener("input", () => this.calculateData())
        });

        this.deleteButton = document.querySelector("#delete");
        this.deleteButton.addEventListener("click", () => this.deleteInput());
    }

    calculateData() { 
        let max : number = Math.max(parseInt(this.number_of_inputs_element.value));
        let min : number = Math.min(parseInt(this.number_of_inputs_element.value));
        let avg : number = 0;
        let sum : number = 0;
        this.inputs_elements.forEach(input => { 
            sum += +input.value;
            if(+input.value > max) 
                max = +input.value
            if(+input.value < min) 
                min = +input.value
        }) 
        avg = sum / this.number_of_inputs;
        this.showStats(sum, min, max, avg);
    }

    showStats(sum: number, min: number, max: number, avg: number) { 
        this.max.value = max.toString();
        this.min.value = min.toString();
        this.avg.value = avg.toString();
        this.sum.value = sum.toString();
    }

    deleteInput() { 
        let checked : Array<number> = this.getChecked();
        checked.forEach((index:number) => {
            let elementToDelete = document.querySelector(`#input${index}`);
            elementToDelete.remove();
        });
    }

    getChecked() : Array<number>  {
        const indexses: Array<number> = [];
        const checked = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked');
        checked.forEach(checkbox => { 
            checkbox.remove();
            indexses.push(parseInt(checkbox.value));
        })

        return indexses;
    }
}

var stats = new Stats();