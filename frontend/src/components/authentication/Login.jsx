import React from 'react'
import { FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import { useState } from 'react';
import { Button } from '@chakra-ui/react';


const Login = () => {
  
const [name, setName] = useState();
 const [password, setPassword] = useState();
 const [email, setEmail] = useState();
 
const [show ,setShow] = useState(false)

 
 const handleClick = ()=> setShow(!show)

 const submitHandler =()=>{

 }
 
  return (
    <VStack spacing='5px' color='black'>

<FormControl id='first-name' isRequired>
  <FormLabel>
Name
  </FormLabel>
  <Input value={name} placeholder='Enter Your Name' 
  onChange={(e)=>setName(e.target.value)}/>
</FormControl>


<FormControl id='email' isRequired>
  <FormLabel>
Email
  </FormLabel>
  <Input value={email} placeholder='Enter Your email' 
  onChange={(e)=>setEmail(e.target.value)}/>
</FormControl>




<FormControl id='password' isRequired>
  <FormLabel>
Password
  </FormLabel>
  <InputGroup>
  <Input 
  value={password}
  type={ show? "text" :"password"}
  placeholder='Enter Your password' 
  onChange={(e)=>setPassword(e.target.value)}/>
  <InputRightElement width="4.5rem">
    <Button h="1.75rem" size="sm" onClick={handleClick}>
      {show ? "Hide" : "Show"}
    </Button>
  </InputRightElement>
  </InputGroup>
  
 
</FormControl>




<Button colorScheme='blue'  width="100%" style={{marginTop: 15}} onClick={submitHandler}>
  
  Login
</Button>
<Button variant="solid"
colorScheme='red'
width="100%"
onClick={()=>{
  setEmail('guest@example.com');
  setPassword("123456")
}}>
  Get User Credentials
</Button>
    </VStack>
  )

  
  
}

export default Login