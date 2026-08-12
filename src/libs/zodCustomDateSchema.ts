import { z } from 'zod';

// フォーマット判定用の正規表現
const YMD_HYPHEN_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const YMD_SLASH_REGEX = /^\d{4}\/\d{2}\/\d{2}$/;
// eslint-disable-next-line regexp/no-unused-capturing-group
const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:?\d{2})?$/;

// 実行環境のタイムゾーン設定（OSやサーバーの設定）に影響されない JST 日付フォーマッター
const jstFormatter = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/**
 * 実在する日付かどうかチェックするヘルパー関数（例: 2026/02/31 などの存在しない日付を弾く）
 */
function isValidYmd(year: number, month: number, day: number): boolean {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export const zDateStr = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((val, ctx) => {
    // 空文字 / undefined / null -> null を出力
    if (val === null || val === undefined || val === '') {
      return null;
    }

    // yyyy-mm-dd 形式
    if (YMD_HYPHEN_REGEX.test(val)) {
      const [y, m, d] = val.split('-').map(Number);
      if (isValidYmd(y, m, d))
        return val;
    }

    // yyyy/mm/dd 形式 -> yyyy-mm-dd に変換して出力
    if (YMD_SLASH_REGEX.test(val)) {
      const [y, m, d] = val.split('/').map(Number);
      if (isValidYmd(y, m, d)) {
        return val.replace(/\//g, '-');
      }
    }

    // ISO 8601 形式 -> JST (Asia/Tokyo) 基準で yyyy-mm-dd に変換して出力
    if (ISO_8601_REGEX.test(val)) {
      const date = new Date(val);
      if (!Number.isNaN(date.getTime())) {
        // Intl.DateTimeFormat ("ja-JP") は "YYYY/MM/DD" を返すため "/" を "-" に置き換え
        return jstFormatter.format(date).replace(/\//g, '-');
      }
    }

    // 上記いずれにも該当しない（フォーマット不正や不整合な日付）場合はエラー
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '有効な日付形式（ISO 8601, yyyy-mm-dd, yyyy/mm/dd）を入力してください',
    });
    return z.NEVER;
  });

// TypeScript の型定義
export type ZDateStr = z.infer<typeof zDateStr>; // string | null
export type ZDateStrInput = z.input<typeof zDateStr>; // string | null | undefined
export type ZDateStrOutput = z.output<typeof zDateStr>; // string | null
