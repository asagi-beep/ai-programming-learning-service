/**
 * 共通ユーティリティ関数
 */

/**
 * ISO 8601日時文字列を相対時間表記に変換
 * @param dateString ISO 8601形式の日時文字列
 * @returns 相対時間表記（例：「2分前」「1時間前」「3日前」）
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSeconds < 60) {
    return "たった今";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分前`;
  } else if (diffHours < 24) {
    return `${diffHours}時間前`;
  } else if (diffDays < 7) {
    return `${diffDays}日前`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks}週間前`;
  } else if (diffMonths < 12) {
    return `${diffMonths}ヶ月前`;
  } else {
    const diffYears = Math.floor(diffMonths / 12);
    return `${diffYears}年前`;
  }
}

/**
 * アクティビティ種別を日本語に変換
 * @param type アクティビティ種別
 * @returns 日本語表記
 */
export function getActivityTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    review_completed: "コードレビュー完了",
    project_created: "新規プロジェクト作成",
    comment_added: "レビューコメント追加",
    settings_updated: "設定を更新",
    review_started: "コードレビュー開始",
  };

  return labels[type] || type;
}

