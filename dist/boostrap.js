"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importStar(require("./modules/posts/post.controller"));
const notification_controller_1 = __importStar(require("./modules/notifications/notification.controller"));
const config_1 = require("./config");
const error_handle_1 = require("./utils/errorHandle/error.handle");
const user_controller_1 = __importStar(require("./modules/users/user.controller"));
const connection_1 = require("./DB/connection");
const story_controller_1 = __importDefault(require("./modules/story/story.controller"));
const graphql_1 = require("graphql");
const express_2 = require("graphql-http/lib/use/express");
exports.app = (0, express_1.default)();
const bootstrap = async () => {
    exports.app.use(express_1.default.json());
    exports.app.use(user_controller_1.routes.base, user_controller_1.default);
    exports.app.use(post_controller_1.routes.base, post_controller_1.default);
    exports.app.use(notification_controller_1.routes.base, notification_controller_1.default);
    exports.app.use("/stories", story_controller_1.default);
    await (0, connection_1.DBconnection)();
    await (0, connection_1.testRedisConnection)();
    const schema = new graphql_1.GraphQLSchema({
        // --- QUERIES ---
        query: new graphql_1.GraphQLObjectType({
            name: "RootQueryType",
            fields: {
                sayHi: {
                    type: graphql_1.GraphQLString,
                    resolve() {
                        return "Hello From GraphQL API";
                    },
                },
                // Math with Boolean logic & Arguments entering data
                calculatePrice: {
                    type: graphql_1.GraphQLInt,
                    args: {
                        // GraphQLNonNull makes it required in Postman
                        basePrice: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
                        applyDiscount: { type: graphql_1.GraphQLBoolean }
                    },
                    // We skip the first parameter (_) and grab the arguments directly
                    resolve(_, { basePrice, applyDiscount }) {
                        let price = basePrice;
                        if (applyDiscount === true) {
                            price = price - 200; // Math
                        }
                        return price;
                    }
                }
            }
        }),
        // --- MUTATIONS ---
        mutation: new graphql_1.GraphQLObjectType({
            name: "RootMutationType",
            fields: {
                registerUser: {
                    type: graphql_1.GraphQLString,
                    args: {
                        username: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }, // Required!
                        age: { type: graphql_1.GraphQLInt }
                    },
                    resolve(_, { username, age }) {
                        return `User ${username} (Age: ${age || 'Unknown'}) entered successfully!`;
                    }
                }
            }
        })
    });
    exports.app.use("/graphql", (0, express_2.createHandler)({ schema }));
    exports.app.all(/.*/, (req, res, next) => {
        next(new error_handle_1.NotFoundException());
    });
    exports.app.use((err, req, res, next) => {
        const data = { err: err.message, status: err.statusCode || 500 };
        if (err.validationError && err.validationError.length) {
            Object.assign(data, { validationError: err.validationError });
        }
        res.status(err.statusCode || 500).json(data);
    });
    exports.app.listen(config_1.PORT, () => {
        console.log(`Server is running on port ${config_1.PORT}`);
    });
};
exports.bootstrap = bootstrap;
//# sourceMappingURL=boostrap.js.map