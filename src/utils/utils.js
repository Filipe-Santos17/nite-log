export const checkValues = (values, state) => {
    for (const key in values) {
        if (values[key] === '') {
            state(true);
            return true;
        }
    }

    state(false);
    return false;
}