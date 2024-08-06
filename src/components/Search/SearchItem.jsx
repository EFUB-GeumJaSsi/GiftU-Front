import styled from 'styled-components';
import TagComponent from '../common/TagComponent';

const SearchItem = ({ image, name, title, date, status, onClick }) => {
  return (
    <SResultItem onClick={onClick}>
      <SImg src={image} />
      <SContentWrapper>
        <STitleText>{title}</STitleText>
        <SNameText>
          <SBoldWrapper>개설</SBoldWrapper> {name}
        </SNameText>
        <SDateText>
          <SBoldWrapper>마감</SBoldWrapper>
          {date}
        </SDateText>
        <div>
          {status == 'IN_PROGRESS' ? (
            <TagComponent text='진행 중' color='jade' />
          ) : (
            <TagComponent text='종료' color='gray' />
          )}
        </div>
      </SContentWrapper>
    </SResultItem>
  );
};

const SResultItem = styled.button`
  display: flex;
  flex-direction: row;

  align-items: center;

  width: 332px;
  gap: 15px;
`;
const SImg = styled.img`
  width: 120px;
  height: 120px;

  border-radius: 16px;
  background-color: var(--gray-300);
`;
const SContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 187px;

  font-weight: 500;
  font-size: 14px;
`;
const STitleText = styled.text`
  display: -webkit-box;
  text-align: start;

  max-width: 100%;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  font-weight: 700;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SNameText = styled.text`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
const SDateText = styled(SNameText)``;
const SBoldWrapper = styled.div`
  color: var(--gray-500);
  font-weight: 500;
`;
export default SearchItem;
