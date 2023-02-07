"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryStringJsonSchema = exports.response500Schema = exports.responseOkSchema = void 0;
exports.responseOkSchema = {
    type: "object",
    properties: {
        schedule: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    user: { type: "string" },
                    date: { type: "string" },
                    isHoliday: { type: "boolean" },
                    restDay: { type: "boolean" },
                },
            },
        },
    },
};
exports.response500Schema = {
    type: "object",
    properties: {
        error: { type: "string" },
    },
};
exports.queryStringJsonSchema = {
    key1: { type: "string" },
    key2: { type: "string" },
};
