import { autocomplete } from '@algolia/autocomplete-js'
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';

export const Autocomplete = (props) => {
    const containerRef = useRef(null);
    const panelRootRef = useRef(null);
    const rootRef = useRef(null);
    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
        key: 'RECENT_SEARCH',
        limit: 5,
      });
      

    useEffect(() => {
        if(!containerRef.current) {
            return undefined;
        }
        const search = autocomplete({
            container: containerRef.current,
            plugins: [
                recentSearchesPlugin,
            ],
            renderer: { createElement, Fragment, render: () => {} },
            render({ children }, root) {
                if(!panelRootRef.current || rootRef.current !== root) {
                    rootRef.current = root;
                    panelRootRef.current?.unmount();
                    panelRootRef.current = createRoot(root);
                }
                panelRootRef.current.render(children);
            },
            ...props
        });
        return () => {
            search.destroy();
        };
    }, [props]);

    return <div ref={containerRef} />;
}
