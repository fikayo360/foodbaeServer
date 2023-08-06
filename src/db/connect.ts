import { Pool } from 'pg';

const pool = new Pool({
user: 'fikayoDB',
host: 'dpg-cj6dqjcl975s738ekhtg-a',
database: 'foodbae',
password: 'nz7GdD1hiex69mQ275fo9sM2n78PjZ2C',
port: 5432
});

export default pool