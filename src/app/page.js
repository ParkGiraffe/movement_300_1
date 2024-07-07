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

      <MiddleSection>
        <TitleText>300.1 운동가 가입하기</TitleText>
      </MiddleSection>

      

      {/* <TileBox>
        <TitleText>내가</TitleText>
      </TileBox> */}
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

const MiddleSection = styled.div``;

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

const TileBox = styled.div`
  height: 150px;
  width: 150px;
  background-color: #d9d9d9;
  border-radius: 15px;
`;

const Divider = styled.div`
  height: 40px;
`;
