import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { onAuthStateChanged } from "firebase/auth";
import breadMain from "../assets/breadMain.jpeg";
import { useSelector } from "react-redux";
import { auth } from "../firebase";

export default function Header() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light");
    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    const navigateWriting = () => {
        navigate("/write");
    };
    const navigateLogin = () => {
        navigate("/login");
    };
    const navigateHome = () => {
        navigate("/");
    };
    const MovetoTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const userState = useSelector((state) => state.user);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("user", user);
        });
    }, []);

    return (
        <>
            <HomeHeader>
                <ImgButton onClick={navigateHome}>
                    <ButtonImg src={breadMain} />
                </ImgButton>
                <WrappingBtns>
                    <Btns>
                        <SearchBtn>🔍</SearchBtn>
                        <PostBreadBtn onClick={navigateWriting}>
                            빵 소개하러 가기
                        </PostBreadBtn>
                        {userState.isdone === false ? (
                            <>
                                <LoginBtn onClick={navigateLogin}>
                                    로그인
                                </LoginBtn>
                                <LoginBtn onClick={() => navigate("/register")}>
                                    회원가입
                                </LoginBtn>
                            </>
                        ) : (
                            <>
                                <MypageBtn onClick={() => navigate("/mypage")}>
                                    {userState.nickname}의 마이페이지
                                </MypageBtn>
                                <LogOutBtn
                                    onClick={() => navigate("/register")}
                                >
                                    로그아웃
                                </LogOutBtn>
                            </>
                        )}
                        <ModeBtn onClick={themeToggler}>
                            {theme === "light" ? "🌚" : "🌞"}
                        </ModeBtn>
                    </Btns>
                </WrappingBtns>
            </HomeHeader>
            {/* <BtnWrapper>
          {users.isdone === false ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button onClick={() => navigate("/login")}>로그인</Button>{" "}
              <Button onClick={() => navigate("/register")}>회원가입</Button>{" "}
            </div>
          ) : (
            <>
              <h1>{users.nickname}님 환영합니다.</h1>
              <div>
                <Button onClick={() => navigate("/")}>로그아웃</Button>{" "}
              </div>
            </>
          )}
        </BtnWrapper> */}
        </>
    );
}

const HomeHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ButtonImg = styled.img`
    display: flex;
    width: 200px;
    height: 80px;
    margin: 10px;
    cursor: pointer;
`;

const ImgButton = styled.button`
    display: flex;
    width: 200px;
    height: 80px;
    margin: 20px;
    background-color: transparent;
    border: 0px;
`;

const WrappingBtns = styled.div`
    display: flex;
`;

const Btns = styled.div`
    margin: 20px;
    flex: 0 0 90%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-end;
    align-items: center;
    background-color: transparent;
    border: 0px;
`;

const PostBreadBtn = styled.button`
    background-color: #ffebc1;
    border: 0px;
    border-radius: 20px;
    width: 170px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
`;
const LoginBtn = styled.button`
    background-color: #ffebc1;
    border: 0px;
    border-radius: 20px;
    width: 100px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
`;
const MypageBtn = styled.button`
    background-color: #ffebc1;
    border: 0px;
    border-radius: 20px;
    width: 100px;
    height: 100px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
`;

const LogOutBtn = styled.button`
    background-color: #ffebc1;
    border: 0px;
    border-radius: 20px;
    width: 100px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
`;

const ModeBtn = styled.button`
    background-color: transparent;
    border: 0px;
    width: 100px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
`;

const SearchBtn = styled.button`
    background-color: #ffebc1;
    border: 0px;
    border-radius: 20px;
    width: 80px;
    height: 30px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
`;
const TopButton = styled.button`
    cursor: pointer;
    position: fixed;
    width: 40px;
    height: 40px;
`;
