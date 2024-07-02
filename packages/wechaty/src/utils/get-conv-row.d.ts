export declare const getConvRow: (message: {
    convId: string;
}) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string | null;
    avatar: string | null;
    friend: boolean | null;
    gender: number | null;
    type: number | null;
    weixin: string | null;
    alias: string | null;
    city: string | null;
    province: string | null;
    signature: string | null;
    phone: string[];
    address: string | null;
    star: boolean | null;
    adminIdList: string[];
    memberIdList: string[];
    topic: string | null;
    ownerId: string | null;
    preference: import(".prisma/client").Prisma.JsonValue;
    data: import(".prisma/client").Prisma.JsonValue;
} | null>;
