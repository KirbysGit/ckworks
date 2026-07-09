import Image from "next/image";
import Link from "next/link";
import Logo from "./ui/Logo";
import { footerLinks, contactEmail } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="container-ck flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Clean websites and practical systems for growing businesses.
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-8 gap-y-3"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="text-sm">
          <p className="text-muted">Say hello</p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-1 inline-block font-medium text-forest hover:text-ink"
          >
            {contactEmail}
          </a>
          <Image
            src="/svg/ck-initials-signature.svg"
            alt=""
            width={1805}
            height={1397}
            className="mt-4 h-12 w-auto"
          />
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="container-ck flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CK Works. All rights reserved.</p>
          <p>Websites. Systems. Clarity.</p>
        </div>
      </div>
    </footer>
  );
}
