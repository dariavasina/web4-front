export const setXCoordinateAction = (value) => {
    return {
      type: 'SET_X',
      payload: value,
    };
};

export const setYCoordinateAction = (value) => {
    return {
      type: 'SET_Y',
      payload: value,
    };
};

  
export const setRadiusAction = (value) => {
    return {
        type: 'SET_R',
        payload: value,
    };
};

export const setValidAction = (value) => {
    return {
      type: 'SET_VALID',
      payload: value,
    };
};

export const doNothingAction = () => {
    return {
      type: 'DO_NOTHING',
      payload: -1,
    };
  };
  