document.addEventListener('DOMContentLoaded', () => {
    const riddleText = document.getElementById('riddle');
    const guessInput = document.getElementById('guess-input');
    const checkGuessBtn = document.getElementById('check-guess-btn');
    const getRiddleBtn = document.getElementById('get-riddle-btn');
    const revealAnswerBtn = document.getElementById('reveal-answer-btn');
    const resultText = document.getElementById('result');
    const playerNameInput = document.getElementById('playerName');
    const scoreDisplay = document.getElementById('score');
    const recordScoreBtn = document.getElementById('record-score-btn');
    const studentRecordsList = document.getElementById('studentRecords');
    const riddleNumberDisplay = document.getElementById('riddle-number');
    const hintImage = document.getElementById('hint-image');

    const allRiddles = [
        { question: "Malawak na lupain na tila walang hanggan, Tahanan ng lahi’t iba’t ibang bayan.", answer: "Kontinente", hintImage: "images/Kontinente.jpg" },
        { question: "Hagdan ng langit, laging mataas, Dito sumisilip ang araw sa taas.", answer: "Kabundukan", hintImage: "images/kabundukan.jpg" },
        { question: "Mainit sa umaga, malamig sa gabi, Buhangin ang kama, tubig ay salat palagi.", answer: "Disyerto", hintImage: "images/disyerto.jpg" },
        { question: "Lupang pantay, parang isang mesa, Bukirin at bayan, dito'y sagana.", answer: "Kapatagan", hintImage: "images/kapatagan.jpg" },
        { question: "Ulan ang dala, may ihip ng hangin, Panahong tagtuyo’t tag-ulan ay kabaligtarin.", answer: "Monsoon", hintImage: "images/monsson.jpg" },
        { question: "Init o lamig sa katawan sumasalamin,Kinukuha sa araw o sa hangin.", answer: "Temperatura", hintImage: "images/temperatura.jpeg" },
        { question: "Lupang pinagmulan ng sibilisasyon,, Pinakamalaki sa bawat direksyon.", answer: "Asya", hintImage: "images/asya.jpg" },
        { question: "Araw-araw ay nagpupumilit, Sa lupa’y naghahalik, Upang ang bunga’y umunlad At ang tiyan ay mapuspos.", answer: "Magsasaka", hintImage: "images/magsasaka.jpg" },
        { question: "Walang lasa, walang kulay, Ngunit sa buhay, ito’y mahal.", answer: "Tubig", hintImage: "images/tubig.jpg" },
        { question: "Pinagtatayuan ng tahanan at taniman,Kayamanang likas ng bawat bayan.", answer: "Lupa", hintImage: "images/lupa.avif" },
        // Add more riddles with their image paths
    ];

    let currentRiddleIndex = -1;
    let currentAnswer = '';
    let score = 0;
    const studentScores = [];
    let canGetNextRiddle = true;
    let attemptsLeft = 0;
    const maxAttempts = 3;
    let hasAttempted = false;
    let availableRiddles = [...allRiddles];
    const usedRiddleIndices = [];

    function resetRiddleState() {
        guessInput.disabled = false;
        checkGuessBtn.disabled = false;
        revealAnswerBtn.disabled = true;
        getRiddleBtn.disabled = true;
        guessInput.value = '';
        resultText.textContent = '';
        attemptsLeft = maxAttempts;
        hasAttempted = false;
    }

    function displayRiddle() {
        if (canGetNextRiddle) {
            if (availableRiddles.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableRiddles.length);
                const currentRiddle = availableRiddles[randomIndex];
                currentRiddleIndex = allRiddles.indexOf(currentRiddle);

                riddleText.textContent = currentRiddle.question;
                currentAnswer = currentRiddle.answer;
                riddleNumberDisplay.textContent = `Question ${usedRiddleIndices.length + 1} out of ${allRiddles.length}: `;

                if (currentRiddle.hintImage) {
                    hintImage.src = currentRiddle.hintImage;
                    hintImage.style.display = 'block';
                } else {
                    hintImage.style.display = 'none';
                    hintImage.src = '';
                }

                resetRiddleState();
                canGetNextRiddle = false;

                availableRiddles.splice(randomIndex, 1);
                usedRiddleIndices.push(currentRiddleIndex);
            } else {
                riddleText.textContent = 'You have answered all the riddles!';
                riddleNumberDisplay.textContent = '';
                hintImage.style.display = 'none';
                hintImage.src = '';
                guessInput.disabled = true;
                checkGuessBtn.disabled = true;
                revealAnswerBtn.disabled = true;
                getRiddleBtn.disabled = true;
                canGetNextRiddle = false;
            }
        } else {
            resultText.textContent = 'Answer the current riddle first!';
            resultText.className = 'warning';
            setTimeout(() => {
                resultText.textContent = '';
                resultText.className = '';
            }, 2000);
        }
    }

    function checkGuess() {
        if (!guessInput.disabled) {
            const userGuess = guessInput.value.trim().toLowerCase();
            const correctAnswer = currentAnswer.toLowerCase();
            hasAttempted = true;
            revealAnswerBtn.disabled = false;

            if (userGuess === correctAnswer) {
                resultText.textContent = 'Correct! 🎉';
                resultText.className = 'correct';
                score++;
                updateScore();
                canGetNextRiddle = true;
                getRiddleBtn.disabled = false;
                guessInput.disabled = true;
                checkGuessBtn.disabled = true;
                setTimeout(displayRiddle, 1500);
            } else {
                attemptsLeft--;
                if (attemptsLeft > 0) {
                    resultText.textContent = `Wrong guess! ${attemptsLeft} attempts remaining.`;
                    resultText.className = 'incorrect';
                } else {
                    resultText.textContent = `Out of attempts! The answer is: ${currentAnswer}`;
                    resultText.className = 'incorrect';
                    guessInput.disabled = true;
                    checkGuessBtn.disabled = true;
                    revealAnswerBtn.disabled = false;
                    getRiddleBtn.disabled = false;
                    canGetNextRiddle = true;
                }
            }
        }
    }

    function revealAnswer() {
        if (hasAttempted || attemptsLeft === maxAttempts) {
            resultText.textContent = `The correct answer is: ${currentAnswer}`;
            resultText.className = 'revealed';
            hintImage.style.display = 'none';
            guessInput.disabled = true;
            checkGuessBtn.disabled = true;
            revealAnswerBtn.disabled = true;
            getRiddleBtn.disabled = false;
            canGetNextRiddle = true;
        } else {
            resultText.textContent = 'Please try to answer before revealing!';
            resultText.className = 'warning';
            setTimeout(() => {
                resultText.textContent = '';
                resultText.className = '';
            }, 2000);
        }
    }

    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function recordStudentScore() {
        const studentName = playerNameInput.value.trim();
        if (studentName) {
            studentScores.push({ name: studentName, score: score });
            updateStudentRecordDisplay();
            playerNameInput.value = '';
            score = 0;
            updateScore();
            displayRiddle();
        } else {
            alert('Please enter your name before recording the score.');
        }
    }

    function updateStudentRecordDisplay() {
        studentRecordsList.innerHTML = '';
        studentScores.forEach(record => {
            const listItem = document.createElement('li');
            listItem.textContent = `${record.name}: ${record.score}`;
            studentRecordsList.appendChild(listItem);
        });
    }

    getRiddleBtn.addEventListener('click', displayRiddle);
    checkGuessBtn.addEventListener('click', checkGuess);
    revealAnswerBtn.addEventListener('click', revealAnswer);
    recordScoreBtn.addEventListener('click', recordStudentScore);

    displayRiddle();
    updateScore();
});