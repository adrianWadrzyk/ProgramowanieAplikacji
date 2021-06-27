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
        this.cancelButton.addEventListener("click", (e) => {
            this.optionWrapper.style.display = "none";
            const buttonEdit = document.getElementById("editNote");
            buttonEdit.style.display = "none";
        })

        this.addNoteButton.addEventListener("click", (e) => { 
            this.optionWrapper.style.display = "flex";
        })
    }
}