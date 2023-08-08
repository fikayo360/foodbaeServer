"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
const uuid_1 = require("uuid");
class FoodModel {
    createFood(title, image, category, description, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const query = `INSERT INTO food (id,title, image, description,category, price)
        VALUES ('${id}','${title}','${image}','${description}','${category}','${price}');`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`created successfully`);
                const food = {
                    id, title, image, category, description, price
                };
                return food;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    updateFood(id, ntitle, nimage, ncategory, ndescription, nprice) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `UPDATE food 
        SET id = '${id}', title = '${ntitle}', image = '${nimage}', category = '${ncategory}', description = '${ndescription}', price = '${nprice}' WHERE id = '${id}';`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`created successfully`);
                return null;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    deleteFood(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM food WHERE id = '${id}';`;
            try {
                const result = yield connect_1.default.query(query);
                console.log(`deleted successfully`);
                return null;
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    getFoodByTitle(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM food WHERE title = '${name}';`;
            try {
                const result = yield connect_1.default.query(query);
                if (result.rows.length === 0) {
                    return null;
                }
                else {
                    const food = result.rows;
                    return food;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    getFoodByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM food WHERE category = '${category}';`;
            try {
                const result = yield connect_1.default.query(query);
                if (result.rows.length === 0) {
                    return null;
                }
                else {
                    const food = result.rows;
                    return food;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
    getAllFoods() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM food;`;
            try {
                const result = yield connect_1.default.query(query);
                if (result.rows.length === 0) {
                    return null;
                }
                else {
                    const food = result.rows;
                    return food;
                }
            }
            catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
        });
    }
}
exports.default = FoodModel;
