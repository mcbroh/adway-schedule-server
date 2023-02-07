"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schemaToArray = (arg) => {
    return Object.keys(arg).map((key) => (Object.assign(Object.assign({}, arg[key]), { id: key })));
};
exports.default = schemaToArray;
