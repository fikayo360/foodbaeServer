"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const fs = require('fs');
const pool = new pg_1.Pool({
    user: 'fikayo',
    host: 'dpg-cj6dqjcl975s738ekhtg-a.oregon-postgres.render.com',
    database: 'foodbae',
    password: 'nz7GdD1hiex69mQ275fo9sM2n78PjZ2C',
    port: 5432,
    ssl: {
        rejectUnauthorized: false,
        //ca: fs.readFileSync('path/to/ca-certificate.crt')
    }
});
exports.default = pool;
