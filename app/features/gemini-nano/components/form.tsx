import { SubmitHandler, useForm } from "react-hook-form";
import { AiObject } from "../hooks/useAiObject";
import { useState } from "react";

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
        setIsGenerating(true)
        const session = await props.ai?.createTextSession();

        const firstStepPrompt = `
        ${data.prompt}`
        const firstStepResult = await session?.prompt(firstStepPrompt) ?? ""

        const secondStepPrompt = `
        Please translate bellow text to Japanese.\n

        ${firstStepResult}`
        const secondStepResult = await session?.prompt(secondStepPrompt) ?? ""

        setGeneratedText(secondStepResult)
        setIsGenerating(false)
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
                {generatedText}
            </p>
        </div>
    )
}