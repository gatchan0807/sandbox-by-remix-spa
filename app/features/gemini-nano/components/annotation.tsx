type Props = {
    status: string
};

export default function Annotation(props: Props) {
    return (
        <div>
            <p className="text-center text-lg mt-4">
                AI Object Status: <span className="text-cyan-600 font-bold">{props.status}</span>
            </p>
            <div className="text-left text-lg mt-4 px-12 py-4 bg-gray-200">
                <ul>
                    <li>
                        <span className="font-bold text-cyan-600">&quot;no&quot;</span>: お使いのブラウザでは利用できません
                    </li>
                    <li>
                        <span className="font-bold text-cyan-600">&quot;after-download&quot;</span>: ブラウザで利用できますが、AIのインストールが完了していません
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