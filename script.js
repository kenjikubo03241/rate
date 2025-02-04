let intervalId = null;
let lastPrice = null;

async function fetchStockPrice() {
    const symbol = document.getElementById("symbol").value.toUpperCase();
    if (!symbol) {
        alert("銘柄を入力してください");
        return;
    }

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!data.chart || !data.chart.result) {
            throw new Error("データ取得に失敗しました");
        }

        const result = data.chart.result[0];
        const meta = result.meta;
        const price = result.indicators.quote[0].close.pop();
        const time = new Date(meta.regularMarketTime * 1000).toLocaleTimeString();

        document.getElementById("stock-name").textContent = `銘柄: ${symbol}`;
        document.getElementById("stock-price").textContent = `株価: ${price.toFixed(2)} USD`;
        document.getElementById("stock-time").textContent = `更新時間: ${time}`;

        // 価格変動による色変更
        const priceElement = document.getElementById("stock-price");
        if (lastPrice !== null) {
            if (price > lastPrice) {
                priceElement.className = "up";
            } else if (price < lastPrice) {
                priceElement.className = "down";
            } else {
                priceElement.className = "neutral";
            }
        }
        lastPrice = price;
    } catch (error) {
        console.error("エラー:", error);
        alert("株価データを取得できませんでした");
    }
}

function startFetching() {
    if (!intervalId) {
        fetchStockPrice();
        intervalId = setInterval(fetchStockPrice, 1000); // 1秒ごとに更新
    }
}

function stopFetching() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// 初回のデータ取得
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("symbol").value = "AAPL";  // デフォルト銘柄
    fetchStockPrice();
});
