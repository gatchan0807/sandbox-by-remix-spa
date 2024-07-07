import useAiObject from "./hooks/useAiObject";
import useAiStatus from "./hooks/useAiStatus";

import Annotation from "./components/annotation";
import GenerateText from "./components/generate-text";

export default function GeminiNanoGenerateTextContainer() {
    const ai = useAiObject();
    const aiStatus = useAiStatus({ ai });

    return (
        <main className="px-4 lg:p-0">
            <Annotation status={aiStatus}></Annotation>
            <GenerateText ai={ai}></GenerateText>
        </main>
    )
}