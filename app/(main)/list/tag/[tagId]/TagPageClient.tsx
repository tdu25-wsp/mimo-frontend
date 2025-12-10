'use client';

import { EntryListPage } from '@/components/features/EntryListPage';
import { Tag } from '@/types/tag';
import { useMainStore } from '@/lib/stores/mainStore';
import { Ellipsis, TagIcon } from 'lucide-react';

interface TagPageClientProps {
    tag: Tag;
}

export function TagPageClient({ tag }: TagPageClientProps) {
    const getEntriesByTag = useMainStore((state) => state.getEntriesByTag);
    const deleteEntries = useMainStore((state) => state.deleteEntries);

    const entries = getEntriesByTag(tag.id);

    const handleDelete = async (ids: string[]) => {
        await deleteEntries(ids);
    };

    return (
        <EntryListPage
            entries={entries}
            title={tag.name}
            showBackButton={true}
            onDelete={handleDelete}
            headerBelow={
                <div className="p-4">
                    <div className="flex items-center gap-3">
                        {/* タグアイコン */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                        >
                            <TagIcon className="w-8 h-8 text-blue" style={tag.color ? { color: tag.color } : {}} />
                        </div>

                        {/* タグ名 */}
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-primary-text">
                                {tag.name}
                            </h2>
                            <p className="text-sm text-muted-text">
                                {entries.length}件のエントリー
                            </p>
                        </div>

                        {/* タグ編集メニューボタン */}
                        <Ellipsis className="text-muted-text" />
                    </div>
                </div>
            }
        />
    );
}