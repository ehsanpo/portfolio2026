
export const getProjectImage = (data: any) => {
    const img = data.cover || data.background_image;

    if (!img) return undefined;

    return {
        src: img.src,
        alt: data.title,
        width: img.width,
        height: img.height
    };
};
