"use client"

import { MoreHorizontalIcon, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMainStore } from "@/lib/stores/mainStore"
import { Entry } from "@/types/entry"

export const EntryCardDropdownMenu = (entry: Entry) => {
    const openEditSheet = useMainStore((state) => state.openEditSheet);
    const openDeleteDialog = useMainStore((state) => state.openDeleteDialog);

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" aria-label="Open menu" size="icon-sm">
                        <MoreHorizontalIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="end">
                    <DropdownMenuLabel>Entry Actions</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        {
                            entry?.type === 'memo' && (
                                <DropdownMenuItem onSelect={() => openEditSheet(entry)}>
                                    <div className="flex items-center text-on-primary-text">
                                        <SquarePen className="mr-2 inline h-4 w-4" />
                                        <label>編集</label>
                                    </div>
                                </DropdownMenuItem>
                            )
                        }
                        <DropdownMenuItem onSelect={() => openDeleteDialog({ type: 'entry', id: entry.id })}>
                            <div className="flex items-center text-error">
                                <Trash2 className="mr-2 inline h-4 w-4 text-error" />
                                <label>削除</label>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
