import useAiObject from "./hooks/useAiObject";
import useAiStatus from "./hooks/useAiStatus";

import Annotation from "./components/annotation";
import FreePrompts from "./components/free-prompts";

export default function GeminiNanoFreePromptsContainer() {
    const ai = useAiObject();
    const aiStatus = useAiStatus({ ai });

    return (
        <main className="px-4 lg:p-0">
            <Annotation status={aiStatus}></Annotation>
            <FreePrompts ai={ai}></FreePrompts>
        </main>
    )
}