import { useState, useEffect } from "react";
import { AiObject } from "../hooks/useAiObject";

type Props = {
    ai: AiObject | null
};

export default function Annotation(props: Props) {
    const [canCreateSession, setCanCreateSession] = useState("no")
    useEffect(() => {
        (async () => {
            setCanCreateSession(await props.ai?.canCreateGenericSession() ?? "no");
        })()
    })
    return (
        <div>
            <p className="text-center text-lg mt-4">
                AI Object Status: <Status status={canCreateSession}></Status>
            </p>
            <div className="text-left text-lg mt-4 px-12 py-4 bg-gray-200">
                <ul>
                    <li>
                        <span className="font-bold text-cyan-600">&quot;no&quot;</span>: お使いのブラウザでは利用できません
                    </li>
                    <li>
                        <span className="font-bold text-cyan-600">&quot;after-download&quot;</span>: ブラウザで利用できますが、AIモデルのインストールが完了していません
                    </li>
                    <li>
                        <span className="font-bold text-cyan-600">&quot;readily&quot;</span>: お使いのブラウザで利用できます
                    </li>
                </ul>
            </div>

            <p className="my-4 text-center">
                <a href="https://note.com/npaka/n/n17176250330e" rel="noreferrer noopener" target="_blank" className="text-blue-600 underline">
                    使えるようにするまでの手順 / How to make it usable
                </a>
            </p>
        </div>
    );
}

function Status({ status }: { status: string }) {
    return (
        <span className={(status === "readily" ? "text-cyan-600" : "text-red-600") + " text-2xl font-bold"}>{status}</span>
    )
}