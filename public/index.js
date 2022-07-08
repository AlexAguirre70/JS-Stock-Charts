import { Chart } from "chart.js";



function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

 //let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b18ff0b8dcb44a8ba373b1c2938aaafb');
 // let results = response.json;
    
    const {GME,MSFT,DIS,BNTX}= mockData;
    const stocks = [GME,MSFT,DIS,BNTX];
    stocks.forEach(stock => stock.values.reverse())
   

//  Create base chart
new Chart (timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label: stock.meta.symbol,
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
            data: stock.values.map(value => parseFloat(value.high))
        }))
    }
});
}

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}


main()