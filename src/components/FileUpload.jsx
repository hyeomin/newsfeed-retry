import { ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import styled from "styled-components";
import { storage } from "../firebase";

function FileUpload({ postId }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const onImageSelectHandler = (event) => {
        event.preventDefault();
        setSelectedFile(event.target.files[0]);
    };

    const onUploadImageHandler = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const imageRef = ref(storage, `posts/${postId}/${selectedFile.name}`);
        await uploadBytes(imageRef, selectedFile).then((snapshot) => {
            alert("Uploaded a blob or file!");
        });
    };

    return (
        <UploadContainer>
            <span>여기에 파일을 업로드 하세요</span>
            {/* <img style={{ width: "100px" }} src={thumbnail} alt="썸네일 이미지" /> */}
            <input type="file" onChange={onImageSelectHandler} />
            <input type="file" onChange={onImageSelectHandler} />
            <input type="file" onChange={onImageSelectHandler} />
            <button onClick={onUploadImageHandler}>업로드 하기</button>
        </UploadContainer>
    );
}

const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 15px;

    width: 100%;
    margin: 20px 0;

    border: 1px solid gray;
    border-radius: 20px;
    padding: 20px;

    & span {
        font-size: 20px;
        font-weight: 700;
        margin: 10px 0;
    }

    & input {
        background-color: #eaeaea;
        width: 100%;
        column-gap: 10px;
        font-size: 14px;
    }

    & button {
        width: 100px;
        margin: 10px 0 10px auto;
        padding: 5px 10px;

        font-size: 15px;
        border: 1px solid gray;
        border-radius: 10px;

        &:hover {
            transform: scale(1.03);
        }
    }
`;

export default FileUpload;
