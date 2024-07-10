import useAiObject from "./hooks/useAiObject";
import useAiStatus from "./hooks/useAiStatus";

import Annotation from "./components/annotation";
import WriteMore from "./components/write-more";

export default function GeminiNanoWriteMoreContainer() {
    const ai = useAiObject();
    const aiStatus = useAiStatus({ ai });

    return (
        <main className="px-4 lg:p-0">
            <Annotation status={aiStatus}></Annotation>
            <WriteMore ai={ai}></WriteMore>
        </main>
    )
}