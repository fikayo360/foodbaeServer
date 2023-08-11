"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
};
exports.default = validateEmail;
