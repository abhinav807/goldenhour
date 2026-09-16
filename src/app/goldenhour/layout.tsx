import type { Metadata } from "next";
import { baseDescription } from "../metadata";
export const metadata: Metadata = { title: { absolute: "GOLDENHOUR — Build Before Sunrise" }, description: baseDescription };
export default function GoldenHourLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
