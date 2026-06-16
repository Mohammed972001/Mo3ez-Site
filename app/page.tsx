// صفحة مؤقتة — أساس T00 فقط. الرئيسية الحقيقية (تصميم A) تُبنى في T07.
export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col justify-center gap-4 px-6 py-24 text-center">
      <h1 className="text-3xl font-bold">موكيت وأرضيات الرياض</h1>
      <p className="text-base text-neutral-600">
        الأساس جاهز (T00). يجري بناء الموقع وفق المواصفات والتاسكات.
      </p>
    </main>
  );
}
