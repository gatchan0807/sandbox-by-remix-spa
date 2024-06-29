import { SubmitHandler, set, useForm } from "react-hook-form";
import { AiObject } from "../hooks/useAiObject";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
    ai: AiObject | null
};

type Inputs = {
    prompt: string
}

export default function Form(props: Props) {
    const { handleSubmit, register } = useForm<Inputs>();
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

            const firstStepPrompt = `${data.prompt}`
            const firstStepReader = await session.promptStreaming(firstStepPrompt)
            if (firstStepReader === undefined) {
                setIsGenerating(false)
                return
            }

            let firstStepResult = ""
            for await (const value of firstStepReader) {
                firstStepResult = value
                setGeneratedText(value)
            }

            const secondStepPrompt = `Please translate bellow text to Japanese.\n${firstStepResult}`
            const secondStepReader = await session.promptStreaming(secondStepPrompt)

            for await (const value of secondStepReader) {
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
        <div className="w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
                <label htmlFor="prompt" className="font-bold">プロンプト</label>
                <input placeholder="プロンプト入れてみよう" className="w-full border-b-2 border-blue-900" {...register("prompt")} />
                <button type="submit" className="w-1/3 mx-auto my-4 bg-teal-500 text-white rounded-sm py-2 active:bg-teal-400">
                    生成開始
                </button>
            </form>
            <p className="w-full text-center font-bold bg-teal-50 text-teal-700 mb-4">{isGenerating ? "生成中..." : ""}</p>
            <p className="bg-gray-100 w-full p-8 rounded-md">
                <ReactMarkdown>{generatedText}</ReactMarkdown>
            </p>
        </div>
    )
}