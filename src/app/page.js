"use client";

import styled from "styled-components";
import styles from "./page.module.css";
import StoreIcon from "@mui/icons-material/Store";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.userInfoContainer}>
        <text>접속자 : 20190320 박요셉</text>
      </div>

      <TopSection>
        <TopText>현재까지 모인</TopText>
        <TopText>ecoin</TopText>
        <TopText className="count_text">15</TopText>
        <StoreIconContainer>
          <StoreIcon className="store_icon" />
        </StoreIconContainer>
      </TopSection>

      <MiddleSection>
        <TitleText>오늘은 어떤 활동을 하셨나요?</TitleText>
      </MiddleSection>
    </main>
  );
}

const TopSection = styled.div`
  text-align: center;
  .count_text {
    font-size: 120px !important;
  }
`;

const TopText = styled.h1`
  font-size: 30px;
`;

const MiddleSection = styled.div``;

const TitleText = styled.h3``;

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
