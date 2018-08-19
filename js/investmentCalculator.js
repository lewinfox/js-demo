let components = {
    submit: document.getElementById("calc-investments"),
    amount: parseFloat(document.getElementById("investment-amount").value),
    period: parseInt(document.getElementById("investment-period").value),
    rate: parseFloat(document.getElementById("growth-rate").value)
}

function calculateReturn(amount, annualRate, months) {
    let monthlyRate = (1 + (annualRate / 100))**(1/12);
    return amount * (monthlyRate ** months);
}
