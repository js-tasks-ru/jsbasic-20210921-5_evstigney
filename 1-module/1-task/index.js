'use strict';

function factorial(n) {
    n = parseInt(n);

    if (n === 0) return 1;

    if (!n || n < 0) return null;

    for (let i = n - 1; i > 0; i--) {
        n *= i;
    }

    return n;
}
