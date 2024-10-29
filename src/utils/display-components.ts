import { Component } from "vue";
import type { DisplayComponentType } from "~/types";
import { ActionRedirect, EmbedDocument, EmbedSlides, HtmlBlockContent, HtmlBlockList, HtmlBlockMedia, LocaleSelector } from "..";

export const displayComponents: Record<DisplayComponentType, Component> = {
    html_block_content: HtmlBlockContent,
    html_block_list: HtmlBlockList,
    html_block_media: HtmlBlockMedia,
    locale_selector: LocaleSelector,
    action_redirect: ActionRedirect,
    embed_slide: EmbedSlides,
    embed_document: EmbedDocument
}