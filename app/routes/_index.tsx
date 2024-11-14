import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix SPA" },
    { name: "description", content: "Welcome to Remix (SPA Mode)!" },
  ];
};

export default function Index() {
  return (
    <div className="my-8">
      <h1 className="text-3xl text-center font-bold">Welcome to Sandbox page by <a
        href="https://x.com/gatchan0807"
        rel="noreferrer noopener" target="_blank"
        className="text-blue-700 underline hover:text-blue-500"
      >gatchan0807</a>
      </h1>
      <p className="w-1/2 my-4 mx-auto text-center">
        <a
          href="https://github.com/gatchan0807/sandbox-by-remix-spa"
          rel="noreferrer noopener" target="_blank"
          className="text-blue-700 underline hover:text-blue-500 font-bold"
        >
          Hosting on GitHub Pages
        </a>
      </p>
      <div className="w-2/3 mx-auto rounded bg-slate-100 py-8 px-4">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              className="text-blue-700 underline hover:text-blue-500"
              target="_blank"
              href="./gemini-nano/generate-text">
              Gemini nano sandbox (generate text)
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline hover:text-blue-500"
              target="_blank"
              href="./gemini-nano/summarize">
              Gemini nano sandbox (summarize)
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline hover:text-blue-500"
              target="_blank"
              href="./gemini-nano/free-prompts">
              Gemini nano sandbox (free prompts)
            </a>
          </li>
          <li>
            <a
              className="text-blue-700 underline hover:text-blue-500"
              target="_blank"
              href="./gemini-nano/english-word-history">
              Gemini nano sandbox (English word history)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
