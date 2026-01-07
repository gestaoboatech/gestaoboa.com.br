import { useField } from "@unform/core"
import { InputHTMLAttributes, useEffect, useRef } from "react"
import { Container, Input, Span } from "./styles"

type Props = {
    name : string
    value?: string
    width?: string
    height?: string
    paddingLeft?: string
    paddingRight?: string
}

type InputProps = InputHTMLAttributes < HTMLInputElement > & Props

export default function CustomInput ({
    name,
    value,
    width,
    height,
    placeholder,
    ...rest
}: InputProps) {
    const inputRef = useRef(null);
    const {fieldName, defaultValue, registerField, error} = useField(name);
    const defaultInputValue = defaultValue ? defaultValue : value;

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef,
            getValue: ref => {
                return ref.current.value
            },
            setValue: (ref, newValue) => {
                ref.current.value = newValue
            },
            clearValue: ref => {
                ref.current.value = ''
            }
        })
    }, [fieldName, registerField])
    
    return (
        <Container 
            width={width ? width : undefined} 
            height={height ? height : undefined}
            className="input-group">
            
            <Input
                height={height ? height : undefined}
                className="input"
                type="text"
                ref={inputRef}
                style={{ borderColor: error ? "red" : ""}}
                defaultValue={defaultInputValue}
                placeholder={placeholder}
                {...rest}
            />

            {error && <Span>{error}</Span>}
        </Container>
    )
}