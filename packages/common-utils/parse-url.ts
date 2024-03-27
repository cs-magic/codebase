export function extractFirstURL(text: string): string | null {
  // This regex is designed to find URLs within a string.
  // It looks for strings that start with http://, https://, or www., and captures
  // everything until it encounters a space or the end of the string.
  const regex = /https?:\/\/[^\s，。]+|www\.[^\s，。]+/

  // The match() method searches a string for a match against a regular expression,
  // and returns the matches, as an Array object.
  // Using match instead of matchAll since we only want the first match.
  const match = text.match(regex)

  // match is an array where the first element is the matched string, or null if no match was found.
  return match ? match[0] : null // This will be the first URL found in the text or null if no URL is found.
}
