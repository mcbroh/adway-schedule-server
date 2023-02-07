"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const constants_1 = require("./constants");
const writeSchema = async (arg) => {
    return new Promise(async (resolve) => {
        try {
            await (0, fs_1.writeFileSync)(constants_1.schemaFilePath, JSON.stringify(arg, null, 2));
            resolve(true);
        }
        catch (error) {
            resolve(false);
        }
    });
};
exports.default = writeSchema;
