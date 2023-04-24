import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../../config/firebaseConfig";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const infinitePassword = "coxinha123";
  const navigation = useNavigation();
  const logInUser = async () => {
    if (email == "") {
      alert("por favor informe um email");
    } else {
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          infinitePassword
        );
        await AsyncStorage.setItem("@token", JSON.stringify(response.user));
        await AsyncStorage.setItem(
          "@email",
          JSON.stringify(response.user.email)
        );
        navigation.navigate("Start");
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  return (
    <Center flex={1}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Bem Vindo
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Faça o login para continuar
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={(email) => setEmail(email)} />
          </FormControl>

            <Button mt="2" colorScheme="indigo" onPress={()=> logInUser()}>
            Login
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Novo Usuario?{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Cadastrar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
}
