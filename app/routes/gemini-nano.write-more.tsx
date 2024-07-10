import type { MetaFunction } from "@remix-run/node";

import Title from "~/common/components/title";
import GeminiNanoWriteMoreContainer from "~/features/gemini-nano/write-more";

export const meta: MetaFunction = () => {
  return [
    { title: "Gemini sample page" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div className="my-8 flex flex-col items-center justify-center">
      <Title />
      <GeminiNanoWriteMoreContainer />
    </div>
  );
}