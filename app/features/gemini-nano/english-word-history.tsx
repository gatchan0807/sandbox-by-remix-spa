import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { SubmitHandler, useForm } from "react-hook-form";

import { useLanguageModel } from "./hooks/useLanguageModel";
import { useLanguageModelStatus } from "./hooks/useLanguageModelStatus";

import Annotation from "./components/annotation";

type Inputs = {
    word: string
}

export default function GeminiNanoEnglishWordHistoryContainer() {
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

            const firstStepPrompt = `
You are a helpful and informative language assistant for English learners.
The user will input a word or short phrase.
Analyze the word or phrase and provide the following information in English, formatted in Markdown. 

Prioritize using the following sources, in order of priority:
1. Official documentation of the word/phrase (e.g., official website, technical documentation)
2. Reputable dictionaries and encyclopedias (e.g., Merriam-Webster, Oxford English Dictionary, Encyclopedia Britannica)
3. Crowdsourced resources with a high degree of accuracy (e.g., Wikipedia)

**Word/Phrase:** (Display as is) 

**Meaning:** 
* (Provide a clear definition in English)

**Etymology:**
* (Explain the origin of the word/phrase in detail in English, citing the most reliable source.)

**Usage:**
* (Explain how to use the word/phrase in English, including specific examples and at least three varied example sentences.)
* If applicable, include code examples or illustrations to enhance understanding.
* Explain any technical terms used in simple language for beginners. 

--- Example bellow ---

**Word/Phrase:** apple

**Meaning:** 
* A common, round fruit produced by the apple tree, usually red, green, or yellow in color.

**Etymology:** 
* From Old English "æppel," derived from Proto-Germanic "*aplaz."  The word is related to similar words in other Germanic languages, such as German "Apfel" and Dutch "appel." (Source: Online Etymology Dictionary)

**Usage:** 
* Apples are a popular fruit, often eaten raw as a snack or used in cooking for pies, sauces, and other dishes. 
* Example 1: "She ate an apple for breakfast."
* Example 2: "The apple pie was delicious."
* Example 3: "He threw the apple core in the trash." 

---

user input: ${data.word}
`
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
            <div className="w-full">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="">
                            <label htmlFor="word" className="font-bold mr-4">語源と用法を知りたい英単語</label>
                            <input placeholder="英単語を入力" className="w-1/4 border-b-2 px-1 bg-blue-50 border-blue-900" {...register("word")} />
                        </div>
                        <p className="bg-gray-100 w-full p-8 rounded-md overflow-x-scroll">
                            <ReactMarkdown>{generatedText}</ReactMarkdown>
                        </p>
                    </div>
                    <p className="w-full text-center font-bold bg-teal-50 text-teal-700 mb-4">{isGenerating ? "生成中..." : ""}</p>
                    {errorDetail !== null && (
                        <p className="w-full  bg-red-50 text-red-700 my-4 py-4 pl-4">
                            {String(errorDetail)}
                        </p>
                    )}
                    <button type="submit" className="w-1/3 mx-auto bg-teal-500 text-white rounded-sm py-2 active:bg-teal-400">
                        解説開始
                    </button>
                </form>
            </div>
        </main>
    )
}