class Stats { 
    data1: HTMLInputElement;
    data2: HTMLInputElement;
    data3: HTMLInputElement;
    data4: HTMLInputElement;

    min: HTMLInputElement;
    max: HTMLInputElement;
    avg: HTMLInputElement;
    sum: HTMLInputElement;

    constructor() { 
        this.getElements();
        this.bindEvent();
    }

    getElements() { 
        this.data1 = document.querySelector("#data1");
        this.data2 = document.querySelector("#data2");
        this.data3 = document.querySelector("#data3");
        this.data4 = document.querySelector("#data4");

        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
        this.avg = document.querySelector("#avg");
        this.sum = document.querySelector("#sum");
    }

    bindEvent() { 
        this.data1.addEventListener("input", () => this.calculateData() );
        this.data2.addEventListener("input", () => this.calculateData() );
        this.data3.addEventListener("input", () => this.calculateData() );
        this.data4.addEventListener("input", () => this.calculateData() );
    }

    calculateData() { 
        var val1:number = +this.data1.value;
        var val2:number = +this.data2.value;
        var val3:number = +this.data3.value;
        var val4:number = +this.data4.value;
        const sum = val1 + val2 + val3 + val4;
        const avg = sum/4;
        const min = Math.min(val1, val2, val3, val4);
        const max = Math.max(val1, val2, val3, val4);

        this.showStats(sum, min,max, avg);
    }

    showStats(sum: number, min: number, max: number, avg: number) { 
        this.max.value = max.toString();
        this.min.value = min.toString();
        this.avg.value = avg.toString();
        this.sum.value = sum.toString();
    }
}

var stats = new Stats();