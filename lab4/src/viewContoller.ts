export class Controler { 
    cancelButton : HTMLElement;
    addNoteButton : HTMLElement;
    optionWrapper : HTMLElement;

    constructor() {
      this.cancelButton = document.querySelector("#cancel");
      this.optionWrapper = document.querySelector(".optionWrapper");
      this.addNoteButton = document.querySelector("#addNote");
    }

    bindButtons() { 
        this.cancelButton.addEventListener("click", () => {
            this.optionWrapper.style.display = "none";
        })

        this.addNoteButton.addEventListener("click", () => { 
            this.optionWrapper.style.display = "flex";
        })
    }
}