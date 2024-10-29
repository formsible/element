import { Component } from "vue";
import type { InputComponentType } from "~/types";
import { Number, Address, Captcha, Checkboxes, DatePicker, Dropdown, Email, FileUpload, ImageChoice, LikertScale, LongText, MultipleChoice, NetPromoterScore, Password, PhoneNumber, Ranking, RatingScale, ShortText, Signature, Slider, TimePicker, Website } from '..'

export const inputComponents: Record<InputComponentType, Component> = {
    number: Number,
    address: Address,
    captcha: Captcha,
    checkboxes: Checkboxes,
    date_picker: DatePicker,
    dropdown: Dropdown,
    email: Email,
    file_upload: FileUpload,
    image_choice: ImageChoice,
    likert_scale: LikertScale,
    long_text: LongText,
    multiple_choice: MultipleChoice,
    net_promoter_score: NetPromoterScore,
    password: Password,
    phone_number: PhoneNumber,
    ranking: Ranking,
    rating_scale: RatingScale,
    short_text: ShortText,
    signature: Signature,
    slider: Slider,
    time_picker: TimePicker,
    website: Website
}