import { ogSize, renderOg } from "@/lib/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "YellowBlocks – Stay in control";

export default function Image() {
  return renderOg("Stay in control.", "Consultancy en assessments voor Microsoft 365, identity en modern work");
}
