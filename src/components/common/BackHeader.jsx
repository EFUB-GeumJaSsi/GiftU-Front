import styled from 'styled-components';
import { ReactComponent as Back } from '../../assets/common/btn_back.svg';
import { useNavigate } from 'react-router-dom';

// 뒤로가기 버튼 헤더
const BackHeader = ({ text, onClick }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <HeaderContainer>
      <BackBtn onClick={onClick ? onClick : goBack} />
      <Label>{text}</Label>
    </HeaderContainer>
  );
};

export default BackHeader;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
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

const Label = styled.span`
  position: absolute;
  top: 43px;

  height: 17px;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
