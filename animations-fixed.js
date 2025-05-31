// Funções para o menu hambúrguer responsivo
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerMenu = document.getElementById("hamburgerMenu");
    const mobileNav = document.getElementById("mobileNav");
    const mobileNavOverlay = document.getElementById("mobileNavOverlay");
    const mobileActionButton = document.getElementById("mobileActionButton");
    const mobileActionsMenu = document.getElementById("mobileActionsMenu");
    
    // Toggle do menu hambúrguer
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener("click", function() {
            hamburgerMenu.classList.toggle("active");
            mobileNav.classList.toggle("active");
            mobileNavOverlay.classList.toggle("active");
            document.body.classList.toggle("menu-open");
        });
    }
    
    // Fechar menu ao clicar no overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener("click", function() {
            hamburgerMenu.classList.remove("active");
            mobileNav.classList.remove("active");
            mobileNavOverlay.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    }
    
    // Fechar menu ao clicar em um item
    document.querySelectorAll(".mobile-nav ul li a").forEach(item => {
        item.addEventListener("click", function() {
            if (hamburgerMenu) hamburgerMenu.classList.remove("active");
            if (mobileNav) mobileNav.classList.remove("active");
            if (mobileNavOverlay) mobileNavOverlay.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });
    
    // Toggle do menu de ações mobile - Desativado
    if (mobileActionButton) { // Verifica se o elemento existe antes de adicionar o evento
        mobileActionButton.addEventListener("click", function() {
            // Função desativada pois os botões foram removidos
            // Mantido apenas para evitar erros no console
        });
    }
    
    // Fechar menu de ações ao clicar em um item
    document.querySelectorAll(".mobile-action-item").forEach(item => {
        item.addEventListener("click", function() {
            if (mobileActionsMenu) mobileActionsMenu.classList.remove("active");
            if (mobileActionButton) {
                mobileActionButton.classList.remove("active");
                
                const icon = mobileActionButton.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-plus");
                }
            }
        });
    });
    
    // Fechar menu de ações ao clicar fora dele - Desativado
    document.addEventListener("click", function(event) {
        // Função desativada pois os botões foram removidos
        // Mantido apenas para evitar erros no console
        if (mobileActionButton && mobileActionsMenu && 
            !mobileActionButton.contains(event.target) && 
            !mobileActionsMenu.contains(event.target)) {
            // Código desativado
        }
    });
    
    // Detectar mudança de orientação do dispositivo
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768) {
            // Fechar menu em telas maiores se estiver aberto
            if (hamburgerMenu) hamburgerMenu.classList.remove("active");
            if (mobileNav) mobileNav.classList.remove("active");
            if (mobileNavOverlay) mobileNavOverlay.classList.remove("active");
            document.body.classList.remove("menu-open");
            
            // Fechar menu de ações - Desativado
            if (mobileActionsMenu && mobileActionButton) {
                mobileActionsMenu.classList.remove("active");
                mobileActionButton.classList.remove("active");
                
                const icon = mobileActionButton.querySelector("i");
                if (icon && icon.classList.contains("fa-times")) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-plus");
                }
            }
        }
    });
    
    // Adicionar scroll suave para melhor experiência do usuário
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de entrada para os elementos da interface
    const animateElements = () => {
        // Animar os botões da toolbar com delay crescente
        document.querySelectorAll('.unified-toolbar .toolbar-button').forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                button.style.transition = 'all 0.3s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateX(0)';
            }, 100 * index);
        });
        
        // Animar o botão de ação mobile (se existir)
        const actionButton = document.querySelector('.mobile-action-button');
        if (actionButton) {
            actionButton.style.opacity = '0';
            actionButton.style.transform = 'scale(0.5)';
            
            setTimeout(() => {
                actionButton.style.transition = 'all 0.3s ease';
                actionButton.style.opacity = '1';
                actionButton.style.transform = 'scale(1)';
            }, 300);
        }
    };
    
    // Executar animações após o carregamento da página
    setTimeout(animateElements, 500);
    
    // Detectar cliques em elementos editáveis para melhor feedback
    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('editing');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('editing');
            // Salvar automaticamente ao sair de um campo editável
            if (typeof saveToLocalStorage === 'function') {
                saveToLocalStorage();
            }
        });
    });
    
    // Adicionar dicas de uso para iniciantes
    if (!localStorage.getItem('seenTutorial')) {
        setTimeout(() => {
            if (typeof mostrarAlertaPersonalizado === 'function') {
                mostrarAlertaPersonalizado(
                    "Bem-vindo ao Editor de Currículo!", 
                    "Para começar, clique nos textos para editá-los. Use os botões à esquerda para mudar o template, salvar seu progresso ou exportar seu currículo."
                );
            }
            localStorage.setItem('seenTutorial', 'true');
        }, 1500);
    }
});
