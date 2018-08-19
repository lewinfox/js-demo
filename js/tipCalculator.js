window.onload = function() {

    document.getElementById('calc-tip').addEventListener('click', () => {
        let net, tipRate, tip, total;
        net = parseFloat(document.getElementById('net-bill').value);
        tipRate = parseFloat(document.getElementById('tip-rate').value) / 100;
        tip = net * tipRate;
        total = net + tip;
        console.log(`Net: ${net}`);
        console.log(`Tip rate: ${tipRate * 100}%`);
        console.log(`Total: ${total}`);
        document.getElementById("total-amount").innerHTML = `Net: ${formatCurrency(net)}<br>
            Tip: ${formatCurrency(tip)}<br>
            Total to pay: ${formatCurrency(total)}`;
    })
}
