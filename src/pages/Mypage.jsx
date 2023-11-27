import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { auth } from "../firebase";
import { fetchPosts } from "../redux/modules/postsReducer";
import { onAuthStateChanged } from "firebase/auth";

function MyPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.postsReducer);
    const userState = useSelector((state) => state.user);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("user", user);
        });
    }, []);

    const navigateDetail = (id) => {
        navigate(`/detail/${id}`);
    };

    const [image, setImage] = useState("");
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const [browserImage, setBroswerImage] = useState(
        localStorage.getItem("image") ??
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzEwMTRfMjUy%2FMDAxNjk3MjYwNDIyNzQ2.adQvLWojNfuSgl5a572Rw8Nnlo0zI_fr2xIGTCCi-9Eg.Lu2APkbKHhX2ZoJO3PeA7vNYcUq_V9I4wOkix4xsSw8g.PNG.leeseongjae620%2Fpikachuvector.png&type=a340"
    );
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const imageChange = () => {
        setBroswerImage(image);
        localStorage.setItem("image", image);
    };
    console.log("이게포스츠", posts);
    const myposts = posts.filter((item) => {
        return item.id === userState.id;
    });

    return (
        <>
            <Header />
            <AvartaNameWrapper>
                <Avarta>
                    <img
                        src={browserImage}
                        alt="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA4MTlfMTgy%2FMDAxNjkyMzk0OTY2NTQx.kcqRj3Tf9RD5663NiKYV95dPN9YlyRfKPs0Re8S12Xcg.WbcFWteQCwRqC61R4PiAVZzD3XOfBtyDM5UvVwANwpgg.PNG.jjungaang%2Fpfp%25A3%25DFultraviolet%25A3%25DFuzubaong.png&type=sc960_832"
                    />
                </Avarta>
                <AvartaName>{userState.nickname}</AvartaName>
            </AvartaNameWrapper>
            <MypageBody>
                <InputWrapper>
                    <input
                        value={image}
                        onChange={(e) => {
                            setImage(e.target.value);
                        }}
                        type="text"
                        placeholder="새로운 프로필 사진 URL 입력"
                    />
                    <button onClick={imageChange}>이미지 변경</button>
                </InputWrapper>
                <BodyWrapper>
                    <p>{userState.id}</p>
                    <p>{userState.nickname}</p>
                    <p>{userState.email}</p>
                    <Container>
                        <CardsWrapper>
                            {myposts.map((item) => {
                                return (
                                    <CardWrapper
                                        onClick={() => {
                                            navigateDetail(item.id);
                                        }}
                                    >
                                        <Thumbnail>
                                            <img src={item.postImage} />
                                        </Thumbnail>
                                        <UserInfo>
                                            <UserNameAndTime>
                                                <p>{item.id}</p>
                                                <time>{item.updatedAt}</time>
                                            </UserNameAndTime>
                                            <SelectedBread>
                                                <p>{item.breadType}</p>
                                                <p>🍞17</p>
                                            </SelectedBread>
                                        </UserInfo>
                                        <Content>{item.postTitle}</Content>
                                    </CardWrapper>
                                );
                            })}
                        </CardsWrapper>
                    </Container>
                </BodyWrapper>
            </MypageBody>
        </>
    );
}

export default MyPage;

const AvartaNameWrapper = styled.div`
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
`;
const Avarta = styled.figure`
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin: 20px 0;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const MypageBody = styled.body`
    background-color: white;
    height: 800px;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 30px, 30px;
`;
const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const AvartaName = styled.p`
    font-size: 30px;
    margin-left: 10px;
`;
const Container = styled.section`
    display: grid;
`;

const CardsWrapper = styled.ul`
    margin: 50px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 100px;
    border-radius: 12px;
`;

const CardWrapper = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
`;

const Thumbnail = styled.button`
    width: 200px;
    height: 100px;
    overflow: hidden;
    border: 0px;
    background-color: transparent;
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    cursor: pointer;
`;

const UserInfo = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;
const UserNameAndTime = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    background-color: aqua;
    font-size: 10px;
`;

const SelectedBread = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: blue;
    width: 200px;
`;

const Content = styled.div`
    display: flex;
    width: 200px;
    height: 100px;
    background-color: yellow;
`;
