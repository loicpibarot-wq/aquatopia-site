'use client';

import { CSSProperties, useEffect, useState } from 'react';

const IOS_STORE = 'https://apps.apple.com/app/id6774605218';
const ANDROID_STORE = 'https://play.google.com/store/apps/details?id=com.noula34.aquatopia';

export default function DownloadButton({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: React.ReactNode;
}) {
  const [href, setHref] = useState(IOS_STORE);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';
    setHref(/android/i.test(ua) ? ANDROID_STORE : IOS_STORE);
  }, []);

  return (
    <a href={href} target="_blank" rel="noopener" className={className} style={style}>
      {children}
    </a>
  );
}
