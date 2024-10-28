


// ==============================
// Element Manifest
// ==============================

import { DisplayProperties } from "./display";
import { InputProperties } from "./input";

/**
 * Represents the metadata and initial properties for a UI component.
 */
export interface ElementManifest {
    meta: {
        name: string; // Name of the component
        enabled: boolean; // Indicates if the component is enabled
        description: string; // Description of the component
        icon: string; // Icon for the component
    };
    init: {
        type: 'input' | 'display'; // Type of the component
        properties: {
            input: InputProperties; // Input properties
            display: DisplayProperties; // Display properties
        };
    };
}
