import React, {useState, useRef} from 'react';
import {ScrollView, View, StyleSheet, Animated} from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    flex: 1,
    // backgroundColor: 'white',
  },
  petItemListContainer: {
    width: '100%',
  },
  customScrollBar: {
    backgroundColor: '#ccc',
    borderRadius: 3,
    width: 6,
  },
  customScrollBarBackground: {
    backgroundColor: '#232323',
    borderRadius: 3,
    height: '100%',
    width: 6,
  },
});

const BaseScrollView = ({children, style}) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };

  return (
    <View style={[styles.scrollContainer, style]}>
      <ScrollView
        // contentContainerStyle={{paddingRight: 14}}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollIndicator}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={styles.petItemListContainer}>
        {/* Your ScrollView content here */}
        {children}
      </ScrollView>
      <View style={styles.customScrollBarBackground}>
        <Animated.View
          style={[
            styles.customScrollBar,
            {
              height: scrollIndicatorSize,
              transform: [{translateY: scrollIndicatorPosition}],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default BaseScrollView;
