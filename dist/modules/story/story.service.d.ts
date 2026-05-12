export declare const storyService: {
    create: ({ content, userId }: {
        content: string;
        userId: any;
    }) => Promise<{
        data: {
            message: string;
            storyId: string;
        };
    }>;
    getAll: () => Promise<{
        data: {
            stories: any[];
        };
    }>;
};
//# sourceMappingURL=story.service.d.ts.map