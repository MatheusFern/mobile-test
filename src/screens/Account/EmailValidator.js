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
  Avatar,
} from "native-base";
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";

export default function EmailValidator() {
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
          Validar email
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
         Confirmar o email
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input />
          </FormControl>

          <Button mt="2" colorScheme="indigo">
          Enviar Email
          </Button>
         
        </VStack>
      </Box>
    </Center>
  );
}
