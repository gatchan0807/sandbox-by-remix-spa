import { useLanguageModel } from "./hooks/useLanguageModel";
import { useLanguageModelStatus } from "./hooks/useLanguageModelStatus";

import Annotation from "./components/annotation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactMarkdown from "react-markdown";

type Inputs = {
    systemPrompt: string
    userPrompt: string
}

export default function GeminiNanoFreePromptsContainer() {
    const languageModel = useLanguageModel();
    const languageModelStatus = useLanguageModelStatus({ languageModel });

    const { handleSubmit, register } = useForm<Inputs>({ defaultValues: { systemPrompt: "system: ", userPrompt: "user: ", }, mode: "onChange" });
    const [prompt, setPrompt] = useState<string>("")
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

            const prompt = `${data.systemPrompt}\n---\n${data.userPrompt}\n`
            setPrompt(prompt)

            const firstStepReader = await session.promptStreaming(prompt)
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
            <div className="w-5/6 mx-auto">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="">
                            <label htmlFor="system-prompt" className="font-bold">システムプロンプト</label>
                            <textarea className="w-full border-2 h-48 border-blue-900" {...register("systemPrompt")} />
                        </div>
                        <div className="">
                            <label htmlFor="prompt" className="font-bold">ユーザープロンプト</label>
                            <textarea className="w-full border-2 h-48 border-blue-900" {...register("userPrompt")} />
                        </div>
                        <span className="font-bold">Gemini nanoに提供されたプロンプト</span>
                        <p className="bg-gray-100 p-8 break-all rounded-md overflow-x-scroll">
                            <ReactMarkdown>{prompt}</ReactMarkdown>
                        </p>
                        <span className="font-bold">生成結果</span>
                        <p className="bg-gray-100 p-8 break-all rounded-md overflow-x-scroll">
                            <ReactMarkdown>{generatedText}</ReactMarkdown>
                        </p>
                    </div>
                    <p className="text-ellipsis text-center font-bold bg-teal-50 text-teal-700 mb-4">{isGenerating ? "生成中..." : ""}</p>
                    {errorDetail !== null && (
                        <p className="w-full  bg-red-50 text-red-700 my-4 py-4 pl-4">
                            {String(errorDetail)}
                        </p>
                    )}
                    <button type="submit" className="w-1/3 mx-auto bg-teal-500 text-white rounded-sm py-2 active:bg-teal-400">
                        生成開始
                    </button>
                </form>
            </div>
        </main>
    )
}