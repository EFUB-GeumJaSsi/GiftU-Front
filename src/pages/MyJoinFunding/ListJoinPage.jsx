import ListPage from '../ListPage';

const ListJoinPage = () => {
  return (
    <ListPage
      headerText='내가 참여한 펀딩'
      buttons={[
        { text: '전체', link: '/', color: 'jade' },
        { text: '펀딩', link: '/isOngoing', color: 'jade' },
        { text: '종료', link: '/end', color: 'jade' },
      ]}
      message='아직 참여한 펀딩이 없어요'
    />
  );
};

export default ListJoinPage;
