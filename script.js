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

let attemptCount = 0; // 試行回数をカウント
  
// 確率に応じて結果を選ぶ関数
function drawOmikuji() {
  const random = Math.random() * 100; // 0～99.999...を生成
  let cumulativeProbability = 0;
  
  for (const item of omikuji) {
    cumulativeProbability += item.probability;
    if (random < cumulativeProbability) {
      return item;
    }
  }
}
  
// 確率表を画面に表示する関数
function displayProbabilityTable() {
  const listElement = document.getElementById("probability-list");
  omikuji.forEach(({ result, probability }) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${result}: ${probability}%`;
    listElement.appendChild(listItem);
  });
}
  
// おみくじを引くボタンの動作 document.getElementById("draw-button").addEventListener("click", () => {
  const sound = document.getElementById("omikuji-sound");
  const resultElement = document.getElementById("result");
  const probabilityElement = document.getElementById("probability");
  const attemptElement = document.getElementById("attempt-count");

  // 結果表示を一時的にリセット
  resultElement.textContent = "がらがらがら〜";

  // 音を再生
  sound.play();

  // 音の再生後に結果を表示
  sound.onended = () => {
    const { result, probability } = drawOmikuji();

    // 試行回数を増やして更新
    attemptCount++;
    attemptElement.textContent = `試行回数: ${attemptCount}`;

    resultElement.textContent = `結果: ${result}`;
  };
});
  
// ページロード時に確率表を表示
displayProbabilityTable();
