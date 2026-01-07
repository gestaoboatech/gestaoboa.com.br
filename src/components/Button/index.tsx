import { Container } from "./styles.ts"

type props = {
    text: string,
    method: Function,
    type: "focused" | "unfocused",
    width?: string | number | null,
}

export default function Button ({
    text,
    method,
    type="focused",
    width=null,
}: props) {
    return (
        <Container width={width} type={type} onClick={() => method()}>
            {text}
        </Container>
    )
}