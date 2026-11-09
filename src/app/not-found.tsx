import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { BlockMark } from "@/components/visuals/Wordmark";

export const metadata = { title: "Pagina niet gevonden", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-[48rem]">
        <BlockMark size={44} />
        <h1 className="mt-8 text-3xl">Deze pagina bestaat niet (meer)</h1>
        <p className="mt-5 text-lg text-slate">Het adres is mogelijk veranderd of verkeerd getypt. Deze pagina&apos;s helpen je verder:</p>
        <ul className="mt-8 space-y-3 text-lg">
          <li>
            <Link href="/oplossingen" className="link">
              De assessments
            </Link>
          </li>
          <li>
            <Link href="/inzichten" className="link">
              Inzichten
            </Link>
          </li>
          <li>
            <Link href="/contact" className="link">
              Contact
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
