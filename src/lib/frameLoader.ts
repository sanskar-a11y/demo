import { FRAME_COUNT, FRAME_PATH } from './constants';

export function getFrameSrc(index: number): string {
  const frameNum = Math.min(Math.max(Math.round(index), 1), FRAME_COUNT);
  const padded = String(frameNum).padStart(3, '0');
  return `${FRAME_PATH}${padded}.jpg`;
}

export function preloadFrames(
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  return new Promise((resolve) => {
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameSrc(i + 1);
      img.onload = img.onerror = () => {
        loaded++;
        images[i] = img;
        onProgress?.(loaded, FRAME_COUNT);
        if (loaded === FRAME_COUNT) {
          resolve(images);
        }
      };
    }
  });
}
