export type LocalSnippetLanguage =
  | 'python'
  | 'javascript'
  | 'typescript'
  | 'cpp'
  | 'c'
  | 'java'
  | 'rust'
  | 'go'
  | 'sql'
  | 'html';

export const WORKSPACE_AUTOCOMPLETE_LANGUAGES: readonly LocalSnippetLanguage[] = [
  'javascript',
  'python',
  'typescript',
  'java',
  'cpp',
  'c',
  'go',
  'rust',
];

export const ALL_AUTOCOMPLETE_LANGUAGES: readonly LocalSnippetLanguage[] = [
  'python',
  'javascript',
  'typescript',
  'cpp',
  'c',
  'java',
  'rust',
  'go',
  'sql',
  'html',
];

export interface LocalSnippetDefinition {
  /** Trigger text shown in Monaco's completion list and matched by typed prefix. */
  label: string;
  /** Short description displayed next to the label. */
  detail: string;
  /** Monaco snippet template string using `\t` indentation and `${n:...}` tab stops. */
  insertText: string;
  /** Markdown preview displayed when completion details are shown. */
  documentation: string;
}

export interface LocalSnippetMatch {
  snippet: LocalSnippetDefinition;
  insertText: string;
  replaceStartColumn: number;
  replaceEndColumn: number;
  filterText: string;
  sortText: string;
}

/** Formats a Monaco snippet template into a readable code preview for documentation tooltips. */
function formatSnippetPreview(insertText: string): string {
  return insertText
    .replace(/\$\{\d+\|([^|}]+)[^}]*\}/g, '$1')
    .replace(/\$\{\d+:([^}]*)\}/g, '$1')
    .replace(/\$\d+/g, '')
    .replace(/\t/g, '  ')
    .trimEnd();
}

function createSnippet(
  language: LocalSnippetLanguage,
  label: string,
  detail: string,
  insertText: string,
): LocalSnippetDefinition {
  const preview = formatSnippetPreview(insertText);
  return {
    label,
    detail,
    insertText,
    documentation: `${detail}\n\n\`\`\`${language}\n${preview}\n\`\`\``,
  };
}

function createJsTsSharedSnippets(language: 'javascript' | 'typescript'): LocalSnippetDefinition[] {
  return [
    createSnippet(language, 'for', 'Index for loop', 'for (let ${1:i} = 0; ${1:i} < ${2:items}.length; ${1:i}++) {\n\t${0}\n}'),
    createSnippet(language, 'forof', 'For...of loop', 'for (const ${1:item} of ${2:items}) {\n\t${0}\n}'),
    createSnippet(language, 'forin', 'For...in loop', 'for (const ${1:key} in ${2:obj}) {\n\t${0}\n}'),
    createSnippet(language, 'while', 'While loop', 'while (${1:condition}) {\n\t${0}\n}'),
    createSnippet(language, 'if', 'If statement', 'if (${1:condition}) {\n\t${0}\n}'),
    createSnippet(language, 'ifelse', 'If / else block', 'if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}'),
    createSnippet(
      language,
      'switch',
      'Switch statement',
      'switch (${1:value}) {\n\tcase ${2:match}:\n\t\t${3}\n\t\tbreak;\n\tdefault:\n\t\t${0}\n}',
    ),
    createSnippet(language, 'try', 'Try / catch block', 'try {\n\t${1}\n} catch (${2:err}) {\n\t${0}\n}'),
    createSnippet(language, 'log', 'Console log', 'console.log(${1:value});$0'),
  ];
}

export const CURATED_SNIPPETS: Record<LocalSnippetLanguage, readonly LocalSnippetDefinition[]> = {
  python: [
    createSnippet('python', 'def', 'Function definition', 'def ${1:name}(${2:args}):\n\t${0:pass}'),
    createSnippet('python', 'for', 'For-in loop', 'for ${1:item} in ${2:iterable}:\n\t${0:pass}'),
    createSnippet('python', 'forr', 'For range loop', 'for ${1:i} in range(${2:n}):\n\t${0:pass}'),
    createSnippet('python', 'fore', 'For enumerate loop', 'for ${1:i}, ${2:val} in enumerate(${3:items}):\n\t${0:pass}'),
    createSnippet('python', 'while', 'While loop', 'while ${1:condition}:\n\t${0:pass}'),
    createSnippet('python', 'if', 'If statement', 'if ${1:condition}:\n\t${0:pass}'),
    createSnippet('python', 'ifelse', 'If / else block', 'if ${1:condition}:\n\t${2:pass}\nelse:\n\t${0:pass}'),
    createSnippet('python', 'elif', 'Elif branch', 'elif ${1:condition}:\n\t${0:pass}'),
    createSnippet('python', 'try', 'Try / except block', 'try:\n\t${1:pass}\nexcept ${2:Exception} as ${3:err}:\n\t${0:pass}'),
    createSnippet('python', 'class', 'Class definition', 'class ${1:Name}:\n\tdef __init__(self, ${2:args}):\n\t\t${0:pass}'),
    createSnippet('python', 'lambda', 'Lambda expression', 'lambda ${1:x}: ${0:x}'),
    createSnippet('python', 'listcomp', 'List comprehension', '[${1:expr} for ${2:item} in ${3:iterable}]'),
    createSnippet('python', 'dictcomp', 'Dictionary comprehension', '{${1:k}: ${2:v} for ${3:k}, ${4:v} in ${5:items}}'),
    createSnippet('python', 'print', 'Print to stdout', 'print(${1:value})$0'),
    createSnippet('python', 'input', 'Read trimmed stdin line', '${1:line} = input().strip()$0'),
    createSnippet('python', 'inputint', 'Read integer from stdin', '${1:n} = int(input().strip())$0'),
    createSnippet('python', 'inputlist', 'Read integer list from stdin', '${1:nums} = list(map(int, input().split()))$0'),
    createSnippet('python', 'main', 'Main entrypoint guard', 'if __name__ == "__main__":\n\t${0:main()}'),
    createSnippet('python', 'ret', 'Return statement', 'return ${0:value}'),
  ],

  javascript: [
    createSnippet('javascript', 'function', 'Function declaration', 'function ${1:name}(${2:params}) {\n\t${0}\n}'),
    createSnippet('javascript', 'fn', 'Function declaration', 'function ${1:name}(${2:params}) {\n\t${0}\n}'),
    createSnippet('javascript', 'afn', 'Arrow function', 'const ${1:name} = (${2:params}) => {\n\t${0}\n};'),
    ...createJsTsSharedSnippets('javascript'),
    createSnippet('javascript', 'map', 'New Map', 'const ${1:map} = new Map();$0'),
    createSnippet('javascript', 'set', 'New Set', 'const ${1:set} = new Set(${2});$0'),
    createSnippet(
      'javascript',
      'readline',
      'Read stdin in Node.js',
      "const fs = require('fs');\nconst input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/);$0",
    ),
  ],

  typescript: [
    createSnippet(
      'typescript',
      'function',
      'Typed function declaration',
      'function ${1:name}(${2:param}: ${3:string}): ${4:void} {\n\t${0}\n}',
    ),
    createSnippet(
      'typescript',
      'fn',
      'Typed function declaration',
      'function ${1:name}(${2:param}: ${3:string}): ${4:void} {\n\t${0}\n}',
    ),
    createSnippet(
      'typescript',
      'afn',
      'Typed arrow function',
      'const ${1:name} = (${2:param}: ${3:string}): ${4:void} => {\n\t${0}\n};',
    ),
    createSnippet('typescript', 'interface', 'Interface definition', 'interface ${1:Name} {\n\t${2:id}: ${3:number};\n\t${0}\n}'),
    createSnippet('typescript', 'type', 'Type alias', 'type ${1:Name} = ${0:unknown};'),
    createSnippet('typescript', 'enum', 'Enum definition', "enum ${1:Name} {\n\t${2:First} = '${3:first}',\n\t${0}\n}"),
    ...createJsTsSharedSnippets('typescript'),
    createSnippet('typescript', 'map', 'Typed Map', 'const ${1:map} = new Map<${2:string}, ${3:number}>();$0'),
    createSnippet('typescript', 'set', 'Typed Set', 'const ${1:set} = new Set<${2:string}>();$0'),
  ],

  cpp: [
    createSnippet('cpp', 'for', 'Index for loop', 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ++${1:i}) {\n\t${0}\n}'),
    createSnippet('cpp', 'forr', 'Range-based for loop', 'for (const auto& ${1:item} : ${2:container}) {\n\t${0}\n}'),
    createSnippet('cpp', 'while', 'While loop', 'while (${1:condition}) {\n\t${0}\n}'),
    createSnippet('cpp', 'if', 'If statement', 'if (${1:condition}) {\n\t${0}\n}'),
    createSnippet('cpp', 'ifelse', 'If / else block', 'if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}'),
    createSnippet('cpp', 'fn', 'Function definition', '${1:int} ${2:solve}(${3:int n}) {\n\t${0}\n}'),
    createSnippet('cpp', 'struct', 'Struct definition', 'struct ${1:Node} {\n\t${2:int val;}\n\t${0}\n};'),
    createSnippet('cpp', 'class', 'Class definition', 'class ${1:Solution} {\npublic:\n\t${0}\n};'),
    createSnippet('cpp', 'vec', 'std::vector declaration', 'std::vector<${1:int}> ${2:nums}(${3:n});$0'),
    createSnippet('cpp', 'umap', 'std::unordered_map declaration', 'std::unordered_map<${1:int}, ${2:int}> ${3:counts};$0'),
    createSnippet('cpp', 'cin', 'Read from std::cin', 'std::cin >> ${1:n};$0'),
    createSnippet('cpp', 'cout', 'Print to std::cout', "std::cout << ${1:value} << '\\n';$0"),
    createSnippet('cpp', 'fastio', 'Fast C++ stdin/stdout setup', 'std::ios::sync_with_stdio(false);\nstd::cin.tie(nullptr);$0'),
    createSnippet('cpp', 'main', 'Main function', 'int main() {\n\t${0}\n\treturn 0;\n}'),
  ],

  c: [
    createSnippet('c', 'for', 'Index for loop', 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${0}\n}'),
    createSnippet('c', 'while', 'While loop', 'while (${1:condition}) {\n\t${0}\n}'),
    createSnippet('c', 'if', 'If statement', 'if (${1:condition}) {\n\t${0}\n}'),
    createSnippet('c', 'ifelse', 'If / else block', 'if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}'),
    createSnippet('c', 'fn', 'Function definition', '${1:int} ${2:solve}(${3:int n}) {\n\t${0}\n}'),
    createSnippet('c', 'struct', 'Typedef struct', 'typedef struct {\n\t${1:int val;}\n} ${2:Node};$0'),
    createSnippet('c', 'malloc', 'Allocate heap array', '${1:int}* ${2:arr} = (${1:int}*)malloc((${3:n}) * sizeof(${1:int}));$0'),
    createSnippet('c', 'calloc', 'Zero-initialized heap array', '${1:int}* ${2:arr} = (${1:int}*)calloc(${3:n}, sizeof(${1:int}));$0'),
    createSnippet('c', 'printf', 'Print formatted output', 'printf("${1:%d}\\n", ${2:value});$0'),
    createSnippet('c', 'scanf', 'Read formatted stdin', 'scanf("${1:%d}", &${2:n});$0'),
    createSnippet('c', 'main', 'Main function', 'int main(void) {\n\t${0}\n\treturn 0;\n}'),
  ],

  java: [
    createSnippet('java', 'for', 'Index for loop', 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n\t${0}\n}'),
    createSnippet('java', 'fore', 'Enhanced for-each loop', 'for (${1:int} ${2:item} : ${3:items}) {\n\t${0}\n}'),
    createSnippet('java', 'while', 'While loop', 'while (${1:condition}) {\n\t${0}\n}'),
    createSnippet('java', 'if', 'If statement', 'if (${1:condition}) {\n\t${0}\n}'),
    createSnippet('java', 'ifelse', 'If / else block', 'if (${1:condition}) {\n\t${2}\n} else {\n\t${0}\n}'),
    createSnippet('java', 'method', 'Public method', 'public ${1:int} ${2:solve}(${3:int[] nums}) {\n\t${0}\n}'),
    createSnippet('java', 'main', 'Main method', 'public static void main(String[] args) {\n\t${0}\n}'),
    createSnippet('java', 'sout', 'System.out.println', 'System.out.println(${1:value});$0'),
    createSnippet('java', 'scanner', 'Scanner stdin reader', 'Scanner ${1:sc} = new Scanner(System.in);\n${0}'),
    createSnippet(
      'java',
      'br',
      'BufferedReader stdin reader',
      'BufferedReader ${1:br} = new BufferedReader(new InputStreamReader(System.in));\n${0}',
    ),
    createSnippet('java', 'list', 'ArrayList declaration', 'List<${1:Integer}> ${2:list} = new ArrayList<>();$0'),
    createSnippet('java', 'map', 'HashMap declaration', 'Map<${1:Integer}, ${2:Integer}> ${3:map} = new HashMap<>();$0'),
  ],

  rust: [
    createSnippet('rust', 'fn', 'Function definition', 'fn ${1:name}(${2:arg}: ${3:i32}) -> ${4:i32} {\n\t${0}\n}'),
    createSnippet('rust', 'main', 'Main function', 'fn main() {\n\t${0}\n}'),
    createSnippet('rust', 'for', 'For range loop', 'for ${1:i} in ${2:0}..${3:n} {\n\t${0}\n}'),
    createSnippet('rust', 'foriter', 'For iterator loop', 'for ${1:item} in &${2:items} {\n\t${0}\n}'),
    createSnippet('rust', 'while', 'While loop', 'while ${1:condition} {\n\t${0}\n}'),
    createSnippet('rust', 'loop', 'Loop block', 'loop {\n\t${0}\n}'),
    createSnippet('rust', 'if', 'If statement', 'if ${1:condition} {\n\t${0}\n}'),
    createSnippet('rust', 'ifelse', 'If / else block', 'if ${1:condition} {\n\t${2}\n} else {\n\t${0}\n}'),
    createSnippet('rust', 'match', 'Match expression', 'match ${1:value} {\n\t${2:pattern} => ${3:expr},\n\t_ => ${0:todo!()},\n}'),
    createSnippet('rust', 'struct', 'Struct definition', 'struct ${1:Name} {\n\t${2:field}: ${3:i32},\n}'),
    createSnippet('rust', 'println', 'Print line macro', 'println!("${1:{}}", ${2:value});$0'),
    createSnippet(
      'rust',
      'stdin',
      'Read line from stdin',
      'let mut ${1:input} = String::new();\nstd::io::stdin().read_line(&mut ${1:input}).expect("Failed to read line");$0',
    ),
    createSnippet('rust', 'vec', 'Vector macro', 'let ${1:nums} = vec![${0}];'),
  ],

  go: [
    createSnippet('go', 'func', 'Function declaration', 'func ${1:name}(${2:param} ${3:int}) ${4:int} {\n\t${0}\n}'),
    createSnippet('go', 'main', 'Main function', 'func main() {\n\t${0}\n}'),
    createSnippet('go', 'for', 'Standard for loop', 'for ${1:i} := 0; ${1:i} < ${2:n}; ${1:i}++ {\n\t${0}\n}'),
    createSnippet('go', 'forr', 'For range loop', 'for ${1:i}, ${2:v} := range ${3:items} {\n\t${0}\n}'),
    createSnippet('go', 'while', 'Condition for loop', 'for ${1:condition} {\n\t${0}\n}'),
    createSnippet('go', 'if', 'If statement', 'if ${1:condition} {\n\t${0}\n}'),
    createSnippet('go', 'iferr', 'Error check block', 'if err != nil {\n\t${0:return err}\n}'),
    createSnippet('go', 'struct', 'Struct type', 'type ${1:Name} struct {\n\t${2:Field} ${3:string}\n}'),
    createSnippet('go', 'println', 'fmt.Println', 'fmt.Println(${1:value})$0'),
    createSnippet('go', 'printf', 'fmt.Printf', 'fmt.Printf("${1:%v}\\n", ${2:value})$0'),
    createSnippet(
      'go',
      'scanner',
      'bufio.Scanner stdin loop',
      'scanner := bufio.NewScanner(os.Stdin)\nfor scanner.Scan() {\n\t${1:line := scanner.Text()}\n\t${0}\n}',
    ),
  ],

  sql: [
    createSnippet('sql', 'select', 'SELECT query', 'SELECT ${1:columns}\nFROM ${2:table_name}\nWHERE ${3:condition};$0'),
    createSnippet(
      'sql',
      'selectorder',
      'SELECT with ORDER BY and LIMIT',
      'SELECT ${1:columns}\nFROM ${2:table_name}\nORDER BY ${3:column} ${4|DESC,ASC|}\nLIMIT ${5:10};$0',
    ),
    createSnippet(
      'sql',
      'groupby',
      'GROUP BY aggregation',
      'SELECT ${1:group_col}, COUNT(*) AS ${2:total}\nFROM ${3:table_name}\nGROUP BY ${1:group_col}\nORDER BY ${2:total} DESC;$0',
    ),
    createSnippet(
      'sql',
      'join',
      'INNER JOIN query',
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table_a} ${4:a}\nINNER JOIN ${5:table_b} ${6:b} ON ${4:a}.${7:id} = ${6:b}.${8:a_id};$0',
    ),
    createSnippet(
      'sql',
      'leftjoin',
      'LEFT JOIN query',
      'SELECT ${1:a.*}, ${2:b.*}\nFROM ${3:table_a} ${4:a}\nLEFT JOIN ${5:table_b} ${6:b} ON ${4:a}.${7:id} = ${6:b}.${8:a_id};$0',
    ),
    createSnippet(
      'sql',
      'cte',
      'Common Table Expression (WITH)',
      'WITH ${1:cte_name} AS (\n\tSELECT ${2:*}\n\tFROM ${3:table_name}\n)\nSELECT *\nFROM ${1:cte_name};$0',
    ),
    createSnippet('sql', 'insert', 'INSERT statement', 'INSERT INTO ${1:table_name} (${2:col1, col2})\nVALUES (${3:val1, val2});$0'),
    createSnippet('sql', 'update', 'UPDATE statement', 'UPDATE ${1:table_name}\nSET ${2:col} = ${3:value}\nWHERE ${4:condition};$0'),
    createSnippet(
      'sql',
      'createtable',
      'CREATE TABLE statement',
      'CREATE TABLE IF NOT EXISTS ${1:table_name} (\n\t${2:id} SERIAL PRIMARY KEY,\n\t${3:name} VARCHAR(100) NOT NULL\n);$0',
    ),
  ],

  html: [
    createSnippet(
      'html',
      'html5',
      'HTML5 document boilerplate',
      '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>${1:Document}</title>\n</head>\n<body>\n\t${0}\n</body>\n</html>',
    ),
    createSnippet('html', 'div', '<div> container', '<div class="${1:container}">\n\t${0}\n</div>'),
    createSnippet('html', 'section', '<section> block', '<section class="${1:section}">\n\t${0}\n</section>'),
    createSnippet('html', 'button', '<button> element', '<button type="${1|button,submit,reset|}">${2:Click me}</button>$0'),
    createSnippet('html', 'form', '<form> block', '<form action="${1:#}" method="${2|post,get|}">\n\t${0}\n</form>'),
    createSnippet('html', 'input', '<input> field', '<input type="${1|text,email,password,number|}" name="${2:field}" placeholder="${3:Enter value}" />$0'),
    createSnippet('html', 'ul', 'Unordered list', '<ul>\n\t<li>${1:Item}</li>\n\t${0}\n</ul>'),
    createSnippet('html', 'script', '<script> tag', '<script>\n\t${0}\n</script>'),
    createSnippet('html', 'style', '<style> tag', '<style>\n\t${0}\n</style>'),
    createSnippet('html', 'link', 'Stylesheet <link> tag', '<link rel="stylesheet" href="${1:styles.css}" />$0'),
  ],
};

export function isLocalSnippetLanguage(language: string): language is LocalSnippetLanguage {
  return Object.prototype.hasOwnProperty.call(CURATED_SNIPPETS, language);
}

/**
 * Checks whether the line prefix before the active token is inside a string literal
 * or comment on the current line so snippets don't intrude on prose or string data.
 */
export function isInsideStringOrLineComment(
  language: LocalSnippetLanguage,
  lineBeforeWord: string,
): boolean {
  const supportsSingleQuoteStrings =
    language === 'python' ||
    language === 'javascript' ||
    language === 'typescript' ||
    language === 'sql' ||
    language === 'html';
  const supportsBackticks = language === 'javascript' || language === 'typescript';

  let activeQuote: '"' | "'" | '`' | null = null;
  let templateExprDepth = 0;
  let inBlockComment = false;

  for (let i = 0; i < lineBeforeWord.length; i += 1) {
    const ch = lineBeforeWord[i];
    const next = lineBeforeWord[i + 1] ?? '';

    if (inBlockComment) {
      if (language === 'html' && lineBeforeWord.slice(i, i + 3) === '-->') {
        inBlockComment = false;
        i += 2;
      } else if (language !== 'html' && ch === '*' && next === '/') {
        inBlockComment = false;
        i += 1;
      }
      continue;
    }

    if (activeQuote !== null) {
      if (ch === '\\' && language !== 'sql') {
        i += 1;
        continue;
      }
      if (activeQuote === '`' && ch === '$' && next === '{') {
        activeQuote = null;
        templateExprDepth += 1;
        i += 1;
        continue;
      }
      if (ch === activeQuote) {
        if (language === 'sql' && next === "'") {
          i += 1;
          continue;
        }
        activeQuote = null;
      }
      continue;
    }

    if (templateExprDepth > 0 && ch === '}') {
      templateExprDepth -= 1;
      activeQuote = '`';
      continue;
    }

    if (language === 'python' && ch === '#') {
      return true;
    }
    if (language === 'sql' && ch === '-' && next === '-') {
      return true;
    }
    if (language === 'html' && lineBeforeWord.slice(i, i + 4) === '<!--') {
      inBlockComment = true;
      i += 3;
      continue;
    }
    if (
      language !== 'python' &&
      language !== 'sql' &&
      language !== 'html' &&
      ch === '/' &&
      next === '/'
    ) {
      return true;
    }
    if (language !== 'python' && language !== 'html' && ch === '/' && next === '*') {
      inBlockComment = true;
      i += 1;
      continue;
    }

    if (ch === '"') {
      activeQuote = '"';
      continue;
    }
    if (ch === "'" && supportsSingleQuoteStrings) {
      activeQuote = "'";
      continue;
    }
    if (ch === '`' && supportsBackticks) {
      activeQuote = '`';
      continue;
    }
    // Skip C/C++/Java/Go/Rust single-char literals like '"' so quotes inside them don't leak.
    if (ch === "'" && !supportsSingleQuoteStrings) {
      if (next === '\\' && lineBeforeWord[i + 3] === "'") {
        i += 3;
      } else if (lineBeforeWord[i + 2] === "'") {
        i += 2;
      }
    }
  }

  return activeQuote !== null || inBlockComment;
}

export interface MatchLocalSnippetsParams {
  language: string;
  lineBeforeCursor: string;
  word?: string;
  startColumn?: number;
  endColumn?: number;
}

export function matchLocalSnippets({
  language,
  lineBeforeCursor,
  word,
  startColumn,
  endColumn,
}: MatchLocalSnippetsParams): LocalSnippetMatch[] {
  if (!isLocalSnippetLanguage(language)) {
    return [];
  }

  const tokenRegex = language === 'html' ? /[A-Za-z][A-Za-z0-9-]*$/ : /[A-Za-z_][A-Za-z0-9_]*$/;
  const resolvedWord = word !== undefined ? word : (lineBeforeCursor.match(tokenRegex)?.[0] ?? '');
  if (!resolvedWord) {
    return [];
  }

  const resolvedEndColumn = endColumn ?? lineBeforeCursor.length + 1;
  const resolvedStartColumn = startColumn ?? Math.max(1, resolvedEndColumn - resolvedWord.length);
  const lineBeforeWord = lineBeforeCursor.slice(0, Math.max(0, resolvedStartColumn - 1));

  // Do not inject statement/block snippets directly after member or scope operators.
  if (/(\.|\?\.|->|::)$/.test(lineBeforeWord)) {
    return [];
  }

  if (isInsideStringOrLineComment(language, lineBeforeWord)) {
    return [];
  }

  const normalizedPrefix = resolvedWord.toLowerCase();
  const hasLeadingAngle = language === 'html' && lineBeforeWord.endsWith('<');

  const matching = CURATED_SNIPPETS[language].filter((snippet) =>
    snippet.label.toLowerCase().startsWith(normalizedPrefix),
  );

  // Rank exact prefix matches first while preserving curated snippet order otherwise.
  matching.sort((a, b) => {
    const aExact = a.label.toLowerCase() === normalizedPrefix ? 0 : 1;
    const bExact = b.label.toLowerCase() === normalizedPrefix ? 0 : 1;
    return aExact - bExact;
  });

  return matching.map((snippet, index) => ({
    snippet,
    insertText:
      hasLeadingAngle && snippet.insertText.startsWith('<')
        ? snippet.insertText.slice(1)
        : snippet.insertText,
    replaceStartColumn: resolvedStartColumn,
    replaceEndColumn: resolvedEndColumn,
    filterText: snippet.label,
    sortText: String(index).padStart(4, '0'),
  }));
}
