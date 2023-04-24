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
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import ButtonCam from "../../components/ButtonCam";
import { auth } from "../../config/firebaseConfig";
import { async } from "@firebase/util";

export default function Login() {
  const [email, setEmail] = useState("");
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [modalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const infinitePassword = "coxinha123";

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const openCam = async () => {
    setModalVisible(true);
  };

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const savePicture = async () => {
    if (image) {
      try {
        const asset = await MediaLibrary.createAssetAsync(image);
        alert("Picture saved! 🎉");
        console.log("saved successfully");
        setModalVisible(false);
        console.log(image);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logInUser = async () => {
    if (email == "") {
      alert("por favor informe um email");
    } else if (image == null) {
      alert("por favor tire uma foto");
    } else {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          infinitePassword
        );
        await AsyncStorage.setItem("@token", JSON.stringify(response.user));
        await AsyncStorage.setItem("@email", JSON.stringify(response.user.email));
        await AsyncStorage.setItem("@Pic", image);
        navigation.navigate("Start");
      } catch (error) {
        throw new Error(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Center flex={1} px="3">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {!image ? (
            <Camera
              style={styles.camera}
              type={type}
              ref={cameraRef}
              flashMode={flash}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 30,
                }}
              >
                <ButtonCam
                  title=""
                  icon="retweet"
                  onPress={() => {
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    );
                  }}
                />
                <ButtonCam
                  onPress={() =>
                    setFlash(
                      flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.on
                        : Camera.Constants.FlashMode.off
                    )
                  }
                  icon="flash"
                  color={
                    flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"
                  }
                />
              </View>
            </Camera>
          ) : (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
          <View style={styles.controls}>
            {image ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 50,
                }}
              >
                <ButtonCam
                  title="Tirar outra fota"
                  onPress={() => setImage(null)}
                  icon="retweet"
                />
                <ButtonCam title="Salvar" onPress={savePicture} icon="check" />
              </View>
            ) : (
              <ButtonCam
                title="Tirar Foto"
                onPress={takePicture}
                icon="camera"
              />
            )}
          </View>
        </View>
      </Modal>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Bem vindo
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
            Cadastre-se para continuar
          </Heading>
          <HStack space={3} mt="5">
            {!image ? (
              <ButtonCam title="Add Selfie" onPress={openCam} icon="camera" />
            ) : (
              <HStack space={3}>
                <Avatar
                  bg="cyan.500"
                  source={{
                    uri: image,
                  }}
                ></Avatar>
                <ButtonCam title="Add Selfie" onPress={openCam} icon="camera" />
              </HStack>
            )}
          </HStack>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input onChangeText={(email) => setEmail(email)} />
            </FormControl>

            <Button mt="2" colorScheme="indigo" onPress={() => logInUser()}>
              Cadastrar
            </Button>
          </VStack>
        </Box>
      </Center>
    </Center>
  );
}
const styles = StyleSheet.create({
  modalView: {
    justifyContent: "center",

    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  camera: {
    justifyContent: "space-between",
    margin: 10,
    padding: 50,

    width: "90%",
    height: "80%",
    borderRadius: 20,
  },
});
