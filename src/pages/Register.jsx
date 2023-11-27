import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";
import authReducer from "../redux/modules/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logoutUser } from "../redux/modules/userReducer";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.user);
    console.log("usersState-->", userState);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log("user", user);
        });
    }, []);

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        }
        if (name === "password") {
            setPassword(value);
        }
        if (name === "displayName") {
            setNickname(value);
        }
    };
    const signUp = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            await updateProfile(userCredential.user, {
                displayName: nickname,
            });

            alert("회원가입 완료되었습니다.");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error(error);
            alert("이메일형식이어야합니다 .비밀번호는 6자 이상이어야합니다.");
        }
    };

    const logOut = async (event) => {
        event.preventDefault();

        setEmail("");
        setPassword("");
        dispatch(logoutUser());
        const logoutUser = {
            id: "noData",
            email: "noData",
            isdone: false,
            nickname: "noData",
        };
        localStorage.setItem("user", JSON.stringify(logoutUser));
        alert("로그아웃되었습니다!");
        await signOut(auth);
        navigate("/");
    };

    return (
        <BodyWrapper>
            <LoginWrapper>
                {userState.isdone === false ? (
                    <h2>회원가입페이지</h2>
                ) : (
                    <h2>로그아웃하시겠습니까?</h2>
                )}
                <form>
                    {userState.isdone === false ? (
                        <>
                            {" "}
                            <Inputwrapper>
                                <label>닉네임 : </label>
                                <input
                                    type="text"
                                    value={nickname}
                                    name="displayName"
                                    onChange={onChange}
                                    required
                                />
                            </Inputwrapper>
                            <Inputwrapper>
                                <label>이메일 : </label>
                                <input
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={onChange}
                                    required
                                />
                            </Inputwrapper>
                            <Inputwrapper>
                                <label>비밀번호 : </label>
                                <input
                                    type="password"
                                    value={password}
                                    name="password"
                                    onChange={onChange}
                                    required
                                />
                            </Inputwrapper>
                        </>
                    ) : null}
                    {userState.isdone === false ? (
                        <button onClick={signUp}>회원가입</button>
                    ) : null}

                    {userState.isdone === true ? (
                        <button onClick={logOut}>로그아웃</button>
                    ) : null}
                </form>
            </LoginWrapper>
        </BodyWrapper>
    );
}

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border: 1px solid black;
    border-radius: 5px;
    width: 400px;
    height: 300px;
    gap: 20px;
    & form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 10px;
    }
    & h2 {
        font-size: 30px;
    }
    & button {
        background-color: #ccb100;
        color: black;
        cursor: pointer;
        margin: 10px 0px;
        height: 40px;
        width: 100px;
        border-radius: 5px;
        width: 100%;
    }
`;
const BodyWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
`;

const Inputwrapper = styled.div`
    display: flex;
    justify-content: space-between;

    & input {
        background-color: #ededed;
        border-radius: 1px;
        border: 1px solid white;
    }
`;
