document.addEventListener('DOMContentLoaded', () => {
    const quizData = [
        {
            question: "O que é Phishing?",
            options: [
                "Um tipo de peixe raro.",
                "Uma tentativa de enganar você para obter suas informações pessoais.",
                "Um software que protege seu computador contra vírus.",
                "Uma técnica de programação avançada."
            ],
            correctAnswer: "Uma tentativa de enganar você para obter suas informações pessoais."
        },
        {
            question: "Qual das seguintes senhas é a mais segura?",
            options: [
                "12345678",
                "minhasenha",
                "JoaoSilva1990",
                "Tr@v3ssur4!Am@r3l4!97"
            ],
            correctAnswer: "Tr@v3ssur4!Am@r3l4!97"
        },
        {
            question: "O que é a Autenticação de Dois Fatores (2FA)?",
            options: [
                "Usar duas senhas diferentes para a mesma conta.",
                "Uma camada extra de segurança que requer um segundo método de verificação além da senha.",
                "Um antivírus que verifica o computador duas vezes.",
                "Fazer login em dois dispositivos ao mesmo tempo."
            ],
            correctAnswer: "Uma camada extra de segurança que requer um segundo método de verificação além da senha."
        },
        {
            question: "Você recebe um e-mail do seu banco pedindo para clicar em um link e confirmar seus dados urgentemente. O que você deve fazer?",
            options: [
                "Clicar no link e fornecer os dados para não ter a conta bloqueada.",
                "Ignorar o e-mail, pois provavelmente é phishing. Entrar em contato com o banco por um canal oficial.",
                "Responder ao e-mail pedindo mais informações.",
                "Encaminhar o e-mail para todos os seus contatos para alertá-los."
            ],
            correctAnswer: "Ignorar o e-mail, pois provavelmente é phishing. Entrar em contato com o banco por um canal oficial."
        }
    ];

    const questionTextEl = document.getElementById('question-text');
    const optionsContainerEl = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const resultAreaEl = document.getElementById('result-area');

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedOption = null;

    function loadQuestion() {
        resultAreaEl.textContent = '';
        selectedOption = null;
        const currentQuestion = quizData[currentQuestionIndex];
        questionTextEl.textContent = currentQuestion.question;
        optionsContainerEl.innerHTML = '';

        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => {
                // Remove a seleção de outros botões
                Array.from(optionsContainerEl.children).forEach(btn => btn.classList.remove('selected'));
                // Adiciona a seleção ao botão clicado
                button.classList.add('selected');
                selectedOption = button;
            });
            optionsContainerEl.appendChild(button);
        });
        
        nextBtn.textContent = 'Verificar Resposta';
    }

    function showResults() {
        optionsContainerEl.innerHTML = '';
        questionTextEl.textContent = 'Quiz Finalizado!';
        resultAreaEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
        
        nextBtn.textContent = 'Recomeçar Quiz';
        currentQuestionIndex = -1; // Para o próximo clique recomeçar
    }

    nextBtn.addEventListener('click', () => {
        if (nextBtn.textContent === 'Recomeçar Quiz') {
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
            return;
        }

        if (!selectedOption) {
            alert('Por favor, selecione uma resposta!');
            return;
        }

        if (nextBtn.textContent === 'Verificar Resposta') {
            const answer = quizData[currentQuestionIndex].correctAnswer;
            const isCorrect = selectedOption.textContent === answer;
            
            if (isCorrect) {
                score++;
                selectedOption.classList.add('correct');
            } else {
                selectedOption.classList.add('incorrect');
                // Mostra a resposta correta
                Array.from(optionsContainerEl.children).forEach(btn => {
                    if (btn.textContent === answer) {
                        btn.classList.add('correct');
                    }
                });
            }

            // Desabilita todos os botões após a verificação
            Array.from(optionsContainerEl.children).forEach(btn => btn.disabled = true);
            
            nextBtn.textContent = 'Próxima Pergunta';
            if (currentQuestionIndex === quizData.length - 1) {
                nextBtn.textContent = 'Ver Resultado Final';
            }

        } else { // 'Próxima Pergunta' ou 'Ver Resultado Final'
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showResults();
            }
        }
    });

    // Inicia o quiz
    loadQuestion();
});