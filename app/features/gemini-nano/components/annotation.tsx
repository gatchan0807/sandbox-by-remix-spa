type Props = {
    status: string
};

export default function Annotation(props: Props) {
    return (
        <div>
            <p className="text-center text-lg mt-4">
                AI Object Status: <Status status={props.status}></Status>
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

            <p className="bg-red-50 text-red-700 font-bold px-4 py-2 my-4 rounded-md">
                現在、 Gemini nano in Chrome の仕様上、英語以外を出力しようとするとエラーになります。<br />
                いずれこれが発生しないようになる予定ですが、2024年11月現在は英語の出力をテストすることしかできません。<br />
                <a className="underline font-normal" href="https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c" target="_blank" rel="noreferrer noopener">最新情報・詳細な仕様はこちらから</a>
            </p>

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