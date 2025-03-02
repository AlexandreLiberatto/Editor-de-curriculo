function printpdf() {
    const content = document.getElementById("resume");
    html2pdf(content, {
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const expContainer = document.getElementById("experience");
    const addExpBtn = document.getElementById("expadd");
    const remExpBtn = document.getElementById("exprem");

    addExpBtn.addEventListener("click", function () {
        let newExp = document.createElement("div");
        newExp.classList.add("expblock");
        newExp.innerHTML = `
            <span><input type="checkbox" class="input-checkbox"></span>
            <span class="experience-head" contenteditable="true"><b>SEU CARGO</b></span>
            <div><span contenteditable="true">Nome da Empresa</span> - <span contenteditable="true">Ano</span></div>
        `;
        expContainer.appendChild(newExp);
    });

    remExpBtn.addEventListener("click", function () {
        if (expContainer.children.length > 1) {
            expContainer.removeChild(expContainer.lastElementChild);
        }
    });
});
