"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (schema) => {
    return (req, res, next) => {
        const issues = [];
        const keys = Object.keys(schema);
        keys.forEach(key => {
            if (schema[key]) {
                const validationRes = schema[key].safeParse(req[key]);
                if (!validationRes.success) {
                    issues.push(...validationRes.error.issues.map(issue => issue));
                }
            }
        });
        if (issues.length) {
            return res.status(400).json({ errMsg: "validation Error", issues });
        }
        return next();
    };
};
exports.validation = validation;
//# sourceMappingURL=validation.middleware.js.map