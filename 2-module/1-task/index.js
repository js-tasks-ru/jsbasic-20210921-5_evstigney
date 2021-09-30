'use strict';

function sumSalary(salaries) {
    let sum = 0;

    for (let key in salaries) {

        if (isFinite(salaries[key]) && typeof salaries[key] === 'number') {
            sum += salaries[key];
        }

    }

    return sum;
}
