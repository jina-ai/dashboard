import styled from "@emotion/styled"

export const CardWithOutline = styled.div`
  background: ${(props) => props.theme.palette.background.default};
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  border-radius: 0.5rem;
`
