// Aplicativo de questões para a seção de Teste de Conhecimentos
document.addEventListener('DOMContentLoaded', () => {
    // Importar as questões
    import('./questoes.js')
        .then(module => {
            const questoes = module.default;
            inicializarAplicativoQuestoes(questoes);
        })
        .catch(error => {
            console.error('Erro ao carregar questões:', error);
            document.getElementById('questoes-container').innerHTML = 
                '<p class="error-message">Erro ao carregar as questões. Por favor, tente novamente mais tarde.</p>';
        });
});

function inicializarAplicativoQuestoes(questoes) {
    const container = document.getElementById('questoes-container');
    if (!container) return;

    // Estado do aplicativo
    let questaoAtual = 0;
    let respostasUsuario = new Array(questoes.length).fill(-1);
    let questoesRespondidas = new Set();
    let mostrandoExplicacao = false;

    // Renderizar a primeira questão
    renderizarQuestao();

    // Função para renderizar a questão atual
    function renderizarQuestao() {
        const questao = questoes[questaoAtual];
        mostrandoExplicacao = false;

        let html = `
            <div class="questao-card">
                <div class="questao-header">
                    <h3>Questão ${questaoAtual + 1} de ${questoes.length}</h3>
                    <div class="questao-progresso">
                        <div class="progresso-barra">
                            <div class="progresso-preenchido" style="width: ${(questoesRespondidas.size / questoes.length) * 100}%"></div>
                        </div>
                        <span>${questoesRespondidas.size} de ${questoes.length} respondidas</span>
                    </div>
                </div>
                <div class="questao-conteudo">
                    <p class="questao-texto">${questao.pergunta}</p>
                    <div class="alternativas">
        `;

        questao.alternativas.forEach((alternativa, index) => {
            const checked = respostasUsuario[questaoAtual] === index ? 'checked' : '';
            html += `
                <div class="alternativa">
                    <input type="radio" id="alt-${index}" name="resposta" value="${index}" ${checked}>
                    <label for="alt-${index}">${alternativa}</label>
                </div>
            `;
        });

        html += `
                    </div>
                </div>
                <div class="questao-footer">
                    <button id="btn-anterior" class="btn btn-secondary" ${questaoAtual === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left"></i> Anterior
                    </button>
                    <button id="btn-responder" class="btn btn-primary">
                        Responder <i class="fas fa-check"></i>
                    </button>
                    <button id="btn-proximo" class="btn btn-secondary" ${questaoAtual === questoes.length - 1 ? 'disabled' : ''}>
                        Próxima <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Adicionar event listeners
        document.getElementById('btn-anterior').addEventListener('click', questaoAnterior);
        document.getElementById('btn-proximo').addEventListener('click', proximaQuestao);
        document.getElementById('btn-responder').addEventListener('click', responderQuestao);

        // Adicionar event listeners para os inputs de rádio
        document.querySelectorAll('input[name="resposta"]').forEach(input => {
            input.addEventListener('change', () => {
                respostasUsuario[questaoAtual] = parseInt(input.value);
            });
        });
    }

    // Função para mostrar a explicação da resposta
    function mostrarExplicacao() {
        if (mostrandoExplicacao) return;
        
        const questao = questoes[questaoAtual];
        const respostaCorreta = questao.resposta;
        const respostaUsuario = respostasUsuario[questaoAtual];
        
        // Adicionar a div de explicação
        const explicacaoDiv = document.createElement('div');
        explicacaoDiv.className = 'explicacao';
        
        if (respostaUsuario === respostaCorreta) {
            explicacaoDiv.innerHTML = `
                <div class="resultado correto">
                    <i class="fas fa-check-circle"></i> Resposta correta!
                </div>
                <h4>Explicação:</h4>
                <p>${questao.explicacao}</p>
            `;
        } else {
            explicacaoDiv.innerHTML = `
                <div class="resultado incorreto">
                    <i class="fas fa-times-circle"></i> Resposta incorreta!
                </div>
                <p>A resposta correta é: <strong>${questao.alternativas[respostaCorreta]}</strong></p>
                <h4>Explicação:</h4>
                <p>${questao.explicacao}</p>
            `;
        }
        
        // Inserir após as alternativas
        document.querySelector('.questao-conteudo').appendChild(explicacaoDiv);
        
        // Desabilitar os inputs de rádio
        document.querySelectorAll('input[name="resposta"]').forEach(input => {
            input.disabled = true;
        });
        
        // Destacar a alternativa correta e a escolhida pelo usuário
        document.querySelectorAll('.alternativa').forEach((alt, index) => {
            if (index === respostaCorreta) {
                alt.classList.add('correta');
            }
            if (index === respostaUsuario && respostaUsuario !== respostaCorreta) {
                alt.classList.add('incorreta');
            }
        });
        
        // Mudar o botão de responder para continuar
        const btnResponder = document.getElementById('btn-responder');
        btnResponder.innerHTML = 'Continuar <i class="fas fa-arrow-right"></i>';
        btnResponder.removeEventListener('click', responderQuestao);
        btnResponder.addEventListener('click', proximaQuestao);
        
        mostrandoExplicacao = true;
    }

    // Função para responder a questão atual
    function responderQuestao() {
        const respostaSelecionada = document.querySelector('input[name="resposta"]:checked');
        
        if (!respostaSelecionada) {
            // Alertar o usuário para selecionar uma alternativa
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alerta';
            alertDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Por favor, selecione uma alternativa.';
            
            const footer = document.querySelector('.questao-footer');
            footer.parentNode.insertBefore(alertDiv, footer);
            
            // Remover o alerta após 3 segundos
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
            
            return;
        }
        
        // Registrar a resposta do usuário
        const respostaIndex = parseInt(respostaSelecionada.value);
        respostasUsuario[questaoAtual] = respostaIndex;
        questoesRespondidas.add(questaoAtual);
        
        // Mostrar a explicação
        mostrarExplicacao();
    }

    // Função para ir para a próxima questão
    function proximaQuestao() {
        if (questaoAtual < questoes.length - 1) {
            questaoAtual++;
            renderizarQuestao();
            window.scrollTo(0, 0);
        } else if (questoesRespondidas.size === questoes.length) {
            // Se todas as questões foram respondidas, mostrar o resultado final
            mostrarResultadoFinal();
        }
    }

    // Função para ir para a questão anterior
    function questaoAnterior() {
        if (questaoAtual > 0) {
            questaoAtual--;
            renderizarQuestao();
            window.scrollTo(0, 0);
        }
    }

    // Função para mostrar o resultado final
    function mostrarResultadoFinal() {
        let acertos = 0;
        
        for (let i = 0; i < questoes.length; i++) {
            if (respostasUsuario[i] === questoes[i].resposta) {
                acertos++;
            }
        }
        
        const percentualAcerto = (acertos / questoes.length) * 100;
        
        let mensagem = '';
        if (percentualAcerto >= 90) {
            mensagem = 'Excelente! Você domina o assunto!';
        } else if (percentualAcerto >= 70) {
            mensagem = 'Muito bom! Você tem um bom conhecimento!';
        } else if (percentualAcerto >= 50) {
            mensagem = 'Bom trabalho! Continue estudando para melhorar.';
        } else {
            mensagem = 'Continue estudando! A prática leva à perfeição.';
        }
        
        let html = `
            <div class="resultado-final">
                <h2>Resultado Final</h2>
                <div class="resultado-grafico">
                    <div class="grafico-circular">
                        <div class="percentual">${percentualAcerto.toFixed(0)}%</div>
                    </div>
                </div>
                <div class="resultado-detalhes">
                    <p>Você acertou <strong>${acertos}</strong> de <strong>${questoes.length}</strong> questões.</p>
                    <p class="mensagem">${mensagem}</p>
                </div>
                <div class="resultado-acoes">
                    <button id="btn-reiniciar" class="btn btn-primary">
                        <i class="fas fa-redo"></i> Tentar Novamente
                    </button>
                    <button id="btn-revisar" class="btn btn-secondary">
                        <i class="fas fa-search"></i> Revisar Questões
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Animar o gráfico circular
        setTimeout(() => {
            document.querySelector('.grafico-circular').style.background = 
                `conic-gradient(var(--primary-color) ${percentualAcerto}%, #e0e0e0 0)`;
        }, 100);
        
        // Adicionar event listeners
        document.getElementById('btn-reiniciar').addEventListener('click', reiniciarQuiz);
        document.getElementById('btn-revisar').addEventListener('click', revisarQuestoes);
    }

    // Função para reiniciar o quiz
    function reiniciarQuiz() {
        questaoAtual = 0;
        respostasUsuario = new Array(questoes.length).fill(-1);
        questoesRespondidas = new Set();
        renderizarQuestao();
    }

    // Função para revisar as questões
    function revisarQuestoes() {
        // Criar uma lista de questões para revisão
        let html = `
            <div class="revisao">
                <h2>Revisão de Questões</h2>
                <div class="revisao-lista">
        `;
        
        questoes.forEach((questao, index) => {
            const respostaUsuario = respostasUsuario[index];
            const respostaCorreta = questao.resposta;
            const status = respostaUsuario === respostaCorreta ? 'correta' : 'incorreta';
            
            html += `
                <div class="revisao-item ${status}" data-index="${index}">
                    <div class="revisao-numero">${index + 1}</div>
                    <div class="revisao-texto">${questao.pergunta.substring(0, 100)}...</div>
                    <div class="revisao-status">
                        ${respostaUsuario === respostaCorreta ? 
                            '<i class="fas fa-check-circle"></i>' : 
                            '<i class="fas fa-times-circle"></i>'}
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="revisao-acoes">
                    <button id="btn-voltar" class="btn btn-primary">
                        <i class="fas fa-arrow-left"></i> Voltar ao Resultado
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Adicionar event listeners
        document.getElementById('btn-voltar').addEventListener('click', mostrarResultadoFinal);
        
        // Adicionar event listeners para os itens de revisão
        document.querySelectorAll('.revisao-item').forEach(item => {
            item.addEventListener('click', () => {
                questaoAtual = parseInt(item.dataset.index);
                renderizarQuestao();
                mostrarExplicacao();
            });
        });
    }
}
