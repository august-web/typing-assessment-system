export const textComparison = {
  highlightCharacter: (typed: string, reference: string, index: number): string => {
    if (index >= typed.length) return 'pending'
    return typed[index] === reference[index] ? 'correct' : 'incorrect'
  },

  getCharacterComparisons: (
    typedText: string,
    referenceText: string
  ): ('correct' | 'incorrect' | 'pending')[] => {
    const comparisons: ('correct' | 'incorrect' | 'pending')[] = []

    for (let i = 0; i < referenceText.length; i++) {
      if (i >= typedText.length) {
        comparisons.push('pending')
      } else if (typedText[i] === referenceText[i]) {
        comparisons.push('correct')
      } else {
        comparisons.push('incorrect')
      }
    }

    return comparisons
  }
}
