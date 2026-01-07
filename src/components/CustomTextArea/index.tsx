import { useField } from "@unform/core"
import { TextareaHTMLAttributes, useEffect, useRef } from "react"
import { Container, Span, Textarea } from "./styles"

type Props = {
    name : string
    // type?: | 'text' | 'number' | 'date' | 'datetime-local' | 'email'
    value?: string
    width?: string
    height?: string
    disabled?: boolean
    paddingLeft?: string
    paddingRight?: string
}

type TextAreaProps = TextareaHTMLAttributes < HTMLTextAreaElement > & Props

export default function CustomTextarea ({
    name,
    value,
    width,
    height,
    placeholder,
    disabled=false,
    ...rest
}: TextAreaProps) {
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
        
            <Textarea 
                height={height ? height : undefined}
                className="input"
                ref={inputRef}
                style={{ borderColor: error ? "red" : "", resize: "none" }}
                defaultValue={defaultInputValue}
                placeholder={placeholder}
                disabled={disabled}
                {...rest}
            />

            {error && <Span>{error}</Span>}
        </Container>
    )
}