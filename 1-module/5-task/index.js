'use strict';

const ELLIPSIS = "…";

function truncate(str, maxlength) {

    return (str.length <= maxlength) ? str
        : str.slice(0, --maxlength) + ELLIPSIS;

}