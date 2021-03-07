class Stats { 
    data1;
    data2;
    data3;
    data4;

    min;
    max;
    avg;
    sum;

    getElements() { 
        this.data1 = document.getElementById("data1");
        this.data2 = document.getElementById("data2");
        this.data3 = document.getElementById("data3");
        this.data4 = document.getElementById("data4");

        this.min = document.getElementById("min");
        this.max = document.getElementById("max");
        this.avg = document.getElementById("avg");
        this.sum = document.getElementById("sum");
    }

    bindEvent() { 
        this.data1.addEventListener("click", () => console.log("hello") );
    }
}