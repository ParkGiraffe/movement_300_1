"use client";

import styled from "styled-components";
import styles from "./page.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
// import StoreIcon from "@mui/icons-material/Store";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.userInfoContainer}>
        <text>접속자 : 20190320 박요셉</text>
      </div>
      <Divider />
      <Divider />
      <TopSection>
        <TopText>금요일의 마스코트</TopText>
        <Divider />
        <StickerSection>
          <ArrowButtonBox>
            <ArrowBackIos className="icon left_arrow" />
          </ArrowButtonBox>
          <StickerImgBox />
          <ArrowButtonBox>
            <ArrowForwardIos className="icon" />
          </ArrowButtonBox>
        </StickerSection>
        <Divider />
        {/* <StoreIconContainer>
          <StoreIcon className="store_icon" />
          </StoreIconContainer> */}
        <SportsmanSection>
          <SportsmanBox>
            <TitleText>오늘 모인 운동가</TitleText>
            <CountText>15</CountText>
          </SportsmanBox>
          <SportsmanBox className="right_box">
            <TitleText>지금까지 모인 운동가</TitleText>
            <CountText>100</CountText>
          </SportsmanBox>
        </SportsmanSection>
      </TopSection>
      <Divider />
      <Divider />
      <MiddleSection>
        <TitleText>300.1 운동가 가입하기</TitleText>
        <Divider className="thin_divider" />
        <AddPhotoBox>
          <TitleText className="in_text">사진 추가하기</TitleText>
        </AddPhotoBox>
        <AddPhotoButton>
          <TitleText>사진 등록하기</TitleText>
        </AddPhotoButton>
        <NoticeTextContainer>
          <Divider className="thin_divider" />
          <NoticeText>위 버튼을 눌러서 활동 사진을 등록하세요!</NoticeText>
          <Divider className="thin_divider" />
          <NoticeText className="red_text">
            인스타그램 스토리, 게시글에 등록된 화면의 스크린샷을 등록하세요!
            (조건 미달시 등록 취소)
          </NoticeText>
        </NoticeTextContainer>
      </MiddleSection>
      <Divider />
      <Divider />
      <BottomSection>
        <TitleText>지금까지 활동한 사진 다시보기</TitleText>
        <Divider className="thin_divider" />
        <StickerSection>
          <ArrowButtonBox>
            <ArrowBackIos className="icon left_arrow" />
          </ArrowButtonBox>
          <WatchPhotoBox>
            <PhotoInfoContainer>
              {/* <text>info</text> */}
              <NoticeText className="black_text date_text">
                2024.xx.xx
              </NoticeText>
              <NoticeText className="black_text">x일 전</NoticeText>
            </PhotoInfoContainer>
          </WatchPhotoBox>

          <ArrowButtonBox>
            <ArrowForwardIos className="icon" />
          </ArrowButtonBox>
        </StickerSection>
      </BottomSection>

      <Divider />
    </main>
  );
}

const TopSection = styled.div`
  text-align: center;
`;

const CountText = styled.h1`
  font-size: 50px;
`;

const StickerSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StickerImgBox = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 180px;
  background-color: grey;
`;

const ArrowButtonBox = styled.div`
  display: flex;
  /* background-color: blue; */

  width: 60px;
  height: 60px;
  justify-content: center;

  .left_arrow {
    /* background-color: pink; */
    margin-left: 15px;
  }

  .icon {
    width: 40px;
    height: 40px;
    align-self: center;

    path {
      fill: black;
    }
  }
`;

const TopText = styled.h1`
  font-size: 30px;
`;

const TitleText = styled.h3`
  font-size: 19px;
`;

const SportsmanSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* background-color: cyan; */

  .right_box {
    margin-left: 20px;
  }
`;

const SportsmanBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px;
  height: 150px;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 15px;
  /* background-color: cyan; */
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .thin_divider {
    height: 20px;
  }
`;

const StoreIconContainer = styled.div`
  /* width: 20px;
  height: 20px;  */

  .store_icon {
    width: 45px;
    height: 45px;

    path {
      fill: black;
    }
  }
`;

const AddPhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 250px;
  background-color: #d9d9d9;
  border-radius: 15px;

  .in_text {
    font-size: 15px;
  }
`;

const AddPhotoButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 250px;
  color: black;
  background-color: #e9dedf;
  border-radius: 15px;
  margin-top: 10px;
`;

const NoticeText = styled.text`
  font-size: 15px;
  color: grey;
`;

const NoticeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;

  .red_text {
    color: #ff0000;
  }
`;

const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .thin_divider {
    height: 20px;
  }
`;

const WatchPhotoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 380px;
  width: 250px;
  background-color: #d9d9d9;
  border-radius: 15px;

  .in_text {
    font-size: 15px;
  }
`;

const PhotoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 100px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #e9dedf;

  .black_text {
    color: black;
  }

  .date_text {
    font-size: 18px;
  }
`;

const Divider = styled.div`
  height: 40px;
`;
