'use client';

interface Props {
  src: string;
  alt: string;
}

export default function EspeceImage({ src, alt }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      width={1200}
      height={675}
      style={{ borderRadius: 12, marginBottom: 24, width: '100%', maxWidth: 760, height: 'auto', display: 'block' }}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
    />
  );
}
