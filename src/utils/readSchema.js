"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const constants_1 = require("./constants");
const readSchema = async () => {
    return new Promise(async (resolve) => {
        try {
            const file = await (0, fs_1.readFileSync)(constants_1.schemaFilePath, "utf-8");
            resolve({ data: JSON.parse(file) });
        }
        catch (error) {
            resolve({ error: error || "File not found!" });
        }
    });
};
exports.default = readSchema;
