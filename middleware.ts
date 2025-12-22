import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

// 認証が不要なパス（ここに追加すれば自動で除外されます）
const publicPaths = [
  "/login",
  "/signup",
  "/forgot-password",
  "/register-id",
  "/register-password",
  "/verify-code",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 静的ファイルやAPIルートは処理せずにスルー
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. トークンの取得と検証
  const refreshToken = request.cookies.get("refresh_token")?.value;
  let isAuthenticated = false;

  if (refreshToken) {
    try {
      // JWTをデコードしてペイロードを取得（署名検証はバックエンドに任せ、ここでは中身だけ見る）
      const claims = decodeJwt(refreshToken);
      
      // 有効期限 (exp) のチェック
      // exp は秒単位なので 1000倍してミリ秒に変換
      if (claims.exp && claims.exp * 1000 > Date.now()) {
        isAuthenticated = true;
      }
    } catch (error) {
      // トークンが壊れている場合は未認証扱い
      console.error("Token decode failed:", error);
    }
  }

  // 3. パス判定
  const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));

  // ケースA: ログイン済みユーザーが「認証不要ページ（ログイン画面など）」にアクセス
  // -> ホーム画面へリダイレクト
  if (isAuthenticated && isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ケースB: 未ログインユーザーが「保護されたページ」にアクセス
  // -> ログイン画面へリダイレクト
  if (!isAuthenticated && !isPublicPage) {
    // 元のURLをクエリパラメータとして渡すと、ログイン後に元のページに戻せて親切です
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 以下のパスを除くすべてのリクエストにマッチさせる:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};