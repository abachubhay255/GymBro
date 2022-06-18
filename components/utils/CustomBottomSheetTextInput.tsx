import {useBottomSheetInternal} from '@gorhom/bottom-sheet';
import {BottomSheetTextInputProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetTextInput';
import {Input, InputProps} from '@ui-kitten/components';
import React, {memo, useCallback, forwardRef} from 'react';

export const CustomBottomSheetTextInput = forwardRef<
  Input,
  BottomSheetTextInputProps & InputProps
>(({onFocus, onBlur, ...rest}, ref) => {
  //#region hooks
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();
  //#endregion

  //#region callbacks
  const handleOnFocus = useCallback(
    (args: any) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents],
  );
  const handleOnBlur = useCallback(
    (args: any) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents],
  );
  //#endregion

  return (
    <Input ref={ref} onFocus={handleOnFocus} onBlur={handleOnBlur} {...rest} />
  );
});

const BottomSheetTextInput = memo(CustomBottomSheetTextInput);
BottomSheetTextInput.displayName = 'BottomSheetTextInput';

export default BottomSheetTextInput;
