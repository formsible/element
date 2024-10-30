import { Component } from "vue";
import type { DisplayComponentType } from "~/types";
import {
    // Content Block Components
    HtmlBlockContent,
    HtmlBlockList,
    HtmlBlockMedia,

    // Embed Components
    EmbedDocument,
    EmbedSlides,

    // Utility Components
    LocaleSelector,
    ActionRedirect,
} from "..";

/**
 * A collection of display components for rendering various types of content.
 * Each component is mapped to its corresponding DisplayComponentType.
 * 
 * Components are grouped into the following categories:
 * - Content Block: Components for rendering structured HTML content
 * - Embed: Components for displaying external documents and presentations
 * - Utility: Components for user interaction and navigation
 */
export const displayComponents: Record<DisplayComponentType, Component> = {
    // Content Block Components
    html_block_content: HtmlBlockContent,  // Renders formatted HTML content
    html_block_list: HtmlBlockList,        // Displays structured list content
    html_block_media: HtmlBlockMedia,      // Handles media content display

    // Embed Components
    embed_document: EmbedDocument,         // Embeds external documents
    embed_slide: EmbedSlides,             // Embeds presentation slides

    // Utility Components
    locale_selector: LocaleSelector,       // Language/locale selection interface
    action_redirect: ActionRedirect,       // Handles navigation redirects
};

export default displayComponents;