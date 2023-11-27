import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, fetchPosts } from "../redux/modules/postsReducer";
import styled from "styled-components";

function Detail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const param = useParams();

    const { posts } = useSelector((state) => state.postsReducer);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}년 ${month}월 ${day}일`;
    };

    const post = posts.find((item) => item.id === param.id);

    const onEditPageHandler = (id) => {
        navigate(`/write/${id}`, { state: { post, isEditing: true } });
    };

    const onDeletePostHandler = (id) => {
        const confirmation = window.confirm("게시물을 삭제하시겠습니까?");
        if (confirmation) {
            dispatch(deletePost(id));
        } else {
            return;
        }
    };

    return (
        <Container>
            <PostContainer className="post-area">
                <ImgContainer className="image-area"></ImgContainer>
                <TextContainer className="text-area">
                    <BreadTitle>{post.postTitle}</BreadTitle>
                    <DateSpan>{formattedDate(post.createdAt)}</DateSpan>
                    <DateSpan>작성자: {post.userName}</DateSpan>
                    <BreadType>소개할 빵: {post.breadType}</BreadType>
                    <ContentArea>{post.postContent}</ContentArea>
                </TextContainer>
            </PostContainer>
            <Footer className="footer">
                <button>홈으로 가기</button>
                <EditButtonContainer>
                    <button onClick={() => onEditPageHandler(post.id)}>
                        수정하기
                    </button>
                    <button onClick={() => onDeletePostHandler(post.id)}>
                        삭제하기
                    </button>
                </EditButtonContainer>
            </Footer>
        </Container>
    );
}

export default Detail;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 800px;
    margin: 50px auto;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const ImgContainer = styled.div`
    width: 50%;
    height: 500px;

    border: 1px solid pink;
    border-radius: 20px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;

    column-gap: 10px;
    width: 50%;
    padding: 30px;
`;

const BreadTitle = styled.span`
    font-size: 24px;
    font-weight: 700;
    padding: 20px 0;
`;

const DateSpan = styled.span`
    margin: 5px 0;
`;

const BreadType = styled.span`
    display: flex;
    justify-content: center;
    color: gray;

    border: 1px dashed gray;
    border-radius: 20px;
    padding: 10px 0;

    margin: 20px 0;
`;

const ContentArea = styled.p`
    background-color: white;
    width: 100%;
    height: 100%;

    border-radius: 20px;
    padding: 20px;
    line-height: 1.2;
`;

const Footer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    margin: 20px;

    & button {
        padding: 8px 20px;
        font-size: 14px;

        background-color: #ffebc1;
        border: transparent;
        border-radius: 10px;

        &:hover {
            transform: scale(1.05);
        }
    }
`;

const EditButtonContainer = styled.div`
    display: flex;
    column-gap: 10px;
`;
