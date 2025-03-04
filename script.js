
function printpdf() {
    var content = document.getElementById("resume");

    const allButtons = document.querySelectorAll("#print button");
    allButtons.forEach(button => {
        button.style.display = "none";
    });

    let allInputCheckboxes = document.querySelectorAll(".input-checkbox");
    allInputCheckboxes.forEach(input => {
        input.style.display = "none";
    });


    html2pdf(content, {
        html2canvas: { scale: 1, logging: true, dpi: 500 },
        pagebreak: { mode: 'avoid-all' }
    }).then(() => {
        allButtons.forEach(button => {
            button.style.display = "inline-block";
        });
        allInputCheckboxes.forEach(input => {
            input.style.display = "inline-block";
        });
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



function addedu() {
  const head = document.createElement('div');
  document.getElementById("education").appendChild(head);
  head.innerHTML = ('<div class="edublock"><span><input type="checkbox" class="input-checkbox"></span><span class="education-head" contenteditable="true">SEU DIPLOMA</span><div ><span contenteditable="true">Nome da Instituição</span> - <span contenteditable="true">Ano</span></div></div>');
  saveresume();
}
function remedu(event) {
  let val = 0;
  let empty = true;
  const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
      alert("Não há nada para deletar!")
  }
  else {
      console.log(array);
      array.forEach(element => {
          if (element.checked === true) {
              val = 1;
              element.parentElement.parentElement.remove();
          }
      })
      if (val === 0) alert("Por favor, marque as caixas de seleção para excluir o campo obrigatório!")
  }
  saveresume();
}


function addskill() {
  const head = document.createElement('div');
  document.getElementById("skills").appendChild(head);
  head.innerHTML = ('<div class="skill"><span><input type="checkbox" class="input-checkbox"></span><span><i class="fas fa-chevron-circle-right"></i></span>&nbsp&nbsp&nbsp<span contenteditable="true">Sua expêriencia aqui</span></div>');
  saveresume();
}

function remskill(event) {
  let val = 0;
  const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
      alert("Não há nada para deletar!")
  }
  else {
      console.log(array);
      array.forEach(element => {
          if (element.checked === true) {
              val = 1;
              element.parentElement.parentElement.remove();
          }
      })
      if (val === 0) alert("Por favor, marque as caixas de seleção para excluir o campo obrigatório!")
  }
  saveresume();
}


function addLang() {
  const head = document.createElement('div');
  document.getElementById("languages").appendChild(head);
  head.innerHTML = ('<div class="language"><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Suas Skills</span>&nbsp-&nbsp<span contenteditable="true">Nível</span></div>');
  saveresume();
}
function remLang(event) {
  let val = 0;
  const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
      alert("Não há nada para deletar!")
  }
  else {
      console.log(array);
      array.forEach(element => {
          if (element.checked === true) {
              val = 1;
              element.parentElement.parentElement.remove();
          }
      })
      if (val === 0) alert("Por favor, marque as caixas de seleção para excluir o campo obrigatório!")
  }
  saveresume();
}


function addAch() {
  const head = document.createElement('div');
  document.getElementById("achievement").appendChild(head);
  head.innerHTML = ('<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Escreva seus Projetos</span></div>');
  saveresume();
}
function remAch(event) {
  let val = 0;
  const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
      alert("Não há nada para deletar!")
  }
  else {
      console.log(array);
      array.forEach(element => {
          if (element.checked === true) {
              val = 1;
              element.parentElement.parentElement.remove();
          }
      })
      if (val === 0) alert("Por favor, marque as caixas de seleção para excluir o campo obrigatório!")
  }
  saveresume();
}


function addInt() {
  const head = document.createElement('div');
  document.getElementById("interest").appendChild(head);
  head.innerHTML = ('<div class="achieve" ><span><input type="checkbox" class="input-checkbox"></span><span contenteditable="true">Seus Idiomas</span></div>');
  saveresume();
}
function remInt(event) {
  let val = 0;
  const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
      alert("Não há nada para deletar!")
  }
  else {
      array.forEach(element => {
          if (element.checked === true) {
              val = 1;
              element.parentElement.parentElement.remove();
          }
      })
      if (val === 0) alert("Por favor, marque as caixas de seleção para excluir o campo obrigatório!")
  }
  saveresume();
}

let maxNewSection = 1;
function addsec() {
  if (maxNewSection < 3) {
      const head = document.createElement('div');
      document.getElementById("newsec").appendChild(head);
      if (maxNewSection === 1) {
          head.innerHTML = ('<div><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">Qualificações Profissionais</span><br><br><div contenteditable="true">Nesta seção, detalhe suas qualificações profissionais, certificações e cursos relevantes.</div></div>');
      }
      else {
          head.innerHTML = ('<div><br><br><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">Qualificações Profissionais</span><br><br><div contenteditable="true">Nesta seção, detalhe suas qualificações profissionais, certificações e cursos relevantes.</div></div>');
      }

      maxNewSection = maxNewSection + 1;
  }
  else {
      alert("Somente três novos tópicos podem ser adicionados!")

  }
  saveresume();
}
function remsec(event) {
  let val = 0;
  const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
  const array = Array.from(allInputCheckboxes);
  if (array.length === 0) {
      alert("Não há nada para deletar!")
  }
  else {
      console.log(array);
      array.forEach(element => {
          if (element.checked === true) {
              val = 1;
              maxNewSection = maxNewSection - 1;
              element.parentElement.parentElement.remove();
          }
      })
      if (val === 0) alert("Por favor, marque as caixas de seleção para excluir o campo obrigatório!")
  }
  saveresume();
}

function saveresume() {
  var sec = document.getElementById("print");
  value1 = sec.innerHTML;
  var info = document.getElementById("custinfo");
  info.value = value1;
}


function isMobile() {
    return window.innerWidth <= 768; 
}

function updateMobileView() {
    if (isMobile()) {
        document.querySelectorAll(".input-checkbox").forEach(input => {
            input.style.width = "20px"; 
            input.style.height = "20px";
        });

        document.querySelectorAll("#print button").forEach(button => {
            button.style.fontSize = "14px"; 
            button.style.padding = "8px";  
        });

        document.getElementById("resume").style.fontSize = "14px";
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


window.addEventListener("load", updateMobileView);
window.addEventListener("resize", updateMobileView);


function adjustForPrint() {
    document.querySelectorAll("h2, h3").forEach(title => {
        let nextElement = title.nextElementSibling;
        
        if (nextElement && nextElement.getBoundingClientRect().top - title.getBoundingClientRect().bottom < 50) {
            title.classList.add("new-page");
        }
    });
}

// Função para recarregar a página
function reloadPage() {
     // Exibe a caixa de confirmação
     const userConfirmed = confirm("Você tem certeza que deseja apagar tudo? Esta ação não pode ser desfeita.");

     if (userConfirmed) {
       // O usuário confirmou, então apaga tudo
       window.location.reload();
       } else {
        // O usuário cancelou a ação
        alert("Ação cancelada. Nenhum dado foi apagado.");
      }
    
  }
  
  // Adiciona um evento de clique ao botão
  document.getElementById("reloadButton").addEventListener("click", reloadPage);


  function saveToLocalStorage() {
    // Seleciona o elemento principal que contém todos os dados
    const resumeContent = document.getElementById("resume");
  
    // Salva o HTML interno do elemento no localStorage
    localStorage.setItem("resumeData", resumeContent.innerHTML);
  
    // Exibe uma mensagem de sucesso (opcional)
    alert("Dados salvos com sucesso!");
  }

  function loadFromLocalStorage() {
    const savedData = localStorage.getItem("resumeData");
  
    if (!savedData) {
      // Se não houver dados no localStorage, exibe um alerta
      alert("Não há dados salvos no LocalStorage!");
      return; // Sai da função e não faz mais nada
    }
  
    // Se houver dados, carrega-os na página
    const resumeContent = document.getElementById("resume");
    resumeContent.innerHTML = savedData;
  
    // Aplica formatações adicionais, se necessário
    applyDefaultFormatting();
  
    alert("Dados recuperados com sucesso!");
  }
  
  // Função para garantir que a formatação padrão seja aplicada
  function applyDefaultFormatting() {
    // Certifique-se de que todos os elementos tenham as classes e estilos corretos
    document.querySelectorAll(".input-checkbox").forEach(input => {
      input.style.display = "inline-block"; // Exemplo de ajuste de estilo
    });
  
    // Adicione quaisquer outras correções de formatação aqui
  }

  function toggleMenu() {
    const mobileNav = document.getElementById("mobileNav");
    mobileNav.classList.toggle("active");
}

document.addEventListener("click", function(event) {
    const mobileNav = document.getElementById("mobileNav");
    const hamburgerMenu = document.querySelector(".hamburger-menu");

    if (!hamburgerMenu.contains(event.target) && !mobileNav.contains(event.target)) {
        mobileNav.classList.remove("active");
    }
});

window.addEventListener("load", adjustForPrint);
