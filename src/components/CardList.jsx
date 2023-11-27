import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../redux/modules/postsReducer";
import headerimg from "../assets/Bread1.jpeg";

function CardList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { posts } = useSelector((state) => state.postsReducer);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const navigateDetail = (id) => {
        navigate(`/detail/${id}`);
    };

    const formattedDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}년 ${month}월 ${day}일`;
    };

    return (
        <CardContainer>
            {posts.map((item) => {
                return (
                    <CardWrapper
                        className="card-wrapper"
                        onClick={() => {
                            navigateDetail(item.id);
                        }}
                    >
                        <CardImageContainer className="image-container">
                            <img src={headerimg} />
                        </CardImageContainer>
                        <DateSpan>{formattedDate(item.createdAt)}</DateSpan>
                        <BreadTitle>{item.postTitle}</BreadTitle>
                        <BreadType>{item.breadType}</BreadType>
                        <ContentArea>{item.postContent}</ContentArea>
                    </CardWrapper>
                );
            })}
        </CardContainer>
    );
}

export default CardList;

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 30px;
    row-gap: 30px;
    align-items: center;
    justify-content: center;

    margin: 40px;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 400px;
    height: 450px;
    background-color: #ffebc1;

    border-radius: 20px;

    padding: 20px;

    cursor: pointer;

    &:hover {
        transform: scale(1.03);
    }
`;

const CardImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: pink;
    height: 180px;

    border-radius: 20px;
    overflow: hidden;
`;

const DateSpan = styled.span`
    font-size: 14px;
    color: gray;
`;

const BreadTitle = styled.span`
    font-weight: 700;
    font-size: 22px;
    padding: 5px 0;
`;

const BreadType = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;

    color: gray;

    border: 1px dashed gray;
    border-radius: 20px;
    padding: 10px;
    width: 100px;
`;

const ContentArea = styled.p`
    background-color: white;
    padding: 15px;
    border-radius: 10px;
`;
