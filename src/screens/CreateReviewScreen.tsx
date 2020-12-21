import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Image, View, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase";
/* utils */
import { getExtention } from "../utils/file";
/* lib */
import { createReviewRef, uploadImage } from "../lib/firebase";
import { pickImage } from "../lib/ImagePicker";
/* contexts */
import { UserContext } from "../contexts/userContext";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* types */
import { RootStackParamList } from "../types/navigation";
import { Review } from "../types/review";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const { user } = useContext(UserContext);
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton name="x" onPress={() => navigation.goBack()} />
      ),
    });
  }, [shop]);

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません");
      return;
    }
    setIsLoading(true);
    // documentのIDを取得
    const reviewDocRef = await createReviewRef(shop.id);
    // storage上でのpathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をストレージにアップ
    const downloadUrl = await uploadImage(imageUri, storagePath);
    // reviewドキュメントを作る
    const review = {
      text: text,
      score: score,
      user: {
        id: user?.id,
        name: user?.name,
      },
      shop: {
        id: shop.id,
        name: shop.name,
      },
      imageUrl: downloadUrl,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await reviewDocRef.set(review);
    setIsLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    setImageUri(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(value) => setText(value)}
        label="レビュー"
        placeholder="レビューを書いてください"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc" />
      </View>
      {!!imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button text="レビューを投稿する" onPress={onSubmit} />
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "flex-start",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
