"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRoutes = void 0;
const schedule_schema_1 = require("../schemas/schedule.schema");
const getSchedule_1 = __importDefault(require("../utils/getSchedule"));
const updateSchema_1 = __importDefault(require("../utils/updateSchema"));
const initRoutes = async (server) => {
    server.get("/", {
        schema: {
            response: {
                200: schedule_schema_1.responseOkSchema,
            },
        },
    }, async (request, reply) => {
        const schedule = await (0, getSchedule_1.default)();
        return { schedule };
    });
    server.post("/:key1/:key2", {
        schema: {
            params: schedule_schema_1.queryStringJsonSchema,
            response: {
                200: schedule_schema_1.responseOkSchema,
                500: schedule_schema_1.response500Schema,
            },
        },
    }, async (request, reply) => {
        const { data, error } = await (0, updateSchema_1.default)(request.params.key1, request.params.key2);
        if (data) {
            return reply.send({ schedule: data });
        }
        return reply.status(500).send({ error: error });
    });
};
exports.initRoutes = initRoutes;
