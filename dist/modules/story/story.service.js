"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyService = void 0;
const connection_1 = require("../../DB/connection");
exports.storyService = {
    create: async ({ content, userId }) => {
        const storyId = `story:${userId}:${Date.now()}`;
        const storyData = JSON.stringify({ content, userId, createdAt: new Date() });
        // Use an options object for the expiry
        // EX: 86400 is the 24-hour limit in seconds
        await connection_1.RedisClient.set(storyId, storyData, {
            EX: 86400
        });
        return { data: { message: "Story shared! It will vanish in 24h.", storyId } };
    },
    getAll: async () => {
        if (!connection_1.RedisClient)
            return { data: { stories: [] } };
        const keys = await connection_1.RedisClient.keys("story:*");
        const stories = [];
        for (const key of keys) {
            const data = await connection_1.RedisClient.get(key);
            if (data)
                stories.push(JSON.parse(data));
        }
        return { data: { stories } };
    }
};
//# sourceMappingURL=story.service.js.map