'use strict';

const SPAM_WORDS = [
    `1xBet`,
    `XXX`,
];

function checkSpam(str) {

    for (let spamWord of SPAM_WORDS) {

        if (str.toLowerCase().includes(spamWord.toLowerCase())) return true;

    }

    return false;
}