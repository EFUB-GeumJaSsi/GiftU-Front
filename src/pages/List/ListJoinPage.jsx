import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import { getJoinList } from '../../api/funding';
import List from '../../components/List/List';

const ListJoinPage = () => {
  const [tag, setTag] = useState('전체');
  const tags = ['전체', '진행', '종료'];
  const [joinList, setJoinList] = useState([]);

  const readJoinList = async (status) => {
    try {
      const response = await getJoinList(status);
      setJoinList(response.data.fundings);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tag === '전체') {
      readJoinList();
    } else if (tag === '진행') {
      readJoinList('IN_PROGRESS');
    } else {
      readJoinList('TERMINATED');
    }
  }, [tag]);

  return (
    <SLayout>
      <BackHeaderComponent text='내가 참여한 펀딩' />
      <List
        tags={tags}
        selectedTag={tag}
        onTagChange={setTag}
        openList={joinList}
        color='orange'
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

export default ListJoinPage;
