import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page wrap">
      <h1>This page is not on the site</h1>
      <p>هذه الصفحة غير موجودة</p>
      <div className="actions">
        <Link className="btn" href="/en">
          Home
        </Link>
        <Link className="btn ghost" href="/ar">
          الرئيسية
        </Link>
      </div>
    </section>
  );
}
