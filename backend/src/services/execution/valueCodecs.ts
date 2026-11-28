export const cppValueCodec = String.raw`
    static std::vector<std::string> split(const std::string& text) {
        std::vector<std::string> parts;
        int depth = 0;
        bool quoted = false, escaped = false;
        size_t start = 0;
        for (size_t i = 0; i < text.size(); ++i) {
            char c = text[i];
            if (quoted) {
                if (escaped) escaped = false;
                else if (c == '\\') escaped = true;
                else if (c == '"') quoted = false;
            } else if (c == '"') quoted = true;
            else if (c == '[') ++depth;
            else if (c == ']') --depth;
            else if (c == ',' && depth == 0) {
                parts.push_back(trim(text.substr(start, i - start)));
                start = i + 1;
            }
        }
        if (start < text.size()) parts.push_back(trim(text.substr(start)));
        return parts;
    }

    template<class T> struct Codec {
        static T parse(const std::string& text) {
            if constexpr (std::is_same_v<T, std::string>) {
                std::string result;
                if (text.size() >= 2 && text.front() == '"') {
                    std::istringstream input(text);
                    input >> std::quoted(result);
                    return result;
                }
                return text;
            } else if constexpr (std::is_same_v<T, char>) {
                return Codec<std::string>::parse(text).at(0);
            } else if constexpr (std::is_same_v<T, bool>) {
                return text == "true";
            } else if constexpr (std::is_floating_point_v<T>) {
                return static_cast<T>(std::stod(text));
            } else {
                return static_cast<T>(std::stoll(text));
            }
        }

        static void write(const T& value) {
            if constexpr (std::is_same_v<T, std::string>) std::cout << std::quoted(value);
            else if constexpr (std::is_same_v<T, char>) std::cout << std::quoted(std::string(1, value));
            else if constexpr (std::is_same_v<T, bool>) std::cout << (value ? "true" : "false");
            else std::cout << value;
        }
    };

    template<class T> struct Codec<std::vector<T>> {
        static std::vector<T> parse(const std::string& text) {
            if (text.size() < 2 || text.front() != '[' || text.back() != ']') {
                throw std::invalid_argument("Expected an array");
            }
            std::vector<T> result;
            for (const auto& token : split(trim(text.substr(1, text.size() - 2)))) {
                result.push_back(Codec<T>::parse(token));
            }
            return result;
        }
        static void write(const std::vector<T>& values) {
            std::cout << '[';
            for (size_t i = 0; i < values.size(); ++i) {
                if (i > 0) std::cout << ',';
                Codec<T>::write(values[i]);
            }
            std::cout << ']';
        }
    };

    template<class T> struct Codec<std::optional<T>> {
        static std::optional<T> parse(const std::string& text) {
            if (text == "null") return std::nullopt;
            return Codec<T>::parse(text);
        }
        static void write(const std::optional<T>& value) {
            if (value) Codec<T>::write(*value);
            else std::cout << "null";
        }
    };

    template<class R, class... Args, size_t... I>
    static void dispatch(Solution& solution, R (Solution::*method)(Args...),
                         const std::vector<std::string>& tokens, std::index_sequence<I...>) {
        if (tokens.size() != sizeof...(Args)) throw std::invalid_argument("Wrong number of arguments");
        std::tuple<std::decay_t<Args>...> arguments{Codec<std::decay_t<Args>>::parse(tokens[I])...};
        auto result = (solution.*method)(std::get<I>(arguments)...);
        Codec<R>::write(result);
        std::cout << '\n';
    }

    template<class R, class... Args>
    static void invoke(Solution& solution, R (Solution::*method)(Args...),
                       const std::vector<std::string>& tokens) {
        dispatch(solution, method, tokens, std::index_sequence_for<Args...>{});
    }
`;

export const javaValueCodec = String.raw`
    private static List<String> splitTokens(String raw) {
        List<String> parts = new ArrayList<>();
        int depth = 0, start = 0;
        boolean quoted = false, escaped = false;
        for (int i = 0; i < raw.length(); i++) {
            char c = raw.charAt(i);
            if (quoted) {
                if (escaped) escaped = false;
                else if (c == '\\') escaped = true;
                else if (c == '"') quoted = false;
            } else if (c == '"') quoted = true;
            else if (c == '[') depth++;
            else if (c == ']') depth--;
            else if (depth == 0 && c == ',') {
                parts.add(raw.substring(start, i).trim());
                start = i + 1;
            }
        }
        if (start < raw.length()) parts.add(raw.substring(start).trim());
        return parts;
    }

    private static List<String> arrayTokens(String raw) {
        if (raw.length() < 2 || raw.charAt(0) != '[' || raw.charAt(raw.length() - 1) != ']') {
            throw new IllegalArgumentException("Expected an array");
        }
        return splitTokens(raw.substring(1, raw.length() - 1).trim());
    }

    private static String unquote(String raw) {
        if (raw.length() < 2 || raw.charAt(0) != '"') return raw;
        StringBuilder value = new StringBuilder();
        for (int i = 1; i < raw.length() - 1; i++) {
            char c = raw.charAt(i);
            if (c == '\\') {
                c = raw.charAt(++i);
                if (c == 'n') c = '\n';
                else if (c == 'r') c = '\r';
                else if (c == 't') c = '\t';
                else if (c == 'u') {
                    c = (char)Integer.parseInt(raw.substring(i + 1, i + 5), 16);
                    i += 4;
                }
            }
            value.append(c);
        }
        return value.toString();
    }

    private static Object parseToken(String raw, Type type) {
        if (raw.equals("null")) return null;
        if (type instanceof ParameterizedType) {
            ParameterizedType parameters = (ParameterizedType) type;
            if (parameters.getRawType() == List.class) {
                List<Object> result = new ArrayList<>();
                for (String token : arrayTokens(raw)) result.add(parseToken(token, parameters.getActualTypeArguments()[0]));
                return result;
            }
        }
        Class<?> target = (Class<?>) type;
        if (target.isArray()) {
            List<String> tokens = arrayTokens(raw);
            Class<?> component = target.getComponentType();
            Object result = Array.newInstance(component, tokens.size());
            for (int i = 0; i < tokens.size(); i++) Array.set(result, i, parseToken(tokens.get(i), component));
            return result;
        }
        if (target == String.class) return unquote(raw);
        if (target == char.class || target == Character.class) return unquote(raw).charAt(0);
        if (target == int.class || target == Integer.class) return Integer.parseInt(raw);
        if (target == long.class || target == Long.class) return Long.parseLong(raw);
        if (target == double.class || target == Double.class) return Double.parseDouble(raw);
        if (target == boolean.class || target == Boolean.class) return Boolean.valueOf(raw);
        if (target == Object.class) {
            if (raw.startsWith("[")) {
                List<Object> result = new ArrayList<>();
                for (String token : arrayTokens(raw)) result.add(parseToken(token, Object.class));
                return result;
            }
            if (raw.startsWith("\"")) return unquote(raw);
            if (raw.equals("true") || raw.equals("false")) return Boolean.valueOf(raw);
            return Integer.valueOf(raw);
        }
        throw new IllegalArgumentException("Unsupported argument type " + type);
    }

    private static String serializeResult(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof String || obj instanceof Character) {
            return "\"" + obj.toString().replace("\\", "\\\\").replace("\"", "\\\"")
                .replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t") + "\"";
        }
        List<String> parts = new ArrayList<>();
        if (obj.getClass().isArray()) {
            for (int i = 0; i < Array.getLength(obj); i++) parts.add(serializeResult(Array.get(obj, i)));
        } else if (obj instanceof Iterable) {
            for (Object value : (Iterable<?>)obj) parts.add(serializeResult(value));
        } else return obj.toString();
        return "[" + String.join(",", parts) + "]";
    }
`;

export const cValueCodec = String.raw`
static char* ca_strdup_slice(const char* start, size_t len) {
    char* out = (char*)malloc(len + 1);
    if (!out) return NULL;
    if (len > 0) memcpy(out, start, len);
    out[len] = '\0';
    return out;
}

static char* ca_trim_dup(const char* s, size_t len) {
    size_t i = 0;
    while (i < len && isspace((unsigned char)s[i])) i++;
    while (len > i && isspace((unsigned char)s[len - 1])) len--;
    return ca_strdup_slice(s + i, len - i);
}

static const char* ca_strip_key_prefix(const char* tok) {
    while (*tok && isspace((unsigned char)*tok)) tok++;
    const char* p = tok;
    if (isalpha((unsigned char)*p) || *p == '_') {
        while (*p && (isalnum((unsigned char)*p) || *p == '_')) p++;
        while (*p && isspace((unsigned char)*p)) p++;
        if (*p == '=') {
            p++;
            while (*p && isspace((unsigned char)*p)) p++;
            return p;
        }
    }
    return tok;
}

static char** ca_split_top_level(const char* raw, int* outCount) {
    *outCount = 0;
    if (!raw) return NULL;
    size_t n = strlen(raw);
    size_t s = 0;
    while (s < n && isspace((unsigned char)raw[s])) s++;
    while (n > s && isspace((unsigned char)raw[n - 1])) n--;
    if (n <= s) return NULL;

    int cap = 8;
    char** parts = (char**)malloc((size_t)cap * sizeof(char*));
    int depth = 0;
    bool quoted = false, escaped = false;
    size_t start = s;

    for (size_t i = s; i < n; i++) {
        char c = raw[i];
        if (quoted) {
            if (escaped) escaped = false;
            else if (c == '\\') escaped = true;
            else if (c == '"') quoted = false;
        } else if (c == '"') {
            quoted = true;
        } else if (c == '[' || c == '{') {
            depth++;
        } else if (c == ']' || c == '}') {
            depth--;
        } else if (c == ',' && depth == 0) {
            if (*outCount >= cap) {
                cap *= 2;
                parts = (char**)realloc(parts, (size_t)cap * sizeof(char*));
            }
            parts[(*outCount)++] = ca_trim_dup(raw + start, i - start);
            start = i + 1;
        }
    }
    if (start < n) {
        if (*outCount >= cap) {
            cap *= 2;
            parts = (char**)realloc(parts, (size_t)cap * sizeof(char*));
        }
        parts[(*outCount)++] = ca_trim_dup(raw + start, n - start);
    }
    return parts;
}

static void ca_free_tokens(char** parts, int count) {
    if (!parts) return;
    for (int i = 0; i < count; i++) free(parts[i]);
    free(parts);
}

static int ca_parse_int(const char* tok) {
    tok = ca_strip_key_prefix(tok);
    return (int)strtoll(tok, NULL, 10);
}

static long long ca_parse_long(const char* tok) {
    tok = ca_strip_key_prefix(tok);
    return strtoll(tok, NULL, 10);
}

static double ca_parse_double(const char* tok) {
    tok = ca_strip_key_prefix(tok);
    return strtod(tok, NULL);
}

static bool ca_parse_bool(const char* tok) {
    tok = ca_strip_key_prefix(tok);
    return strncmp(tok, "true", 4) == 0;
}

static char* ca_parse_string(const char* tok) {
    tok = ca_strip_key_prefix(tok);
    size_t n = strlen(tok);
    if (n >= 2 && tok[0] == '"' && tok[n - 1] == '"') {
        char* out = (char*)malloc(n + 1);
        size_t w = 0;
        for (size_t i = 1; i + 1 < n; i++) {
            char c = tok[i];
            if (c == '\\' && i + 2 < n) {
                char nxt = tok[++i];
                if (nxt == 'n') out[w++] = '\n';
                else if (nxt == 'r') out[w++] = '\r';
                else if (nxt == 't') out[w++] = '\t';
                else if (nxt == 'b') out[w++] = '\b';
                else if (nxt == 'f') out[w++] = '\f';
                else if (nxt == 'u' && i + 4 < n - 1) {
                    char hex[5] = { tok[i + 1], tok[i + 2], tok[i + 3], tok[i + 4], '\0' };
                    out[w++] = (char)strtol(hex, NULL, 16);
                    i += 4;
                } else {
                    out[w++] = nxt;
                }
            } else {
                out[w++] = c;
            }
        }
        out[w] = '\0';
        return out;
    }
    return ca_trim_dup(tok, n);
}

static char ca_parse_char(const char* tok) {
    char* s = ca_parse_string(tok);
    char ch = s && s[0] ? s[0] : '\0';
    free(s);
    return ch;
}

static char** ca_array_tokens(const char* tok, int* outCount) {
    tok = ca_strip_key_prefix(tok);
    size_t n = strlen(tok);
    if (n < 2 || tok[0] != '[' || tok[n - 1] != ']') {
        *outCount = 0;
        return NULL;
    }
    char* inner = ca_trim_dup(tok + 1, n - 2);
    char** parts = ca_split_top_level(inner, outCount);
    free(inner);
    return parts;
}

static int* ca_parse_int_array(const char* tok, int* outSize) {
    char** items = ca_array_tokens(tok, outSize);
    int* arr = (int*)malloc((size_t)(*outSize > 0 ? *outSize : 1) * sizeof(int));
    for (int i = 0; i < *outSize; i++) arr[i] = ca_parse_int(items[i]);
    ca_free_tokens(items, *outSize);
    return arr;
}

static char* ca_parse_char_array(const char* tok, int* outSize) {
    char** items = ca_array_tokens(tok, outSize);
    char* arr = (char*)malloc((size_t)(*outSize > 0 ? *outSize : 1) * sizeof(char));
    for (int i = 0; i < *outSize; i++) arr[i] = ca_parse_char(items[i]);
    ca_free_tokens(items, *outSize);
    return arr;
}

static char** ca_parse_string_array(const char* tok, int* outSize) {
    char** items = ca_array_tokens(tok, outSize);
    char** arr = (char**)malloc((size_t)(*outSize > 0 ? *outSize : 1) * sizeof(char*));
    for (int i = 0; i < *outSize; i++) arr[i] = ca_parse_string(items[i]);
    ca_free_tokens(items, *outSize);
    return arr;
}

static OptionalInt* ca_parse_opt_int_array(const char* tok, int* outSize) {
    char** items = ca_array_tokens(tok, outSize);
    OptionalInt* arr = (OptionalInt*)malloc((size_t)(*outSize > 0 ? *outSize : 1) * sizeof(OptionalInt));
    for (int i = 0; i < *outSize; i++) {
        if (strcmp(items[i], "null") == 0) {
            arr[i].hasValue = false;
            arr[i].value = 0;
        } else {
            arr[i].hasValue = true;
            arr[i].value = ca_parse_int(items[i]);
        }
    }
    ca_free_tokens(items, *outSize);
    return arr;
}

static int** ca_parse_int_matrix(const char* tok, int* outRows, int** outColSizes) {
    char** rows = ca_array_tokens(tok, outRows);
    int r = *outRows;
    int** mat = (int**)malloc((size_t)(r > 0 ? r : 1) * sizeof(int*));
    int* cols = (int*)malloc((size_t)(r > 0 ? r : 1) * sizeof(int));
    for (int i = 0; i < r; i++) {
        mat[i] = ca_parse_int_array(rows[i], &cols[i]);
    }
    *outColSizes = cols;
    ca_free_tokens(rows, r);
    return mat;
}

static char** ca_parse_char_matrix(const char* tok, int* outRows, int** outColSizes) {
    char** rows = ca_array_tokens(tok, outRows);
    int r = *outRows;
    char** mat = (char**)malloc((size_t)(r > 0 ? r : 1) * sizeof(char*));
    int* cols = (int*)malloc((size_t)(r > 0 ? r : 1) * sizeof(int));
    for (int i = 0; i < r; i++) {
        mat[i] = ca_parse_char_array(rows[i], &cols[i]);
    }
    *outColSizes = cols;
    ca_free_tokens(rows, r);
    return mat;
}

static void ca_print_json_string(const char* s) {
    if (!s) {
        printf("null");
        return;
    }
    putchar('"');
    for (const unsigned char* p = (const unsigned char*)s; *p; p++) {
        unsigned char c = *p;
        if (c == '"') printf("\\\"");
        else if (c == '\\') printf("\\\\");
        else if (c == '\n') printf("\\n");
        else if (c == '\r') printf("\\r");
        else if (c == '\t') printf("\\t");
        else if (c == '\b') printf("\\b");
        else if (c == '\f') printf("\\f");
        else if (c < 0x20) printf("\\u%04x", c);
        else putchar((char)c);
    }
    putchar('"');
}

static void ca_print_int_array(const int* arr, int n) {
    putchar('[');
    if (arr) {
        for (int i = 0; i < n; i++) {
            if (i > 0) putchar(',');
            printf("%d", arr[i]);
        }
    }
    putchar(']');
}

static void ca_print_char_array(const char* arr, int n) {
    putchar('[');
    if (arr) {
        for (int i = 0; i < n; i++) {
            if (i > 0) putchar(',');
            char buf[2] = { arr[i], '\0' };
            ca_print_json_string(buf);
        }
    }
    putchar(']');
}

static void ca_print_string_array(char* const* arr, int n) {
    putchar('[');
    if (arr) {
        for (int i = 0; i < n; i++) {
            if (i > 0) putchar(',');
            ca_print_json_string(arr[i]);
        }
    }
    putchar(']');
}

static void ca_print_opt_int_array(const OptionalInt* arr, int n) {
    putchar('[');
    if (arr) {
        for (int i = 0; i < n; i++) {
            if (i > 0) putchar(',');
            if (arr[i].hasValue) printf("%d", arr[i].value);
            else printf("null");
        }
    }
    putchar(']');
}

static void ca_print_int_matrix(int* const* mat, int rows, const int* colSizes) {
    putchar('[');
    if (mat && colSizes) {
        for (int i = 0; i < rows; i++) {
            if (i > 0) putchar(',');
            ca_print_int_array(mat[i], colSizes[i]);
        }
    }
    putchar(']');
}
`;

export const goValueCodec = String.raw`
func caSplitTokens(raw string) []string {
	raw = __caStrings.TrimSpace(raw)
	if raw == "" {
		return nil
	}
	var parts []string
	depth := 0
	quoted := false
	escaped := false
	start := 0
	for i := 0; i < len(raw); i++ {
		c := raw[i]
		if quoted {
			if escaped {
				escaped = false
			} else if c == '\\' {
				escaped = true
			} else if c == '"' {
				quoted = false
			}
		} else if c == '"' {
			quoted = true
		} else if c == '[' || c == '{' {
			depth++
		} else if c == ']' || c == '}' {
			depth--
		} else if c == ',' && depth == 0 {
			parts = append(parts, __caStrings.TrimSpace(raw[start:i]))
			start = i + 1
		}
	}
	if start < len(raw) {
		parts = append(parts, __caStrings.TrimSpace(raw[start:]))
	}
	return parts
}

func caStripKeyPrefix(tok string) string {
	tok = __caStrings.TrimSpace(tok)
	eq := __caStrings.IndexByte(tok, '=')
	if eq <= 0 {
		return tok
	}
	quoteIdx := __caStrings.IndexByte(tok, '"')
	bracketIdx := __caStrings.IndexByte(tok, '[')
	if (quoteIdx == -1 || eq < quoteIdx) && (bracketIdx == -1 || eq < bracketIdx) {
		key := __caStrings.TrimSpace(tok[:eq])
		valid := len(key) > 0
		for i := 0; i < len(key) && valid; i++ {
			ch := key[i]
			if !((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9' && i > 0) || ch == '_') {
				valid = false
			}
		}
		if valid {
			return __caStrings.TrimSpace(tok[eq+1:])
		}
	}
	return tok
}

func caParseValue(rawToken string, targetType __caReflect.Type) (__caReflect.Value, error) {
	tok := caStripKeyPrefix(rawToken)
	if targetType.Kind() == __caReflect.Uint8 {
		var s string
		if err := __caJson.Unmarshal([]byte(tok), &s); err != nil {
			return __caReflect.Value{}, err
		}
		if len(s) == 0 {
			return __caReflect.ValueOf(byte(0)), nil
		}
		return __caReflect.ValueOf(byte(s[0])), nil
	}
	if targetType.Kind() == __caReflect.Slice && targetType.Elem().Kind() == __caReflect.Uint8 {
		if __caStrings.HasPrefix(tok, "[") {
			var strs []string
			if err := __caJson.Unmarshal([]byte(tok), &strs); err != nil {
				return __caReflect.Value{}, err
			}
			out := make([]byte, len(strs))
			for i, s := range strs {
				if len(s) > 0 {
					out[i] = s[0]
				}
			}
			return __caReflect.ValueOf(out), nil
		}
	}
	if targetType.Kind() == __caReflect.Slice &&
		targetType.Elem().Kind() == __caReflect.Slice &&
		targetType.Elem().Elem().Kind() == __caReflect.Uint8 {
		var mat [][]string
		if err := __caJson.Unmarshal([]byte(tok), &mat); err != nil {
			return __caReflect.Value{}, err
		}
		out := make([][]byte, len(mat))
		for r, row := range mat {
			out[r] = make([]byte, len(row))
			for c, s := range row {
				if len(s) > 0 {
					out[r][c] = s[0]
				}
			}
		}
		return __caReflect.ValueOf(out), nil
	}
	ptr := __caReflect.New(targetType)
	if err := __caJson.Unmarshal([]byte(tok), ptr.Interface()); err != nil {
		return __caReflect.Value{}, err
	}
	return ptr.Elem(), nil
}

func caSerializeValue(val __caReflect.Value) string {
	if !val.IsValid() {
		return "null"
	}
	if val.Kind() == __caReflect.Slice {
		if val.IsNil() {
			return "[]"
		}
		if val.Type().Elem().Kind() == __caReflect.Uint8 {
			b := val.Interface().([]byte)
			strs := make([]string, len(b))
			for i, ch := range b {
				strs[i] = string(ch)
			}
			var buf __caBytes.Buffer
			enc := __caJson.NewEncoder(&buf)
			enc.SetEscapeHTML(false)
			_ = enc.Encode(strs)
			return __caStrings.TrimSpace(buf.String())
		}
		if val.Type().Elem().Kind() == __caReflect.Slice && val.Type().Elem().Elem().Kind() == __caReflect.Uint8 {
			m := val.Interface().([][]byte)
			strs := make([][]string, len(m))
			for r, row := range m {
				strs[r] = make([]string, len(row))
				for c, ch := range row {
					strs[r][c] = string(ch)
				}
			}
			var buf __caBytes.Buffer
			enc := __caJson.NewEncoder(&buf)
			enc.SetEscapeHTML(false)
			_ = enc.Encode(strs)
			return __caStrings.TrimSpace(buf.String())
		}
		// Normalize any nested nil slices inside 2D slices so Go marshals [] instead of null
		if val.Type().Elem().Kind() == __caReflect.Slice {
			n := val.Len()
			parts := make([]string, n)
			for i := 0; i < n; i++ {
				parts[i] = caSerializeValue(val.Index(i))
			}
			return "[" + __caStrings.Join(parts, ",") + "]"
		}
	}
	var buf __caBytes.Buffer
	enc := __caJson.NewEncoder(&buf)
	enc.SetEscapeHTML(false)
	if err := enc.Encode(val.Interface()); err != nil {
		return __caFmt.Sprint(val.Interface())
	}
	return __caStrings.TrimSpace(buf.String())
}
`;

export const rustValueCodec = String.raw`
mod __ca_codec {
    pub fn split_tokens(raw: &str) -> Vec<String> {
        let trimmed = raw.trim();
        if trimmed.is_empty() {
            return Vec::new();
        }
        let bytes = trimmed.as_bytes();
        let mut parts = Vec::new();
        let mut depth = 0i32;
        let mut quoted = false;
        let mut escaped = false;
        let mut start = 0usize;

        for (i, &b) in bytes.iter().enumerate() {
            if quoted {
                if escaped {
                    escaped = false;
                } else if b == b'\\' {
                    escaped = true;
                } else if b == b'"' {
                    quoted = false;
                }
            } else if b == b'"' {
                quoted = true;
            } else if b == b'[' || b == b'{' {
                depth += 1;
            } else if b == b']' || b == b'}' {
                depth -= 1;
            } else if b == b',' && depth == 0 {
                parts.push(trimmed[start..i].trim().to_string());
                start = i + 1;
            }
        }
        if start < trimmed.len() {
            parts.push(trimmed[start..].trim().to_string());
        }
        parts
    }

    pub fn strip_key_prefix(raw: &str) -> &str {
        let trimmed = raw.trim();
        if let Some(eq) = trimmed.find('=') {
            let quote_idx = trimmed.find('"');
            let bracket_idx = trimmed.find('[');
            let before_quote = quote_idx.map_or(true, |q| eq < q);
            let before_bracket = bracket_idx.map_or(true, |b| eq < b);
            if before_quote && before_bracket {
                let key = trimmed[..eq].trim();
                if !key.is_empty() && key.bytes().all(|c| c.is_ascii_alphanumeric() || c == b'_') {
                    return trimmed[eq + 1..].trim();
                }
            }
        }
        trimmed
    }

    pub fn parse_json_string(raw: &str) -> Result<String, String> {
        let s = strip_key_prefix(raw);
        if s.len() >= 2 && s.starts_with('"') && s.ends_with('"') {
            let inner = &s[1..s.len() - 1];
            let mut out = String::with_capacity(inner.len());
            let mut chars = inner.chars();
            while let Some(c) = chars.next() {
                if c == '\\' {
                    match chars.next() {
                        Some('n') => out.push('\n'),
                        Some('r') => out.push('\r'),
                        Some('t') => out.push('\t'),
                        Some('b') => out.push('\u{0008}'),
                        Some('f') => out.push('\u{000c}'),
                        Some('\\') => out.push('\\'),
                        Some('"') => out.push('"'),
                        Some('/') => out.push('/'),
                        Some('u') => {
                            let hex: String = chars.by_ref().take(4).collect();
                            if hex.len() == 4 {
                                if let Ok(cp) = u32::from_str_radix(&hex, 16) {
                                    if let Some(ch) = char::from_u32(cp) {
                                        out.push(ch);
                                    }
                                }
                            }
                        }
                        Some(other) => out.push(other),
                        None => {}
                    }
                } else {
                    out.push(c);
                }
            }
            Ok(out)
        } else {
            Ok(s.to_string())
        }
    }

    pub fn format_json_string(s: &str) -> String {
        let mut out = String::with_capacity(s.len() + 2);
        out.push('"');
        for ch in s.chars() {
            match ch {
                '"' => out.push_str("\\\""),
                '\\' => out.push_str("\\\\"),
                '\n' => out.push_str("\\n"),
                '\r' => out.push_str("\\r"),
                '\t' => out.push_str("\\t"),
                '\u{0008}' => out.push_str("\\b"),
                '\u{000c}' => out.push_str("\\f"),
                c if (c as u32) < 0x20 => {
                    out.push_str(&format!("\\u{:04x}", c as u32));
                }
                c => out.push(c),
            }
        }
        out.push('"');
        out
    }

    pub trait CaArg: Sized {
        fn parse_ca(raw: &str) -> Result<Self, String>;
    }

    impl CaArg for i32 {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            strip_key_prefix(raw).parse::<i32>().map_err(|e| format!("Invalid i32 '{}': {}", raw, e))
        }
    }
    impl CaArg for i64 {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            strip_key_prefix(raw).parse::<i64>().map_err(|e| format!("Invalid i64 '{}': {}", raw, e))
        }
    }
    impl CaArg for isize {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            strip_key_prefix(raw).parse::<isize>().map_err(|e| format!("Invalid isize '{}': {}", raw, e))
        }
    }
    impl CaArg for usize {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            strip_key_prefix(raw).parse::<usize>().map_err(|e| format!("Invalid usize '{}': {}", raw, e))
        }
    }
    impl CaArg for f64 {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            strip_key_prefix(raw).parse::<f64>().map_err(|e| format!("Invalid f64 '{}': {}", raw, e))
        }
    }
    impl CaArg for bool {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            match strip_key_prefix(raw) {
                "true" => Ok(true),
                "false" => Ok(false),
                other => Err(format!("Invalid bool '{}'", other)),
            }
        }
    }
    impl CaArg for String {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            parse_json_string(raw)
        }
    }
    impl CaArg for char {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            let s = parse_json_string(raw)?;
            s.chars().next().ok_or_else(|| format!("Expected char, got '{}'", raw))
        }
    }
    impl<T: CaArg> CaArg for Option<T> {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            if strip_key_prefix(raw) == "null" {
                Ok(None)
            } else {
                Ok(Some(T::parse_ca(raw)?))
            }
        }
    }
    impl<T: CaArg> CaArg for Vec<T> {
        fn parse_ca(raw: &str) -> Result<Self, String> {
            let s = strip_key_prefix(raw);
            if !s.starts_with('[') || !s.ends_with(']') {
                return Err(format!("Expected array, got '{}'", s));
            }
            let inner = s[1..s.len() - 1].trim();
            if inner.is_empty() {
                return Ok(Vec::new());
            }
            split_tokens(inner).into_iter().map(|item| T::parse_ca(&item)).collect()
        }
    }

    pub fn parse<T: CaArg>(raw: &str) -> Result<T, String> {
        T::parse_ca(raw)
    }

    pub trait CaRet {
        fn write_ca(&self) -> String;
    }

    impl CaRet for i32 { fn write_ca(&self) -> String { self.to_string() } }
    impl CaRet for i64 { fn write_ca(&self) -> String { self.to_string() } }
    impl CaRet for isize { fn write_ca(&self) -> String { self.to_string() } }
    impl CaRet for usize { fn write_ca(&self) -> String { self.to_string() } }
    impl CaRet for f64 { fn write_ca(&self) -> String { if *self == 0.0 { "0".to_string() } else { self.to_string() } } }
    impl CaRet for bool { fn write_ca(&self) -> String { if *self { "true".to_string() } else { "false".to_string() } } }
    impl CaRet for String { fn write_ca(&self) -> String { format_json_string(self) } }
    impl CaRet for char {
        fn write_ca(&self) -> String {
            let mut s = String::new();
            s.push(*self);
            format_json_string(&s)
        }
    }
    impl<T: CaRet> CaRet for Option<T> {
        fn write_ca(&self) -> String {
            match self {
                Some(v) => v.write_ca(),
                None => "null".to_string(),
            }
        }
    }
    impl<T: CaRet> CaRet for Vec<T> {
        fn write_ca(&self) -> String {
            let parts: Vec<String> = self.iter().map(|item| item.write_ca()).collect();
            format!("[{}]", parts.join(","))
        }
    }

    pub fn write<T: CaRet>(val: &T) -> String {
        val.write_ca()
    }
}
`;
