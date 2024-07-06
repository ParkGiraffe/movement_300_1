'use client';

import styled from "styled-components";
import styles from "./page.module.css";
import StoreIcon from "@mui/icons-material/Store";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.userInfoContainer}>
        <text>접속자 : 20190320 박요셉</text>
      </div>

      <div className={styles.topSection}>
        <h1>현재까지 모인</h1>
        <h1>ecoin</h1>
        <h1 className={styles.countText}>15</h1>
        <Container>
          <StoreIcon className="store_icon" />
        </Container>
      </div>

      <div className={styles.middleSection}>
        <h3>오늘은 어떤 활동을 하셨나요?</h3>
      </div>
    </main>
  );
}

const Container = styled.div`
  /* width: 20px;
  height: 20px; */

  .store_icon {
    width: 45px;
    height: 45px;
    
    path {
      fill: black;
    }
  }
`;


