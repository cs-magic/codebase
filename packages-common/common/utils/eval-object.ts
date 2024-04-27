export function evalObject(input: string): unknown {
  // Attempt to convert the input string to a number
  const number = Number(input)
  if (!isNaN(number)) {
    return number // Return the number if conversion was successful
  }

  // Convert 'true' or 'false' strings to boolean values
  if (input.toLowerCase() === "true") {
    return true
  }
  if (input.toLowerCase() === "false") {
    return false
  }

  // Return the original string if it's neither a number nor a boolean
  return input
}
