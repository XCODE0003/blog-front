export function stripHtmlTags(html) {
    html = html.replace(/<img[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    let text = html.replace(/<\/?[^>]+(>|$)/g, '');
    return text.length > 50 ? text.substring(0, 50) + '...' : text;
}

export default { stripHtmlTags }