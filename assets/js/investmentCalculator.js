// In the event that the HTML changes in future, this gives us a single place
// to change input mappings. Subsequent functions can refer to components.foo
// rather than needing multiple document.getElement... calls
const components = {
    amountInput: document.getElementById("investment-amount"),
    periodInput: document.getElementById("investment-period"),
    rateInput: document.getElementById("growth-rate"),
    submitButton: document.getElementById("calc-investment"),
    canvas: document.getElementById("investment-chart")
}

const calculateReturn = (amount, annualRate, months) => {

    let projections = [];
    let monthlyRate = (1 + (annualRate / 100))**(1/12);

    for (let i = 0; i <= months; i++) {
        let value = amount * (monthlyRate ** i);
        projections.push({month: i, value: value})
    }
    return projections;
}

const createChart = (amount, annualRate, months) => {

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

const addChart = (e) => {

    e.preventDefault();

    let amount = components.amountInput.value;
    let rate = components.rateInput.value;
    let period = components.periodInput.value;

    createChart(amount, rate, period);
    components.canvas.style.display = "block";
}

components.submitButton.addEventListener("click", addChart);
