
# **Editor de Currículo Moderno**

![Thumbnail](img/curriculo.png)  
*Imagem ilustrativa do editor de currículo em ação.*

---

## **Descrição**

O **Editor de Currículo Moderno** é uma ferramenta intuitiva e responsiva para criar currículos profissionais diretamente no navegador. Com design moderno, funcionalidades avançadas e excelente usabilidade, este editor permite que você personalize seu currículo com facilidade, adicione uma foto de perfil, organize suas experiências, habilidades, projetos e muito mais.

Recursos principais:
- **Responsividade**: Funciona perfeitamente em dispositivos móveis, tablets e desktops.
- **Templates Personalizáveis**: Escolha entre diferentes estilos de design profissional.
- **Download em PDF**: Gere seu currículo em formato PDF com diferentes qualidades.
- **Exportação em HTML**: Salve seu currículo em formato HTML para uso na web.
- **Sistema de Revisão**: Receba sugestões para melhorar seu currículo.
- **Histórico de Versões**: Mantenha diferentes versões do seu currículo.
- **Upload de Imagem**: Adicione sua foto de perfil com suporte para arrastar e soltar.
- **Campos Editáveis**: Todos os campos são editáveis, permitindo personalização completa.
- **Reset Completo**: Limpe todos os campos com um único botão.
- **Design Moderno**: Interface limpa e profissional com cores suaves e tipografia elegante.
- **Dicas Contextuais**: Dicas sobre como preencher cada seção do currículo.

---

## **Instruções de Uso**

### **Configuração Inicial**
1. Clone ou baixe este repositório para sua máquina local.
2. Abra o arquivo `index.html` em qualquer navegador moderno (Google Chrome, Firefox, etc.).
3. O editor estará pronto para uso imediatamente.

### **Personalizando o Currículo**
- **Nome e Atuação**: Clique nos campos "SEU NOME" e "SUA ATUAÇÃO" para editar.
- **Foto de Perfil**: Clique na imagem de perfil ou arraste e solte uma nova imagem.
- **Contatos**: Edite os campos de telefone, e-mail, LinkedIn e localização.
- **Seções**: Use os botões "+" e "-" para adicionar ou remover itens nas seções de Experiência, Habilidades, Projetos, Idiomas e Educação.
- **Templates**: Clique no botão de paleta de cores para escolher entre diferentes estilos de currículo.
- **Revisão**: Use o sistema de revisão para receber sugestões de melhoria para seu currículo.
- **Versões**: Salve diferentes versões do seu currículo para diferentes tipos de emprego.

### **Exportando o Currículo**
- Clique no botão de download para abrir as opções de exportação.
- Escolha entre PDF, HTML ou impressão direta.
- Para PDF, selecione a qualidade desejada (Normal, Alta ou Máxima).

---

## **Funcionalidades do Código**

### **Funções Principais**
- **Adicionar/Remover Seções**: Use funções como `addExp()`, `remExp()`, `addLang()`, `remLang()` para gerenciar dinamicamente as seções do currículo.
- **Salvar Progresso**: A função `saveToLocalStorage()` salva o conteúdo atual do currículo para evitar perda de dados.
- **Responsividade Dinâmica**: A função `updateMobileView()` ajusta o layout para diferentes tamanhos de tela.
- **Templates**: A função `applyTemplate()` permite alternar entre diferentes estilos visuais.
- **Revisão**: O sistema `reviewResume()` analisa seu currículo e oferece sugestões para melhorá-lo.
- **Histórico de Versões**: As funções `saveVersionSnapshot()` e `loadVersionHistory()` permitem gerenciar diferentes versões do currículo.

### **Upload de Imagem**
- O código suporta upload de imagem via `<input type="file">`.
- A função `FileReader` é usada para carregar a imagem selecionada.
- Suporte para arrastar e soltar imagens na área do perfil.

### **Exportação**
- A biblioteca `html2pdf.js` é usada para converter o currículo em PDF com diferentes qualidades.
- Exportação em HTML para uso na web.
- Suporte para impressão direta via navegador.

---

## **Estrutura do Projeto**

```
/projeto-cv
│
├── index.html          # Arquivo principal HTML
├── styles.css          # Estilos CSS para o design
├── script.js           # Lógica JavaScript para funcionalidades
├── img/                # Pasta para imagens (como ícones ou placeholders)
└── README.md           # Este arquivo README
```

---

## **Funcionalidades Futuras**

Adicionar ainda mais recursos ao editor de currículo:
- **Modelos de Currículo**: Escolha entre diferentes layouts predefinidos.
- **Validação de Campos**: Alertas para campos obrigatórios não preenchidos.
- **Dark Mode**: Alternar entre modos claro e escuro.
- **Armazenamento Local**: Salve seu progresso automaticamente no navegador.

---

## **Contato**

Entre em contato comigo através dos links abaixo:

[![WhatsApp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://api.whatsapp.com/send?phone=+5548991604054)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alexandre-liberato-32179624b/)  
[![E-mail](https://img.shields.io/badge/E--mail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alexandreliberatto@gmail.com)

---

## **Créditos**

- **Font Awesome**: Ícones utilizados no projeto ([Font Awesome](https://fontawesome.com/)).
- **Google Fonts**: Fontes Raleway e Barlow ([Google Fonts](https://fonts.google.com/)).
- **HTML2PDF**: Biblioteca para geração de PDFs ([HTML2PDF](https://github.com/eKoopmans/html2pdf.js)).

---

## **Licença**

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).  
Você pode usar, modificar e distribuir este software livremente.
