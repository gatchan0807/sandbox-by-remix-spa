import useAiObject from "./hooks/useAiObject";
import useAiStatus from "./hooks/useAiStatus";

import Annotation from "./components/annotation";
import SummarizeText from "./components/summarize-text";

export default function GeminiNanoSummarizeContainer() {
    const ai = useAiObject();
    const aiStatus = useAiStatus({ ai });

    return (
        <main className="px-4 lg:p-0">
            <Annotation status={aiStatus}></Annotation>
            <SummarizeText ai={ai}></SummarizeText>
        </main>
    )
}