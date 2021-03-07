class Stats { 
    data1: HTMLInputElement;
    data2;
    data3;
    data4;

    min;
    max;
    avg;
    sum;

    constructor() { 
        this.getElements();
        this.bindEvent();
    }

    getElements() { 
        this.data1 = document.getElementById("data1").value;
        this.data2 = document.getElementById("data2");
        this.data3 = document.getElementById("data3");
        this.data4 = document.getElementById("data4");

        this.min = document.getElementById("min");
        this.max = document.getElementById("max");
        this.avg = document.getElementById("avg");
        this.sum = document.getElementById("sum");
    }

    bindEvent() { 
        this.data1.addEventListener("input", () => this.calculateAndShow() );
        this.data2.addEventListener("input", () => this.calculateAndShow() );
        this.data3.addEventListener("input", () => this.calculateAndShow() );
        this.data4.addEventListener("input", () => this.calculateAndShow() );
    }

    calculateAndShow() { 
        var val1:number = +this.data1.innerText;
        var val2:number = +this.data2.innerText;
        var val3:number = +this.data3.innerText;
        var val4:number = +this.data4.innerText;
        console.log(val1);
        this.sum = val1+val2+val3+val4;
    }
}

var stats = new Stats;