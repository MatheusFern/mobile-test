import React, { useState } from "react";
import { View } from "react-native";
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
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function MyAccount() {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();
  React.useEffect(() => {
    const getEmail = async () => {
      const item = await AsyncStorage.getItem("@email");
      setEmail(item);
      // user is logged in
    };

    getEmail();
  }, []);

  async function SignOut() {
    try {
      await AsyncStorage.clear();
      navigation.navigate("SignIn");
    } catch (e) {
      // clear error
    }
  }

  return (
    <Center flex={1} px="3">
      <Box safeArea py="8" w="100%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Meus Dados
        </Heading>

        <VStack space={3} mt="1">
          <FormControl>
            <FormControl.Label>Email Cadastrado</FormControl.Label>
            <Input placeholder={`${email}`} />
          </FormControl>

          <Button mt="2" colorScheme="indigo">
            Atualizar
          </Button>
          <Button mt="2" colorScheme="red" onPress={SignOut}>
            Sair
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}
