import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Back } from '../../assets/common/btn_back.svg';

// text, onClick을 props로 받습니다.
// text의 경우 마이페이지에서 사용할 때 원하는 문구를 넣으면 됩니다.
// 클릭 시 원하는 함수 실행 가능하도록 onClick을 props로 받습니다. (임시...)
// 생략 시 뒤로가기 함수가 실행됩니다.

// 뒤로가기 버튼 헤더
const BackHeader = ({ text, onClick }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <SContainer>
      <BackBtn onClick={onClick ? onClick : goBack} />
      <STextWrapper>{text}</STextWrapper>
    </SContainer>
  );
};

export default BackHeader;

const SContainer = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 999;

  width: 375px;
  max-width: 375px;
  height: 72px;

  background-color: white;
`;

const BackBtn = styled(Back)`
  position: absolute;
  top: 40px;
  left: 20px;

  cursor: pointer;
`;

const STextWrapper = styled.span`
  position: absolute;
  top: 43px;

  height: 17px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
