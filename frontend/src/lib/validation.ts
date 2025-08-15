function multiplyByWeigths(charList: string[], weigths: number[]) {
    let first_result = 0;
    charList.forEach((char, i) => {
        const v = Number(char);
        first_result += v * weigths[i]
    })
    return first_result;
}

export function isPersonalIdentificationNumberValid(codeString: string) {
    const charList = codeString.split("");
    const lastChar = Number(charList.pop());

    const weigths_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const weigths_2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

    const first_result = multiplyByWeigths(charList, weigths_1);
    const first_dividedBy11 = first_result % 11;
    if (first_dividedBy11 < 10) {
        return lastChar == first_dividedBy11;
    }

    const second_result = multiplyByWeigths(charList, weigths_2);
    const second_dividedBy11 = second_result % 11;
    if (second_dividedBy11 < 10) {
        return lastChar == second_dividedBy11;
    }
    else if (second_dividedBy11 == 10) {
        return lastChar == second_dividedBy11;
    }

    return false
}
