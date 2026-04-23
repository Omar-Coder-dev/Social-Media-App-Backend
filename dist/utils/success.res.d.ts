import { Response } from "express";
interface ISuccessRes {
    res: Response;
    data?: Object;
    message?: string;
    status?: number;
}
export declare const successRes: ({ res, message, data, status }: ISuccessRes) => void;
export {};
//# sourceMappingURL=success.res.d.ts.map