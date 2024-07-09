import styled from 'styled-components';

const Button = ({ btnInfo }) => {
  const { text, color, width, onClick } = btnInfo;

  // color: [배경 색, 글꼴 색]
  const btnColor = {
    orange: ['var(--orange-pri)', 'var(--white)'],
    jade: ['var(--jade-pri)', 'var(--white)'],
    gray: ['var(--gray-100)', 'var(--gray-400)'],
  };

  return (
    <BtnContainer color={btnColor[color]} width={width} onClick={onClick}>
      {text}
    </BtnContainer>
  );
};

export default Button;

const BtnContainer = styled.button`
  width: ${(props) => (props.width ? props.width : '335px')};
  height: 56px;

  border-radius: 40px;
  background-color: ${(props) =>
    props.color ? props.color[0] : 'var(--gray-100)'};

  text-align: center;
  color: ${(props) => (props.color ? props.color[1] : 'var(--gray-400)')};
  font-size: 16px;
  font-weight: 600;
  line-height: 140%;
`;
