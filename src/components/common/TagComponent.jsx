import styled from 'styled-components';

const TagComponent = ({ text, color }) => {
  const btnColor = {
    orange: ['var(--orange-sec)', 'var(--orange-pri)'],
    jade: ['var(--jade-sec)', 'var(--jade-pri)'],
    gray: ['var(--gray-200)', 'var(--gray-500)'],
  };
  return <SLayout color={btnColor[color]}>{text}</SLayout>;
};

export default TagComponent;

const SLayout = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;

  border-radius: 20px;
  background-color: ${(props) =>
    props.color ? props.color[0] : 'var(--gray-100)'};

  text-align: center;
  color: ${(props) => (props.color ? props.color[1] : 'var(--gray-400)')};
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 120%;
`;
