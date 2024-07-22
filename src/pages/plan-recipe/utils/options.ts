import { SelectListItem } from "../componets/SelectList";

export const mealTimings: SelectListItem[] = [
  { id: 1, title: "朝食", desc: "一日の始まりを迎えるための食事" },
  { id: 2, title: "昼食", desc: "午後の活動のためのエネルギーを補給" },
  { id: 3, title: "夕食", desc: "一日の終わりにリラックスする食事" },
  { id: 4, title: "おやつ", desc: "ちょっとした間食やティータイム" },
];

export const cuisineGenres: SelectListItem[] = [
  { id: 1, title: "和食", desc: "日本の伝統的な料理" },
  { id: 2, title: "洋食", desc: "西洋風の料理" },
  { id: 3, title: "中華", desc: "中国の伝統的な料理" },
  { id: 4, title: "エスニック", desc: "異国情緒あふれる料理" },
  { id: 5, title: "イタリアン", desc: "イタリアン料理" },
  { id: 6, title: "スパニッシュ", desc: "スペイン料理" },
];

export const cookingThemes: SelectListItem[] = [
  { id: 1, title: "ヘルシー", desc: "健康志向の料理" },
  { id: 2, title: "時短", desc: "短時間で作れる料理" },
  { id: 3, title: "贅沢", desc: "豪華で特別な料理" },
  { id: 4, title: "シンプル", desc: "簡単で基本的な料理" },
  { id: 5, title: "珍しい", desc: "珍しい料理" },
  { id: 6, title: "パーティー", desc: "パーティー料理" },
];

export const cookingDifficulties: SelectListItem[] = [
  { id: 1, title: "簡単", desc: "初心者向けの料理" },
  { id: 2, title: "普通", desc: "一般的な難易度の料理" },
  { id: 3, title: "難しい", desc: "経験者向けの料理" },
  { id: 4, title: "プロ", desc: "プロフェッショナル向けの料理" },
];
