// const TagComponent = ({ text, color }) 로 <TagComponent text = "진행 중", color = 'jade'/>과 같이 쓸 수 있습니다.
// 친구 태그의 경우 <TagComponent text = "친구", color = "orange"/>처럼 쓰시면 됩니다.

import styled from 'styled-components';

const TagComponent = ({ text, color = 'gray' }) => {
  const colorOption = {
    orange: ['var(--orange-sec)', 'var(--orange-pri)'],
    jade: ['var(--jade-sec)', 'var(--jade-pri)'],
    gray: ['var(--gray-200)', 'var(--gray-500)'],
  };
  return <SLayout $color={colorOption[color]}>{text}</SLayout>;
};

const SLayout = styled.div`
  padding: 4px 8px;

  border-radius: 20px;
  background-color: ${({ $color }) => $color[0]};

  color: ${({ $color }) => $color[1]};
  font-size: 12px;
  font-weight: 600;
  line-height: 120%;
`;

export default TagComponent;
