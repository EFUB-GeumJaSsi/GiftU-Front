import styled from 'styled-components';
import { T1, T2, B3 } from '../../styles/font';
const TitleDescription = ({
  color,
  num,
  title,
  description,
  component: Component,
}) => {
  return (
    <SLayout>
      <STitleContainer>
        <SNumWrapper color={color}>{num}</SNumWrapper>
        <STitleWrapper>{title}</STitleWrapper>
      </STitleContainer>
      <STextWrapper>{description}</STextWrapper>
      {Component && <Component />}
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 344px;
`;
const STitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  height: 22px;
  padding: 0px 8px 0px 8px;
`;
const SNumWrapper = styled.header`
  ${T1}
  color: ${(props) =>
    props.color === 'orange' ? 'var(--orange-pri)' : 'var(--jade-pri)'};
`;
const STitleWrapper = styled.div`
  ${T2}
`;
const STextWrapper = styled.div`
  display: flex;
  padding: 0px 36px 0px 36px;
  gap: 8px;
  width: 307px;
  line-height: 19px;
  margin-bottom: 5px;

  ${B3}
  color: var(--gray-500);
`;

export default TitleDescription;
