import { View, Text, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor } from '../../constants/colors';
import ShortsView from '../../components/ShortsView';
import WrapperComponent from "../../components/CommentSection";
import { router } from 'expo-router';
import { search } from '../../constants/icons';

const windowHeight = Dimensions.get("window").height;

const shorts = () => {
    const [viewableItems, setViewableItems] = useState([]);
    const [scollable, setScollable] = useState(false)
    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        setViewableItems(viewableItems.map(item => item.key));
    });

    return (
        <View style={{ backgroundColor: bgColor, height: "100%", flex: 1, position: "relative" }}>
            <View style={{ width: "100%", top: "8%", right: 15, position: "absolute", zIndex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity
                    style={{ margin: 10 }}
                    activeOpacity={0.7}
                    onPress={() => {
                        router.push("search/SearchPage")
                    }}
                >
                    <Image
                        source={search}
                        resizeMode="contain"
                        style={{ width: 24, height: 24 }}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                data={[1, 2, 3, 4, 5]}
                viewabilityConfig={{ itemVisiblePercentThreshold: 75 }}
                onViewableItemsChanged={onViewableItemsChanged.current}
                pagingEnabled
                scrollEnabled={!scollable}
                snapToAlignment="start"
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    const shouldPlay = viewableItems.includes(item.toString());
                    return (
                        <View
                            style={{
                                height: windowHeight - 80,
                                borderTopWidth: 0.7,
                                borderBottomWidth: 0.7,
                            }}
                        >
                            <ShortsView sourceUrl={require("../../tempVid/small.mp4")} shouldPlay={shouldPlay} fix={(val)=>{
                                console.log(val)
                                setScollable(val)
                            }} />
                        </View>
                    );
                }}
                keyExtractor={item => item.toString()}
            />
        </View>
    );
}

export default shorts;
