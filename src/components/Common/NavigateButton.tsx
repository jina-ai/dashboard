import React from "react"
import { Link } from "react-router-dom"
import styled from "@emotion/styled"

type NavigateButtonProps = {
  label: string
  path: string
}

const NavigationLink = styled(Link)`
  color: ${(props) => props.theme.palette.grey[600]};
  font-size: 1.25rem;
  width: 20%;
  padding: 1rem;
  &:hover {
    text-decoration: none;
  }
`

const NavigateButton = ({ label, path }: NavigateButtonProps) => {
  return (
    <>
      <NavigationLink to={path}> {label} </NavigationLink>
    </>
  )
}

export default NavigateButton
