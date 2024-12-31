// おみくじ結果とそれぞれの出現確率（%）
const omikuji = [
  { result: "神吉", probability: 0.7 },
  { result: "大吉", probability: 2.3 },
  { result: "中吉", probability: 15.5 },
  { result: "小吉", probability: 31.0 },
  { result: "吉", probability: 24.8 },
  { result: "半吉", probability: 15.5 },
  { result: "末吉", probability: 8.0 },
  { result: "凶", probability: 1.6 },
  { result: "大凶", probability: 0.6 }
];

// 出現回数を記録するオブジェクト
const resultCounts = omikuji.reduce((acc, { result }) => {
  acc[result] = 0;
  return acc;
}, {});

let attemptCount = 0; // 試行回数をカウント

// 確率表を画面に表示する関数
function displayProbabilityTable() {
  const listElement = document.getElementById("probability-list");
  listElement.innerHTML = ""; // リストをリセット
  omikuji.forEach(({ result, probability }) => {
    const listItem = document.createElement("li");

    // 左側: 結果, 中央: 設定確率, 右側: 実測確率
    const resultSpan = document.createElement("span");
    const setProbabilitySpan = document.createElement("span");
    const actualProbabilitySpan = document.createElement("span");

    const actualProbability =
      attemptCount > 0 ? ((resultCounts[result] / attemptCount) * 100).toFixed(1) : "0.0";

    resultSpan.textContent = result;
    setProbabilitySpan.textContent = `${probability.toFixed(1)}%`;
    actualProbabilitySpan.textContent = `${actualProbability}% (${resultCounts[result]}回)`;

    listItem.appendChild(resultSpan);
    listItem.appendChild(setProbabilitySpan);
    listItem.appendChild(actualProbabilitySpan);
    listElement.appendChild(listItem);
  });
}

// おみくじ結果を選ぶ関数
function drawOmikuji() {
  const random = Math.random() * 100;
  let cumulativeProbability = 0;

  for (const item of omikuji) {
    cumulativeProbability += item.probability;
    if (random < cumulativeProbability) {
      return item.result;
    }
  }
}

// アニメーションで結果を徐々に表示する関数
function animateResult(finalResult, callback) {
  const resultElement = document.getElementById("result");
  const placeholder = "がらがらがら～"; // アニメーションの仮テキスト
  let currentText = "";
  let index = 0;

  // テキストが徐々に増えるアニメーション
  const interval = setInterval(() => {
    currentText += placeholder[index];
    resultElement.textContent = currentText;
    index++;

    // 最後の文字まで表示したら停止して最終結果を表示
    if (index >= placeholder.length) {
      clearInterval(interval);
      setTimeout(() => {
        resultElement.textContent = `結果: ${finalResult}`;
        callback(); // アニメーション終了後にコールバックを実行
      }, 1200); // 最終結果を表示する前に少し間を取る
    }
  }, 200); // 1文字ずつ表示する間隔（ms）
}

// おみくじを引くボタンの動作
document.getElementById("draw-button").addEventListener("click", () => {
  const sound = document.getElementById("omikuji-sound");
  const attemptElement = document.getElementById("attempt-count");

  // 試行回数を増やして更新
  attemptCount++;
  attemptElement.textContent = `試行回数: ${attemptCount}`;

  // 音の再生
  sound.play();

  // 結果を取得
  const finalResult = drawOmikuji();

  // 音再生と同時にアニメーション開始
  animateResult(finalResult, () => {
    // アニメーション終了後に出現回数を更新して確率表を更新
    resultCounts[finalResult]++;
    displayProbabilityTable();
  });
});

// ページロード時に確率表を表示
displayProbabilityTable();
