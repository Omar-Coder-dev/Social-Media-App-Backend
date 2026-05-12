import { Secret, SignOptions } from 'jsonwebtoken';
export declare const createToken: (data: string | object, signature: Secret, options?: SignOptions) => string;
export declare const verifyToken: (token: string, signature: Secret) => string | import("jsonwebtoken").JwtPayload;
export declare const decodeToken: (token: string) => string | import("jsonwebtoken").JwtPayload | null;
//# sourceMappingURL=token.d.ts.map