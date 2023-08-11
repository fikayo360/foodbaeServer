"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createTokenUser = (user) => {
    return { username: user.username, userId: user.id };
};
exports.default = createTokenUser;
