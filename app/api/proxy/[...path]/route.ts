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
      const setCookieHeader = responseHeaders.get("set-cookie");
      if (setCookieHeader) {
        // 既存の属性を削除して、開発環境用に強制上書きします
        const newSetCookie =
          setCookieHeader
            // .replace(/; Secure/gi, "")           // Secure削除
            // .replace(/; Domain=[^;]+/gi, "")     // Domain削除
            .replace(/; Path=[^;]+/gi, "") // 既存のPath削除
            .replace(/; SameSite=[^;]+/gi, "") + // 既存のSameSite削除
          "; Path=/; SameSite=Lax"; // Path=/ と SameSite=Lax を強制付与

        responseHeaders.set("set-cookie", newSetCookie);
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
