/**
 * DON_FBBR - Inteligência Artificial para o site de Patologia Oral na Odontologia
 * Implementação de chat interativo com respostas sobre patologia oral e outros temas
 */

class DonFbbrAI {
    constructor() {
        this.knowledge = {
            patologia: [
                "A patologia oral é o ramo da odontologia que estuda as doenças que afetam a cavidade oral e estruturas anexas.",
                "O diagnóstico diferencial é essencial para distinguir lesões com aparências semelhantes, mas tratamentos diferentes.",
                "As lesões fundamentais são alterações morfológicas básicas que servem como ponto de partida para o diagnóstico.",
                "A biópsia é um procedimento essencial para o diagnóstico definitivo de lesões suspeitas na cavidade oral.",
                "As neoplasias orais podem ser benignas ou malignas, sendo o carcinoma espinocelular o tipo mais comum de câncer oral."
            ],
            lesoes: [
                "Leucoplasia é uma placa branca que não pode ser removida por raspagem e é considerada uma lesão potencialmente maligna.",
                "Eritroplasia é uma lesão vermelha que apresenta maior potencial de malignização que a leucoplasia.",
                "Líquen plano é uma doença mucocutânea crônica de origem autoimune que pode afetar a mucosa oral.",
                "Fibroma é uma hiperplasia fibrosa focal, geralmente causada por trauma crônico.",
                "Granuloma piogênico é uma lesão reativa vascular que pode surgir em resposta a irritação local ou trauma."
            ],
            diagnostico: [
                "O exame clínico completo inclui anamnese detalhada e exame físico minucioso.",
                "Exames complementares como radiografias, tomografias e exames laboratoriais são importantes para o diagnóstico.",
                "A coloração vital com azul de toluidina pode auxiliar na identificação de áreas suspeitas para biópsia.",
                "A citologia esfoliativa é um método não invasivo que pode auxiliar no diagnóstico de lesões orais.",
                "O diagnóstico definitivo de muitas lesões orais só é possível através do exame histopatológico."
            ],
            tratamento: [
                "O tratamento das lesões orais varia de acordo com o diagnóstico e pode incluir medicamentos, cirurgia ou outras abordagens.",
                "A remoção cirúrgica é o tratamento de escolha para muitas lesões benignas e malignas da cavidade oral.",
                "A radioterapia e quimioterapia podem ser necessárias no tratamento de neoplasias malignas avançadas.",
                "O acompanhamento periódico é fundamental para pacientes com lesões potencialmente malignas ou história prévia de câncer oral.",
                "A prevenção através da eliminação de fatores de risco como tabagismo e etilismo é essencial."
            ],
            geral: [
                "Estou aqui para ajudar com suas dúvidas sobre patologia oral e outros temas relacionados à odontologia.",
                "Posso fornecer informações sobre diagnóstico, tratamento e prevenção de doenças orais.",
                "Meu objetivo é auxiliar no seu aprendizado sobre patologia oral na odontologia.",
                "Sou o DON_FBBR, sua inteligência artificial assistente para estudos em patologia oral.",
                "Além de patologia oral, posso responder sobre diversos temas relacionados à saúde e ciência."
            ]
        };
        
        this.greetings = [
            "Olá! Sou o DON_FBBR, sua IA assistente em Patologia Oral. Como posso ajudar?",
            "Bem-vindo! Estou aqui para responder suas dúvidas sobre Patologia Oral. O que deseja saber?",
            "Olá! Sou especializado em Patologia Oral. Em que posso ser útil hoje?",
            "Bem-vindo ao assistente DON_FBBR! Estou pronto para ajudar com suas questões sobre Patologia Oral.",
            "Olá! Sou o DON_FBBR, assistente virtual de Patologia Oral. Como posso auxiliar seus estudos?"
        ];
        
        this.fallbacks = [
            "Interessante pergunta! Vamos explorar esse tema juntos.",
            "Essa é uma questão importante. Deixe-me compartilhar o que sei sobre isso.",
            "Ótima pergunta! Vou tentar responder da melhor forma possível.",
            "Esse é um tópico relevante. Aqui está o que posso dizer sobre isso.",
            "Vamos analisar essa questão com base no conhecimento disponível."
        ];
    }
    
    getRandomResponse(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    getGreeting() {
        return this.getRandomResponse(this.greetings);
    }
    
    getFallback() {
        return this.getRandomResponse(this.fallbacks);
    }
    
    getRandomKnowledge(category) {
        if (this.knowledge[category]) {
            return this.getRandomResponse(this.knowledge[category]);
        }
        return this.getRandomResponse(this.knowledge.geral);
    }
    
    processQuestion(question) {
        question = question.toLowerCase();
        
        // Verificar palavras-chave para determinar a categoria
        if (question.match(/leucoplasia|eritroplasia|líquen|fibroma|granuloma|lesão|lesões|mácula|pápula|nódulo|tumor/)) {
            return this.getRandomKnowledge('lesoes');
        } 
        else if (question.match(/diagnóstico|exame|anamnese|biópsia|histopatológico|citologia|toluidina|complementar/)) {
            return this.getRandomKnowledge('diagnostico');
        }
        else if (question.match(/tratamento|cirurgia|medicamento|remoção|excisão|radioterapia|quimioterapia|prognóstico/)) {
            return this.getRandomKnowledge('tratamento');
        }
        else if (question.match(/patologia|oral|odontologia|estudo|doença|neoplasia|câncer|carcinoma/)) {
            return this.getRandomKnowledge('patologia');
        }
        else {
            // Para perguntas que não se encaixam nas categorias específicas
            // Primeiro tenta dar uma resposta genérica sobre patologia
            if (Math.random() > 0.3) {
                return this.getRandomKnowledge('geral');
            }
            // Ou usa um fallback genérico
            return this.getFallback();
        }
    }
}

// Inicialização do DON_FBBR quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const donFbbr = new DonFbbrAI();
    const chatModal = document.getElementById('chatModal');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const closeChatBtn = document.getElementById('closeChat');
    const donFbbrIcon = document.querySelector('.don-fbbr');
    
    // Adicionar mensagem de boas-vindas
    function addWelcomeMessage() {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'chat-welcome';
        welcomeDiv.innerHTML = `
            <i class="fas fa-robot"></i>
            <h3>Bem-vindo ao DON_FBBR</h3>
            <p>Sua IA assistente para estudos em Patologia Oral</p>
        `;
        chatMessages.appendChild(welcomeDiv);
        
        // Adicionar primeira mensagem da IA
        setTimeout(() => {
            addMessage(donFbbr.getGreeting(), 'ai');
        }, 500);
    }
    
    // Adicionar mensagem ao chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Processar mensagem do usuário
    function processUserMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = '';
            
            // Simular tempo de processamento
            setTimeout(() => {
                const aiResponse = donFbbr.processQuestion(userMessage);
                addMessage(aiResponse, 'ai');
            }, 800);
        }
    }
    
    // Event listeners
    if (donFbbrIcon) {
        donFbbrIcon.addEventListener('click', () => {
            chatModal.style.display = 'flex';
            if (chatMessages.children.length === 0) {
                addWelcomeMessage();
            }
        });
    }
    
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatModal.style.display = 'none';
        });
    }
    
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', processUserMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processUserMessage();
            }
        });
    }
    
    // Adicionar botão flutuante para DON_FBBR se não existir
    if (!donFbbrIcon) {
        const donFbbrButton = document.createElement('div');
        donFbbrButton.className = 'don-fbbr-button';
        donFbbrButton.innerHTML = `
            <img src="don_fbbr_robot_small.png" alt="DON_FBBR" class="don-fbbr">
        `;
        document.body.appendChild(donFbbrButton);
        
        donFbbrButton.addEventListener('click', () => {
            chatModal.style.display = 'flex';
            if (chatMessages.children.length === 0) {
                addWelcomeMessage();
            }
        });
    }
});
