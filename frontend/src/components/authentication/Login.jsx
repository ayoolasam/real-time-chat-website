import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
   const navigate = useNavigate()

  const handleClick = () => setShow(!show);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const ldata = { email, password };
    if (!email || !password) {
      toast({
        title: "please fill in fields",
        description: "fill in fields",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
    const { data } = await axios.post("/api/user/login", ldata);

    if (data.status === false) {
      toast({
        title: "invalid login details ",
        description: "please type in coreect details",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    if (data.status === true) {
      localStorage.setItem("userInfo", JSON.stringify(data))
      navigate("/chats")
      toast({
        title: "login successfuly ",

        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={password}
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Get User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
