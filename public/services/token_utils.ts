// compare and swap tokenStreamLength
export function getLength(current: number, tokenArray: string | any[] | null) {
  // FIXME check if there is synonyms or compound
  let length = current;
  if (tokenArray != null) {
    // FIXME must consider the situation if positionIncrements != 1
    if (tokenArray[tokenArray.length -1].position >= current) {
      length = tokenArray[tokenArray.length -1].position + 1;
    }
  }
  return length;
};

export function createTokenIndices(tokenStreamLength: number) {
  const tokenIndices = [];
  for (let i = 0; i < tokenStreamLength; i++) {
    tokenIndices.push(i);
  }
  return tokenIndices;
}
