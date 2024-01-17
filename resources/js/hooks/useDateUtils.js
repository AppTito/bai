const useDateUtils = () => {
    const formatDate = (date) =>
        date.toLocaleDateString('es-EC', { year: 'numeric', month: '2-digit', day: '2-digit' })
            .split('/').reverse().join('/');

    return { formatDate };
};

export default useDateUtils;
