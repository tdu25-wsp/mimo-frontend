import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function proxy(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const pathString = path.join("/");
  const searchParams = request.nextUrl.search;
  const url = `${API_BASE_URL}/${pathString}${searchParams}`;

  const body =
    request.method !== "GET" && request.method !== "HEAD"
      ? await request.blob()
      : undefined;

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");

  try {
    const response = await fetch(url, {
      method: request.method,
      headers: headers,
      body: body,
      cache: "no-store",
    });

    const responseHeaders = new Headers(response.headers);

    // --- Cookie修正の最終版 ---
    if (process.env.NODE_ENV === "development") {
      // 1. getSetCookie() を使って、生のCookie文字列を「配列」としてすべて取得する
      // (注意: Node.js 18+ / Next.js App Router環境で利用可能です)
      const cookies = response.headers.getSetCookie();

      if (cookies.length > 0) {
        // 2. 既存の Set-Cookie ヘッダーを一旦すべて削除する (重複・混在防止)
        responseHeaders.delete("set-cookie");

        // 3. 配列をループして、個別に書き換えて append (追加) する
        cookies.forEach((cookieValue) => {
          const newSetCookie =
            cookieValue
              // .replace(/; Secure/gi, "")           // 必要に応じて
              // .replace(/; Domain=[^;]+/gi, "")     // 必要に応じて
              .replace(/; Path=[^;]+/gi, "") // 既存Path削除
              .replace(/; SameSite=[^;]+/gi, "") + // 既存SameSite削除
            "; Path=/; SameSite=Lax"; // 強制付与

          // set ではなく append を使うことで複数行のヘッダーを出力する
          responseHeaders.append("set-cookie", newSetCookie);
        });
      }
    }
    // -------------------------

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;
