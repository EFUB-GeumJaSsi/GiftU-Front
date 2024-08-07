import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOpenList } from '../../api/funding';
import List from '../../components/List/List';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ToastComponent from '../../components/common/ToastComponent';

const ListOpenPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const info = location.state?.info;
  const [tag, setTag] = useState('전체');
  const tags = ['전체', '진행', '종료'];
  const [openList, setOpenList] = useState([]);
  const [toastShow, setToastShow] = useState(location.state?.info);

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

  useEffect(() => {
    if (info) {
      navigate('/my/funding/open', { replace: true });
    }
  }, [info]);

  return (
    <SLayout>
      <BackHeaderComponent
        text='내가 만든 펀딩'
        onClick={() => navigate('/my')}
      />
      <List
        tags={tags}
        selectedTag={tag}
        onTagChange={setTag}
        openList={openList}
      />
      {toastShow && (
        <ToastComponent setToastShow={setToastShow}>
          펀딩 참여가 취소되었어요
        </ToastComponent>
      )}
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
