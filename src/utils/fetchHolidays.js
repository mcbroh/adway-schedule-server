"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchHolidays = (year) => {
    return (0, node_fetch_1.default)(`https://date.nager.at/api/v2/publicholidays/${year}/SE`, {}).then((res) => res.json());
};
exports.default = fetchHolidays;
