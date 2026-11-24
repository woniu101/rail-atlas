export type Category = 'steam' | 'diesel' | 'electric' | 'emu';
export type TrainCategory = Category;
export interface Source { title: string; url: string }
export interface Train {
  slug: string;
  code: string;
  name: string;
  fullName: string;
  aliases: string[];
  category: Category;
  categoryLabel: string;
  era: string;
  year: number;
  period: string;
  summary: string;
  description: string[];
  features: string[];
  specs: { label: string; value: string; note?: string }[];
  sources: Source[];
  image: string;
  imageCredit?: string;
  takeaways?: string[];
  relatedArticles?: {title:string;href:string}[];
  model?: { id: string; sourceUrl: string; author: string; license: string; licenseUrl: string; path?: string; mobilePath?: string; bytes?: number; mobileBytes?: number; representation?: 'detailed'|'simplified'; scope?: string };
}

export const categoryLabels: Record<Category, string> = {
  steam: '蒸汽机车', diesel: '内燃机车', electric: '电力机车', emu: '动车组',
};
export const categories = [
  { id: 'all', label: '全部车型' },
  ...Object.entries(categoryLabels).map(([id, label]) => ({ id, label })),
];

