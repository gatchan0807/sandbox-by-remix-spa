import useAiObject from "./hooks/useAiObject";

import Annotation from "./components/annotation";
import SummarizeText from "./components/summarize-text";

export default function GeminiNanoSummarizeContainer() {
    const ai = useAiObject();

    return (
        <main className="px-4 lg:p-0">
            <Annotation ai={ai}></Annotation>
            <SummarizeText ai={ai}></SummarizeText>
        </main>
    )
}