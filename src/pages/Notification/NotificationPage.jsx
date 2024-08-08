import styled from 'styled-components';
import { H1 } from '../../styles/font';
import { useState, useEffect } from 'react';
import {
  getAllNotice,
  getFriendNotice,
  getFundingNotice,
} from '../../api/notice';
import NavComponent from '../../components/common/NavComponent';
import TagSelectComponent from '../../components/common/TagSelectComponent';
import NotificationItem from '../../components/Notification/NotificationItem';

// 알림 데이터 포맷팅
const formatNoticeFriend = (data) => {
  const notices = data.map((item) => {
    return {
      tag: 'friend',
      id: item.friendTableId,
      image: item.recieveUserImgUrl,
      name: item.recieveUserNickname,
      rawTime: item.updatedAt,
    };
  });
  return notices;
};
const formatNoticeFundingDueDate = (data) => {
  const now = data.now;
  const notices = data.fundingDueDate.map((item) => {
    return {
      tag: 'fundingDueDate',
      id: item.fundingId,
      image: item.fundingImageUrl,
      name: item.fundingTitle,
      endDate: item.fundingEndDate,
      rawTime: now,
    };
  });
  return notices;
};
const formatNoticeFundingAchieve = (data) => {
  const notices = data.fundingAchieve
    .filter(
      (item) =>
        (item.percent >= 25 && item.percent <= 35) ||
        (item.percent >= 50 && item.percent <= 60) ||
        (item.percent >= 75 && item.percent <= 85),
    )
    .map((item) => {
      return {
        tag: 'fundingAchieve',
        id: item.fundingId,
        image: item.fundingImageUrl,
        name: item.fundingTitle,
        percent: item.percent,
        rawTime: item.lastParticipateTime,
      };
    });
  return notices;
};
// 알림 최신순 정렬
const sortNotiLatest = (notiList) => {
  return notiList
    ? notiList.sort(
        (a, b) => new Date(b.rawTime).getTime() - new Date(a.rawTime).getTime(),
      )
    : [];
};

const NotificationPage = () => {
  const [tag, setTag] = useState('전체');
  const [notiList, setNotiList] = useState([]);

  // API 연결
  // 전체 알림 조회
  const readNotiAll = async () => {
    try {
      const response = await getAllNotice();
      const friendNotice = formatNoticeFriend(response.data.friendNotice);
      const fundingDueDate = formatNoticeFundingDueDate(response.data);
      const fundingAchieve = formatNoticeFundingAchieve(response.data);
      const notiList = [...friendNotice, ...fundingDueDate, ...fundingAchieve];
      setNotiList(sortNotiLatest(notiList));
    } catch (error) {
      console.error(error);
    }
  };
  // 친구 알림 조회
  const readNotiFriend = async () => {
    try {
      const response = await getFriendNotice();
      const friendNotice = formatNoticeFriend(response.data);
      const notiList = [...friendNotice];
      setNotiList(sortNotiLatest(notiList));
    } catch (error) {
      console.error(error);
    }
  };
  // 펀딩 알림 조회
  const readNotiFunding = async () => {
    try {
      const response = await getFundingNotice();
      const fundingDueDate = formatNoticeFundingDueDate(response.data);
      const fundingAchieve = formatNoticeFundingAchieve(response.data);
      const notiList = [...fundingDueDate, ...fundingAchieve];
      setNotiList(sortNotiLatest(notiList));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (tag === '전체') {
      readNotiAll();
    } else if (tag === '친구') {
      readNotiFriend();
    } else if (tag === '펀딩') {
      readNotiFunding();
    }
  }, [tag]);

  return (
    <SLayout>
      <SHeader>알림</SHeader>
      <SMain>
        <TagSelectComponent
          tags={['전체', '친구', '펀딩']}
          selectedTag={tag}
          onTagChange={setTag}
        />
        <SOl>
          {notiList.map((item, index) => {
            return (
              <li key={index}>
                <NotificationItem data={item} />
              </li>
            );
          })}
        </SOl>
      </SMain>
      <NavComponent />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;

  width: fit-content;
  margin: 0 auto;
  padding: 40px 0 128px;
  gap: 30px;
`;
const SHeader = styled.header`
  ${H1}
  color: var(--black);
`;
const SMain = styled.main`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  gap: 22px;
`;
const SOl = styled.ol`
  display: flex;
  flex-flow: column nowrap;
`;

export default NotificationPage;
