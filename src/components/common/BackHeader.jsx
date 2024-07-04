import styled from 'styled-components';
import { ReactComponent as Back } from '../../assets/common/btn_back.svg';
import { useNavigate } from 'react-router-dom';

// 뒤로가기 버튼 헤더
const BackHeader = ({ onClick }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <HeaderContainer>
      <BackBtn onClick={onClick ? onClick : goBack}></BackBtn>
    </HeaderContainer>
  );
};

export default BackHeader;

const HeaderContainer = styled.div`
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
