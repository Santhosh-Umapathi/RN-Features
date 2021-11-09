import React, {forwardRef, useCallback, useMemo} from 'react';

import {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetModal as SheetModal,
} from '@gorhom/bottom-sheet';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const CustomBackdrop = ({animatedIndex, style}) => {
  // animated variables
  // const containerAnimatedStyle = useAnimatedStyle(() => ({
  //   opacity: interpolate(
  //     animatedIndex.value,
  //     [0, 1],
  //     [0, 1],
  //     Extrapolate.CLAMP,
  //   ),
  // }));

  // // styles
  // const containerStyle = useMemo(
  //   () => [
  //     style,
  //     {
  //       backgroundColor: '#a8b5eb',
  //     },
  //     containerAnimatedStyle,
  //   ],
  //   [style, containerAnimatedStyle],
  // );

  return (
    <Animated.View style={[{opacity: 1, backgroundColor: 'red', flex: 1}]} />
  );
};

const BottomSheetModal = forwardRef((props, ref) => {
  const {name = null, index = 1, type, children, snapPoints, ...others} = props;
  const insets = useSafeAreaInsets();

  let internalSnapPoints = snapPoints || null;

  //Bottom sheet type: ["Full Modal", "Half Modal", "Bottom Modal"]
  switch (type) {
    case 'bottom':
      internalSnapPoints = [0, 200];
      break;

    case 'half':
      internalSnapPoints = [0, 300, 450];
      break;

    case 'full':
      internalSnapPoints = [0, 300, 750];
      break;

    default:
      break;
  }

  const finalSnaps = useMemo(() => internalSnapPoints, [internalSnapPoints]);

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop {...props} closeOnPress={true} opacity={0.8} />
    ),
    [],
  );

  // const handleDismiss = useCallback(() => {
  //   ref?.current?.dismiss();
  // }, [ref]);

  return (
    <SheetModal
      ref={ref}
      name={name}
      index={finalSnaps.length - 1}
      snapPoints={finalSnaps}
      animateOnMount={true}
      dismissOnPanDown={true}
      // onDismiss={handleDismiss}
      // backdropComponent={CustomBackdrop}
      backdropComponent={renderBackdrop}
      {...others}>
      <BottomSheetView
        style={{
          paddingBottom: insets.bottom,
        }}>
        {children}
      </BottomSheetView>
    </SheetModal>
  );
});

export default BottomSheetModal;
