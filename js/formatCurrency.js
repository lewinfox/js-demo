function formatCurrency(amount,
                        prefix = '£',
                        displayMinorUnitsLimit = 10000,
                        majorSep = ',',
                        decimalSep = '.')
{

    let major, minor;
    let truncateMinorUnits = parseFloat(amount) >= displayMinorUnitsLimit;

    // Define a rounding function to handle input like 123.4567.  Note that this
    // will not insert decimals - 10 is not converted to 10.00
    function round(number, decimals) {

        if (typeof(number) != 'number') {
            number = parseFloat(number);
        }
        return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals)
    }

    amount = round(amount, 2);

    // We need a string to split out major and minor units
    if (typeof(amount) == 'number') {
        amount = amount.toString();
    }

    // Split on decimal point if there is one
    if (amount.includes('.')) {
        amount = amount.split('.');
        major = amount[0];           // Pounds, dollars
        minor = amount[1];           // Pence, cents
        if (minor.length == 1) {
            minor += "0";
        }
    } else {
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
