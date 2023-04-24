import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
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
  AspectRatio,
  Image,
  Stack,
} from "native-base";
import { collection, getDocs, getDocsFromServer } from "firebase/firestore";
import db from "../../config/firebaseConfig";

export default function HomeScreen() {
  const [list, setList] = useState([]);

  useEffect(() => {
    (async () => {
      const querylist = [];
      const querySnapshot = await getDocs(collection(db, "Home"));

      querySnapshot.docs.map((doc) => {
        querylist.push({ ...doc.data() });
      });
      setList(querylist);
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#22d3ee" }}>
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Box alignItems="center">
            <Box
              maxW="80"
              minW="80"
              minH="180"
              margin={2}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="md" ml="-1">
                    {item.name}
                  </Heading>
                  <Text
                    fontSize="xs"
                    _light={{
                      color: "violet.500",
                    }}
                    _dark={{
                      color: "violet.400",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    {item.status ? "Documento ativo" : "Documento inativo"}
                  </Text>
                </Stack>
                <Text fontWeight="400">{item.desc}</Text>
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="400"
                    >
                      {item.qtd} documentos disponiveis
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        )}
      />
    </SafeAreaView>
  );
}
