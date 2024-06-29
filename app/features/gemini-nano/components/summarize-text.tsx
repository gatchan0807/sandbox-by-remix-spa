import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { SubmitHandler, useForm } from "react-hook-form";

import { AiObject } from "../hooks/useAiObject";

type Props = {
    ai: AiObject | null
};

type Inputs = {
    prompt: string
}

export default function SummarizeText(props: Props) {
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

            const firstStepPrompt = `以下の日本語のText以降から、重要な単語だけ取り出してください。
## 重要な単語の定義
- 短い単語でハッシュタグになりやすい単語を優先度を高めてください
- 複数回出現する単語の優先度を高めてください
- 一般的ではない単語を優先度を高めてください

## 制約事項
- 抽出時は、単語のみを出力してください
- 重要な単語は強調してください
- 重要な単語の定義は出力しないでください
- ハッシュタグの形式で出力してください
- 箇条書きで出力してください

## 抽出対象
Text:\n${data.prompt}`
            const firstStepReader = await session.promptStreaming(firstStepPrompt)
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
        <div className="w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4">
                <div className="flex flex-row gap-4">
                    <div className="w-1/2">
                        <label htmlFor="prompt" className="font-bold">要約元</label>
                        <textarea className="w-full border-2 h-48 border-blue-900" {...register("prompt")} />
                    </div>
                    <p className="bg-gray-100 w-1/2 p-8 rounded-md overflow-x-scroll">
                        <ReactMarkdown>{generatedText}</ReactMarkdown>
                    </p>
                </div>
                <p className="w-full text-center font-bold bg-teal-50 text-teal-700 mb-4">{isGenerating ? "生成中..." : ""}</p>
                <button type="submit" className="w-1/3 mx-auto bg-teal-500 text-white rounded-sm py-2 active:bg-teal-400">
                    要約開始
                </button>
            </form>

        </div>
    )
}