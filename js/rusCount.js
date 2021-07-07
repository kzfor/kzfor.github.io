const ancientRusDigits = new Map();
const ancientRusTens = new Map();

{
    // Filling ancientRusDigits and ancientRusTens maps
    let ancientRusDigitSet = "НОЛЬ ЦЕЛКОВЫЙ ПОЛУШКА ЧЕТВЕРТУШКА ОСЬМУШКА ПУДОВИЧОК МЕДЯЧОК СЕРЕБРЯЧОК ЗОЛОТНИЧОК ДЕВЯТИЧОК ДЕСЯТИЧОК";
    ancientRusDigitSet = ancientRusDigitSet.split(' ');
    for (let i = 0; i <= 10; i++) {
        ancientRusDigits.set(i, ancientRusDigitSet[i]);
        if (i == 0) continue
        else if (i == 1) ancientRusTens.set(i, "ДЕСЯТИЧОК")
        else if (i == 2) ancientRusTens.set(i, "ДЕСЯТИЧКА")
        else ancientRusTens.set(i, "ДЕСЯТИЧКОВ");
    }
}

function _digitToArray(digit) {
    let result = [];
    while (Math.trunc(digit) > 0) {
        result.push(digit % 10);
        digit = Math.trunc(digit / 10);
    }
    return result.reverse();
}

export function arabicToAncientRus(digit) {
    digit = Math.abs(digit);
    if (digit < 11) return ancientRusDigits.get(digit)
    else if (digit <= 100) {
        let ten = Math.trunc(digit / 10);
        let one = digit % 10;
        let resultString = '';
        if (ten == 1) {
            resultString = `${ancientRusTens.get(ten)} `;
        }
        else {
            resultString = `${ancientRusDigits.get(ten)} ${ancientRusTens.get(ten)} `;
        }
        if (one > 0) resultString += `И ${ancientRusDigits.get(one)} `;
        return resultString;
    } else if (digit <= Number.MAX_SAFE_INTEGER) {
        let resultString = '';
        let digitArray = _digitToArray(digit);
        for (let i = 0; i < digitArray.length - 2; i++) {
            let d = digitArray[i];
            if (d == 0) continue;
            resultString += `${ancientRusDigits.get(d)} УМНОЖИТЬ НА ДЕСЯТИЧОК В СТЕПЕНИ `;
            resultString += `${arabicToAncientRus(digitArray.length - i - 1)} `;
            if (digitArray.slice(i + 1, digitArray.length).some((x) => x > 0)) {
                resultString += " ПЛЮС ";
            } 
        }
        if (digit % 100 > 0) resultString += arabicToAncientRus(digit % 100);
        return resultString;
    } else {
        return "ТЫ ХОТЯ БЫ В ДЕСЯТИЧНОЙ СИСТЕМЕ ЭТО ЧИСЛО САМ СМОЖЕШЬ ПРОЧИТАТЬ!?"
    }
}
