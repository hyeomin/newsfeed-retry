import {
    browserSessionPersistence,
    onAuthStateChanged,
    setPersistence,
    signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { auth } from "../firebase";

export default function Login({ setUsers, users }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

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
    };

    const signIn = async (event) => {
        event.preventDefault();
        try {
            await setPersistence(auth, browserSessionPersistence);

            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            const loginUser = {
                id: user.uid,
                email: user.email,
                isdone: true,
                nickname: user.displayName,
            };
            setEmail("");
            setPassword("");
            setUsers(loginUser);

            localStorage.setItem("user", JSON.stringify(loginUser));
            alert("로그인 되었습니다.");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("이메일 비밀번호를 확인해주세요");
        }
    };

    return (
        <BodyWrapper>
            <LoginWrapper>
                <h2>로그인페이지</h2>

                <form>
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

                    <button onClick={signIn}>로그인</button>
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

    border-color: transparent;
    background-color: #ffebc1;
    border-radius: 10px;
    width: 400px;
    height: 300px;
    gap: 20px;
    padding: 50px;
    & form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        padding: 10px;
        width: 100%;
    }
    & h2 {
        font-size: 30px;
    }
    & button {
        background-color: white;
        border: 1px solid lightgray;
        font-size: 18px;
        cursor: pointer;
        margin: 10px 0px;
        height: 40px;
        width: 100px;
        border-radius: 10px;
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
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;

    padding: 5px;
    width: 100%;

    & input {
        background-color: white;
        border-radius: 5px;
        border: 1px solid white;
        height: 30px;
        width: 70%;
    }
`;
