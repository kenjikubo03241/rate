async function fetchUSDJPY() {
    const url = "https://query1.finance.yahoo.com/v8/finance/chart/USDJPY=X?interval=1m";

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // 最新の価格を取得
        const price = data.chart.result[0].meta.regularMarketPrice;
        
        // HTMLに表示
        document.getElementById("usd-jpy-rate").textContent = price.toFixed(2);
    } catch (error) {
        console.error("データ取得エラー:", error);
        document.getElementById("usd-jpy-rate").textContent = "エラー";
    }
}

// 1秒ごとに更新
setInterval(fetchUSDJPY, 1000);

// 初回実行
fetchUSDJPY();
