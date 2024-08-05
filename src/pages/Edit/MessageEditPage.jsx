import styled from 'styled-components';
import { useState, useEffect } from 'react';
import BackHeaderComponent from '../../components/common/BackHeaderComponent';
import ButtonComponent from '../../components/common/ButtonComponent';
import BottomBackgroundComponent from '../../components/common/BottomBackgroundComponent';
import { getCongratsMessage, patchCongratsMessage } from '../../api/funding';
import { useNavigate, useParams } from 'react-router-dom';

const MessageEditPage = () => {
  const participationId = 19; //아직 연결 안함 본인 participationId 넣어야 작동됨
  const { fundingId } = useParams();
  const [anony, setAnony] = useState();
  const [msgText, setMsgText] = useState('');
  const [name, setName] = useState('nickname');
  const handleInputChange = (e) => {
    setMsgText(e.target.value);
  };
  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    setName(selectedValue);
    setAnony(selectedValue === 'anony' ? true : false);
  };
  const readMessage = async (fundingId) => {
    try {
      const response = await getCongratsMessage(fundingId);
      const isAnonymous = response.data.anonymity === true;
      setMsgText(response.data.message);
      setName(isAnonymous ? 'anony' : 'nickname');
    } catch (error) {
      console.error(error);
    }
  };
  const UpdateMessage = async (participationId, anony, msgText) => {
    try {
      const response = await patchCongratsMessage(
        participationId,
        anony,
        msgText,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
  const handleClickChange = (e) => {
    UpdateMessage(participationId, anony, msgText);
    navigate(`/funding/${fundingId}`); //버튼 클릭시 이동할 주소
  };
  useEffect(() => {
    readMessage(fundingId);
  }, [fundingId]);

  const Btn = (
    <ButtonComponent
      btnInfo={{
        text: '수정하기',
        width: '335px',
        color: 'orange',
      }}
      onClick={handleClickChange}
    />
  );
  return (
    <SLayout>
      <BackHeaderComponent text='축하메세지' />
      <SForm>
        <SFieldset>
          <STextBox>
            <STextWrapper>이름</STextWrapper>
            <SStarWrapper>*</SStarWrapper>
          </STextBox>
          <SButtonContainer>
            <SButtonWrapper htmlFor='nickname' checked={name === 'nickname'}>
              <input
                id='nickname'
                type='radio'
                value='nickname'
                checked={name === 'nickname'}
                onChange={handleRadioChange}
              />
              닉네임
            </SButtonWrapper>
            <SButtonWrapper htmlFor='anony' checked={name === 'anony'}>
              <input
                id='anony'
                type='radio'
                value='anony'
                checked={name === 'anony'}
                onChange={handleRadioChange}
              />
              익명
            </SButtonWrapper>
          </SButtonContainer>
        </SFieldset>
        <SFieldset>
          <SOptionalLegend>축하메세지</SOptionalLegend>
          <SBigTextarea onChange={handleInputChange} value={msgText} />
        </SFieldset>
      </SForm>
      <BottomBackgroundComponent Button={Btn} />
    </SLayout>
  );
};
const SLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
const SForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  width: 335px;
`;
const SFieldset = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;
const STextBox = styled.label`
  display: flex;
`;
const STextWrapper = styled.span`
  margin-left: 8px;

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;
const SStarWrapper = styled(STextWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2px;

  color: var(--orange-pri);
`;
const SButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 8px;

  input[type='radio'] {
    -webkit-appearance: none; // 웹킷 브라우저에서 기본 스타일 제거
    -moz-appearance: none; // 모질라 브라우저에서 기본 스타일 제거
    appearance: none; // 기본 브라우저에서 기본 스타일 제거
    width: 24px;
    height: 24px;
    border: 2px solid var(--orange-pri); // 체크되지 않았을 때의 테두리 색상
    border-radius: 50%;
    outline: none; // focus 시에 나타나는 기본 스타일 제거
    cursor: pointer;
  }

  input[type='radio']:checked {
    background-color: var(--orange-pri); // 체크 시 내부 원으로 표시될 색상
    border: 7px solid var(--orange-sec); // 테두리가 아닌, 테두리와 원 사이의 색상
    box-shadow: 0 0 0 2px var(--orange-pri); // 얘가 테두리가 됨
    // 그림자로 테두리를 직접 만들어야 함 (퍼지는 정도를 0으로 주면 테두리처럼 보입니다.)
    // 그림자가 없으면 그냥 설정한 색상이 꽉 찬 원으로만 나옵니다.
  }
`;
const SButtonWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;

  padding-left: 16px;
  height: 64px;

  border-radius: 16px;
  background: ${(props) =>
    props.checked ? 'var(--orange-sec)' : 'var(--gray-100)'};

  color: ${(props) => (props.checked ? 'var(--black)' : 'var(--gray-400)')};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;

  cursor: pointer;
`;
const SOptionalLegend = styled.legend`
  display: flex;
  gap: 8px;

  width: 76px;
  height: 22px;
  padding: 0px 8px 0px 8px;

  color: var(--black);
  font-size: 16px;
  font-weight: 500;
`;
const SBigTextarea = styled.textarea`
  display: flex;
  flex-direction: column;

  height: 180px;
  padding: 24px;

  border: 2px solid transparent;
  border-radius: 16px;
  background-color: var(--gray-100);

  color: var(--black);
  font-weight: 500;
  font-size: 16px;

  resize: none;

  &:focus {
    border: 2px solid var(--orange-pri);
    outline: none;
  }
`;

export default MessageEditPage;
