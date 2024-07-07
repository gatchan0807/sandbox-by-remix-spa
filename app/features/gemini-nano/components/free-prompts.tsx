import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { SubmitHandler, useForm } from "react-hook-form";

import { AiObject } from "../hooks/useAiObject";

type Props = {
    ai: AiObject | null
};

type Inputs = {
    systemPrompt: string
    userPrompt: string
}

export default function FreePrompts(props: Props) {
    const { handleSubmit, register } = useForm<Inputs>({ defaultValues: { systemPrompt: "system: ", userPrompt: "user: ", }, mode: "onChange" });
    const [prompt, setPrompt] = useState<string>("")
    const [generatedText, setGeneratedText] = useState<string>("")
    const [isGenerating, setIsGenerating] = useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setIsGenerating(true)
            const session = await props.ai?.createTextSession();
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

            for await (const value of firstStepReader) {
                setGeneratedText(value)
            }

            setIsGenerating(false)
        } catch (e) {
            setGeneratedText(`生成中にエラーが発生しました`)
        } finally {
            setIsGenerating(false)
        }
    };


    return (
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
                    <p className="bg-gray-100 p-8 break-all rounded-md overflow-x-scroll">
                        <ReactMarkdown>{generatedText}</ReactMarkdown>
                    </p>
                </div>
                <p className="text-ellipsis text-center font-bold bg-teal-50 text-teal-700 mb-4">{isGenerating ? "生成中..." : ""}</p>
                <button type="submit" className="w-1/3 mx-auto bg-teal-500 text-white rounded-sm py-2 active:bg-teal-400">
                    生成開始
                </button>
            </form>

        </div>
    )
}