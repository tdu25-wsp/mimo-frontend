'use client';

import { useState } from 'react';
import { EntryListPage } from '@/components/features/EntryListPage';
import { Tag } from '@/types/tag';
import { useMainStore } from '@/lib/stores/mainStore';
import { Ellipsis, TagIcon, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
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

const COLOR_PRESETS = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#06B6D4', 
    '#3B82F6', '#A855F7', '#EC4899', '#64748B',
];

interface TagPageClientProps {
    tag: Tag;
}

export function TagPageClient({ tag }: TagPageClientProps) {
    const getEntriesByTag = useMainStore((state) => state.getEntriesByTag);
    const deleteEntries = useMainStore((state) => state.deleteEntries);
    
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    
    const [editingName, setEditingName] = useState(tag.name);
    const [editingColor, setEditingColor] = useState(tag.color || '#3B82F6');

    const entries = getEntriesByTag(tag.id);

    const handleDeleteEntries = async (ids: string[]) => {
        await deleteEntries(ids);
    };

    const handleUpdateTag = () => {
        console.log('更新:', { name: editingName, color: editingColor });
        setShowEditDialog(false);
    };

    const handleDeleteTag = () => {
        console.log('削除:', tag.id);
        setShowDeleteDialog(false);
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
                                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
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

            {/* 編集ダイアログ */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent className="sm:max-w-[425px] bg-background border-border">
                    <DialogHeader>
                        <DialogTitle className="text-primary-text text-xl font-bold">タグを編集</DialogTitle>
                        <DialogDescription className="text-secondary-text">
                            タグの名前と色を変更できます。
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                        {/* 名前入力エリア */}
                        <div className="grid gap-2">
                            <label htmlFor="name" className="text-sm font-bold text-primary-text">
                                名前
                            </label>
                            <Input
                                id="name"
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className="col-span-3 text-primary-text"
                            />
                        </div>

                        {/* 色選択エリア */}
                        <div className="grid gap-2">
                            <span className="text-sm font-bold text-primary-text">
                                カラー
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {COLOR_PRESETS.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setEditingColor(color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            editingColor === color 
                                                ? 'border-primary scale-110 ring-2 ring-offset-2 ring-primary/30' 
                                                : 'border-transparent hover:scale-105'
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" className="border-border text-primary-text hover:bg-gray-background">
                                キャンセル
                            </Button>
                        </DialogClose>
                        <Button 
                            onClick={handleUpdateTag} 
                            className="bg-primary text-white hover:bg-primary-hover font-bold"
                        >
                            保存
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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