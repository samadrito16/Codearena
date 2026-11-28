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
        if (target == boolean.class || target == Boolean.class) return Boolean.parseBoolean(raw);
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
