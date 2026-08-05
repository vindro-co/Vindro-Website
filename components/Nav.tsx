"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Link from "next/link";
import { BOOKING_PATH, NAV_LINKS, SECTIONS } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      id="top"
      className="sticky top-0 z-[100] border-b border-line bg-white/85 backdrop-blur-[14px]"
    >
      <div className="mx-auto flex max-w-[1180px] items-center gap-8 px-6 py-[13px]">
        <Logo priority />

        <nav aria-label="Main" className="mx-auto hidden gap-1 nav:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-lg px-3 py-[7px] text-sm font-medium text-ink-soft no-underline transition-colors duration-150 hover:bg-bg-alt hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden gap-2.5 nav:flex">
          <a
            href={`#${SECTIONS.demo}`}
            className="btn btn-ghost px-4 py-[9px] text-[13.5px]"
          >
            Hear it in action
          </a>
          <Link
            href={BOOKING_PATH}
            className="btn btn-primary px-4 py-[9px] text-[13.5px]"
          >
            Book a free demo
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-mobile"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto flex flex-col gap-[5px] p-1.5 nav:hidden"
        >
          <span
            className={`h-[1.5px] w-5 rounded-sm bg-ink transition-transform duration-200 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-sm bg-ink transition-opacity duration-150 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 rounded-sm bg-ink transition-transform duration-200 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div
          id="nav-mobile"
          className="flex flex-col gap-1 border-t border-line bg-white px-6 pb-5 pt-3 nav:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] font-medium no-underline"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={BOOKING_PATH}
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-2"
          >
            Book a free demo
          </Link>
        </div>
      )}
    </header>
  );
}
