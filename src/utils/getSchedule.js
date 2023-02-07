"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const node_1 = __importDefault(require("read-excel-file/node"));
const readSchema_1 = __importDefault(require("./readSchema"));
const fetchHolidays_1 = __importDefault(require("./fetchHolidays"));
const constants_1 = require("./constants");
const writeSchema_1 = __importDefault(require("./writeSchema"));
const schemaToArray_1 = __importDefault(require("./schemaToArray"));
const getSchedule = async () => {
    const holidays = await (0, fetchHolidays_1.default)((0, dayjs_1.default)().format("YYYY"));
    const { data } = await (0, readSchema_1.default)();
    if (data) {
        return (0, schemaToArray_1.default)(data);
    }
    const schedule = (await (0, node_1.default)(constants_1.schemaXlsxPath, {
        sheet: "Schedule 2023",
    })
        .then((rows) => {
        const users = new Set();
        rows.forEach((row, index) => {
            if (index + 1 >= 16 &&
                row[0] !== null &&
                row[0] !== "Responsible person") {
                users.add(row[0]);
            }
        });
        const usersArray = Array.from(users);
        const today = new Date();
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        const days = {};
        let userIndex = 0;
        for (let d = new Date("2023-01-16T19:31:09.284Z"); d <= endOfYear; d.setDate(d.getDate() + 1)) {
            const holiday = holidays.find(({ date }) => {
                return ((0, dayjs_1.default)(date).format("YYYY-MM-DD") === (0, dayjs_1.default)(d).format("YYYY-MM-DD"));
            });
            const isSaturday = d.getDay() === 6;
            const isRedDay = d.getDay() === 0 || holiday;
            days[(0, dayjs_1.default)(d).format("YYYYMMDD")] = {
                date: new Date(d),
                isHoliday: isRedDay,
                restDay: isRedDay || isSaturday,
                user: isRedDay || isSaturday
                    ? null
                    : usersArray[userIndex++ % usersArray.length],
            };
        }
        return days;
    })
        .catch((err) => {
        console.log(err);
    }));
    await (0, writeSchema_1.default)(schedule);
    return (0, schemaToArray_1.default)(schedule);
};
exports.default = getSchedule;
