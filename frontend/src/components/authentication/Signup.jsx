import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Select an image",
        description: "selct an image",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat app");
      data.append("cloud_name", "de081vwgc");
      fetch("https://api.cloudinary.com/v1_1/de081vwgc/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an image",
        description: "selct an image",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleValidation = () => {
    if (!name || !password || !confirmpassword || !email) {
      toast({
        title: "Please fill all fields",
        description: "fill in fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return false;
    } else if (password !== confirmpassword) {
      toast({
        title: "Passwords dont match",
        description: "passwords must match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    } else if (password.length < 4) {
      toast({
        title: "Passwords should be more than 4 characters",
        description: "passwords must be greater than 4 characters",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return false;
    } else {
      return true;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const udata = { name, email, password };

      const { data } = await axios.post("/api/user", udata);
      if (data.status === false) {
        toast({
          title: "choose another ",
          description: "unable to register",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
      if (data.status === true) {
        localStorage.setItem("userInfo", JSON.stringify(data.user));
        setLoading(false);
        navigate("/chats");
        toast({
          title: "registered succesfully",
          description: "registered succesfully",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={email}
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id={password} isRequired>
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

      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            value={confirmpassword}
            type={show ? "text" : "password"}
            placeholder="confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          id={pic}
          type="file"
          value={pic}
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
