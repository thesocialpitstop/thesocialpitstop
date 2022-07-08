import Link from 'next/link';
import React, { createElement } from 'react';

export default function ProductItem({ hit, components }) {
    return(
        <Link href={`/search?query=${hit.name}`}>
            <a>
                <div className='aa-ItemContent'>
                    <div className='aa-ItemTitle'>
                        <components.Highlight hit={hit} attribute="name" />
                    </div>
                </div>
            </a>
        </Link>
    )
}
