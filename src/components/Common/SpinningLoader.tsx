/** @jsx jsx */
import styled from "@emotion/styled";
import { jsx, keyframes } from "@emotion/react";

const rotate = keyframes`
  100%{
    transform:rotatez(-720deg);
  }
`;
const Spinner = styled.div`
  border-radius: 50%;
  border: 8px solid white;
  border-color: ${(props) => {
    let { primary, background } = props.theme.palette;
    return `${primary} ${background} ${primary} ${background}`;
  }};
`;
const InnerSpinner = styled(Spinner)`
  position: absolute;
  height: 32px;
  width: 32px;
  animation: ${rotate} 1s infinite ease-in;
`;
const rotateAndHide = keyframes`
  50%{
    border-color: transparent;
  }
  100%{
    transform:rotatez(360deg);
  }
`;
const OuterSpinner = styled(Spinner)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  background: transparent;
  border-radius: 50%;
  animation: ${rotateAndHide} 1s infinite ease-in-out;
`;
const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SpinningLoader = () => (
  <SpinnerContainer>
    <OuterSpinner>
      <InnerSpinner />
    </OuterSpinner>
  </SpinnerContainer>
);

export default SpinningLoader;
