import styled from 'styled-components';
import { B1, B3, H2 } from '../../styles/font';

const TopFundingInfo = ({ color, tag, image, title, infoText }) => {
  return (
    <SLayout>
      <SImageContainer>
        <SImg src={image} alt='funding' />
        {tag && <STagSpan color={color}>{tag}</STagSpan>}
      </SImageContainer>
      <STitleWrapper>
        <STitleSpan>{title}</STitleSpan>
      </STitleWrapper>
      <STextSpan>{infoText}</STextSpan>
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
const SImageContainer = styled.div`
  position: relative;
`;
const SImg = styled.img`
  min-width: 312px;
  min-height: 312px;
  width: 312px;
  height: 312px;

  background-color: var(--gray-400);
  border-radius: 16px;
`;
const STagSpan = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 4px 12px;
  border-radius: 20px;
  background-color: ${(props) => props.color};

  ${B1}
  color: var(--white);
`;
const STitleWrapper = styled.div`
  justify-content: flex-start;

  width: 311px;
`;
const STitleSpan = styled.span`
  ${H2}
`;
const STextSpan = styled.p`
  width: 311px;

  ${B3}
  color: var(--gray-500);
  line-height: 140%;
  word-break: break-all;
`;

export default TopFundingInfo;
