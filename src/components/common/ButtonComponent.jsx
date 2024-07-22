import styled from 'styled-components';

// btnInfo라는 객체를 props로 받습니다.
// btnInfo에는 text, color, width, onClick 값을 설정할 수 있습니다.
//
// text: 버튼에 적힐 내용,
// color(생략 시 회색 버튼): 버튼 색상(글꼴 색상은 고려 안 하셔도 되며 orange, jade, gray 셋 중 하나로 작성하시면 됩니다),
// width(생략 시 335px): 버튼 너비,
// onClick: 이벤트 함수
//
// 예시 <Button btnInfo={{ text: '다음', color: 'jade' }} />

const Button = ({ btnInfo, ...props }) => {
  const { text, color, width } = btnInfo;

  // color: [배경 색, 글꼴 색]
  const btnColor = {
    orange: ['var(--orange-pri)', 'var(--white)'],
    jade: ['var(--jade-pri)', 'var(--white)'],
    gray: ['var(--gray-100)', 'var(--gray-400)'],
  };

  return (
    <SWrapper
      type={type}
      color={btnColor[color]}
      width={width}
      onClick={onClick}
    >
      {text}
    </SWrapper>
  );
};

export default Button;

const SWrapper = styled.button`
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