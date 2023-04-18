// Based on the analysis of 190 studies (18,573 participants), we estimate that the average silent reading rate for adults in English is 238 words per minute (wpm) for non-fiction and 260 wpm for fiction. Apr 12, 2019
const WORDS_PER_MINUTE = 238;



export default function getReadingTime(content: string) {
    if (!content) throw new Error("Reading time called without any content to compute")
    if (typeof content !== "string") throw new Error("Reading time is not a string")
    
    const clean = content.replace(/<\/?[^>]+(>|$)/g, '');
    const numberOfWords = clean.split(/\s/g).length;
    return Math.ceil(numberOfWords / WORDS_PER_MINUTE);
}