import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { SITE_URL } from "@/lib/seo/site";
import { business } from "@/lib/data/business";
import { posts, getPost, postPath } from "@/lib/blog/posts";

type Params = { slug: string };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(decodeURIComponent(slug));
  if (!post) return {};
  return {
    title: `${post.title} | مدوّنة ${business.name}`,
    description: post.description,
    alternates: { canonical: postPath(post.slug) },
    openGraph: {
      type: "article",
      locale: "ar_SA",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${postPath(post.slug)}`,
      images: post.cover ? [`${SITE_URL}${post.cover}`] : undefined,
    },
  };
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(decodeURIComponent(slug));
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
        author: { "@type": "Organization", name: business.name },
        publisher: { "@type": "Organization", name: business.name },
        mainEntityOfPage: `${SITE_URL}${postPath(post.slug)}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "المدوّنة", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
      ...(post.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" style={{ marginBottom: 14 }} aria-label="مسار التصفّح">
            <Link href="/">الرئيسية</Link>
            <Icon name="chevLeft" className="sep" />
            <Link href="/blog">المدوّنة</Link>
            <Icon name="chevLeft" className="sep" />
            <span className="cur">{post.title}</span>
          </nav>
          <h1>{post.title}</h1>
          <p>
            <time dateTime={post.date}>{fmtDate(post.date)}</time>
            {post.readingMinutes ? ` · قراءة ${post.readingMinutes} دقائق` : ""}
            {post.updated && post.updated !== post.date ? (
              <>
                {" · "}
                <span>آخر تحديث: </span>
                <time dateTime={post.updated}>{fmtDate(post.updated)}</time>
              </>
            ) : null}
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {post.cover ? (
            <div className="post-cover">
              <Image src={post.cover} alt={post.title} fill priority sizes="(max-width:980px) 100vw, 900px" className="coverimg" />
            </div>
          ) : null}
          <article className="prose" style={{ marginInline: "auto" }}>
            {post.sections.map((s, i) => (
              <div key={i}>
                {s.heading ? <h2>{s.heading}</h2> : null}
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
                {s.list?.length ? (
                  <ul>
                    {s.list.map((li, k) => (
                      <li key={k}>{li}</li>
                    ))}
                  </ul>
                ) : null}
                {s.table ? (
                  <div className="table-wrap">
                    <table className="cmp-table">
                      <thead>
                        <tr>
                          {s.table.headers.map((h, k) => (
                            <th key={k}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, r) => (
                          <tr key={r}>
                            {row.map((cell, c) => (
                              <td key={c}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            ))}

            {post.faqs?.length ? (
              <section aria-labelledby="post-faq-h">
                <h2 id="post-faq-h">أسئلة شائعة</h2>
                <div className="faq-list">
                  {post.faqs.map((f) => (
                    <details className="faq-item" key={f.q}>
                      <summary>
                        <h3>{f.q}</h3>
                        <Icon name="chevDown" className="fchev" />
                      </summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {post.links?.length ? (
              <section aria-labelledby="post-links-h">
                <h2 id="post-links-h">روابط مفيدة</h2>
                <div className="chips">
                  {post.links.map((l) => (
                    <Link key={l.href} href={l.href} className="chip">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </div>
      </section>
    </main>
  );
}
