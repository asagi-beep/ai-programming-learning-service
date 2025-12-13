# ダッシュボード機能完成 仕様書

## 1. ユーザーニーズ

### 対象ユーザー
- AIReviewサービスにログイン済みのユーザー

### ニーズ概要
ダッシュボード画面で各機能へ直感的にアクセスでき、最新のアクティビティを確認したい。

### 詳細ニーズ
1. **クイックアクション**: ワンクリックで主要機能（新規レビュー、レビュー履歴、レポート設定）に遷移したい
2. **アクティビティ確認**: 自分の最近の操作履歴をリアルタイムで確認し、作業の進捗を把握したい
3. **視覚的フィードバック**: ローディング状態やエラーが発生した際に適切なフィードバックを得たい

---

## 2. 仕様要件

### 2.1 クイックアクションナビゲーション

| アイコン | 遷移先パス | 説明 |
|---------|-----------|------|
| 新規レビュー | `/reviews/new` | 新規コードレビュー作成画面 |
| レビュー履歴 | `/reviews/history` | 過去のレビュー一覧画面 |
| レポート | `/reports` | 分析レポート閲覧画面 |
| 設定 | `/settings` | アカウント設定画面 |

### 2.2 最近のアクティビティ機能

#### データ取得
- **エンドポイント**: `GET /api/activities`
- **認証**: セッションベース（認証必須）
- **レスポンス形式**:
```typescript
interface Activity {
  id: string;
  type: 'review_completed' | 'project_created' | 'comment_added' | 'settings_updated';
  description: string;
  targetName: string;  // ファイル名やプロジェクト名
  createdAt: string;   // ISO 8601形式
  userId: string;
}

interface ActivitiesResponse {
  activities: Activity[];
  total: number;
}
```

#### 表示要件
- 最新5件のアクティビティを表示
- タイムスタンプは相対時間（例：「2分前」「1時間前」）で表示
- アクティビティ種別に応じたアイコンを表示

### 2.3 状態管理

| 状態 | UI表現 |
|------|--------|
| ローディング | スケルトンローダー + 「読み込み中...」テキスト |
| エラー | エラーメッセージ + 再試行ボタン |
| 空データ | 「アクティビティはありません」メッセージ |
| 成功 | アクティビティリスト表示 |

---

## 3. 処理手順設計

### Phase 1: データモデル作成
1. `src/models/Activity.ts` - Activityスキーマ定義
   - フィールド: type, description, targetName, userId, createdAt
   - インデックス: userId + createdAt（降順）

### Phase 2: APIエンドポイント実装
1. `src/app/api/activities/route.ts` 作成
   - GET: ログインユーザーのアクティビティを取得（最新5件）
   - 認証チェック: セッションがない場合は401を返す
   - エラーハンドリング: DB接続エラー時は500を返す

### Phase 3: ダッシュボードUI更新
1. `DashboardClient.tsx` 更新
   - クイックアクションのhrefを新しいパスに変更
   - `useState`でアクティビティデータ、ローディング、エラー状態を管理
   - `useEffect`でマウント時にAPIを呼び出し
   - ダミーデータを削除し、実データを表示

### Phase 4: ナビゲーション先ページ作成
1. `/reviews/new/page.tsx` - 新規レビューページ（プレースホルダー）
2. `/reviews/history/page.tsx` - レビュー履歴ページ（プレースホルダー）
3. `/reports/page.tsx` - レポートページ（プレースホルダー）
4. `/settings/page.tsx` - 設定ページ（プレースホルダー）

### Phase 5: ユーティリティ関数
1. 相対時間フォーマット関数の実装
   - 入力: ISO 8601日時文字列
   - 出力: 「〇分前」「〇時間前」「〇日前」形式

---

## 4. 技術仕様

### 使用技術
- **フレームワーク**: Next.js 14+ (App Router)
- **状態管理**: React Hooks (useState, useEffect)
- **スタイリング**: Tailwind CSS
- **データベース**: MongoDB + Mongoose
- **認証**: NextAuth.js v5

### ファイル構成
```
src/
├── app/
│   ├── api/
│   │   └── activities/
│   │       └── route.ts          # アクティビティAPI
│   ├── dashboard/
│   │   ├── page.tsx              # サーバーコンポーネント（既存）
│   │   └── DashboardClient.tsx   # クライアントコンポーネント（更新）
│   ├── reviews/
│   │   ├── new/
│   │   │   └── page.tsx          # 新規レビューページ
│   │   └── history/
│   │       └── page.tsx          # レビュー履歴ページ
│   ├── reports/
│   │   └── page.tsx              # レポートページ
│   └── settings/
│       └── page.tsx              # 設定ページ
├── models/
│   └── Activity.ts               # アクティビティモデル
└── lib/
    └── utils.ts                  # ユーティリティ関数
```

---

## 5. 完了条件

- [ ] クイックアクション4つが正しいページに遷移する
- [ ] 最近のアクティビティがAPIから取得したデータを表示する
- [ ] ローディング中はスケルトンUIが表示される
- [ ] エラー時は適切なメッセージと再試行ボタンが表示される
- [ ] ダミーデータがコードから完全に削除されている
- [ ] 既存のスタイル・レイアウトが維持されている

