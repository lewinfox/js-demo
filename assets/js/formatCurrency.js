document.getElementById("curr-submit").addEventListener("click", (e) => {

    e.preventDefault();

    let amount, prefix, minorLimit, majorSep, decimalSep, currString;

    amount = document.getElementById("curr-amount").value;
    prefix = document.getElementById("curr-prefix").value;
    minorLimit = document.getElementById("curr-minor-units-limit").value;
    majorSep = document.getElementById("curr-major-unit-sep").value;
    decimalSep = document.getElementById("curr-decimal-sep").value;
    output = document.getElementById("curr-output");

    if (amount) {
        currString = formatCurrency(amount, prefix, minorLimit, majorSep, decimalSep);
        output.innerHTML = `<div class="alert alert-success">${currString}</div>`;
    } else {
        output.innerHTML = `<div class="alert alert-danger" role="alert">
        No amount was supplied - please try again
        </div>`;
    }
})

const formatCurrency = (amount,
                        prefix = '£',
                        displayMinorUnitsLimit = 10000,
                        majorSep = ',',
                        decimalSep = '.') => {

    let major, minor;

    // Handle negatives
    if (amount < 0) {
        amount = Math.abs(amount);
        prefix = '-' + prefix;
    }

    // Are we going to display minor units?
    let truncateMinorUnits = parseFloat(amount) >= displayMinorUnitsLimit;

    // Define a rounding function to handle input like 123.4567.  Note that this
    // will not insert decimals - 10 is not converted to 10.00
    const round = (number, decimals) => {

        if (typeof(number) != 'number') {
            number = parseFloat(number);
        }

        if (typeof(decimals) != 'number') {
            decimals = parseInt(decimals);
        }

        // Allow positive and negative values for "decimals". While not relevant
        // for currency, this might be useful in other scenarios
        if (decimals < 0) {
            decimals = Math.abs(decimals);
            // Decrease the size of the number by (decimals) orders of magnitude,
            // use built-in round function, then increase by (decimals) OOM.
            return Number(Math.round(number + 'e-' + decimals) + 'e' + decimals);
        } else {
            // Increase the size of the number by (decimals) orders of magntude,
            // use the built-in round function to round the result, and then reduce
            // by (decimals) OOM again.
            return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
        }
    }

    if (truncateMinorUnits) {
        // Round to nearest major unit
        amount = round(amount, 0);
    } else {
        // Round to nearest minor unit
        amount = round(amount, 2);
    }

    // We need a string to split out major and minor units
    if (typeof(amount) == 'number') {
        amount = amount.toString();  // TODO: rewrite with int() and %?
    }

    // Split on decimal point if there is one
    if (amount.includes('.')) {
        amount = amount.split('.');
        major = amount[0];           // Pounds, dollars
        minor = amount[1];           // Pence, cents

        if (minor.length == 1) {
            // Pad single-digit decimals (e.g. 10.5 => 10.50)
            minor += "0";
        }
    } else {
        // If no decimal point, manually generate "00" for minor units
        major = amount;
        minor = "00";
    }

    // Do we need to add separator formatting to major units? This regex asserts
    // that a point is followed by three digits AND that it is followed by a
    // number of digits that is divisible by three. If both conditions are met
    // the major separator is inserted at that position.
    major = major.replace(/\B(?=(\d{3})+(?!\d))/g, majorSep)

    if (truncateMinorUnits) {
        return `${prefix}${major}`
    } else {
        return `${prefix}${major}${decimalSep}${minor}`
    }
}
