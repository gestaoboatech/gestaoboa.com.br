import { Container } from "./styles.ts"
import { CSSProperties } from "react"

type props = {
    text: string,
    method: () => void,
    type: "focused" | "unfocused" | "clean",
    width?: string | number | null,
    style?: CSSProperties,
}

export default function Button ({
    text,
    method,
    type="focused",
    width=null,
    style,
}: props) {
    return (
        <Container width={width} type={type} onClick={() => method()} style={style}>
            {text}
        </Container>
    )
}