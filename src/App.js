import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './hoc/Auth';
// 로그인
import LoginPage from './pages/Login/LoginPage';
import OAuthRedirectPage from './pages/Login/OAuthRedirectPage';
// 홈
import HomePage from './pages/Home/HomePage';
import SearchPage from './pages/Search/SearchPage';
// 친구
import FriendPage from './pages/Friend/FriendPage';
// 펀딩 개설
import FundingOpenPage from './pages/FundingOpen/IndexPage';
// 알림
import NotificationPage from './pages/Notification/NotificationPage';
// 마이(시작)
import MyPage from './pages/My/MyPage';
// 프로필 편집
import ProfileEditPage from './pages/ProfileEdit/ProfileEditPage';
// 내가 ~한 목록
import ListOpenPage from './pages/List/ListOpenPage';
import ListJoinPage from './pages/List/ListJoinPage';
// 튜토리얼
import TutorialPage from './pages/Tutorial/TutorialPage';
// 펀딩 상세
import FundingInfoPage from './pages/FundingInfo/FundingInfoPage';
// 펀딩 참여
import FundingJoinPage from './pages/FundingJoin/IndexPage';
// 작성/수정
import ReviewEditPage from './pages/Edit/ReviewEditPage';
import MessageEditPage from './pages/Edit/MessageEditPage';

const App = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={<Auth Page={LoginPage} option='logout' key='LoginPage' />}
      />
      <Route
        path='/api/oauth/kakao'
        element={<Auth Page={OAuthRedirectPage} option='logout' key='OAuthRedirectPage' />}
      />
      <Route
        path='/'
        element={<Auth Page={HomePage} option='login' key='HomePage' />}
      />
      <Route
        path='/search'
        element={<Auth Page={SearchPage} option='login' key='SearchPage' />}
      />
      <Route
        path='/friends'
        element={<Auth Page={FriendPage} option='login' key='FriendPage' />}
      />
      <Route
        path='/notifications'
        element={<Auth Page={NotificationPage} option='login' key='NotificationPage' />}
      />
      <Route
        path='/my'
        element={<Auth Page={MyPage} option='login' key='MyPage' />}
      />
      <Route
        path='/my/edit'
        element={<Auth Page={ProfileEditPage} option='login' key='ProfileEditPage' />}
      />
      <Route
        path='/my/funding/open'
        element={<Auth Page={ListOpenPage} option='login' key='ListOpenPage' />}
      />
      <Route
        path='/my/funding/join'
        element={<Auth Page={ListJoinPage} option='login' key='ListJoinPage' />}
      />
      <Route
        path='/tutorial'
        element={<Auth Page={TutorialPage} option='all' key='TutorialPage' />}
      />
      <Route
        path='/funding/open'
        element={<Auth Page={FundingOpenPage} option='login' key='FundingOpenPage' />}
      />
      <Route
        path='/funding/:fundingId'
        element={<Auth Page={FundingInfoPage} option='all' key='FundingInfoPage' />}
      />
      <Route
        path='/funding/:fundingId/join'
        element={<Auth Page={FundingJoinPage} option='login' key='FundingJoinPage' />}
      />
      <Route
        path='/funding/:fundingId/review/edit'
        element={<Auth Page={ReviewEditPage} option='login' key='ReviewEditPage' />}
      />
      <Route
        path='/funding/:fundingId/message/edit'
        element={<Auth Page={MessageEditPage} option='login' key='MessageEditPage' />}
      />
      <Route
		path='*'
		element={<Navigate to='/' />}
      />
    </Routes>
  );
};

export default App;
