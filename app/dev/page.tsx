export default function DevPage() {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-primary-text">Mimo - デザインシステム</h1>
      
      {/* カラーパレット */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">カラーパレット</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="Primary" className="bg-primary" hex="#FFCE00" />
          <ColorSwatch name="Primary Hover" className="bg-primary-hover" hex="#E6B900" />
          <ColorSwatch name="Secondary" className="bg-secondary" hex="#FFF3C3" />
          <ColorSwatch name="Accent" className="bg-accent" hex="#E4572E" />
          <ColorSwatch name="Success" className="bg-success" hex="#10B981" />
          <ColorSwatch name="Error" className="bg-error" hex="#EF4444" />
          <ColorSwatch name="Warning" className="bg-warning" hex="#F59E0B" />
          <ColorSwatch name="Info" className="bg-info" hex="#3B82F6" />
        </div>
      </section>

      {/* 背景色 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">背景色</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorSwatch name="Background" className="bg-background border border-border" hex="#FFFFFF" />
          <ColorSwatch name="Gray Background" className="bg-gray-background" hex="#F9F9F9" />
          <ColorSwatch name="Foreground" className="bg-foreground" hex="#171717" />
        </div>
      </section>

      {/* テキストカラー */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">テキストカラー</h2>
        <div className="bg-background border border-border rounded p-6 space-y-3">
          <p className="text-primary-text text-lg">Primary Text - #1A1A1A (メインテキスト：見出しやタイトルなど)</p>
          <p className="text-on-primary-text text-lg">On Primary Text - #2C2C2C (プライマリ上のテキスト：本文など)</p>
          <p className="text-secondary-text text-lg">Secondary Text - #6B6B6B (補助テキスト：補助説明など)</p>
          <p className="text-muted-text text-lg">Muted Text - #9B9B9B (控えめなテキスト：投稿日時など)</p>
        </div>
      </section>

      {/* フォント */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">フォント</h2>
        <div className="space-y-6">
          {/* Geist Sans */}
          <div className="bg-background border border-border rounded p-6">
            <h3 className="text-xl font-bold text-primary-text mb-4">Geist Sans（サンセリフ）</h3>
            <p className="text-secondary-text mb-4">UI全般、通常のテキストに使用するフォントです。デフォルトで適用されます。</p>
            <div className="space-y-3 bg-gray-background p-4 rounded">
              <p className="font-sans text-3xl font-bold">見出しテキスト</p>
              <p className="font-sans text-lg">本文テキスト - これはメモの内容です。読みやすさを重視したフォントです。</p>
              <p className="font-sans text-base">通常サイズ - ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789</p>
              <p className="font-sans text-sm">小さいテキスト - あいうえおかきくけこ アイウエオカキクケコ</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-secondary-text">使用例: 見出し、ボタン、メモ内容、ラベル、一般的なUI要素</p>
              <code className="text-xs bg-gray-background px-2 py-1 rounded font-mono">className="font-sans"</code>
              <span className="text-muted-text text-xs ml-2">※デフォルトで適用されるため、通常は指定不要</span>
            </div>
          </div>

          {/* Geist Mono */}
          <div className="bg-background border border-border rounded p-6">
            <h3 className="text-xl font-bold text-primary-text mb-4">Geist Mono（等幅）</h3>
            <p className="text-secondary-text mb-4">コード、タイムスタンプ、数値データなど、整列が重要な箇所に使用します。</p>
            <div className="space-y-3 bg-gray-background p-4 rounded">
              <p className="font-mono text-lg">等幅フォント - コード表示に最適</p>
              <p className="font-mono text-base">const memo = "Hello World";</p>
              <p className="font-mono text-sm">2024-11-05 14:30:45</p>
              <p className="font-mono text-sm">ID: #123456 | 文字数: 128 / 512</p>
              <div className="font-mono text-xs space-y-1">
                <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p>abcdefghijklmnopqrstuvwxyz</p>
                <p>0123456789 !@#$%^&*()</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-secondary-text">使用例: タイムスタンプ、文字数カウント、ID、コードブロック</p>
              <code className="text-xs bg-gray-background px-2 py-1 rounded font-mono">className="font-mono"</code>
            </div>
          </div>

          {/* 使い分けの例 */}
          <div className="bg-background border border-border rounded p-6">
            <h3 className="text-xl font-bold text-primary-text mb-4">実際の使用例</h3>
            <div className="bg-card-background border border-border rounded p-4 space-y-3">
              <h4 className="font-sans text-lg font-bold text-primary-text">メモのタイトル</h4>
              <p className="font-sans text-base text-on-primary-text">
                これはメモの本文です。Geist Sansフォントを使用しているため、読みやすく表示されます。
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="font-mono text-sm text-muted-text">2024-11-05 14:30</span>
                <span className="font-mono text-sm text-secondary-text">128 / 512文字</span>
              </div>
              <div className="flex gap-2">
                <span className="font-sans bg-tag-1 text-white px-3 py-1 rounded-full text-sm">学習</span>
                <span className="font-sans bg-tag-2 text-white px-3 py-1 rounded-full text-sm">仕事</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* タイポグラフィ */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">タイポグラフィ</h2>
        <div className="bg-background border border-border rounded p-6 space-y-4">
          <h1 className="text-4xl font-bold text-primary-text">見出し1 (4xl)</h1>
          <h2 className="text-3xl font-bold text-primary-text">見出し2 (3xl)</h2>
          <h3 className="text-2xl font-bold text-primary-text">見出し3 (2xl)</h3>
          <h4 className="text-xl font-bold text-primary-text">見出し4 (xl)</h4>
          <p className="text-lg text-primary-text">本文 Large (lg)</p>
          <p className="text-base text-primary-text">本文 Base (base)</p>
          <p className="text-sm text-secondary-text">補足テキスト Small (sm)</p>
          <p className="text-xs text-muted-text">極小テキスト Extra Small (xs)</p>
        </div>
      </section>

            {/* ボタン */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">ボタン</h2>
      </section>

      {/* インプット */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">インプット</h2>
      </section>

      {/* カード */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">カード</h2>
      </section>

      {/* タグ */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">タグ（カテゴリ）</h2>
      </section>

      {/* ステータスメッセージ */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-text">ステータスメッセージ</h2>
      </section>
    </div>
  );
}

// カラースウォッチコンポーネント
function ColorSwatch({ name, className, hex }: { name: string; className: string; hex: string }) {
  return (
    <div className="space-y-2">
      <div className={`${className} h-24 rounded-lg border-2 border-border shadow-sm`} />
      <div className="text-sm">
        <p className="font-bold text-primary-text">{name}</p>
        <p className="text-secondary-text font-mono">{hex}</p>
      </div>
    </div>
  );
}