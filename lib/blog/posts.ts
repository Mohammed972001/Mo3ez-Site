/**
 * نظام المدوّنة — الأساس بلا مقالات (تُكتب لاحقًا من المالك عند الانتهاء).
 * كل مقال كائن بـ بيانات وصفية + أقسام (عنوان + فقرات). أضف عنصرًا هنا لينشر مقالًا.
 * (قابل للترقية لاحقًا إلى ملفات MDX إذا لزمت عناصر غنية.)
 */
export interface PostSection {
  heading?: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO: "2026-06-18"
  cover?: string; // مسار صورة في /public
  readingMinutes?: number;
  sections: PostSection[];
}

/** المقالات — فارغة الآن عمدًا (الأساس جاهز، المحتوى يُكتب لاحقًا). */
export const posts: Post[] = [];

/** كل المقالات مرتّبة من الأحدث. */
export function allPosts(): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}
