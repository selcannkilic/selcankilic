// ✅ Doğru cevaplar
const correctAnswers = {
    q1: "C",
    q2: "C",
    q3: "C",
    q4: "A",
    q5: "A"
};

// ✅ Cevapları kontrol et ve sonucu kaydet
function checkAnswers() {
    const userAnswers = {
        q1: getSelectedAnswer("q1"),
        q2: getSelectedAnswer("q2"),
        q3: getSelectedAnswer("q3"),
        q4: getSelectedAnswer("q4"),
        q5: getSelectedAnswer("q5")
    };

    let correctCount = 0;
    for (let question in correctAnswers) {
        if (userAnswers[question] === correctAnswers[question]) {
            correctCount++;
        }
    }

    const totalQuestions = Object.keys(correctAnswers).length;

    localStorage.setItem("correctCount", correctCount);
    localStorage.setItem("totalQuestions", totalQuestions);

    // Sonuç sayfasına yönlendir
    window.location.href = "result.html";
}

// ✅ Seçilen cevabı al
function getSelectedAnswer(question) {
    const options = document.getElementsByName(question);
    for (let option of options) {
        if (option.checked) return option.value;
    }
    return null;
}

// ✅ Sayfa yüklendiğinde çalışacak her şey burada
window.onload = function () {
    // Eğer sonuç sayfasındaysak sonucu göster
    if (window.location.pathname.includes("result.html")) {
        const resultText = document.getElementById("result-text");

        const correctCount = localStorage.getItem("correctCount");
        const totalQuestions = localStorage.getItem("totalQuestions");

        if (resultText && correctCount !== null && totalQuestions !== null) {
            const correct = parseInt(correctCount);
            const total = parseInt(totalQuestions);
            const wrong = total - correct;
            const percentage = ((correct / total) * 100).toFixed(2);

            let resultMessage = `
                <p><strong>Toplam Soru:</strong> ${total}</p>
                <p><strong>✅ Doğru:</strong> ${correct}</p>
                <p><strong>❌ Yanlış:</strong> ${wrong}</p>
                <p><strong>🎯 Başarı Oranı:</strong> ${percentage}%</p>
            `;

            if (correct >= total / 2) {
                resultText.innerHTML = `<h2 style="color:green;">Başarılı!</h2>` + resultMessage;
            } else {
                resultText.innerHTML = `<h2 style="color:red;">Başarısız!</h2>` + resultMessage;
            }
        } else {
            resultText.innerHTML = "Sonuçlar bulunamadı.";
        }
    }

    // Eğer kullanıcı adı, e-posta gibi form verileri varsa onları da göster
    const name = getQueryStringValue('name');
    const email = getQueryStringValue('email');
    const message = getQueryStringValue('message');

    if (document.getElementById('name')) {
        document.getElementById('name').textContent = name || "Adınız bulunamadı";
        document.getElementById('email').textContent = email || "E-posta bulunamadı";
        document.getElementById('message').textContent = message || "Mesajınız bulunamadı";
    }
};

// ✅ Geri dön butonu fonksiyonu
function goBack() {
    window.location.href = 'quiztest.html';
}

// ✅ URL parametresinden veri al
function getQueryStringValue(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
