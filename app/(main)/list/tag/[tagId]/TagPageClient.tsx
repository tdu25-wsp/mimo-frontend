'use client';

import { useState } from 'react';
import { EntryListPage } from '@/components/features/EntryListPage';
import { Tag } from '@/types/tag';
import { useMainStore } from '@/lib/stores/mainStore';
import { Ellipsis, TagIcon, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TagPageClientProps {
    tag: Tag;
}

export function TagPageClient({ tag }: TagPageClientProps) {
    const getEntriesByTag = useMainStore((state) => state.getEntriesByTag);
    const deleteEntries = useMainStore((state) => state.deleteEntries);
    
    const openTagEditModal = useMainStore((state) => state.openTagEditModal);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    const entries = getEntriesByTag(tag.id);

    const handleDeleteEntries = async (ids: string[]) => {
        await deleteEntries(ids);
    };

    const handleDeleteTag = () => {
        console.log('削除:', tag.id);
        // ここに実際の削除処理（deleteTagアクションなど）を追加する必要があります
        // const deleteTag = useMainStore((state) => state.deleteTag);
        // await deleteTag(tag.id);
        
        setShowDeleteDialog(false);
        // 削除後のリダイレクト処理などが通常必要です
    };

    return (
        <>
            <EntryListPage
                entries={entries}
                title={tag.name}
                showBackButton={true}
                onDelete={handleDeleteEntries}
                headerBelow={
                    <div className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <TagIcon 
                                    className="w-6 h-6" 
                                    style={{ color: tag.color || '#3B82F6' }} 
                                />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-primary-text">
                                    {tag.name}
                                </h2>
                                <p className="text-sm text-muted-text">
                                    {entries.length}件のエントリー
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-muted-text hover:text-primary-text">
                                        <Ellipsis className="w-5 h-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                        onClick={() => openTagEditModal(tag)}
                                    >
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>編集</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                        onClick={() => setShowDeleteDialog(true)}
                                        className="text-error focus:text-error"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>削除</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                }
            />
            
            {/* 削除確認ダイアログ */}
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent className="sm:max-w-[425px] bg-background border-border">
                    <DialogHeader>
                        <DialogTitle className="text-primary-text text-xl font-bold">タグを削除</DialogTitle>
                        <DialogDescription className="text-secondary-text pt-2">
                            「{tag.name}」を削除してもよろしいですか？<br />
                            <span className="text-xs text-muted-text">※タグに含まれるメモは削除されません。</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4 gap-2">
                        <DialogClose asChild>
                            <Button variant="outline" className="border-border text-primary-text hover:bg-gray-background">
                                キャンセル
                            </Button>
                        </DialogClose>
                        <Button 
                            onClick={handleDeleteTag}
                            className="bg-error hover:bg-red-600 text-white font-bold"
                        >
                            削除
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}