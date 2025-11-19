export interface Memo {
    id: string;
    userId: string;
    tagId: string;
    content: string;
    autoTagId: string | null;
    manualTagId: string | null;
    shareUrlToken: string | null;
    createdAt: string;
    updatedAt: string;
}