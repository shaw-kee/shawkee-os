import { ComponentPropsWithoutRef } from "react"

type ButtonProps = ComponentPropsWithoutRef<'button'>

const Button = ({children, ...props}: ButtonProps) => {
  return <button type="button" {...props}>{children}</button>
}

export default Button