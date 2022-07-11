import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userLogin } from "../../services/user-api";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
import { colors } from "../../constants/colors";
import { red } from "@material-ui/core/colors";
const CustomerLogin = () => {
  const [isValid, setIsValid] = useState({ valid: true, message: "" });
  const navigate = useNavigate();
  const loginUserHandler = async (event) => {
    event.preventDefault();

    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    if (isUserAuthenticated(user)) {
      const responseData = await userLogin(user);

      console.log(responseData);
      if (responseData === undefined) {
        setIsValid({
          valid: false,
          message: <Error>Account does not exist! </Error>,
        });
      } else {
        navigate("/");
      }
    }
  };

  const isUserAuthenticated = (user) => {
    console.log(isValid);
    const regExp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (user.email !== "" || user.password !== "") {
      if (user.password.length >= 8 && user.email.match(regExp)) {
        setIsValid({ valid: true, message: "" });
        return true;
      }
    }
    setIsValid({
      valid: false,
      message: <Error>Please enter valid credentials. </Error>,
    });
    return false;
  };
  return (
    <>
      {localStorage.getItem("buzzaar") ? (
        <Navigate to="/" />
      ) : (
        <>
          <CloseIcon>
            <Link style={{ color: "black" }} to="/">
              <Close style={{ fontSize: 28 }} />
            </Link>
          </CloseIcon>
          <form onSubmit={loginUserHandler}>
            <Container>
              <Title>Log In</Title>
              <Prompt>
                New to this site?<Link to="/user/register"> Sign Up</Link>
              </Prompt>
              <Label>Email</Label>
              <Input className="customer-input" name="email" />
              <Label>Password</Label>
              <Input
                className="customer-input"
                name="password"
                type="password"
              />
              {!isValid.valid && isValid.message}
              <Link className="forgot-password" to="/user/password/forget">
                <ForgotPassword>Forgot Password?</ForgotPassword>
              </Link>
              <Button type="submit" className="customer-login-button">
                Log In
              </Button>
            </Container>
          </form>
        </>
      )}
    </>
  );
};

export default CustomerLogin;

const Container = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 12px;
  @media (min-width: 1400px) {
    margin: 100px auto;
  }
`;
const CloseIcon = styled.div`
  display: flex;
  margin-top: 65px;
  justify-content: flex-end;
  width: 95%;
  color: black;

  @media (min-width: 1400px) {
    width: 97%;
  }
`;
const Title = styled.div`
  text-align: center;
  font-size: 50px;
  color: black;
`;

const Label = styled.label`
  font-size: 16px;
  color: grey;
`;
const Input = styled.input`
  background-color: inherit;
  border: none;
  border-bottom: 1px solid grey;
  width: 310px;
  font-size: 18px;
  padding: 2px 1px;
  margin-bottom: 30px;
  &:focus {
    outline: none;
    border-bottom: 1px solid ${colors.primary600};
  }
  &:hover {
    border-bottom: 1px solid black;
  }
`;
const Button = styled.button`
  width: 100%;
  align-self: center;
  margin-top: 12px;
  padding: 14px 0;
  font-size: 16px;
  color: white;
  border: none;
  background-color: ${colors.primary600};
  cursor: pointer;
`;

const ForgotPassword = styled.div`
  font-size: 16px;
  text-align: left;
  margin-top: 8px;
`;
const Prompt = styled.div`
  font-size: 18px;
  padding: 20px;
  text-align: center;
  margin-bottom: 12px;
  > * {
    text-decoration: none;
    color: ${colors.primary600};
  }
`;
const Error = styled.div`
  font-size: 12px;
  color: red;
  padding: 1px;
`;
