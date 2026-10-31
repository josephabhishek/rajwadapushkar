import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="eyebrow mb-5">404</p>
        <h1 className="mb-6">Nothing here</h1>
        <p className="lead mx-auto mb-10">
          That page does not exist. The gardens, however, do.
        </p>
        <Link href="/" className="btn">Back to the estate</Link>
      </div>
    </main>
  );
}
