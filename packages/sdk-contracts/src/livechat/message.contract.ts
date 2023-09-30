export type IMessage = {
    rid: string;
    msg: string;
    files: {
        name: string;
        type: string;
        size: number;
        format: string;
        url: string;
        _id: string;
    }[];
    ts: string;
    u: {
        _id: string;
        username: string;
        name: string;
    };
    urls: [];
    _updatedAt: string;
    _id: string;
};
