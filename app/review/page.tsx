import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewList } from "@/components/reviews/ReviewList";
import { business } from "@/lib/data/business";
import { allReviews } from "@/lib/data/reviews";
import { SITE_URL } from "@/lib/seo/site";

/* Review submission page (spec 003, US2). Reviews are moderated before
   publishing — see lib/data/reviews.ts for the integrity rules. */

const PAGE_PATH = "/review";

export const metadata: Metadata = {
  title: `أضف تقييمك | ${business.name} — آراء العملاء`,
  description:
    "شاركنا رأيك في موكيت وأرضيات السريع بالرياض: قيّم المنتج أو خدمة التركيب في دقيقة. نراجع كل تقييم للتأكد من أنه من عميل حقيقي قبل نشره.",
  alternates: { canonical: PAGE_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: business.name,
    title: "أضف تقييمك — آراء عملاء السريع للموكيت والأرضيات",
    url: `${SITE_URL}${PAGE_PATH}`,
  },
};

export default function ReviewPage() {
  const list = allReviews();

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" style={{ marginBottom: 14 }} aria-label="مسار التصفّح">
            <Link href="/">الرئيسية</Link>
            <Icon name="chevLeft" className="sep" />
            <span className="cur">التقييمات</span>
          </nav>
          <div className="kick">رأيك يهمّنا</div>
          <h1>أضف تقييمك</h1>
          <p>
            تعاملت معنا؟ شاركنا تجربتك في دقيقة — تقييمك يساعد غيرك على الاختيار، ويساعدنا على
            تحسين خدمتنا. نراجع كل تقييم للتأكد من أنه من عميل حقيقي قبل نشره، ولا نحذف الآراء
            السلبية.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div style={{ maxWidth: 720, marginInline: "auto" }}>
            <ReviewForm />
          </div>

          <div style={{ maxWidth: 980, marginInline: "auto" }}>
            <ReviewList
              list={list}
              title="ما قاله عملاؤنا"
              emptyLead="لا توجد تقييمات منشورة بعد — كن أول من يشاركنا رأيه."
            />
          </div>
        </div>
      </section>
    </main>
  );
}
