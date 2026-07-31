type FAQ = {
  question: string;
  answer: string;
};

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card shadow-soft">
      {faqs.map((faq) => (
        <details key={faq.question} className="group p-5 open:bg-ivory/45">
          <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
            <span className="flex items-center justify-between gap-4">
              {faq.question}
              <span className="text-forest transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
