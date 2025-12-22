"use client"

import { useMainStore } from "@/lib/stores/mainStore";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
export function DeleteDialog() {
    const deleteTarget = useMainStore((state) => state.deleteTarget);
    const closeDeleteDialog = useMainStore((state) => state.closeDeleteDialog);
    const entries = useMainStore((state) => state.entries);

    const deleteEntries = useMainStore((state) => state.deleteEntries);
    const deleteTag = useMainStore((state) => state.deleteTag);
    const isOpen = deleteTarget !== null;

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            if (deleteTarget.type === 'entry') {
                deleteEntries([deleteTarget.id]);
            }
            else if (deleteTarget.type === 'entries') {
                deleteEntries(deleteTarget.ids);
            }
            else if (deleteTarget.type === 'tag') {
                // タグ削除処理
                if (deleteTag) {
                    await deleteTag(deleteTarget.id);
                } else {
                    console.warn("deleteTag action is not implemented yet");
                }
            }
            if (deleteTarget.onSuccess) {
                deleteTarget.onSuccess();
            }

        } catch (error) {
            console.error("削除に失敗しました", error);
        } finally {
            closeDeleteDialog();
        }
    };

    // コンテンツの出し分け
    const renderContent = () => {
        if (!deleteTarget) return null;

        if (deleteTarget.type === 'tag') {
            return (
                <>
                    <DialogHeader>
                        <DialogTitle className="text-primary-text text-xl font-bold">タグを削除</DialogTitle>
                        <DialogDescription className="text-secondary-text pt-2">
                            「{deleteTarget.name}」を削除してもよろしいですか？<br />
                            <span className="text-xs text-muted-text">※タグに含まれるメモは削除されません。</span>
                        </DialogDescription>
                    </DialogHeader>
                </>
            );
        }

        if (deleteTarget.type === 'entries') {
            const targetEntries = entries.filter(e => deleteTarget.ids.includes(e.id));

            const uniqueTypes = Array.from(new Set(targetEntries.map(e => e.type)));

            const typeLabels = uniqueTypes.map(type => {
                if (type === 'memo') return 'メモ';
                if (type === 'summary') return '要約';
                if (type === 'journaling') return 'ジャーナリング要約';
                return 'データ';
            });

            const labelString = typeLabels.join('・');
            return (
                <DialogHeader>
                    <DialogTitle className="text-primary-text text-xl font-bold">一括削除</DialogTitle>
                    <DialogDescription className="text-secondary-text pt-2">
                        選択した {deleteTarget.ids.length} 件の{labelString}を削除してもよろしいですか？
                    </DialogDescription>
                </DialogHeader>
            );
        }

        const targetEntry = entries.find((e) => e.id === deleteTarget.id);
        const entryType = targetEntry?.type || 'memo'; // 見つからない場合はデフォルトでmemo

        let typeLabel = "メモ";
        if (entryType === 'summary') {
            typeLabel = "要約";
        } else if (entryType === 'journaling') {
            typeLabel = "ジャーナリング要約";
        }

        return (
            <DialogHeader>
                <DialogTitle className="text-primary-text text-xl font-bold">削除</DialogTitle>
                <DialogDescription className="text-secondary-text pt-2">
                    この{typeLabel}を削除してもよろしいですか？
                </DialogDescription>
            </DialogHeader>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && closeDeleteDialog()}>
            <DialogContent className="sm:max-w-[425px] bg-background border-border">
                {renderContent()}

                <DialogFooter className="mt-4 gap-2">
                    <Button
                        variant="outline"
                        onClick={closeDeleteDialog}
                        className="border-border text-primary-text hover:bg-gray-background"
                    >
                        キャンセル
                    </Button>
                    <Button
                        onClick={handleDelete}
                        className="bg-error hover:bg-red-600 text-white font-bold"
                    >
                        削除
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
