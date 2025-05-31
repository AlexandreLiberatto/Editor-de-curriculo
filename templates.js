/* Templates de currículo */
const templates = {
  modern: {
    name: "Moderno",
    description: "Design limpo e contemporâneo com detalhes em verde",
    primaryColor: "#1abc9c",
    secondaryColor: "#333",
    fontFamily: "'Raleway', sans-serif",
    headingFont: "'Barlow', sans-serif"
  },
  professional: {
    name: "Profissional",
    description: "Layout clássico e formal para ambientes corporativos",
    primaryColor: "#2c3e50",
    secondaryColor: "#7f8c8d",
    fontFamily: "'Roboto', sans-serif",
    headingFont: "'Roboto Slab', serif"
  },
  creative: {
    name: "Criativo",
    description: "Design colorido e dinâmico para áreas criativas",
    primaryColor: "#e74c3c",
    secondaryColor: "#f39c12",
    fontFamily: "'Montserrat', sans-serif",
    headingFont: "'Poppins', sans-serif"
  },
  minimal: {
    name: "Minimalista",
    description: "Design simples e elegante com foco no conteúdo",
    primaryColor: "#3498db",
    secondaryColor: "#2c3e50",
    fontFamily: "'Open Sans', sans-serif",
    headingFont: "'Lato', sans-serif"
  }
};

/* Função para aplicar template */
function applyTemplate(templateKey) {
  const template = templates[templateKey];
  
  if (!template) return;
  
  // Atualizar propriedades CSS das variáveis
  document.documentElement.style.setProperty('--primary-color', template.primaryColor);
  document.documentElement.style.setProperty('--secondary-color', template.secondaryColor);
  
  // Atualizar fontes
  const styleElement = document.getElementById('template-style') || document.createElement('style');
  if (!styleElement.id) styleElement.id = 'template-style';
  
  styleElement.textContent = `
    body, p, span, div {
      font-family: ${template.fontFamily};
    }
    
    h1, h2, h3, .title, .name, .education-head, .experience-head {
      font-family: ${template.headingFont};
    }
    
    .contact-item .symbol, .title {
      color: ${template.primaryColor};
      border-color: ${template.primaryColor};
    }
    
    .profile-image-label img {
      border-color: ${template.primaryColor};
    }
    
    .btn-outline-success {
      color: ${template.primaryColor};
      border-color: ${template.primaryColor};
    }
    
    .btn-outline-success:hover {
      background-color: ${template.primaryColor};
      color: white;
    }
  `;
  
  if (!styleElement.parentNode) {
    document.head.appendChild(styleElement);
  }
  
  // Salvar a preferência do usuário
  localStorage.setItem('selectedTemplate', templateKey);
  
  mostrarAlertaPersonalizado("✅ Sucesso!", `Template "${template.name}" aplicado com sucesso!`);
}

/* Carregar template salvo no localStorage */
function loadSavedTemplate() {
  const savedTemplate = localStorage.getItem('selectedTemplate');
  if (savedTemplate) {
    applyTemplate(savedTemplate);
  } else {
    applyTemplate('modern'); // Padrão
  }
}

/* Sistema de revisão de currículo */
function reviewResume() {
  const resume = document.getElementById('print');
  const sections = {
    summary: resume.querySelector('.rightside div[contenteditable="true"]').textContent,
    experience: Array.from(document.querySelectorAll('#experience .expblock')).map(exp => ({
      title: exp.querySelector('.experience-head').textContent,
      company: exp.querySelector('div span:first-child').textContent
    })),
    education: Array.from(document.querySelectorAll('#education .edublock')).map(edu => ({
      degree: edu.querySelector('.education-head').textContent,
      institution: edu.querySelector('div span:first-child').textContent
    })),
    skills: Array.from(document.querySelectorAll('#languages .language')).map(skill => 
      skill.querySelector('span:nth-child(2)').textContent
    )
  };
  
  // Armazenar feedback
  const feedback = [];
  
  // Verificar resumo
  if (sections.summary.length < 50) {
    feedback.push({
      section: "Resumo Profissional",
      suggestion: "Seu resumo é muito curto. Tente expandir para 3-5 linhas que destaquem suas principais qualificações e objetivos."
    });
  }
  
  if (sections.summary.includes("Aqui você pode escrever")) {
    feedback.push({
      section: "Resumo Profissional",
      suggestion: "Você ainda está usando o texto padrão no resumo. Personalize esta seção com suas informações!"
    });
  }
  
  // Verificar experiência
  sections.experience.forEach((exp, index) => {
    if (exp.title.includes("SEU CARGO") || exp.title.includes("Seu Cargo")) {
      feedback.push({
        section: "Experiência",
        suggestion: `Na experiência ${index + 1}, você ainda está usando o título padrão. Atualize para sua posição real.`
      });
    }
  });
  
  // Verificar educação
  sections.education.forEach((edu, index) => {
    if (edu.degree.includes("SEU DIPLOMA") || edu.degree.includes("Seu Diploma")) {
      feedback.push({
        section: "Educação",
        suggestion: `Na formação ${index + 1}, você ainda está usando o título padrão. Atualize para seu diploma real.`
      });
    }
  });
  
  // Verificar habilidades
  if (sections.skills.length < 3) {
    feedback.push({
      section: "Habilidades",
      suggestion: "Adicione mais habilidades técnicas para destacar suas competências (recomendamos pelo menos 5)."
    });
  }
  
  // Exibir feedback em uma modal
  showReviewFeedback(feedback);
}

/* Exibir feedback da revisão */
function showReviewFeedback(feedback) {
  // Cria o overlay
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

  // Cria a caixa do feedback
  const feedbackBox = document.createElement('div');
  feedbackBox.style.backgroundColor = '#fff';
  feedbackBox.style.padding = '20px';
  feedbackBox.style.borderRadius = '10px';
  feedbackBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  feedbackBox.style.maxWidth = '600px';
  feedbackBox.style.width = '90%';
  feedbackBox.style.maxHeight = '80vh';
  feedbackBox.style.overflowY = 'auto';

  // Cria o título
  const title = document.createElement('h2');
  title.textContent = 'Revisão do Currículo';
  title.style.color = '#333';
  title.style.marginBottom = '20px';
  title.style.borderBottom = '2px solid #1abc9c';
  title.style.paddingBottom = '10px';
  feedbackBox.appendChild(title);

  if (feedback.length === 0) {
    const successMsg = document.createElement('p');
    successMsg.textContent = 'Parabéns! Seu currículo parece estar completo e bem estruturado.';
    successMsg.style.color = '#2ecc71';
    successMsg.style.fontSize = '16px';
    successMsg.style.fontWeight = 'bold';
    feedbackBox.appendChild(successMsg);
    
    const tipElement = document.createElement('p');
    tipElement.textContent = 'Dica: Sempre personalize seu currículo para cada vaga específica, destacando as experiências e habilidades mais relevantes.';
    tipElement.style.fontStyle = 'italic';
    tipElement.style.marginTop = '20px';
    tipElement.style.padding = '10px';
    tipElement.style.backgroundColor = '#f9f9f9';
    tipElement.style.borderLeft = '3px solid #1abc9c';
    feedbackBox.appendChild(tipElement);
  } else {
    const intro = document.createElement('p');
    intro.textContent = `Encontramos ${feedback.length} sugestões para melhorar seu currículo:`;
    intro.style.marginBottom = '15px';
    feedbackBox.appendChild(intro);

    feedback.forEach((item, index) => {
      const feedbackItem = document.createElement('div');
      feedbackItem.style.marginBottom = '15px';
      feedbackItem.style.padding = '15px';
      feedbackItem.style.backgroundColor = '#f9f9f9';
      feedbackItem.style.borderRadius = '5px';
      feedbackItem.style.borderLeft = '4px solid #1abc9c';
      
      const sectionTitle = document.createElement('h3');
      sectionTitle.textContent = item.section;
      sectionTitle.style.color = '#333';
      sectionTitle.style.marginBottom = '5px';
      feedbackItem.appendChild(sectionTitle);
      
      const suggestion = document.createElement('p');
      suggestion.textContent = item.suggestion;
      suggestion.style.margin = '0';
      feedbackItem.appendChild(suggestion);
      
      feedbackBox.appendChild(feedbackItem);
    });
  }

  // Cria o botão de fechar
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Fechar';
  closeButton.style.backgroundColor = '#1abc9c';
  closeButton.style.color = '#fff';
  closeButton.style.border = 'none';
  closeButton.style.padding = '10px 20px';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.marginTop = '20px';
  closeButton.style.fontSize = '16px';
  closeButton.onclick = function() {
    document.body.removeChild(overlay);
  };
  feedbackBox.appendChild(closeButton);

  overlay.appendChild(feedbackBox);
  document.body.appendChild(overlay);
}

/* Sistema de histórico de versões */
function saveVersionSnapshot() {
  const resumeContent = document.getElementById("resume").innerHTML;
  const timestamp = new Date().toISOString();
  const versionName = prompt("Dê um nome para esta versão (ex: 'Versão para Empresa X'):", "Versão " + new Date().toLocaleDateString());
  
  if (!versionName) return; // Usuário cancelou
  
  let versions = JSON.parse(localStorage.getItem("resumeVersions") || "[]");
  
  // Limitar a 10 versões salvas
  if (versions.length >= 10) {
    versions.shift(); // Remove a versão mais antiga
  }
  
  versions.push({
    name: versionName,
    date: timestamp,
    content: resumeContent
  });
  
  localStorage.setItem("resumeVersions", JSON.stringify(versions));
  mostrarAlertaPersonalizado("✅ Sucesso!", `Versão "${versionName}" salva com sucesso!`);
}

/* Carregar versão do histórico */
function loadVersionHistory() {
  const versions = JSON.parse(localStorage.getItem("resumeVersions") || "[]");
  
  if (versions.length === 0) {
    mostrarAlertaPersonalizado("⚠️ Atenção!", "Não há versões salvas no histórico!");
    return;
  }
  
  // Cria o overlay
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

  // Cria a caixa de versões
  const versionsBox = document.createElement('div');
  versionsBox.style.backgroundColor = '#fff';
  versionsBox.style.padding = '20px';
  versionsBox.style.borderRadius = '10px';
  versionsBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  versionsBox.style.maxWidth = '600px';
  versionsBox.style.width = '90%';
  versionsBox.style.maxHeight = '80vh';
  versionsBox.style.overflowY = 'auto';

  // Cria o título
  const title = document.createElement('h2');
  title.textContent = 'Histórico de Versões';
  title.style.color = '#333';
  title.style.marginBottom = '20px';
  title.style.borderBottom = '2px solid #1abc9c';
  title.style.paddingBottom = '10px';
  versionsBox.appendChild(title);

  // Lista de versões
  versions.reverse().forEach((version, index) => {
    const versionItem = document.createElement('div');
    versionItem.style.marginBottom = '15px';
    versionItem.style.padding = '15px';
    versionItem.style.backgroundColor = '#f9f9f9';
    versionItem.style.borderRadius = '5px';
    versionItem.style.display = 'flex';
    versionItem.style.justifyContent = 'space-between';
    versionItem.style.alignItems = 'center';
    
    const versionInfo = document.createElement('div');
    
    const versionName = document.createElement('h3');
    versionName.textContent = version.name;
    versionName.style.color = '#333';
    versionName.style.margin = '0 0 5px 0';
    versionInfo.appendChild(versionName);
    
    const versionDate = document.createElement('p');
    const date = new Date(version.date);
    versionDate.textContent = date.toLocaleString();
    versionDate.style.margin = '0';
    versionDate.style.fontSize = '14px';
    versionDate.style.color = '#777';
    versionInfo.appendChild(versionDate);
    
    versionItem.appendChild(versionInfo);
    
    const loadButton = document.createElement('button');
    loadButton.textContent = 'Carregar';
    loadButton.style.backgroundColor = '#1abc9c';
    loadButton.style.color = '#fff';
    loadButton.style.border = 'none';
    loadButton.style.padding = '8px 15px';
    loadButton.style.borderRadius = '5px';
    loadButton.style.cursor = 'pointer';
    loadButton.style.fontSize = '14px';
    loadButton.onclick = function() {
      document.getElementById("resume").innerHTML = version.content;
      document.body.removeChild(overlay);
      mostrarAlertaPersonalizado("✅ Sucesso!", `Versão "${version.name}" carregada com sucesso!`);
    };
    versionItem.appendChild(loadButton);
    
    versionsBox.appendChild(versionItem);
  });

  // Cria o botão de fechar
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Fechar';
  closeButton.style.backgroundColor = '#777';
  closeButton.style.color = '#fff';
  closeButton.style.border = 'none';
  closeButton.style.padding = '10px 20px';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.marginTop = '20px';
  closeButton.style.fontSize = '16px';
  closeButton.style.width = '100%';
  closeButton.onclick = function() {
    document.body.removeChild(overlay);
  };
  versionsBox.appendChild(closeButton);

  overlay.appendChild(versionsBox);
  document.body.appendChild(overlay);
}

/* Exportar em diferentes formatos */
function exportOptions() {
  // Cria o overlay
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

  // Cria a caixa de opções
  const optionsBox = document.createElement('div');
  optionsBox.style.backgroundColor = '#fff';
  optionsBox.style.padding = '20px';
  optionsBox.style.borderRadius = '10px';
  optionsBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  optionsBox.style.maxWidth = '400px';
  optionsBox.style.width = '90%';

  // Cria o título
  const title = document.createElement('h2');
  title.textContent = 'Exportar Currículo';
  title.style.color = '#333';
  title.style.marginBottom = '20px';
  title.style.borderBottom = '2px solid #1abc9c';
  title.style.paddingBottom = '10px';
  optionsBox.appendChild(title);

  // Cria os botões de opções
  const formatButtons = [
    { 
      name: 'PDF', 
      icon: 'fas fa-file-pdf', 
      action: () => { 
        document.body.removeChild(overlay);
        printpdf(); 
      } 
    },
    { 
      name: 'Imprimir', 
      icon: 'fas fa-print', 
      action: () => { 
        document.body.removeChild(overlay);
        window.print(); 
      } 
    },
    { 
      name: 'HTML', 
      icon: 'fas fa-file-code', 
      action: () => {
        document.body.removeChild(overlay);
        exportAsHTML();
      }
    }
  ];

  const buttonContainer = document.createElement('div');
  buttonContainer.style.display = 'flex';
  buttonContainer.style.justifyContent = 'space-between';
  buttonContainer.style.marginBottom = '20px';

  formatButtons.forEach(button => {
    const btnElement = document.createElement('button');
    btnElement.style.flex = '1';
    btnElement.style.margin = '0 10px';
    btnElement.style.padding = '15px 10px';
    btnElement.style.backgroundColor = '#f5f5f5';
    btnElement.style.border = '1px solid #ddd';
    btnElement.style.borderRadius = '5px';
    btnElement.style.cursor = 'pointer';
    btnElement.style.textAlign = 'center';
    btnElement.style.transition = 'all 0.3s ease';
    
    btnElement.innerHTML = `<i class="${button.icon}" style="font-size: 30px; color: #1abc9c; display: block; margin-bottom: 10px;"></i>${button.name}`;
    
    btnElement.onmouseover = function() {
      this.style.backgroundColor = '#1abc9c';
      this.style.color = '#fff';
      this.querySelector('i').style.color = '#fff';
    };
    
    btnElement.onmouseout = function() {
      this.style.backgroundColor = '#f5f5f5';
      this.style.color = '#333';
      this.querySelector('i').style.color = '#1abc9c';
    };
    
    btnElement.onclick = button.action;
    
    buttonContainer.appendChild(btnElement);
  });

  optionsBox.appendChild(buttonContainer);

  // Opções de qualidade para PDF
  const qualityLabel = document.createElement('p');
  qualityLabel.textContent = 'Qualidade do PDF:';
  qualityLabel.style.marginBottom = '10px';
  qualityLabel.style.fontWeight = 'bold';
  optionsBox.appendChild(qualityLabel);

  const qualityOptions = document.createElement('div');
  qualityOptions.style.display = 'flex';
  qualityOptions.style.marginBottom = '20px';

  ['Normal', 'Alta', 'Máxima'].forEach((quality, index) => {
    const qualityOption = document.createElement('label');
    qualityOption.style.flex = '1';
    qualityOption.style.display = 'flex';
    qualityOption.style.alignItems = 'center';
    qualityOption.style.cursor = 'pointer';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quality';
    radio.value = ['normal', 'high', 'max'][index];
    radio.style.marginRight = '5px';
    if (index === 1) radio.checked = true;
    
    qualityOption.appendChild(radio);
    qualityOption.appendChild(document.createTextNode(quality));
    qualityOptions.appendChild(qualityOption);
  });

  optionsBox.appendChild(qualityOptions);

  // Cria o botão de fechar
  const closeButton = document.createElement('button');
  closeButton.textContent = 'Fechar';
  closeButton.style.backgroundColor = '#777';
  closeButton.style.color = '#fff';
  closeButton.style.border = 'none';
  closeButton.style.padding = '10px 20px';
  closeButton.style.borderRadius = '5px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.width = '100%';
  closeButton.onclick = function() {
    document.body.removeChild(overlay);
  };
  optionsBox.appendChild(closeButton);

  overlay.appendChild(optionsBox);
  document.body.appendChild(overlay);
}

/* Exportar como HTML */
function exportAsHTML() {
  const content = document.getElementById("print").cloneNode(true);
  
  // Remover elementos que não devem ser exportados
  content.querySelectorAll("button, .input-checkbox").forEach(el => {
    el.remove();
  });
  
  // Criar o documento HTML completo
  const htmlContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Currículo</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Raleway&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap');
    
    body {
      font-family: 'Raleway', sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f5f7fa;
    }
    
    ${document.getElementById('template-style')?.textContent || ''}
    
    .resume {
      background: white;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
    
    /* Incluir todos os estilos necessários do seu CSS */
    .head {
      display: grid;
      grid-template-columns: 3fr 1.5fr;
    }
    
    .head .main .name {
      font-size: 55px;
      font-family: 'Raleway', sans-serif;
    }
    
    .line {
      height: 0.5px;
      background-color: rgb(87, 87, 87);
      margin: 25px 0;
      margin-bottom: 50px;
    }
    
    .mainbody {
      display: grid;
      grid-template-columns: 10fr 1fr 17fr;
    }
    
    .mainbody .border {
      background-color: rgb(87, 87, 87);
      width: 3px;
    }
    
    .mainbody .rightside {
      padding-left: 15px;
    }
    
    .title {
      font-weight: 700;
      font-size: 18px;
      border: none;
      padding-bottom: 3px;
      border-bottom: 2px #1abc9c solid;
    }
    
    /* Adicione mais estilos conforme necessário */
  </style>
</head>
<body>
  <div class="resume">
    ${content.outerHTML}
  </div>
</body>
</html>
  `;
  
  // Criar um Blob com o conteúdo HTML
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Criar um link para download
  const a = document.createElement('a');
  a.href = url;
  a.download = 'meu-curriculo.html';
  a.click();
  
  // Limpar URL
  setTimeout(() => URL.revokeObjectURL(url), 100);
  
  mostrarAlertaPersonalizado("✅ Sucesso!", "Currículo exportado como HTML com sucesso!");
}

/* Mostrar dicas para cada seção */
function showSectionTips(sectionName) {
  const tips = {
    "resumo": [
      "Mantenha seu resumo profissional conciso, entre 3-5 linhas.",
      "Destaque suas habilidades mais relevantes para a vaga.",
      "Inclua palavras-chave da área que você atua para otimização para sistemas de recrutamento."
    ],
    "experiencia": [
      "Liste suas experiências da mais recente para a mais antiga.",
      "Use verbos de ação para descrever suas responsabilidades.",
      "Quantifique suas conquistas sempre que possível (ex: 'Aumentei as vendas em 20%')."
    ],
    "educacao": [
      "Inclua o nome da instituição, diploma/curso e ano de conclusão.",
      "Para graduações recentes, você pode adicionar seu histórico acadêmico.",
      "Mencione cursos relevantes, projetos ou reconhecimentos acadêmicos."
    ],
    "habilidades": [
      "Organize suas habilidades por categoria (técnicas, soft skills, idiomas).",
      "Indique seu nível de proficiência em cada habilidade.",
      "Priorize as habilidades mais relevantes para a vaga desejada."
    ],
    "projetos": [
      "Descreva brevemente os projetos mais relevantes para a vaga.",
      "Destaque suas responsabilidades e tecnologias utilizadas.",
      "Se possível, inclua links para os projetos online."
    ]
  };
  
  const selectedTips = tips[sectionName] || [];
  
  if (selectedTips.length === 0) {
    return; // Sem dicas para esta seção
  }
  
  // Criar tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'section-tooltip';
  tooltip.style.position = 'absolute';
  tooltip.style.backgroundColor = '#fff';
  tooltip.style.border = '1px solid #ddd';
  tooltip.style.borderRadius = '5px';
  tooltip.style.padding = '15px';
  tooltip.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';
  tooltip.style.zIndex = '1000';
  tooltip.style.maxWidth = '300px';
  
  // Título do tooltip
  const title = document.createElement('h3');
  title.textContent = `Dicas para ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}`;
  title.style.margin = '0 0 10px 0';
  title.style.color = '#1abc9c';
  title.style.borderBottom = '1px solid #eee';
  title.style.paddingBottom = '5px';
  tooltip.appendChild(title);
  
  // Lista de dicas
  const tipsList = document.createElement('ul');
  tipsList.style.paddingLeft = '20px';
  tipsList.style.margin = '0';
  
  selectedTips.forEach(tip => {
    const tipItem = document.createElement('li');
    tipItem.textContent = tip;
    tipItem.style.margin = '5px 0';
    tipsList.appendChild(tipItem);
  });
  
  tooltip.appendChild(tipsList);
  
  // Botão para fechar
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '5px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '20px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.color = '#999';
  closeButton.onclick = function() {
    document.body.removeChild(tooltip);
  };
  tooltip.appendChild(closeButton);
  
  // Posicionar o tooltip
  document.body.appendChild(tooltip);
  
  // Definir posição (centralizado na tela)
  tooltip.style.top = '50%';
  tooltip.style.left = '50%';
  tooltip.style.transform = 'translate(-50%, -50%)';
  
  // Auto-remover após 15 segundos
  setTimeout(() => {
    if (document.body.contains(tooltip)) {
      document.body.removeChild(tooltip);
    }
  }, 15000);
}

// Carregar os eventos depois que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", function() {
  // Carregar template salvo
  loadSavedTemplate();
  
  // Adicionar ícones de dica ao lado de cada título de seção
  document.querySelectorAll('.title').forEach(title => {
    const titleText = title.textContent.toLowerCase();
    let sectionName = '';
    
    if (titleText.includes('resumo') || titleText.includes('profissional')) {
      sectionName = 'resumo';
    } else if (titleText.includes('experiência')) {
      sectionName = 'experiencia';
    } else if (titleText.includes('educação') || titleText.includes('formação')) {
      sectionName = 'educacao';
    } else if (titleText.includes('habilidades')) {
      sectionName = 'habilidades';
    } else if (titleText.includes('projetos')) {
      sectionName = 'projetos';
    }
    
    if (sectionName) {
      const tipIcon = document.createElement('i');
      tipIcon.className = 'fas fa-question-circle';
      tipIcon.style.marginLeft = '5px';
      tipIcon.style.color = '#1abc9c';
      tipIcon.style.cursor = 'pointer';
      tipIcon.style.fontSize = '16px';
      
      tipIcon.addEventListener('click', () => {
        showSectionTips(sectionName);
      });
      
      title.appendChild(tipIcon);
    }
  });
});
