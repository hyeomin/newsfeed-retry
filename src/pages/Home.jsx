import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardList from "../components/CardList";
import breadlogo from "../assets/breadMain.jpeg";
import headerimg from "../assets/Bread1.jpeg";

function Home() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState("light");

    const themeToggler = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };

    return (
        <div className="container">
            <HomeHeader className="header">
                <div>
                    <LogoImg src={breadlogo} />
                </div>
                <InputBar className="input-bar">
                    <input placeholder="검색어를 입력하세요." />
                    <span>🔍</span>
                </InputBar>
                <RightBtnContainer className="right-container">
                    <button onClick={() => navigate("/mypage")}>
                        마이페이지
                    </button>
                    <button onClick={() => navigate("/login")}>로그인</button>
                    <button onClick={() => navigate("/register")}>
                        회원가입
                    </button>
                </RightBtnContainer>
            </HomeHeader>
            <HeaderImgContainer className="header-image">
                <img src={headerimg} />
                <button onClick={() => navigate("/write")}>
                    빵 소개하러 가기
                </button>
            </HeaderImgContainer>
            <NavBar className="nav-bar">
                <label>필터 적용</label>
                <select>
                    <option value={"인기순"}>인기순</option>
                    <option value={"최신순"}>최신순</option>
                </select>
            </NavBar>
            <CardList />
            <div className="footer"></div>
        </div>
    );
}

export default Home;

const HomeHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    column-gap: 30px;

    padding: 20px;
`;

const LogoImg = styled.img`
    width: 200px;
`;

const InputBar = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    column-gap: 6px;

    & input {
        display: flex;
        flex: 1;
        height: 30px;

        border: 1px solid lightgray;
        border-radius: 20px;
        padding: 0 20px;
    }

    & span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        padding: 0 10px;
        border-radius: 10px;
    }
`;

const RightBtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 10px;

    & button {
        height: 30px;
        color: black;

        background-color: #ffebc1;
        border-color: transparent;
        border-radius: 10px;
        cursor: pointer;
    }
`;

const HeaderImgContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 350px;
    overflow: hidden;
    position: relative;

    & img {
        width: 100%;
    }

    & button {
        position: absolute;
        top: 270px;

        border-radius: 10px;
        padding: 10px 20px;
        border: transparent;

        &:hover {
            transform: scale(1.03);
        }
    }
`;

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 10px;

    padding: 20px;
`;
