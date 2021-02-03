/** @jsx jsx */
import styled from "@emotion/styled";
import { jsx, keyframes } from "@emotion/react";

const rotate = keyframes`
  100%{
    transform:rotatez(-720deg);
  }
`;
const InnerSpinner = styled.div`
  position: absolute;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  border: 8px solid white;
  border-color: #009999 #ffffff #009999 #ffffff;
  animation: ${rotate} 1s infinite ease-in;
  box-shadow: 0px 0px 20px -2px #009999;
`;
const rotateAndHide = keyframes`
  50%{
    border-color: transparent;
  }
  100%{
    transform:rotatez(360deg);
  }
`;
const OuterSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  background: transparent;
  border-radius: 50%;
  border: 10px solid white;
  border-color: #009999 #fff #009999 #fff;
  animation: ${rotateAndHide} 1s infinite ease-in-out;
  box-shadow: 0px 0px 20px -2px #009999;
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
