import { useRef } from 'react';
import VariableProximity from './VariableProximity';
import { Button } from '@/components/ui/button';
import React from 'react';

const HeroText = () => {
    const containerRef = useRef(null);

    return (
        <div
            ref={containerRef}
            style={{ position: 'relative' }}
        >
            <VariableProximity
                label={' Have an interview coming up? No worries we got you covered. Your one stop solution for technicals and coding rounds.'}
                className={'variable-proximity-demo'}
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={containerRef}
                radius={100}
                falloff='linear'
            />
        </div>
    );
}

export default HeroText;