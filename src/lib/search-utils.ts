
// A simple Levenshtein distance implementation
// This is used for "fuzzy" searching to allow for typos
const levenshtein = (s1: string, s2: string): number => {
  if (s1.length > s2.length) {
    [s1, s2] = [s2, s1];
  }

  const distances = Array.from({ length: s1.length + 1 }, (_, i) => i);

  for (let j = 0; j < s2.length; j++) {
    let previousDiagonal = distances[0];
    distances[0]++;

    for (let i = 0; i < s1.length; i++) {
      const previousHorizontal = distances[i + 1];
      if (s2[j] !== s1[i]) {
        distances[i + 1] = Math.min(
          distances[i],         // Deletion
          distances[i + 1],     // Insertion
          previousDiagonal      // Substitution
        ) + 1;
      }
      previousDiagonal = previousHorizontal;
    }
  }

  return distances[s1.length];
};

interface SearchableItem {
  slug: string;
  title: string;
  [key: string]: any;
}

export const performSearch = <T extends SearchableItem>(query: string, items: T[]): T[] => {
  if (!query) {
    return items;
  }

  const lowerCaseQuery = query.toLowerCase();
  const queryWords = lowerCaseQuery.split(' ').filter(w => w);

  const scoredItems = items.map(item => {
    const lowerCaseTitle = item.title.toLowerCase();
    let score = 0;

    // Rule 1: Exact match bonus
    if (lowerCaseTitle === lowerCaseQuery) {
      score += 100;
    }

    // Rule 2: Starts-with bonus
    if (lowerCaseTitle.startsWith(lowerCaseQuery)) {
      score += 50;
    }

    // Rule 3: Word matching bonus
    const titleWords = lowerCaseTitle.split(' ').filter(w => w);
    queryWords.forEach(qw => {
      if (titleWords.includes(qw)) {
        score += 20;
      }
      titleWords.forEach(tw => {
        if (tw.startsWith(qw)) {
          score += 10;
        }
      });
    });
    
    // Rule 4: Includes bonus
    if(lowerCaseTitle.includes(lowerCaseQuery)) {
        score += 10;
    }

    // Rule 5: Levenshtein distance for fuzzy matching
    const distance = levenshtein(lowerCaseTitle, lowerCaseQuery);
    const maxLen = Math.max(lowerCaseTitle.length, lowerCaseQuery.length);
    const similarity = (maxLen - distance) / maxLen;

    // Only consider similarity if it's reasonably high
    if (similarity > 0.6) {
        score += similarity * 30;
    }

    return { item, score };
  });

  return scoredItems
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.item);
};
