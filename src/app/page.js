"use client";

import styled from "styled-components";
import styles from "./page.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { auth, db, signInWithGoogle, storage } from "@/firebase/firebaseClient";
import { useState, useEffect, useRef } from "react";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

export default function Home() {
  const [imageUpload, setImageUpload] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [imageList, setImageList] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const fileRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchImages(currentUser.uid);
      }
    });

    const countRef = doc(db, "activist", "count");
    const unsubscribeCount = onSnapshot(countRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setTodayCount(data.today);
        setTotalCount(data.total);
      }
    });

    setLoading(false); // 로딩 상태 해제

    return () => {
      unsubscribe();
      unsubscribeCount();
    };
  }, []);

  const handleClick = () => {
    fileRef?.current?.click();
  };

  const onUpload = () => {
    if (imageUpload === null || !user) return;

    const imageRef = ref(storage, `images/${user.uid}/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      fetchImages(user.uid);
      incrementCount();
    });
  };

  const fetchImages = (uid) => {
    setLoading(true); // 로딩 시작
    const imageListRef = ref(storage, `images/${uid}/`);
    listAll(imageListRef).then((response) => {
      const urls = response.items.map((item) =>
        getDownloadURL(item).then((url) => url)
      );
      Promise.all(urls).then((urlArray) => {
        setImageList(urlArray);
        setLoading(false); // 로딩 끝
      });
    });
  };

  useEffect(() => {
    if (imageUpload) {
      const url = URL.createObjectURL(imageUpload);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageUpload]);

  const onLogin = async (event) => {
    event.preventDefault();
    await signInWithGoogle().then(() => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        fetchImages(auth.currentUser.uid);
      }
    });
  };

  const incrementCount = async () => {
    const countRef = doc(db, "activist", "count");
    const docSnap = await getDoc(countRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const newToday = (data["today"] || 0) + 1;
      const newTotal = (data["total"] || 0) + 1;

      await setDoc(countRef, {
        ...data,
        ["today"]: newToday,
        ["total"]: newTotal,
      });
    } else {
      await setDoc(countRef, {
        today: 1,
        total: 1,
      });
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < imageList.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <main className={styles.main} style={{ display: loading ? 'none' : '' }}>
      <div className={styles.userInfoContainer}>
        <text onClick={onLogin}>{user ? user.displayName : "로그인하기"}</text>
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
        <activistSection>
          <activistBox>
            <TitleText>오늘 모인 운동가</TitleText>
            <CountText>{todayCount}</CountText>
          </activistBox>
          <Divider />
          <activistBox className="right_box">
            <TitleText>지금까지 모인 운동가</TitleText>
            <CountText>{totalCount}</CountText>
          </activistBox>
        </activistSection>
      </TopSection>
      <Divider />
      <Divider />
      <MiddleSection>
        <TitleText>300.1 운동가 가입하기</TitleText>
        <Divider className="thin_divider" />
        <AddPhotoBox onClick={handleClick}>
          <AddPhotoInput
            ref={fileRef}
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          {!imageUpload ? (
            <TitleText className="in_text">사진 첨부하기</TitleText>
          ) : (
            <WatchPhotoBox>
              <PhotoImage src={previewUrl} alt="미리보기 이미지" />
            </WatchPhotoBox>
          )}
        </AddPhotoBox>
        <AddPhotoButton>
          <TitleText onClick={onUpload}>사진 등록하기</TitleText>
        </AddPhotoButton>
        <NoticeTextContainer>
          <Divider className="thin_divider" />
          <NoticeText>위 버튼을 눌러서 활동 사진을 등록하세요!</NoticeText>
          <Divider className="thin_divider" />
          <NoticeText className="red_text">
            인스타그램 스토리, 게시글에
            <br />
            등록된 화면의 스크린샷을 등록하세요!
            <br />
            (조건 미달시 등록 취소)
          </NoticeText>
        </NoticeTextContainer>
      </MiddleSection>
      <Divider />
      <Divider />
      <BottomSection>
        <TitleText>운동가들의 활동들</TitleText>
        <Divider className="thin_divider" />
        <StickerSection>
          <ArrowButtonBox onClick={handlePreviousImage}>
            <ArrowBackIos className="icon left_arrow" />
          </ArrowButtonBox>

          {imageList.length > 0 && (
            <WatchPhotoBox>
              <PhotoImage src={imageList[currentImageIndex]} />
              <PhotoInfoContainer>
                <NoticeText className="black_text date_text">
                  2024.xx.xx
                </NoticeText>
                <NoticeText className="black_text">x일 전</NoticeText>
              </PhotoInfoContainer>
            </WatchPhotoBox>
          )}

          <ArrowButtonBox onClick={handleNextImage}>
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

const activistSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* background-color: cyan; */

  .right_box {
    margin-left: 20px;
  }
`;

const activistBox = styled.div`
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

const AddPhotoInput = styled.input`
  display: none;
`;

const NoticeText = styled.text`
  font-size: 15px;
  color: grey;
  text-align: center;
`;

const NoticeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;

  .red_text {
    /* white-space: pre-line; */
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
  overflow: hidden;

  .in_text {
    font-size: 15px;
  }
`;

const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PhotoInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 250px;
  /* height: 100px; */
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #e9dedf;
  padding: 10px;

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
