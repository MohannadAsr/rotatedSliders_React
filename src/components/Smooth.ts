const easeInOutQuad = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export function smoothTransition(
  current,
  target,
  duration,
  onUpdate,
  onComplete
) {
  const startTime = performance.now();
  const initial = current;

  const animate = (time) => {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
    const easedProgress = easeInOutQuad(progress);

    const value = initial + (target - initial) * easedProgress;
    onUpdate(value);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };

  requestAnimationFrame(animate);
}
