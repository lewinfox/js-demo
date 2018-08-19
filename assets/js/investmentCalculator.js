let components = {
    submitButton: document.getElementById("calc-investment"),
    canvas: document.getElementById("investment-chart")
}

function calculateReturn(amount, annualRate, months) {
    let returns = [];

    let monthlyRate = (1 + (annualRate / 100))**(1/12);

    for (let i = 0; i <= months; i++) {
        let value = amount * (monthlyRate ** i);
        returns.push({month: i, value: value})
    }
    return returns;
}

function createChart(amount, annualRate, months) {

    let returns = calculateReturn(amount, annualRate, months);
    let labs = returns.map(a => a.month);
    let values = returns.map(a => a.value);

    let chartOptions = {
        type: "line",
        data: {
            labels: labs,
            datasets: [{
                label: "Investment value",
                data: values
            }]
        },
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return formatCurrency(value);
                        }
                    }
                }]
            },
            title: {
                display: true,
                text: "Projected monthly investment growth"
            }
        }
    }

    let myChart = new Chart(components.canvas, chartOptions);
}

components.submitButton.addEventListener("click", (e) => {

    e.preventDefault();

    let amount = document.getElementById("investment-amount").value;
    let period = document.getElementById("investment-period").value;
    let rate = document.getElementById("growth-rate").value;

    createChart(amount, rate, period);
    components.canvas.style.display = "block";
})
