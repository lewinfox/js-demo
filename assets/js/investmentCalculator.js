// In the event that the HTML changes in future, this gives us a single place
// to change input mappings. Subsequent functions can refer to components.foo
// rather than needing multiple document.getElement... calls
const components = {
    amountInput: document.getElementById("investment-amount"),
    periodInput: document.getElementById("investment-period"),
    rateInput: document.getElementById("growth-rate"),
    submitButton: document.getElementById("calc-investment"),
    canvas: document.getElementById("investment-chart"),
    finalValue: document.getElementById("inv-final-value")
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
    let finalValue = values[values.length - 1];

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

    components.finalValue.innerHTML = `
    <div class="alert alert-info" role="alert">
        Final value: ${formatCurrency(finalValue)}
    </div>`

}

const addChart = (e) => {

    e.preventDefault();

    let amount = components.amountInput.value;
    let rate = components.rateInput.value;
    let period = components.periodInput.value;

    if (!amount || ! rate || !period) {
        components.finalValue.innerHTML = `
        <div class="alert alert-danger" role="alert">
            Looks like something is missing...
        </div>`
    } else {
        createChart(amount, rate, period);
        components.canvas.style.display = "block";
    }
}

components.submitButton.addEventListener("click", addChart);
