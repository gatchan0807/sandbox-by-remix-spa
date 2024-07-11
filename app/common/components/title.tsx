type Props = {
    contents?: string
};

export default function Title(props: Props) {
    return (
        <h1 className="text-4xl font-bold text-center">{props.contents}</h1>
    );
}