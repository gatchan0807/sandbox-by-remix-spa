import useAiObject from "./hooks/useAiObject";

import Annotation from "./components/annotation";

export default function GeminiNanoSummarizeContainer() {
    const ai = useAiObject();

    return (
        <>
            <Annotation ai={ai}></Annotation>
        </>
    )
}