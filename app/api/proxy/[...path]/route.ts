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
  // Content-Encodingを削除して、fetchが自動デコードするようにする
  headers.delete("content-encoding");
  headers.delete("content-length");

  try {
    const response = await fetch(url, {
      method: request.method,
      headers: headers,
      body: body,
      cache: "no-store",
    });

    // レスポンスのログを追加
    console.log(`[Proxy] ${request.method} ${pathString} -> Status: ${response.status}`);
    console.log(`[Proxy] Response Content-Type:`, response.headers.get('content-type'));
    
    // レスポンスボディを読み取る
    let responseText: string;
    try {
      responseText = await response.text();
      console.log(`[Proxy] Response body length: ${responseText.length} bytes`);
      if (responseText.length < 1000) {
        console.log(`[Proxy] Response body:`, responseText);
      } else {
        console.log(`[Proxy] Response body (first 500 chars):`, responseText.substring(0, 500));
      }
    } catch (textError) {
      console.error(`[Proxy] Failed to read response text:`, textError);
      throw new Error('Failed to read response from backend');
    }

    const responseHeaders = new Headers();
    // 重要なヘッダーのみコピー
    const contentType = response.headers.get('content-type');
    if (contentType) {
      responseHeaders.set('content-type', contentType);
    }
    // Content-EncodingとContent-Lengthは設定しない（ブラウザが自動処理）

    // --- Cookie修正の最終版 ---
    const cookies = response.headers.getSetCookie();
    console.log(`[Proxy] Set-Cookie count:`, cookies.length);
    
    if (process.env.NODE_ENV === "development") {
      // 開発環境: SameSite=Lax
      if (cookies.length > 0) {
        cookies.forEach((cookieValue) => {
          console.log(`[Proxy Dev] Original cookie:`, cookieValue);
          const newSetCookie =
            cookieValue
              .replace(/; Path=[^;]+/gi, "")
              .replace(/; SameSite=[^;]+/gi, "")
              .replace(/; Secure/gi, "") +
            "; Path=/; SameSite=Lax";

          console.log(`[Proxy Dev] Modified cookie:`, newSetCookie);
          responseHeaders.append("set-cookie", newSetCookie);
        });
      }
    } else {
      // 本番環境: SameSite=None; Secure
      if (cookies.length > 0) {
        cookies.forEach((cookieValue) => {
          console.log(`[Proxy Prod] Original cookie:`, cookieValue);
          const newSetCookie =
            cookieValue
              .replace(/; Path=[^;]+/gi, "")
              .replace(/; SameSite=[^;]+/gi, "")
              .replace(/; Secure/gi, "") + 
            "; Path=/; SameSite=None; Secure";

          console.log(`[Proxy Prod] Modified cookie:`, newSetCookie);
          responseHeaders.append("set-cookie", newSetCookie);
        });
      }
    }
    // -------------------------

    // レスポンスボディを新しいResponseとして返す
    return new NextResponse(responseText, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("[Proxy] Error:", error);
    console.error("[Proxy] URL:", url);
    console.error("[Proxy] Method:", request.method);
    
    if (error instanceof Error) {
      console.error("[Proxy] Error message:", error.message);
      console.error("[Proxy] Error stack:", error.stack);
    }
    
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const DELETE = proxy;
export const PATCH = proxy;
