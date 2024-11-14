import { useLanguageModel } from "./hooks/useLanguageModel";
import { useLanguageModelStatus } from "./hooks/useLanguageModelStatus";

import Annotation from "./components/annotation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";

type Inputs = {
    prompt: string
}

export default function GeminiNanoGenerateTextContainer() {
    const languageModel = useLanguageModel();
    const languageModelStatus = useLanguageModelStatus({ languageModel });

    const { handleSubmit, register } = useForm<Inputs>();
    const [generatedText, setGeneratedText] = useState<string>("")
    const [isGenerating, setIsGenerating] = useState<boolean>(false)
    const [errorDetail, setErrorDetail] = useState<Error | null>(null)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsGenerating(true)
            setErrorDetail(null)
            const session = await languageModel?.create();
            if (session === undefined) {
                setIsGenerating(false)
                return
            }

            const firstStepPrompt = data.prompt !== "" ? `Please written by Markdown response. And Be sure to respond in English in all patterns. \n${data.prompt}` : `Talk about you. For example, "What can you support for Gemini nano user." by Markdown response.`
            const firstStepReader = await session.promptStreaming(firstStepPrompt)
            if (firstStepReader === undefined) {
                setIsGenerating(false)
                return
            }

            // @ts-expect-error - TypeScript doesn't know that firstStepReader is an async iterator
            for await (const value of firstStepReader) {
                setGeneratedText(value)
            }

            setIsGenerating(false)
        } catch (e) {
            setGeneratedText(`生成中にエラーが発生しました`)
            setErrorDetail(e as Error)
        } finally {
            setIsGenerating(false)
        }
    };

    return (
        <main className="w-2/3 px-4 lg:p-0">
            <Annotation status={languageModelStatus}></Annotation>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
                <label htmlFor="prompt" className="font-bold">プロンプト</label>
                <input placeholder="英語プロンプトを入れてみよう" className="w-full border-b-2 border-blue-900" {...register("prompt")} />
                <button type="submit" className="w-1/3 mx-auto my-4 bg-teal-500 text-white rounded-sm py-2 active:bg-teal-400">
                    生成開始
                </button>
            </form>
            <p className="w-full text-center font-bold bg-teal-50 text-teal-700 mb-4">{isGenerating ? "生成中..." : ""}</p>
            <p className="bg-gray-100 w-5/6 mx-auto p-8 rounded-md">
                <ReactMarkdown>{generatedText}</ReactMarkdown>
            </p>
            {errorDetail !== null && (
                <p className="w-full  bg-red-50 text-red-700 my-4 py-4 pl-4">
                    {String(errorDetail)}
                </p>
            )}
        </main>
    )
}