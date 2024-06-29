import useAiObject from "./hooks/useAiObject";

import Annotation from "./components/annotation";
import GenerateText from "./components/generate-text";

export default function GeminiNanoGenerateTextContainer() {
    const ai = useAiObject();

    return (
        <>
            <Annotation ai={ai}></Annotation>
            <GenerateText ai={ai}></GenerateText>
        </>
    )
}