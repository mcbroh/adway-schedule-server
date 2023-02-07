"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
const schemaRoutes_1 = require("./router/schemaRoutes");
exports.server = (0, fastify_1.default)();
async function main() {
    await exports.server.register(cors_1.default);
    // routes must be initiated last
    await (0, schemaRoutes_1.initRoutes)(exports.server);
    try {
        const port = process.env.PORT || 8080;
        await exports.server.listen({ port: 8080 });
        console.log(`Server ready on port ${port}`);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}
main();
