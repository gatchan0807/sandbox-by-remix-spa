import { useState, useEffect } from "react";
import { AiObject } from "./useAiObject";

type Props = {
    ai: AiObject | null
};

export default function useAiStatus(props: Props) {
    const [canCreateSession, setCanCreateSession] = useState("no")
    useEffect(() => {
        (async () => {
            setCanCreateSession(await props.ai?.canCreateGenericSession() ?? "no");
        })()
    })

    return canCreateSession
}