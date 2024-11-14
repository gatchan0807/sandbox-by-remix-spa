import { useState, useEffect } from "react";
import { AICapabilities, AILanguageModelFactory } from "./useLanguageModel";

type Props = {
    languageModel: AILanguageModelFactory | null
};

export function useLanguageModelStatus(props: Props) {
    const [canCreateSession, setCanCreateSession] = useState<AICapabilities['available']>("no")

    useEffect(() => {
        (async () => {
            const capabilities = await props.languageModel?.capabilities()
            setCanCreateSession(capabilities?.available ?? "no");
        })()
    })

    return canCreateSession
}