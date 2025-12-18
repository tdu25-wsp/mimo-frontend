'use client';

import { EntryListPage } from '@/components/features/EntryListPage';
import { Tag } from '@/types/tag';
import { useMainStore } from '@/lib/stores/mainStore';
import { Ellipsis, TagIcon, SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMemo } from 'react';

interface TagPageClientProps {
    tag: Tag;
}

export function TagPageClient({ tag: initialTag }: TagPageClientProps) {
    const deleteEntries = useMainStore((state) => state.deleteEntries);

    const openTagEditSheet = useMainStore((state) => state.openTagEditSheet);
    const openDeleteDialog = useMainStore((state) => state.openDeleteDialog);

    const allEntries = useMainStore((state) => state.entries);
    const allTags = useMainStore((state) => state.tags);

    const tag = useMemo(() => {
        return allTags.find(t => t.id === initialTag.id) || initialTag;
    }, [allTags, initialTag.id]);

    const entries = useMemo(() => {
        return allEntries.filter((e) => {
            if (e.type === 'memo') {
                return e.autoTagIds.includes(tag.id) || e.manualTagIds.includes(tag.id);
            } else {
                return e.tagsIds?.includes(tag.id);
            }
        });
    }, [allEntries, tag.id]);

    const handleDeleteEntries = async (ids: string[]) => {
        await deleteEntries(ids);
    };

    return (
        <>
            <EntryListPage
                entries={entries}
                title={tag.name}
                showBackButton={true}
                headerBelow={
                    <div className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center">
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
                                        onClick={() => openTagEditSheet(tag)}
                                    >
                                        <SquarePen className="mr-2 h-4 w-4" />
                                        <span>編集</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => openDeleteDialog({ type: 'tag', id: tag.id, name: tag.name })}
                                        className="text-error focus:text-error"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4 text-error" />
                                        <span>削除</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                }
            />
        </>
    );
}