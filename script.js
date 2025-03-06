
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
        mostrarAlertaPersonalizado("✅ PDF Gerado!", "O PDF foi criado com sucesso!");
    }).catch(() => {
        mostrarAlertaPersonalizado("⚠️ Erro!", "Ocorreu um erro ao gerar o PDF. Tente novamente.");
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
        mostrarAlertaPersonalizado("⚠️ Ops!", "Não há nada para deletar!");
    } else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        });
        if (val === 0) {
            mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, marque as caixas de seleção para excluir o campo obrigatório!");
        } else {
            mostrarAlertaPersonalizado("✅ Sucesso!", "Itens removidos com sucesso!");
        }
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
        mostrarAlertaPersonalizado("⚠️ Ops!", "Não há nada para deletar!");
    } else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        });
        if (val === 0) {
            mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, marque as caixas de seleção para excluir o campo obrigatório!");
        } else {
            mostrarAlertaPersonalizado("✅ Sucesso!", "Habilidades removidas com sucesso!");
        }
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
        mostrarAlertaPersonalizado("⚠️ Ops!", "Não há nada para deletar!");
    } else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        });
        if (val === 0) {
            mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, marque as caixas de seleção para excluir o campo obrigatório!");
        } else {
            mostrarAlertaPersonalizado("✅ Sucesso!", "Idiomas removidos com sucesso!");
        }
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
        mostrarAlertaPersonalizado("⚠️ Ops!", "Não há nada para deletar!");
    } else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        });
        if (val === 0) {
            mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, marque as caixas de seleção para excluir o campo obrigatório!");
        } else {
            mostrarAlertaPersonalizado("✅ Sucesso!", "Conquistas removidas com sucesso!");
        }
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
        mostrarAlertaPersonalizado("⚠️ Ops!", "Não há nada para deletar!");
    } else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                element.parentElement.parentElement.remove();
            }
        });
        if (val === 0) {
            mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, marque as caixas de seleção para excluir o campo obrigatório!");
        } else {
            mostrarAlertaPersonalizado("✅ Sucesso!", "Interesses removidos com sucesso!");
        }
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
        } else {
            head.innerHTML = ('<div><br><br><span><input type="checkbox" class="input-checkbox"></span><span class="title" contenteditable="true">Qualificações Profissionais</span><br><br><div contenteditable="true">Nesta seção, detalhe suas qualificações profissionais, certificações e cursos relevantes.</div></div>');
        }
        maxNewSection = maxNewSection + 1;
    } else {
        mostrarAlertaPersonalizado("⚠️ Atenção!", "Somente três novos tópicos podem ser adicionados!");
    }
    saveresume();
}

function remsec(event) {
    let val = 0;
    const allInputCheckboxes = event.target.parentElement.getElementsByClassName("input-checkbox");
    const array = Array.from(allInputCheckboxes);
    if (array.length === 0) {
        mostrarAlertaPersonalizado("⚠️ Ops!", "Não há nada para deletar!");
    } else {
        array.forEach(element => {
            if (element.checked === true) {
                val = 1;
                maxNewSection = maxNewSection - 1;
                element.parentElement.parentElement.remove();
            }
        });
        if (val === 0) {
            mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, marque as caixas de seleção para excluir o campo obrigatório!");
        } else {
            mostrarAlertaPersonalizado("✅ Sucesso!", "Seção removida com sucesso!");
        }
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
async function reloadPage() {
    if (!haModificacoes()) {
        // Se não houver modificações, exibe a mensagem
        await alertaPersonalizadoComOpcaoDeCancelar("⚠️ Atenção!", "Não há nada para apagar.");
        return;
    }

    // Se houver modificações, exibe a confirmação
    const userConfirmed = await alertaPersonalizadoComOpcaoDeCancelar(
        "⚠️ Atenção!",
        "Você tem certeza que deseja apagar tudo? Esta ação não pode ser desfeita."
    );

    if (userConfirmed) {
        // O usuário confirmou, então recarrega a página
        window.location.reload();
    } else {
        // O usuário cancelou a ação
        await mostrarAlertaPersonalizado("Ação cancelada!", "Nenhum dado foi apagado.");
    }
}
  
  // Adiciona um evento de clique ao botão
  document.getElementById("reloadButton").addEventListener("click", reloadPage);


  function saveToLocalStorage() {
    const resumeContent = document.getElementById("resume");
    localStorage.setItem("resumeData", resumeContent.innerHTML);
    mostrarAlertaPersonalizado("✅ Sucesso!", "Dados salvos com sucesso!");
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem("resumeData");
    if (!savedData) {
        mostrarAlertaPersonalizado("⚠️ Atenção!", "Não há dados salvos no LocalStorage!");
        return;
    }
    const resumeContent = document.getElementById("resume");
    resumeContent.innerHTML = savedData;
    applyDefaultFormatting();
    mostrarAlertaPersonalizado("✅ Sucesso!", "Dados recuperados com sucesso!");
}

  // Função para garantir que a formatação padrão seja aplicada
  function applyDefaultFormatting() {
    // Certifique-se de que todos os elementos tenham as classes e estilos corretos
    document.querySelectorAll(".input-checkbox").forEach(input => {
      input.style.display = "inline-block"; // Exemplo de ajuste de estilo
    });
  
    // Adicione quaisquer outras correções de formatação aqui
  }
//============= Menu Hamburguer ============
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
//============= Menu Hamburguer ============


//=========== Alçerta Personalizado =============

function mostrarAlertaPersonalizado(titulo, mensagem) {
    // Cria o overlay (fundo escurecido)
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // Cria a caixa do alerta
    const alertaBox = document.createElement('div');
    alertaBox.style.backgroundColor = '#fff';
    alertaBox.style.padding = '20px';
    alertaBox.style.borderRadius = '10px';
    alertaBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    alertaBox.style.maxWidth = '400px';
    alertaBox.style.width = '100%';
    alertaBox.style.textAlign = 'center';

    // Cria o título
    const tituloElemento = document.createElement('h2');
    tituloElemento.textContent = titulo;
    tituloElemento.style.marginTop = '0';
    tituloElemento.style.fontSize = '24px';
    tituloElemento.style.color = '#333';

    // Cria a mensagem
    const mensagemElemento = document.createElement('p');
    mensagemElemento.textContent = mensagem;
    mensagemElemento.style.fontSize = '16px';
    mensagemElemento.style.color = '#666';
    mensagemElemento.style.margin = '20px 0';

    // Cria o botão de fechar
    const botaoFechar = document.createElement('button');
    botaoFechar.textContent = 'Fechar';
    botaoFechar.style.backgroundColor = '#007bff';
    botaoFechar.style.color = '#fff';
    botaoFechar.style.border = 'none';
    botaoFechar.style.padding = '10px 20px';
    botaoFechar.style.borderRadius = '5px';
    botaoFechar.style.cursor = 'pointer';
    botaoFechar.style.fontSize = '16px';
    botaoFechar.onclick = function () {
        document.body.removeChild(overlay); // Remove o alerta ao clicar no botão
    };

    // Adiciona os elementos à caixa do alerta
    alertaBox.appendChild(tituloElemento);
    alertaBox.appendChild(mensagemElemento);
    alertaBox.appendChild(botaoFechar);

    // Adiciona a caixa do alerta ao overlay
    overlay.appendChild(alertaBox);

    // Adiciona o overlay ao body
    document.body.appendChild(overlay);
}

// Exemplo de uso:
// mostrarAlertaPersonalizado('Título do Alerta', 'Esta é uma mensagem de exemplo.');

//=========== Alçerta Personalizado =============



//=========== Alçerta Personalizado com Opção de Cancelar=============
function alertaPersonalizadoComOpcaoDeCancelar(titulo, mensagem) {
    return new Promise((resolve) => {
        // Cria o overlay (fundo escurecido)
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.zIndex = '1000';

        // Cria a caixa do alerta
        const alertaBox = document.createElement('div');
        alertaBox.style.backgroundColor = '#fff';
        alertaBox.style.padding = '20px';
        alertaBox.style.borderRadius = '10px';
        alertaBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        alertaBox.style.maxWidth = '400px';
        alertaBox.style.width = '100%';
        alertaBox.style.textAlign = 'center';

        // Cria o título
        const tituloElemento = document.createElement('h2');
        tituloElemento.textContent = titulo;
        tituloElemento.style.marginTop = '0';
        tituloElemento.style.fontSize = '24px';
        tituloElemento.style.color = '#333';

        // Cria a mensagem
        const mensagemElemento = document.createElement('p');
        mensagemElemento.textContent = mensagem;
        mensagemElemento.style.fontSize = '16px';
        mensagemElemento.style.color = '#666';
        mensagemElemento.style.margin = '20px 0';

        // Cria o botão de confirmar
        const botaoConfirmar = document.createElement('button');
        botaoConfirmar.textContent = 'Confirmar';
        botaoConfirmar.style.backgroundColor = '#007bff';
        botaoConfirmar.style.color = '#fff';
        botaoConfirmar.style.border = 'none';
        botaoConfirmar.style.padding = '10px 20px';
        botaoConfirmar.style.borderRadius = '5px';
        botaoConfirmar.style.cursor = 'pointer';
        botaoConfirmar.style.fontSize = '16px';
        botaoConfirmar.style.marginRight = '10px';
        botaoConfirmar.onclick = function () {
            document.body.removeChild(overlay); // Remove o alerta
            resolve(true); // Resolve a promessa com true (confirmado)
        };

        // Cria o botão de cancelar
        const botaoCancelar = document.createElement('button');
        botaoCancelar.textContent = 'Cancelar';
        botaoCancelar.style.backgroundColor = '#dc3545';
        botaoCancelar.style.color = '#fff';
        botaoCancelar.style.border = 'none';
        botaoCancelar.style.padding = '10px 20px';
        botaoCancelar.style.borderRadius = '5px';
        botaoCancelar.style.cursor = 'pointer';
        botaoCancelar.style.fontSize = '16px';
        botaoCancelar.onclick = function () {
            document.body.removeChild(overlay); // Remove o alerta
            resolve(false); // Resolve a promessa com false (cancelado)
        };

        // Adiciona os elementos à caixa do alerta
        alertaBox.appendChild(tituloElemento);
        alertaBox.appendChild(mensagemElemento);
        alertaBox.appendChild(botaoConfirmar);
        alertaBox.appendChild(botaoCancelar);

        // Adiciona a caixa do alerta ao overlay
        overlay.appendChild(alertaBox);

        // Adiciona o overlay ao body
        document.body.appendChild(overlay);
    });
}

// Função para verificar se há modificações nos campos
function haModificacoes() {
    // Exemplo: Verifica se algum campo de input foi alterado
    const inputs = document.querySelectorAll('input');
    for (const input of inputs) {
        if (input.value !== input.defaultValue) {
            return true; // Há modificações
        }
    }
    return false; // Não há modificações
}

//=========== Alçerta Personalizado com Opção de Cancelar=============

window.addEventListener("load", adjustForPrint);
