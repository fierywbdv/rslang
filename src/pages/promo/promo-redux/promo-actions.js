const { AUTORIZATION, DISAUTORIZATION } = require("./promo-types");

export function autorization() {
    return {
        type: AUTORIZATION
    }
}

export function disAutorization() {
    return {
        type: DISAUTORIZATION
    }
}