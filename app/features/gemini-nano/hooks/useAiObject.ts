export type AiObject = {
    canCreateGenericSession: () => "readily" | "after-download" | "no",
    canCreateTextSession: () => "readily" | "after-download" | "no",
    createGenericSession: () => { prompt: (prompt: string) => Promise<string>, promptStreaming: (prompt: string) => AsyncIterable<string> },
    createTextSession: () => { prompt: (prompt: string) => Promise<string>, promptStreaming: (prompt: string) => AsyncIterable<string> },
}

export default function useAiObject() {
    // @ts-expect-error - AI object is defined only in the Chrome canary browser
    if (typeof window === "undefined" || typeof window.ai === "undefined") {
        return null
    }

    // @ts-expect-error - AI object is defined only in the Chrome canary browser
    return window.ai as AiObject
}