"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readSchema_1 = __importDefault(require("./readSchema"));
const writeSchema_1 = __importDefault(require("./writeSchema"));
const schemaToArray_1 = __importDefault(require("./schemaToArray"));
const updateSchema = async (key1, key2) => {
    const { data, error } = await (0, readSchema_1.default)();
    if (error || !data || !data[key1] || !data[key2]) {
        return { error: error || "File not found!" };
    }
    const copyKey1data = Object.assign({}, data[key1]);
    data[key1].user = data[key2].user;
    data[key2].user = copyKey1data.user;
    const updated = await (0, writeSchema_1.default)(data);
    if (updated) {
        return { data: (0, schemaToArray_1.default)(data) };
    }
    return { error: "Could not update schema" };
};
exports.default = updateSchema;
