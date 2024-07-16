import styled from 'styled-components';

const TopFundingInfo = ({
  color,
  tag = 'D-10',
  image = 'https://image.vans.co.kr/cmsstatic/product/VN000CSE5T21_VN000CSE5T21_primary.jpg?browse',
  title = '펀딩 제목',
  infoText = '최대120자까지펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀딩을소개해주세요펀펀딩을',
}) => {
  return (
    <SLayout>
      <SImageContainer>
        <SImageWrapper src={image} alt='funding' />
        <STagWrapper color={color}>{tag}</STagWrapper>
      </SImageContainer>
      <STitleContainer>
        <STitleWrapper>{title}</STitleWrapper>
      </STitleContainer>
      <STextWrapper>{infoText}</STextWrapper>
    </SLayout>
  );
};

export default TopFundingInfo;

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

const SImageWrapper = styled.img`
  width: 312px;
  height: 312px;

  border-radius: 16px;
`;

const STagWrapper = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;

  padding: 4px 12px;
  border-radius: 20px;
  background-color: ${(props) =>
    props.color === 'orange' ? 'var(--orange-pri)' : 'var(--jade-pri)'};

  color: var(--white);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

const STitleContainer = styled.div`
  justify-content: flex-start;

  width: 311px;
`;

const STitleWrapper = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

const STextWrapper = styled.p`
  width: 311px;

  color: var(--gray-500);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
  word-break: break-all;
`;
