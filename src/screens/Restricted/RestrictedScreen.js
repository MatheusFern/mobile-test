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

export default function RestrictScreen() {
    const [list, setList] = useState([]);
    const [access, setAccess] = useState(false);

    useEffect(() => {
        (async () => {
          const querylist = [];
          const querySnapshot = await getDocs(collection(db, "restricted"));
    
          querySnapshot.docs.map((doc) => {
            querylist.push({ ...doc.data() });
          });
          console.log(querylist)
          setList(querylist);
        })();
      }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#34d399" }}>
        {access ? ( <FlatList
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
                 
                </Stack>
                <Text fontWeight="400">{item.desc}</Text>
              
              </Stack>
            </Box>
          </Box>
        )}
        />): (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text bold style={{color: "#fafafa"}}>Por favor valide seu email para acessar essa lista</Text>
            </View>
             
        )}
       
    </SafeAreaView>
  );
}
