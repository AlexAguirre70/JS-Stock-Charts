function getColor(stock){
    if(stock === "GME"){
        return 'red'
    }
    if(stock === "MSFT"){
        return 'blue'
    }
    if(stock === "DIS"){
        return 'green'
    }
    if(stock === "BNTX"){
        return 'yellow'
    }
}

async function main() {
    // Create the Canvas Variables
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    //get stock values via api
    const response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=b18ff0b8dcb44a8ba373b1c2938aaafb')   
    // parse into JSON to push objects into an  array
    const result = await response.json()
    // declare and intialize each objects named the ticker symbol
    const { GME, MSFT, DIS, BNTX } = result;
    //declare the stock array of objects created
    const stocks = [GME, MSFT, DIS, BNTX];
    stocks.forEach( stock => stock.values.reverse())

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
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

    // High Chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values)
                ))
            }]
        }
    });

    // Average Chart
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                label: 'Average',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    calculateAverage(stock.values)
                ))
            }]
        }
    });
}
// function to find the highest value of each stock for the bar chart
function findHighest(values) {
    let highest = 0;
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest
}
// function to determine the average for the pie chart
function calculateAverage(values) {
    let total = 0;
    values.forEach(value => {
        total += parseFloat(value.high)
    })
    return total / values.length
}

main()