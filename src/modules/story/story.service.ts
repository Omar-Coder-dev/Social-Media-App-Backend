import { RedisClient } from "../../DB/connection";

export const storyService = {
    create: async ({ content, userId }: { content: string; userId: any }) => {
        const storyId = `story:${userId}:${Date.now()}`;
        const storyData = JSON.stringify({ content, userId, createdAt: new Date() });

        // Use an options object for the expiry
        // EX: 86400 is the 24-hour limit in seconds
        await RedisClient!.set(storyId, storyData, {
            EX: 86400
        });

        return { data: { message: "Story shared! It will vanish in 24h.", storyId } };
    },

    getAll: async () => {
        if (!RedisClient) return { data: { stories: [] } };

        const keys = await RedisClient.keys("story:*");
        const stories = [];

        for (const key of keys) {
            const data = await RedisClient.get(key);
            if (data) stories.push(JSON.parse(data));
        }

        return { data: { stories } };
    }
};