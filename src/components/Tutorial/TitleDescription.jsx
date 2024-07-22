import styled from 'styled-components';

const TitleDescription = ({
  color,
  num,
  title,
  description,
  component: Component,
}) => {
  return (
    <>
      <SContentboxContainer>
        <STitleBoxContainer>
          <SNumWrapper color={color}>{num}</SNumWrapper>
          <STitleWrapper>{title}</STitleWrapper>
        </STitleBoxContainer>
        <SExplainBoxWrapper>
          <SExplainWrapper>{description}</SExplainWrapper>
        </SExplainBoxWrapper>
        {Component && <Component />}
      </SContentboxContainer>
    </>
  );
};

export default TitleDescription;
const SContentboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  width: 344px;
`;

const STitleBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;

  height: 22px;
  padding: 0px 8px 0px 8px;
`;
const SNumWrapper = styled.header`
  font-weight: 700;
  font-size: 17px;
  color: ${(props) =>
    props.color === 'orange' ? 'var(--orange-pri)' : 'var(--jade-pri)'};
`;
const STitleWrapper = styled.div`
  font-weight: 600;
  font-size: 16px;
`;
const SExplainBoxWrapper = styled.div`
  display: flex;
  padding: 0px 36px 0px 36px;
  gap: 8px;

  width: 307px;

  line-height: 19px;
`;
const SExplainWrapper = styled.div`
  margin-bottom: 5px;

  font-weight: 500;
  font-size: 14px;
  color: var(--gray-500);
`;
