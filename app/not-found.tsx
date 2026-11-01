import Link from "next/link";

export default function NotFound() {
  return (
    <section className="home-page missing">
      <div className="hero-copy">
        <h1>This page is not on the site</h1>
        <p>هذه الصفحة غير موجودة</p>
        <div className="home-links">
          <Link href="/en">Home</Link>
          <Link href="/ar">الرئيسية</Link>
        </div>
      </div>
    </section>
  );
}
