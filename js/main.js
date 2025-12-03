// アプリケーション状態管理
const appState = {
    currentStep: 1,
    selectedIndustry: null,
    currentQuestionIndex: 0,
    answers: {},
    industryData: null
};

// DOMロード後の初期化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// アプリケーション初期化
function initializeApp() {
    // 業界選択ボタンのイベントリスナー
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach(card => {
        card.addEventListener('click', function() {
            const industry = this.dataset.industry;
            selectIndustry(industry);
        });
    });

    // 評価ボタンのイベントリスナー
    const ratingButtons = document.querySelectorAll('.rating-btn');
    ratingButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            selectRating(this);
        });
    });

    // ナビゲーションボタン
    document.getElementById('nextBtn').addEventListener('click', handleNext);
    document.getElementById('prevBtn').addEventListener('click', handlePrevious);
    document.getElementById('restartBtn').addEventListener('click', restartDiagnosis);
    document.getElementById('contactBtn').addEventListener('click', openContactModal);


}

// 業界選択
function selectIndustry(industry) {
    appState.selectedIndustry = industry;
    appState.industryData = questionDatabase[industry];
    appState.currentQuestionIndex = 0;
    appState.answers = {};

    // ステップ2へ移動
    goToStep(2);
    loadQuestion();
}

// 質問の読み込み
function loadQuestion() {
    const questionIndex = appState.currentQuestionIndex;
    const totalQuestions = 12; // 4カテゴリ × 3問

    // 現在のカテゴリと質問番号を計算
    const categoryIndex = Math.floor(questionIndex / 3);
    const questionInCategory = questionIndex % 3;
    const categoryKey = categoryOrder[categoryIndex];
    const categoryData = appState.industryData.categories[categoryKey];

    // UI更新
    document.getElementById('questionCategory').textContent = categoryData.name;
    document.getElementById('questionDescription').textContent = 
        `${appState.industryData.name}における${categoryData.name}の現状をお聞かせください`;
    document.getElementById('questionNumber').textContent = questionIndex + 1;
    document.getElementById('questionText').textContent = categoryData.questions[questionInCategory];

    // 評価ボタンのリセット
    const ratingButtons = document.querySelectorAll('.rating-btn');
    ratingButtons.forEach(btn => btn.classList.remove('selected'));

    // 既存の回答があれば選択状態を復元
    const answerKey = `${categoryKey}_${questionInCategory}`;
    if (appState.answers[answerKey]) {
        const selectedBtn = document.querySelector(`[data-value="${appState.answers[answerKey]}"]`);
        if (selectedBtn) selectedBtn.classList.add('selected');
        document.getElementById('nextBtn').disabled = false;
    } else {
        document.getElementById('nextBtn').disabled = true;
    }

    // 前へボタンの表示制御
    document.getElementById('prevBtn').style.display = questionIndex > 0 ? 'block' : 'none';

    // プログレスバー更新
    updateProgress();
}

// 評価選択
function selectRating(button) {
    // 他のボタンの選択を解除
    const ratingButtons = document.querySelectorAll('.rating-btn');
    ratingButtons.forEach(btn => btn.classList.remove('selected'));

    // 選択されたボタンをハイライト
    button.classList.add('selected');

    // 回答を保存
    const questionIndex = appState.currentQuestionIndex;
    const categoryIndex = Math.floor(questionIndex / 3);
    const questionInCategory = questionIndex % 3;
    const categoryKey = categoryOrder[categoryIndex];
    const answerKey = `${categoryKey}_${questionInCategory}`;
    
    appState.answers[answerKey] = parseInt(button.dataset.value);

    // 次へボタンを有効化
    document.getElementById('nextBtn').disabled = false;
}

// 次へボタン処理
function handleNext() {
    const totalQuestions = 12;

    if (appState.currentQuestionIndex < totalQuestions - 1) {
        appState.currentQuestionIndex++;
        loadQuestion();
    } else {
        // 診断完了、結果表示
        showResults();
    }
}

// 前へボタン処理
function handlePrevious() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        loadQuestion();
    }
}

// 結果表示
function showResults() {
    // スコア計算
    const scores = calculateScores();

    // ステップ3へ移動
    goToStep(3);

    // 総合スコア表示
    displayTotalScore(scores);

    // レーダーチャート表示
    displayRadarChart(scores);

    // カテゴリ別詳細表示
    displayCategoryDetails(scores);

    // 解決案表示
    displaySolutions(scores);

    // 私ができること表示
    displayMyServices(scores);
}

// スコア計算
function calculateScores() {
    const scores = {
        total: 0,
        categories: {}
    };

    categoryOrder.forEach(categoryKey => {
        let categoryScore = 0;
        for (let i = 0; i < 3; i++) {
            const answerKey = `${categoryKey}_${i}`;
            categoryScore += appState.answers[answerKey] || 0;
        }
        scores.categories[categoryKey] = categoryScore;
        scores.total += categoryScore;
    });

    return scores;
}

// 総合スコア表示
function displayTotalScore(scores) {
    const maxScore = 60; // 12問 × 5点
    const percentage = Math.round((scores.total / maxScore) * 100);

    document.getElementById('totalScore').textContent = scores.total;
    document.getElementById('scorePercentage').textContent = `${percentage}%`;
}

// レーダーチャート表示
function displayRadarChart(scores) {
    const ctx = document.getElementById('radarChart').getContext('2d');

    // 既存のチャートがあれば破棄
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
    }

    const data = {
        labels: categoryOrder.map(key => categoryNames[key]),
        datasets: [{
            label: '現在のスコア',
            data: categoryOrder.map(key => scores.categories[key]),
            backgroundColor: 'rgba(17, 153, 142, 0.2)',
            borderColor: 'rgba(17, 153, 142, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(17, 153, 142, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(17, 153, 142, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    };

    const options = {
        scales: {
            r: {
                beginAtZero: true,
                max: 15, // 3問 × 5点
                ticks: {
                    stepSize: 3,
                    font: {
                        size: 12
                    }
                },
                pointLabels: {
                    font: {
                        size: 13,
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        maintainAspectRatio: true
    };

    window.radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}

// カテゴリ別詳細表示
function displayCategoryDetails(scores) {
    const container = document.getElementById('categoryDetails');
    container.innerHTML = '';

    categoryOrder.forEach(categoryKey => {
        const score = scores.categories[categoryKey];
        const maxScore = 15; // 3問 × 5点
        const percentage = Math.round((score / maxScore) * 100);

        // 困りごとベースなので、スコアが高い = 困っている = 要改善
        let status, statusClass;
        if (percentage >= 70) {
            status = '要改善';
            statusClass = 'status-low';
        } else if (percentage >= 40) {
            status = '改善の余地あり';
            statusClass = 'status-medium';
        } else {
            status = '良好';
            statusClass = 'status-high';
        }

        const cardHtml = `
            <div class="category-card">
                <h4>${categoryNames[categoryKey]}</h4>
                <div class="category-score">${score}<span> / ${maxScore}</span></div>
                <span class="category-status ${statusClass}">${status}</span>
            </div>
        `;

        container.innerHTML += cardHtml;
    });
}

// 解決案表示
function displaySolutions(scores) {
    const container = document.getElementById('solutionsContent');
    container.innerHTML = '';

    categoryOrder.forEach(categoryKey => {
        const score = scores.categories[categoryKey];
        const maxScore = 15;
        const percentage = (score / maxScore) * 100;

        // 困りごとベースなので、スコアが高い = 困っている = high（要改善）
        let level;
        if (percentage >= 70) {
            level = 'high';  // 要改善
        } else if (percentage >= 40) {
            level = 'medium';  // 改善の余地あり
        } else {
            level = 'low';  // 良好
        }

        const categoryData = appState.industryData.categories[categoryKey];
        const solution = categoryData.solutions[level];

        const solutionHtml = `
            <div class="solution-item">
                <h4>${categoryNames[categoryKey]}</h4>
                <p>${solution}</p>
            </div>
        `;

        container.innerHTML += solutionHtml;
    });
}

// 私ができること表示
function displayMyServices(scores) {
    const container = document.getElementById('myServicesContent');
    container.innerHTML = '';

    // スコアが高いカテゴリ（困っている = 改善が必要なカテゴリ）を優先的に表示
    const categoriesWithScores = categoryOrder.map(categoryKey => ({
        key: categoryKey,
        score: scores.categories[categoryKey],
        percentage: (scores.categories[categoryKey] / 15) * 100
    }));

    // スコアが高い順にソート（困りごとベースなので、高い = 困っている）
    categoriesWithScores.sort((a, b) => b.percentage - a.percentage);

    // 上位2つ（最も困っている = 改善が必要なカテゴリ）を表示
    const topCategories = categoriesWithScores.slice(0, 2);

    topCategories.forEach(category => {
        const serviceData = myServices[category.key];
        const categoryName = categoryNames[category.key];
        const scorePercentage = Math.round(category.percentage);

        // スコアに応じた前置きメッセージ（困りごとベース：高い = 困っている）
        let introMessage = '';
        if (scorePercentage >= 70) {
            introMessage = `${categoryName}で課題を多く抱えていらっしゃる状況です。このような場合によくあるのは、以下のような悩みです：`;
        } else if (scorePercentage >= 40) {
            introMessage = `${categoryName}には改善の余地があるようです。多くの企業様が抱えている課題として、次のようなものがあります：`;
        } else {
            introMessage = `${categoryName}は比較的良好な状態です。さらなる向上を目指す場合、次のような視点で見直しをお手伝いできます：`;
        }

        const problemsHtml = serviceData.problems.map(problem => 
            `<li>${problem}</li>`
        ).join('');

        const solutionsHtml = serviceData.solutions.map(solution => 
            `<li>${solution}</li>`
        ).join('');

        const serviceHtml = `
            <div class="service-card">
                <h4>■ ${serviceData.title}</h4>
                <p class="service-intro">${introMessage}</p>
                
                <div class="service-problems">
                    <ul>${problemsHtml}</ul>
                </div>

                <div class="service-solutions">
                    <h5>私ができるサポート</h5>
                    <ul>${solutionsHtml}</ul>
                </div>

                <div class="service-message">${serviceData.message}</div>
            </div>
        `;

        container.innerHTML += serviceHtml;
    });
}

// ステップ移動
function goToStep(stepNumber) {
    // 現在のステップを非表示
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });

    // 新しいステップを表示
    document.getElementById(`step${stepNumber}`).classList.add('active');

    appState.currentStep = stepNumber;
    updateProgress();
}

// プログレスバー更新
function updateProgress() {
    let progress;
    let progressText;

    if (appState.currentStep === 1) {
        progress = 33.33;
        progressText = 'ステップ 1 / 3';
    } else if (appState.currentStep === 2) {
        const questionProgress = ((appState.currentQuestionIndex + 1) / 12) * 100;
        progress = 33.33 + (questionProgress * 0.3333);
        progressText = `ステップ 2 / 3 (質問 ${appState.currentQuestionIndex + 1} / 12)`;
    } else {
        progress = 100;
        progressText = 'ステップ 3 / 3 - 診断完了';
    }

    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = progressText;
}

// 診断をやり直す
function restartDiagnosis() {
    appState.currentStep = 1;
    appState.selectedIndustry = null;
    appState.currentQuestionIndex = 0;
    appState.answers = {};
    appState.industryData = null;

    goToStep(1);

    // チャートを破棄
    if (window.radarChartInstance) {
        window.radarChartInstance.destroy();
        window.radarChartInstance = null;
    }
}

// 無料相談フォームを開く
function openContactModal() {
    // Timerexの予約フォームを新しいタブで開く
    window.open('https://timerex.net/s/y.akimoto_4f55_3092/8504bbab', '_blank');
}
