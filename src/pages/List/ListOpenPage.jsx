import styled from 'styled-components';
import { useState, useEffect } from 'react';
import List from '../../components/List/List';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import { getOpenList } from '../../api/funding';

const ListOpenPage = () => {
  const [tag, setTag] = useState('전체');
  const tags = ['전체', '진행', '종료'];
  const [openList, setOpenList] = useState([]);

  const readOpenList = async (status) => {
    try {
      const response = await getOpenList(status);
      setOpenList(response.data.fundings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tag === '전체') {
      readOpenList(null);
    } else if (tag === '진행') {
      readOpenList('IN_PROGRESS');
    } else {
      readOpenList('TERMINATED');
    }
  }, [tag]);

  return (
    <SLayout>
      <BackHeaderComponent text='내가 만든 펀딩' />
      <List
        tags={tags}
        selectedTag={tag}
        onTagChange={setTag}
        openList={openList}
      />
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;
export default ListOpenPage;
