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
const foodModel_1 = __importDefault(require("../../models/foodModel"));
const http_status_codes_1 = require("http-status-codes");
class Food {
    createFood(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, category, description, price } = req.body;
            if (!title || !image || !category || !description || !price) {
                return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json('fields cant be empty');
            }
            try {
                const newproduct = yield foodModel_1.default.prototype.createFood(title, image, category, description, price);
                console.log(newproduct);
                res.status(http_status_codes_1.StatusCodes.OK).json("product added");
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(err);
            }
        });
    }
    updateFood(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { ntitle, nimage, ncategory, ndescription, nprice } = req.body;
            try {
                const updatedFood = yield foodModel_1.default.prototype.updateFood(id, ntitle, nimage, ncategory, ndescription, nprice);
                res.status(http_status_codes_1.StatusCodes.OK).json("Product updated");
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
    deleteFoodBYId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deleted = yield foodModel_1.default.prototype.deleteFood(id);
                res.status(http_status_codes_1.StatusCodes.OK).json("food deleted");
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
    getFoodByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const searchFood = yield foodModel_1.default.prototype.getFoodByTitle(name);
                res.status(http_status_codes_1.StatusCodes.OK).json(searchFood);
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
    allFoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { foodCategory } = req.params;
            try {
                let items;
                if (foodCategory) {
                    let items = yield foodModel_1.default.prototype.getFoodByCategory(foodCategory);
                }
                else {
                    let items = yield foodModel_1.default.prototype.getAllFoods();
                }
                res.status(http_status_codes_1.StatusCodes.OK).json(items);
            }
            catch (err) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json("error occured");
            }
        });
    }
}
exports.default = Food;
