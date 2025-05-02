import React, { useEffect, useRef } from 'react';

interface HTMLInsElement extends HTMLElement {
    dataset: DOMStringMap;
}

interface AdSenseProps {
    client: string;
    slot?: string;
    format?: string;
    style?: React.CSSProperties;
    responsive?: 'true';
}

const AdSense: React.FC<AdSenseProps> = ({ client, slot, format, style, responsive }) => {
    const adContainer = useRef<HTMLDivElement>(null);
    const insRef = useRef<HTMLInsElement | null>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);
    const hasScriptLoaded = useRef(false);

    useEffect(() => {
        if (!hasScriptLoaded.current) {
            const script = document.createElement('script');
            script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
            script.async = true;
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
            scriptRef.current = script;
            hasScriptLoaded.current = true;
        }

        return () => {
            if (scriptRef.current && scriptRef.current.parentNode) {
                scriptRef.current.parentNode.removeChild(scriptRef.current);
            }
            hasScriptLoaded.current = false;
        };
    }, [client]);

    useEffect(() => {
        if (adContainer.current && typeof window !== 'undefined' && window.adsbygoogle && slot) {
            const ins = document.createElement('ins') as HTMLInsElement; // Type assertion here
            ins.className = 'adsbygoogle';
            if (style) {
                Object.assign(ins.style, style);
            } else {
                ins.style.display = 'block';
            }
            ins.dataset.adClient = client;
            ins.dataset.adSlot = slot;
            if (format) {
                ins.dataset.adFormat = format;
            }
            if (responsive === 'true') {
                ins.dataset.fullWidthResponsive = 'true';
            }

            adContainer.current.appendChild(ins);
            insRef.current = ins;

            try {
                (window.adsbygoogle as any).push({});
            } catch (error) {
                console.error("Error pushing adsbygoogle command:", error);
            }
        }

        return () => {
            if (insRef.current && insRef.current.parentNode) {
                insRef.current.parentNode.removeChild(insRef.current);
                insRef.current = null;
            }
        };
    }, [client, slot, format, style, responsive]);

    return <div ref={adContainer} />;
};

export default AdSense;
