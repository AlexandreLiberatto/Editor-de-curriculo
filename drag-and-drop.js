// Sistema de arrastar e soltar para reorganizar seções do currículo
document.addEventListener("DOMContentLoaded", function() {
    // Configuração inicial do sistema de drag-and-drop
    initDragAndDrop();
    
    // Adicionar botão para habilitar/desabilitar o modo de reorganização
    setupReorganizationMode();
    
    // Observar mutações no DOM para adicionar funcionalidade às novas seções
    observeDOMChanges();
});

// Inicializar a funcionalidade de arrastar e soltar
function initDragAndDrop() {
    // Selecionar todas as seções que podem ser reordenadas
    const dragSections = document.querySelectorAll('.drag-section');
    
    // Para cada seção arrastável
    dragSections.forEach(section => {
        setupDraggableSection(section);
    });
}

// Configurar botão para ativar/desativar modo de reorganização
function setupReorganizationMode() {
    // Adicionar à barra de ferramentas unificada
    const unifiedToolbar = document.querySelector('.unified-toolbar');
    if (unifiedToolbar) {
        const reorganizeButton = document.createElement('button');
        reorganizeButton.className = 'toolbar-button';
        reorganizeButton.setAttribute('data-tooltip', 'Reorganizar');
        reorganizeButton.innerHTML = '<i class="fas fa-sort"></i>';
        reorganizeButton.id = 'reorganizeButton';
        unifiedToolbar.appendChild(reorganizeButton);
        
        // Evento para o botão
        reorganizeButton.addEventListener('click', toggleReorganizationMode);
    }
}

// Ativar/desativar modo de reorganização
function toggleReorganizationMode() {
    const isDragModeActive = document.body.classList.toggle('reorganization-mode');
    const dragSections = document.querySelectorAll('.drag-section');
    const reorganizeButton = document.getElementById('reorganizeButton');
    
    dragSections.forEach(section => {
        // Ativar/desativar atributo draggable
        section.setAttribute('draggable', isDragModeActive ? 'true' : 'false');
        
        // Mostrar/ocultar alças de arraste
        const dragHandle = section.querySelector('.drag-handle');
        if (dragHandle) {
            dragHandle.style.display = isDragModeActive ? 'flex' : 'none';
        }
    });
    
    // Alterar visual do botão para indicar modo ativo
    if (reorganizeButton) {
        reorganizeButton.classList.toggle('active', isDragModeActive);
    }
    
    // Exibir mensagem para o usuário
    if (isDragModeActive) {
        mostrarAlertaPersonalizado(
            "Modo de Reorganização Ativado", 
            "Arraste as seções do currículo para reorganizá-las. Clique no botão novamente para desativar o modo de reorganização."
        );
    } else {
        // Salvar o estado atual do currículo após a reorganização
        saveToLocalStorage();
    }
}

// Manipuladores de eventos para drag-and-drop
let draggedElement = null;

function handleDragStart(e) {
    // Verificar se estamos no modo de reorganização
    if (!document.body.classList.contains('reorganization-mode')) return;
    
    draggedElement = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    
    // Adicionar classe visual durante o arraste
    setTimeout(() => {
        this.classList.add('dragging');
    }, 0);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessário para permitir o drop
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    // Evitar o comportamento padrão do navegador
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    // Garantir que não estamos arrastando um elemento sobre si mesmo
    if (draggedElement !== this) {
        // Obter o container pai
        const parent = draggedElement.parentNode;
        
        // Determinar se devemos inserir antes ou depois com base na posição
        const rect = this.getBoundingClientRect();
        const middleY = rect.top + rect.height / 2;
        const insertBefore = e.clientY < middleY;
        
        // Remover o elemento arrastado da sua posição atual
        parent.removeChild(draggedElement);
        
        // Inserir na nova posição
        if (insertBefore) {
            parent.insertBefore(draggedElement, this);
        } else {
            parent.insertBefore(draggedElement, this.nextSibling);
        }
        
        // Adicionar uma animação sutil para mostrar a mudança
        draggedElement.classList.add('just-dropped');
        setTimeout(() => {
            draggedElement.classList.remove('just-dropped');
        }, 500);
    }
    
    // Remover classe visual
    this.classList.remove('drag-over');
    
    return false;
}

function handleDragEnd(e) {
    // Remover todas as classes visuais
    document.querySelectorAll('.drag-section').forEach(section => {
        section.classList.remove('dragging');
        section.classList.remove('drag-over');
    });
    
    // Atualizar o documento após a reorganização
    saveToLocalStorage();
}

// Observar mudanças no DOM para novos elementos arrastáveis
function observeDOMChanges() {
    // Criar um observador para monitorar mudanças no DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Verificar se algum dos nós adicionados é uma nova seção arrastável
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Elemento node
                        const newDragSections = node.querySelectorAll ? node.querySelectorAll('.drag-section:not([draggable])') : [];
                        
                        if (node.classList && node.classList.contains('drag-section') && !node.hasAttribute('draggable')) {
                            // O nó em si é uma seção arrastável
                            setupDraggableSection(node);
                        }
                        
                        // Procurar por seções arrastáveis dentro do nó adicionado
                        if (newDragSections.length > 0) {
                            newDragSections.forEach(section => {
                                setupDraggableSection(section);
                            });
                        }
                    }
                });
            }
        });
    });
    
    // Configurar o observador para monitorar o documento inteiro
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Configurar uma única seção como arrastável
function setupDraggableSection(section) {
    // Adicionar atributo draggable (inicialmente desativado)
    section.setAttribute('draggable', document.body.classList.contains('reorganization-mode') ? 'true' : 'false');
    
    // Adicionar manipuladores de eventos de arrastar
    section.addEventListener('dragstart', handleDragStart);
    section.addEventListener('dragover', handleDragOver);
    section.addEventListener('dragenter', handleDragEnter);
    section.addEventListener('dragleave', handleDragLeave);
    section.addEventListener('drop', handleDrop);
    section.addEventListener('dragend', handleDragEnd);
    
    // Adicionar alça para arrastar se ainda não existir
    if (!section.querySelector('.drag-handle')) {
        const dragHandle = document.createElement('div');
        dragHandle.className = 'drag-handle';
        dragHandle.innerHTML = '<i class="fas fa-grip-lines"></i>';
        dragHandle.style.display = document.body.classList.contains('reorganization-mode') ? 'flex' : 'none';
        section.prepend(dragHandle);
    }
}
