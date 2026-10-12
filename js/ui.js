// UI helpers are intentionally kept dependency-free so students can extend the interface.
export const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
export const formatDegrees=value=>`${Number(value).toFixed(1)}°`;
