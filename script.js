const apiKey = 'cuh2nqpr01qva71sq3u0cuh2nqpr01qva71sq3ug'; // ここにFinnhubのAPIキーを入力

async function fetchUSDJPY() {
    const url = `https://finnhub.io/api/v1/forex/rates?base=USD&symbols=JPY&token=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // 最新の価格を取得
        const price = data.rates.JPY;
        
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
