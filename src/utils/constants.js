"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaXlsxPath = exports.schemaFilePath = void 0;
const path_1 = __importDefault(require("path"));
exports.schemaFilePath = path_1.default.join(__dirname, "../files", "schedule.json");
exports.schemaXlsxPath = path_1.default.join(__dirname, "../files", "schedule.xlsx");
