"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash2, LogOut } from "lucide-react";
import { Header } from "@/components/layout/Header";

export default function AccountPage() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleDeleteAccount = () => {
    //console.log("アカウントを削除しました");
    setShowDeleteDialog(false);
  };

  const handleLogout = () => {
    //console.log("ログアウトしました");
    setShowLogoutDialog(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header title="アカウント設定" showBackButton={true} />

      <main className="mx-auto">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start text-left h-14 px-4 text-primary-text hover:bg-gray-background hover:text-primary-text transition-colors"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-3 h-5 w-5 text-secondary-text" />
            <span className="text-base font-medium">アカウント削除</span>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-left h-14 px-4 text-primary-text hover:bg-gray-background hover:text-primary-text transition-colors"
            onClick={() => setShowLogoutDialog(true)}
          >
            <LogOut className="mr-3 h-5 w-5 text-secondary-text" />
            <span className="text-base font-medium">ログアウト</span>
          </Button>
        </div>

        {/* アカウント削除 確認ダイアログ */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-[425px] bg-background border-border">
            <DialogHeader>
              <DialogTitle className="text-primary-text text-xl font-bold">
                削除
              </DialogTitle>
              <DialogDescription className="text-secondary-text text-base pt-2">
                アカウントを削除してもよろしいですか？
                <br />
                この操作は取り消せません。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="border-border text-primary-text hover:bg-gray-background">
                  キャンセル
                </Button>
              </DialogClose>
              {/* 削除ボタン */}
              <Button
                type="submit"
                className="bg-error hover:bg-red-500 text-white font-bold"
                onClick={handleDeleteAccount}
              >
                削除
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ログアウト 確認ダイアログ */}
        <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <DialogContent className="sm:max-w-[425px] bg-background border-border">
            <DialogHeader>
              <DialogTitle className="text-primary-text text-xl font-bold">
                ログアウト
              </DialogTitle>
              <DialogDescription className="text-secondary-text text-base pt-2">
                現在の端末からログアウトしてもよろしいですか？
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="border-border text-primary-text hover:bg-gray-background">
                  キャンセル
                </Button>
              </DialogClose>
              <Button 
                onClick={handleLogout}
                className="bg-primary hover:bg-primary-hover text-white font-bold"
              >
                ログアウト
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}