// Função para baixar o currículo em PDF
function printpdf() {
    const content = document.getElementById("resume");
    html2pdf(content, {
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}

// Função para resetar todos os campos
function resetAll() {
    if (confirm("Tem certeza que deseja resetar o currículo?")) {
        document.querySelectorAll('[contenteditable="true"]').forEach(field => {
            field.textContent = "";
        });
        document.getElementById("profile-image").src = "https://via.placeholder.com/100";
    }
}

// Upload de imagem de perfil
document.getElementById("profile-upload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile-image").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Arrastar e soltar para upload de imagem
const profileImageContainer = document.querySelector(".profile-image-container");
profileImageContainer.addEventListener("dragover", (event) => {
    event.preventDefault();
    profileImageContainer.style.border = "2px dashed #1abc9c";
});

profileImageContainer.addEventListener("dragleave", () => {
    profileImageContainer.style.border = "none";
});

profileImageContainer.addEventListener("drop", (event) => {
    event.preventDefault();
    profileImageContainer.style.border = "none";
    const file = event.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile-image").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});