"use client"

import { useState } from "react"
import { MoreHorizontalIcon, SquarePen, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const EntryCardDropdownMenu = () => {
    const [showDeleteDialog, setDeleteDialog] = useState(false)

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
                        <DropdownMenuItem>
                            <div className="flex items-center text-on-primary-text">
                                <SquarePen className="mr-2 inline h-4 w-4" />
                                <label>編集</label>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setDeleteDialog(true)}>
                            <div className="flex items-center text-error">
                                <Trash2 className="mr-2 inline h-4 w-4 text-error" />
                                <label>削除</label>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={showDeleteDialog} onOpenChange={setDeleteDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>削除</DialogTitle>
                        <DialogDescription>
                            削除してもよろしいですか？
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">キャンセル</Button>
                        </DialogClose>
                        <Button type="submit" className="bg-error hover:bg-red-300 font-bold">削除</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
