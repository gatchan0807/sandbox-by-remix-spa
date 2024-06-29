import Title from "~/common/components/title";
import useAiObject from "../hooks/useAiObject";
import { useEffect, useState } from "react";
import Annotation from "./annotation";
import Form from "./form";

export default function GeminiNanoExampleContainer() {
    const ai = useAiObject();
    const [canCreateSession, setCanCreateSession] = useState("no")
    useEffect(() => {
        (async () => {
            setCanCreateSession(await ai?.canCreateGenericSession() ?? "no");
        })()
    })

    return (
        <div className="flex flex-col items-center justify-center">
            <Title />
            <Annotation status={canCreateSession}></Annotation>
            <Form ai={ai}></Form>
        </div>
    )
}