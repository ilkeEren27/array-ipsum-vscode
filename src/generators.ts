// Word bank for string generation (lorem ipsum style)
const words: string[] = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export type DataType = "int" | "float" | "double" | "string" | "bool";
export type Language = "javascript" | "typescript" | "python" | "java" | "csharp" | "cpp" | "c";

/**
 * Generate an array of random integers
 */
export function generateInts(count: number, min: number = -1000, max: number = 1000): number[] {
  return Array.from({ length: count }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

/**
 * Generate an array of random floats with 2 decimal places
 */
export function generateFloats(count: number, min: number = -1000, max: number = 1000): number[] {
  return Array.from({ length: count }, () =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2))
  );
}

/**
 * Generate an array of random doubles with 6 decimal places
 */
export function generateDoubles(count: number, min: number = -1000, max: number = 1000): number[] {
  return Array.from({ length: count }, () =>
    parseFloat((Math.random() * (max - min) + min).toFixed(6))
  );
}

/**
 * Generate an array of random words
 */
export function generateStrings(count: number): string[] {
  return Array.from({ length: count }, () =>
    words[Math.floor(Math.random() * words.length)]
  );
}

/**
 * Generate an array of random booleans
 */
export function generateBools(count: number): boolean[] {
  return Array.from({ length: count }, () => Math.random() < 0.5);
}

/**
 * Generate array based on data type
 */
export function generateArray(type: DataType, count: number, allowNegative: boolean = true): (number | string | boolean)[] {
  const min = allowNegative ? -1000 : 0;
  switch (type) {
    case "int": return generateInts(count, min);
    case "float": return generateFloats(count, min);
    case "double": return generateDoubles(count, min);
    case "string": return generateStrings(count);
    case "bool": return generateBools(count);
  }
}

/**
 * Format array output for display (plain array)
 */
export function formatOutput(arr: (number | string | boolean)[], type: DataType): string {
  if (type === "string") {
    return `[${(arr as string[]).map(s => `"${s}"`).join(", ")}]`;
  }
  return `[${arr.join(", ")}]`;
}

/**
 * Generate code snippet for different languages
 */
export function generateCodeSnippet(
  arr: (number | string | boolean)[],
  type: DataType,
  language: Language
): string {
  const typeMap: Record<Language, Record<DataType, string>> = {
    javascript: { int: "", float: "", double: "", string: "", bool: "" },
    typescript: { int: "number", float: "number", double: "number", string: "string", bool: "boolean" },
    python: { int: "", float: "", double: "", string: "", bool: "" },
    java: { int: "int", float: "float", double: "double", string: "String", bool: "boolean" },
    csharp: { int: "int", float: "float", double: "double", string: "string", bool: "bool" },
    cpp: { int: "int", float: "float", double: "double", string: "std::string", bool: "bool" },
    c: { int: "int", float: "float", double: "double", string: "const char*", bool: "int" },
  };

  const formattedValues = type === "string"
    ? (arr as string[]).map(s => `"${s}"`).join(", ")
    : type === "bool" && language === "c"
      ? (arr as boolean[]).map(b => (b ? "1" : "0")).join(", ")
      : arr.join(type === "float" ? "f, " : ", ") +
      (type === "float" && !["javascript", "typescript", "python"].includes(language) ? "f" : "");

  switch (language) {
    case "javascript":
      return `const arr = [${formattedValues}];`;
    case "typescript":
      return `const arr: ${typeMap.typescript[type]}[] = [${formattedValues}];`;
    case "python":
      return `arr = [${formattedValues}]`;
    case "java":
      return `${typeMap.java[type]}[] arr = {${formattedValues}};`;
    case "csharp":
      return `${typeMap.csharp[type]}[] arr = {${formattedValues}};`;
    case "cpp":
      return `${typeMap.cpp[type]} arr[] = {${formattedValues}};`;
    case "c":
      return `${typeMap.c[type]} arr[] = {${formattedValues}};`;
    default:
      return `[${formattedValues}]`;
  }
}

/**
 * Map VS Code language ID to our Language type
 */
export function mapLanguageId(languageId: string): Language {
  const languageMap: Record<string, Language> = {
    "javascript": "javascript",
    "javascriptreact": "javascript",
    "typescript": "typescript",
    "typescriptreact": "typescript",
    "python": "python",
    "java": "java",
    "csharp": "csharp",
    "cpp": "cpp",
    "c": "c",
  };
  return languageMap[languageId] || "javascript";
}
