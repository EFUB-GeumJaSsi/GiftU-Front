// const [tag, setTag] = useState('전체');
// const tags = ['전체', '친구', '펀딩'] ''안에 카테고리 입력;

//TagFilterComponent가 필요한 곳에 아래와 같이 작성해서 사용
// <TagFilterComponent
//  tags={tags}
//  selectedTag={tag}
//  onTagChange={setTag}
//  color='아무것도 입력 안하면 jade임. orange 필요하면 orange라고 입력'
// />

import styled from 'styled-components';
import { B3 } from '../../styles/font';

const TagFilterComponent = ({ tags, selectedTag, onTagChange, color }) => {
  // color: [배경 색, 글꼴 색]
  const btnColor = {
    orange: ['var(--orange-pri)', 'var(--gray-300)'],
    jade: ['var(--jade-pri)', 'var(--gray-300)'],
  };
  const selectedColor = btnColor[color] || btnColor['jade'];
  return (
    <SLayout>
      {tags.map((tag, index) => (
        <div key={index}>
          <SInput
            type='radio'
            name='tag'
            id={tag}
            defaultChecked={selectedTag === tag}
            onChange={() => onTagChange(tag)}
          />
          <SLabel
            htmlFor={tag}
            selected={selectedTag === tag}
            color={selectedColor}
          >
            {tag}
          </SLabel>
        </div>
      ))}
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const SInput = styled.input`
  display: none;
  ${B3}
`;

const SLabel = styled.label`
  padding: 6px 16px 6px 16px;

  border-radius: 16px;
  background-color: ${(props) =>
    props.selected ? props.color[0] : props.color[1]};

  color: var(--white);

  cursor: pointer;
`;

export default TagFilterComponent;
