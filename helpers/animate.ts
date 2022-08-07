export const animate = async (ref: React.MutableRefObject<HTMLImageElement>, keyFrames: Keyframe[], options: number | KeyframeAnimationOptions): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const animation = ref.current.animate(keyFrames, options)
            animation.addEventListener('finish', () => resolve())
        }
        catch (err) {
            reject(err)
        }
    })
}

export const dispatchAnimation = (ref: React.MutableRefObject<HTMLImageElement>, keyFrames: Keyframe[], options: number | KeyframeAnimationOptions): () => Promise<void> => {
    return () => animate(ref, keyFrames, options)
}