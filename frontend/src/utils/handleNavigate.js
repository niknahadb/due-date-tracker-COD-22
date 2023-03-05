export const handleNavigate = (navigate, pageStr, stateVal = {}) => {
    navigate(pageStr, {state: stateVal});
};
