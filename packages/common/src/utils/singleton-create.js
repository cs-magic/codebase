export const singletonCreate = (f) => {
    const g = {
        data: undefined,
    };
    return (g.data ??= f());
};
