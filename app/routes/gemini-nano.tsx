import type { MetaFunction } from "@remix-run/node";
import GeminiNanoExampleContainer from "~/features/gemini-nano/components/container";

export const meta: MetaFunction = () => {
  return [
    { title: "Gemini sample page" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <GeminiNanoExampleContainer />
  );
}