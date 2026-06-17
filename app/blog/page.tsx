import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { business, whatsappLink } from "@/lib/data/business";
import { allPosts, postPath } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: `المدوّنة | ${business.name} — نصائح الموكيت والأرضيات`,
  description:
    "مدوّنة السريع للموكيت والأرضيات: أدلّة ونصائح لاختيار موكيت المساجد والمكاتب، العشب الصناعي، الفينيل، والأرضيات المطاطية، والعناية بها.",
  alternates: { canonical: "/blog" },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogIndex() {
  const list = allPosts();
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="kick">المدوّنة</div>
          <h1>أدلّة ونصائح الموكيت والأرضيات</h1>
          <p>
            مقالات تساعدك على اختيار الأنسب لمساحتك والعناية به — من موكيت المساجد والمكاتب إلى العشب
            الصناعي والفينيل والأرضيات المطاطية.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {list.length ? (
            <div className="blog-grid">
              {list.map((p) => (
                <Link key={p.slug} href={postPath(p.slug)} className="blog-card">
                  <div className="bc-media">
                    {p.cover ? (
                      <Image src={p.cover} alt={p.title} fill sizes="(max-width:820px) 100vw, 360px" className="coverimg" />
                    ) : (
                      <span className="ph">
                        <Icon name="grid" />
                      </span>
                    )}
                  </div>
                  <div className="bc-body">
                    <time className="bc-date" dateTime={p.date}>
                      {fmtDate(p.date)}
                    </time>
                    <h2 className="bc-title">{p.title}</h2>
                    <p className="bc-desc">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty" style={{ maxWidth: 520, margin: "0 auto" }}>
              <div className="ill">
                <Icon name="grid" />
              </div>
              <h4>مقالات قيّمة في الطريق</h4>
              <p>
                نعدّ حاليًا أدلّة ونصائح عملية عن الموكيت والأرضيات. حتى ذلك الحين، تواصل معنا لأي
                استشارة مجانية.
              </p>
              <a className="btn btn-accent" href={whatsappLink("السلام عليكم، أرغب باستشارة")} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" /> استشر عبر واتساب
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
