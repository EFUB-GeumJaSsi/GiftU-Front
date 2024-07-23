import ListPage from './ListPage';

const ListOpenPage = () => {
  return (
    <ListPage
      headerText='내가 만든 펀딩'
      buttons={[
        { text: '전체', link: '/', color: 'orange' },
        { text: '진행', link: '/isOngoing', color: 'orange' },
        { text: '종료', link: '/end', color: 'orange' },
      ]}
      message='아직 내가 만든 펀딩이 없어요'
    />
  );
};

export default ListOpenPage;
