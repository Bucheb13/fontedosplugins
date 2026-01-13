
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.9.7";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_3b93bb62.js
var require_node_modules_next_dist_esm_build_templates_edge_wrapper_3b93bb62 = __commonJS({
  ".next/server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_3b93bb62.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_3b93bb62.js", 38022, (e, t, l) => {
      self._ENTRIES ||= {};
      let n = Promise.resolve().then(() => e.i(42738));
      n.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(n, { get(e2, t2) {
        if ("then" === t2) return (t3, l3) => e2.then(t3, l3);
        let l2 = (...l3) => e2.then((e3) => (0, e3[t2])(...l3));
        return l2.then = (l3, n2) => e2.then((e3) => e3[t2]).then(l3, n2), l2;
      } });
    }]);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__ece68763._.js
var require_root_of_the_server_ece68763 = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__ece68763._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__ece68763._.js", 28042, (e, t, r) => {
      "use strict";
      var s = Object.defineProperty, n = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.prototype.hasOwnProperty, o = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => h, parseSetCookie: () => d, stringifyCookie: () => c };
      for (var u in l) s(o, u, { get: l[u], enumerable: true });
      function c(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), s2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? s2 : `${s2}; ${r2.join("; ")}`;
      }
      function h(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [s2, n2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(s2, decodeURIComponent(null != n2 ? n2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function d(e2) {
        if (!e2) return;
        let [[t2, r2], ...s2] = h(e2), { domain: n2, expires: i2, httponly: a2, maxage: o2, path: l2, samesite: u2, secure: c2, partitioned: d2, priority: g2 } = Object.fromEntries(s2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, b, y = { name: t2, value: decodeURIComponent(r2), domain: n2, ...i2 && { expires: new Date(i2) }, ...a2 && { httpOnly: true }, ..."string" == typeof o2 && { maxAge: Number(o2) }, path: l2, ...u2 && { sameSite: p.includes(m2 = (m2 = u2).toLowerCase()) ? m2 : void 0 }, ...c2 && { secure: true }, ...g2 && { priority: f.includes(b = (b = g2).toLowerCase()) ? b : void 0 }, ...d2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in y) y[t3] && (e3[t3] = y[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2, o2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let l2 of i(t2)) a.call(e2, l2) || l2 === r2 || s(e2, l2, { get: () => t2[l2], enumerable: !(o2 = n(t2, l2)) || o2.enumerable });
        return e2;
      })(s({}, "__esModule", { value: true }), o);
      var p = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const t2 = e2.get("cookie");
          if (t2) for (const [e3, r2] of h(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === s2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, s2 = this._parsed;
          return s2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(s2).map(([e3, t3]) => c(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => c(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, s2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          const n2 = null != (s2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? s2 : [];
          for (const e3 of Array.isArray(n2) ? n2 : function(e4) {
            if (!e4) return [];
            var t3, r3, s3, n3, i2, a2 = [], o2 = 0;
            function l2() {
              for (; o2 < e4.length && /\s/.test(e4.charAt(o2)); ) o2 += 1;
              return o2 < e4.length;
            }
            for (; o2 < e4.length; ) {
              for (t3 = o2, i2 = false; l2(); ) if ("," === (r3 = e4.charAt(o2))) {
                for (s3 = o2, o2 += 1, l2(), n3 = o2; o2 < e4.length && "=" !== (r3 = e4.charAt(o2)) && ";" !== r3 && "," !== r3; ) o2 += 1;
                o2 < e4.length && "=" === e4.charAt(o2) ? (i2 = true, o2 = n3, a2.push(e4.substring(t3, s3)), t3 = o2) : o2 = s3 + 1;
              } else o2 += 1;
              (!i2 || o2 >= e4.length) && a2.push(e4.substring(t3, e4.length));
            }
            return a2;
          }(n2)) {
            const t3 = d(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let s2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === s2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, s2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, n2 = this._parsed;
          return n2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...s2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = c(r3);
              t3.append("set-cookie", e4);
            }
          }(n2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(c).join("; ");
        }
      };
    }, 59110, (e, t, r) => {
      (() => {
        "use strict";
        let r2, s, n, i, a;
        var o, l, u, c, h, d, p, f, g, m, b, y, v, w, _, E, S = { 491: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let s2 = r3(223), n2 = r3(172), i2 = r3(930), a2 = "context", o2 = new s2.NoopContextManager();
          class l2 {
            static getInstance() {
              return this._instance || (this._instance = new l2()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, n2.registerGlobal)(a2, e3, i2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t3, r4, ...s3) {
              return this._getContextManager().with(e3, t3, r4, ...s3);
            }
            bind(e3, t3) {
              return this._getContextManager().bind(e3, t3);
            }
            _getContextManager() {
              return (0, n2.getGlobal)(a2) || o2;
            }
            disable() {
              this._getContextManager().disable(), (0, n2.unregisterGlobal)(a2, i2.DiagAPI.instance());
            }
          }
          t2.ContextAPI = l2;
        }, 930: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let s2 = r3(56), n2 = r3(912), i2 = r3(957), a2 = r3(172);
          class o2 {
            constructor() {
              function e3(e4) {
                return function(...t4) {
                  let r4 = (0, a2.getGlobal)("diag");
                  if (r4) return r4[e4](...t4);
                };
              }
              const t3 = this;
              t3.setLogger = (e4, r4 = { logLevel: i2.DiagLogLevel.INFO }) => {
                var s3, o3, l2;
                if (e4 === t3) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (s3 = e5.stack) ? s3 : e5.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let u2 = (0, a2.getGlobal)("diag"), c2 = (0, n2.createLogLevelDiagLogger)(null != (o3 = r4.logLevel) ? o3 : i2.DiagLogLevel.INFO, e4);
                if (u2 && !r4.suppressOverrideMessage) {
                  let e5 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  u2.warn(`Current logger will be overwritten from ${e5}`), c2.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, a2.registerGlobal)("diag", c2, t3, true);
              }, t3.disable = () => {
                (0, a2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e4) => new s2.DiagComponentLogger(e4), t3.verbose = e3("verbose"), t3.debug = e3("debug"), t3.info = e3("info"), t3.warn = e3("warn"), t3.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
          }
          t2.DiagAPI = o2;
        }, 653: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let s2 = r3(660), n2 = r3(172), i2 = r3(930), a2 = "metrics";
          class o2 {
            static getInstance() {
              return this._instance || (this._instance = new o2()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, n2.registerGlobal)(a2, e3, i2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, n2.getGlobal)(a2) || s2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t3, r4) {
              return this.getMeterProvider().getMeter(e3, t3, r4);
            }
            disable() {
              (0, n2.unregisterGlobal)(a2, i2.DiagAPI.instance());
            }
          }
          t2.MetricsAPI = o2;
        }, 181: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let s2 = r3(172), n2 = r3(874), i2 = r3(194), a2 = r3(277), o2 = r3(369), l2 = r3(930), u2 = "propagation", c2 = new n2.NoopTextMapPropagator();
          class h2 {
            constructor() {
              this.createBaggage = o2.createBaggage, this.getBaggage = a2.getBaggage, this.getActiveBaggage = a2.getActiveBaggage, this.setBaggage = a2.setBaggage, this.deleteBaggage = a2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new h2()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, s2.registerGlobal)(u2, e3, l2.DiagAPI.instance());
            }
            inject(e3, t3, r4 = i2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t3, r4);
            }
            extract(e3, t3, r4 = i2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, s2.unregisterGlobal)(u2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, s2.getGlobal)(u2) || c2;
            }
          }
          t2.PropagationAPI = h2;
        }, 997: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let s2 = r3(172), n2 = r3(846), i2 = r3(139), a2 = r3(607), o2 = r3(930), l2 = "trace";
          class u2 {
            constructor() {
              this._proxyTracerProvider = new n2.ProxyTracerProvider(), this.wrapSpanContext = i2.wrapSpanContext, this.isSpanContextValid = i2.isSpanContextValid, this.deleteSpan = a2.deleteSpan, this.getSpan = a2.getSpan, this.getActiveSpan = a2.getActiveSpan, this.getSpanContext = a2.getSpanContext, this.setSpan = a2.setSpan, this.setSpanContext = a2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u2()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t3 = (0, s2.registerGlobal)(l2, this._proxyTracerProvider, o2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e3), t3;
            }
            getTracerProvider() {
              return (0, s2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e3, t3) {
              return this.getTracerProvider().getTracer(e3, t3);
            }
            disable() {
              (0, s2.unregisterGlobal)(l2, o2.DiagAPI.instance()), this._proxyTracerProvider = new n2.ProxyTracerProvider();
            }
          }
          t2.TraceAPI = u2;
        }, 277: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let s2 = r3(491), n2 = (0, r3(780).createContextKey)("OpenTelemetry Baggage Key");
          function i2(e3) {
            return e3.getValue(n2) || void 0;
          }
          t2.getBaggage = i2, t2.getActiveBaggage = function() {
            return i2(s2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(n2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(n2);
          };
        }, 993: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0;
          class r3 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t3 = this._entries.get(e3);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t3]) => [e3, t3]);
            }
            setEntry(e3, t3) {
              let s2 = new r3(this._entries);
              return s2._entries.set(e3, t3), s2;
            }
            removeEntry(e3) {
              let t3 = new r3(this._entries);
              return t3._entries.delete(e3), t3;
            }
            removeEntries(...e3) {
              let t3 = new r3(this._entries);
              for (let r4 of e3) t3._entries.delete(r4);
              return t3;
            }
            clear() {
              return new r3();
            }
          }
          t2.BaggageImpl = r3;
        }, 830: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let s2 = r3(930), n2 = r3(993), i2 = r3(830), a2 = s2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new n2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (a2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: i2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(491).ContextAPI.getInstance();
        }, 223: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let s2 = r3(780);
          t2.NoopContextManager = class {
            active() {
              return s2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...s3) {
              return t3.call(r4, ...s3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 780: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r3 {
            constructor(e3) {
              const t3 = this;
              t3._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t3.getValue = (e4) => t3._currentContext.get(e4), t3.setValue = (e4, s2) => {
                let n2 = new r3(t3._currentContext);
                return n2._currentContext.set(e4, s2), n2;
              }, t3.deleteValue = (e4) => {
                let s2 = new r3(t3._currentContext);
                return s2._currentContext.delete(e4), s2;
              };
            }
          }
          t2.ROOT_CONTEXT = new r3();
        }, 506: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(930).DiagAPI.instance();
        }, 56: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let s2 = r3(172);
          function n2(e3, t3, r4) {
            let n3 = (0, s2.getGlobal)("diag");
            if (n3) return r4.unshift(t3), n3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return n2("debug", this._namespace, e3);
            }
            error(...e3) {
              return n2("error", this._namespace, e3);
            }
            info(...e3) {
              return n2("info", this._namespace, e3);
            }
            warn(...e3) {
              return n2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return n2("verbose", this._namespace, e3);
            }
          };
        }, 972: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              }(r3[e3].c);
            }
          };
        }, 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let s2 = r3(957);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, s3) {
              let n2 = t3[r5];
              return "function" == typeof n2 && e3 >= s3 ? n2.bind(t3) : function() {
              };
            }
            return e3 < s2.DiagLogLevel.NONE ? e3 = s2.DiagLogLevel.NONE : e3 > s2.DiagLogLevel.ALL && (e3 = s2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", s2.DiagLogLevel.ERROR), warn: r4("warn", s2.DiagLogLevel.WARN), info: r4("info", s2.DiagLogLevel.INFO), debug: r4("debug", s2.DiagLogLevel.DEBUG), verbose: r4("verbose", s2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 172: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let s2 = r3(200), n2 = r3(521), i2 = r3(130), a2 = n2.VERSION.split(".")[0], o2 = Symbol.for(`opentelemetry.js.api.${a2}`), l2 = s2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, s3 = false) {
            var i3;
            let a3 = l2[o2] = null != (i3 = l2[o2]) ? i3 : { version: n2.VERSION };
            if (!s3 && a3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (a3.version !== n2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${a3.version} for ${e3} does not match previously registered API v${n2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return a3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${n2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let s3 = null == (t3 = l2[o2]) ? void 0 : t3.version;
            if (s3 && (0, i2.isCompatible)(s3)) return null == (r4 = l2[o2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${n2.VERSION}.`);
            let r4 = l2[o2];
            r4 && delete r4[e3];
          };
        }, 130: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let s2 = r3(521), n2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function i2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), s3 = e3.match(n2);
            if (!s3) return () => false;
            let i3 = { major: +s3[1], minor: +s3[2], patch: +s3[3], prerelease: s3[4] };
            if (null != i3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function a2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let s4 = e4.match(n2);
              if (!s4) return a2(e4);
              let o2 = { major: +s4[1], minor: +s4[2], patch: +s4[3], prerelease: s4[4] };
              if (null != o2.prerelease || i3.major !== o2.major) return a2(e4);
              if (0 === i3.major) return i3.minor === o2.minor && i3.patch <= o2.patch ? (t3.add(e4), true) : a2(e4);
              return i3.minor <= o2.minor ? (t3.add(e4), true) : a2(e4);
            };
          }
          t2._makeCompatibilityCheck = i2, t2.isCompatible = i2(s2.VERSION);
        }, 886: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(653).MetricsAPI.getInstance();
        }, 901: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 102: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class s2 {
          }
          t2.NoopMetric = s2;
          class n2 extends s2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = n2;
          class i2 extends s2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = i2;
          class a2 extends s2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = a2;
          class o2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = o2;
          class l2 extends o2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class u2 extends o2 {
          }
          t2.NoopObservableGaugeMetric = u2;
          class c2 extends o2 {
          }
          t2.NoopObservableUpDownCounterMetric = c2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new n2(), t2.NOOP_HISTOGRAM_METRIC = new a2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new i2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new u2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 660: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let s2 = r3(102);
          class n2 {
            getMeter(e3, t3, r4) {
              return s2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = n2, t2.NOOP_METER_PROVIDER = new n2();
        }, 200: function(e2, t2, r3) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), e3[s3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || s2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(46), t2);
        }, 651: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 46: function(e2, t2, r3) {
          var s2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), Object.defineProperty(e3, s3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, s3) {
            void 0 === s3 && (s3 = r4), e3[s3] = t3[r4];
          }), n2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || s2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), n2(r3(651), t2);
        }, 939: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(181).PropagationAPI.getInstance();
        }, 874: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 194: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 845: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(997).TraceAPI.getInstance();
        }, 403: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let s2 = r3(476);
          t2.NonRecordingSpan = class {
            constructor(e3 = s2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 614: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let s2 = r3(491), n2 = r3(607), i2 = r3(403), a2 = r3(139), o2 = s2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = o2.active()) {
              var s3;
              if (null == t3 ? void 0 : t3.root) return new i2.NonRecordingSpan();
              let l2 = r4 && (0, n2.getSpanContext)(r4);
              return "object" == typeof (s3 = l2) && "string" == typeof s3.spanId && "string" == typeof s3.traceId && "number" == typeof s3.traceFlags && (0, a2.isSpanContextValid)(l2) ? new i2.NonRecordingSpan(l2) : new i2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, s3) {
              let i3, a3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (i3 = t3, l2 = r4) : (i3 = t3, a3 = r4, l2 = s3);
              let u2 = null != a3 ? a3 : o2.active(), c2 = this.startSpan(e3, i3, u2), h2 = (0, n2.setSpan)(u2, c2);
              return o2.with(h2, l2, void 0, c2);
            }
          };
        }, 124: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let s2 = r3(614);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new s2.NoopTracer();
            }
          };
        }, 125: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let s2 = new (r3(614)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, s3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = s3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, s3) {
              let n2 = this._getTracer();
              return Reflect.apply(n2.startActiveSpan, n2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : s2;
            }
          };
        }, 846: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let s2 = r3(125), n2 = new (r3(124)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var n3;
              return null != (n3 = this.getDelegateTracer(e3, t3, r4)) ? n3 : new s2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : n2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var s3;
              return null == (s3 = this._delegate) ? void 0 : s3.getTracer(e3, t3, r4);
            }
          };
        }, 996: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 607: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let s2 = r3(780), n2 = r3(403), i2 = r3(491), a2 = (0, s2.createContextKey)("OpenTelemetry Context Key SPAN");
          function o2(e3) {
            return e3.getValue(a2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(a2, t3);
          }
          t2.getSpan = o2, t2.getActiveSpan = function() {
            return o2(i2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(a2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new n2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = o2(e3)) ? void 0 : t3.spanContext();
          };
        }, 325: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let s2 = r3(564);
          class n2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e3) && r4._internalState.delete(e3), r4._internalState.set(e3, t3), r4;
            }
            unset(e3) {
              let t3 = this._clone();
              return t3._internalState.delete(e3), t3;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t3) => (e3.push(t3 + "=" + this.get(t3)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t3) => {
                let r4 = t3.trim(), n3 = r4.indexOf("=");
                if (-1 !== n3) {
                  let i2 = r4.slice(0, n3), a2 = r4.slice(n3 + 1, t3.length);
                  (0, s2.validateKey)(i2) && (0, s2.validateValue)(a2) && e4.set(i2, a2);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new n2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t2.TraceStateImpl = n2;
        }, 564: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", s2 = `[a-z]${r3}{0,255}`, n2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, i2 = RegExp(`^(?:${s2}|${n2})$`), a2 = /^[ -~]{0,255}[!-~]$/, o2 = /,|=/;
          t2.validateKey = function(e3) {
            return i2.test(e3);
          }, t2.validateValue = function(e3) {
            return a2.test(e3) && !o2.test(e3);
          };
        }, 98: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let s2 = r3(325);
          t2.createTraceState = function(e3) {
            return new s2.TraceStateImpl(e3);
          };
        }, 476: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let s2 = r3(475);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: s2.TraceFlags.NONE };
        }, 357: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 139: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let s2 = r3(476), n2 = r3(403), i2 = /^([0-9a-f]{32})$/i, a2 = /^[0-9a-f]{16}$/i;
          function o2(e3) {
            return i2.test(e3) && e3 !== s2.INVALID_TRACEID;
          }
          function l2(e3) {
            return a2.test(e3) && e3 !== s2.INVALID_SPANID;
          }
          t2.isValidTraceId = o2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return o2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new n2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 475: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 521: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, O = {};
        function T(e2) {
          var t2 = O[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = O[e2] = { exports: {} }, s2 = true;
          try {
            S[e2].call(r3.exports, r3, r3.exports, T), s2 = false;
          } finally {
            s2 && delete O[e2];
          }
          return r3.exports;
        }
        T.ab = "/ROOT/node_modules/next/dist/compiled/@opentelemetry/api/";
        var k = {};
        Object.defineProperty(k, "__esModule", { value: true }), k.trace = k.propagation = k.metrics = k.diag = k.context = k.INVALID_SPAN_CONTEXT = k.INVALID_TRACEID = k.INVALID_SPANID = k.isValidSpanId = k.isValidTraceId = k.isSpanContextValid = k.createTraceState = k.TraceFlags = k.SpanStatusCode = k.SpanKind = k.SamplingDecision = k.ProxyTracerProvider = k.ProxyTracer = k.defaultTextMapSetter = k.defaultTextMapGetter = k.ValueType = k.createNoopMeter = k.DiagLogLevel = k.DiagConsoleLogger = k.ROOT_CONTEXT = k.createContextKey = k.baggageEntryMetadataFromString = void 0, o = T(369), Object.defineProperty(k, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return o.baggageEntryMetadataFromString;
        } }), l = T(780), Object.defineProperty(k, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(k, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), u = T(972), Object.defineProperty(k, "DiagConsoleLogger", { enumerable: true, get: function() {
          return u.DiagConsoleLogger;
        } }), c = T(957), Object.defineProperty(k, "DiagLogLevel", { enumerable: true, get: function() {
          return c.DiagLogLevel;
        } }), h = T(102), Object.defineProperty(k, "createNoopMeter", { enumerable: true, get: function() {
          return h.createNoopMeter;
        } }), d = T(901), Object.defineProperty(k, "ValueType", { enumerable: true, get: function() {
          return d.ValueType;
        } }), p = T(194), Object.defineProperty(k, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(k, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = T(125), Object.defineProperty(k, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = T(846), Object.defineProperty(k, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = T(996), Object.defineProperty(k, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), b = T(357), Object.defineProperty(k, "SpanKind", { enumerable: true, get: function() {
          return b.SpanKind;
        } }), y = T(847), Object.defineProperty(k, "SpanStatusCode", { enumerable: true, get: function() {
          return y.SpanStatusCode;
        } }), v = T(475), Object.defineProperty(k, "TraceFlags", { enumerable: true, get: function() {
          return v.TraceFlags;
        } }), w = T(98), Object.defineProperty(k, "createTraceState", { enumerable: true, get: function() {
          return w.createTraceState;
        } }), _ = T(139), Object.defineProperty(k, "isSpanContextValid", { enumerable: true, get: function() {
          return _.isSpanContextValid;
        } }), Object.defineProperty(k, "isValidTraceId", { enumerable: true, get: function() {
          return _.isValidTraceId;
        } }), Object.defineProperty(k, "isValidSpanId", { enumerable: true, get: function() {
          return _.isValidSpanId;
        } }), E = T(476), Object.defineProperty(k, "INVALID_SPANID", { enumerable: true, get: function() {
          return E.INVALID_SPANID;
        } }), Object.defineProperty(k, "INVALID_TRACEID", { enumerable: true, get: function() {
          return E.INVALID_TRACEID;
        } }), Object.defineProperty(k, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return E.INVALID_SPAN_CONTEXT;
        } }), r2 = T(67), Object.defineProperty(k, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), s = T(506), Object.defineProperty(k, "diag", { enumerable: true, get: function() {
          return s.diag;
        } }), n = T(886), Object.defineProperty(k, "metrics", { enumerable: true, get: function() {
          return n.metrics;
        } }), i = T(939), Object.defineProperty(k, "propagation", { enumerable: true, get: function() {
          return i.propagation;
        } }), a = T(845), Object.defineProperty(k, "trace", { enumerable: true, get: function() {
          return a.trace;
        } }), k.default = { context: r2.context, diag: s.diag, metrics: n.metrics, propagation: i.propagation, trace: a.trace }, t.exports = k;
      })();
    }, 71498, (e, t, r) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/next/dist/compiled/cookie/");
        var e2, r2, s, n, i = {};
        i.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var n2 = {}, i2 = t2.split(s), a = (r3 || {}).decode || e2, o = 0; o < i2.length; o++) {
            var l = i2[o], u = l.indexOf("=");
            if (!(u < 0)) {
              var c = l.substr(0, u).trim(), h = l.substr(++u, l.length).trim();
              '"' == h[0] && (h = h.slice(1, -1)), void 0 == n2[c] && (n2[c] = function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              }(h, a));
            }
          }
          return n2;
        }, i.serialize = function(e3, t2, s2) {
          var i2 = s2 || {}, a = i2.encode || r2;
          if ("function" != typeof a) throw TypeError("option encode is invalid");
          if (!n.test(e3)) throw TypeError("argument name is invalid");
          var o = a(t2);
          if (o && !n.test(o)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + o;
          if (null != i2.maxAge) {
            var u = i2.maxAge - 0;
            if (isNaN(u) || !isFinite(u)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(u);
          }
          if (i2.domain) {
            if (!n.test(i2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + i2.domain;
          }
          if (i2.path) {
            if (!n.test(i2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + i2.path;
          }
          if (i2.expires) {
            if ("function" != typeof i2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + i2.expires.toUTCString();
          }
          if (i2.httpOnly && (l += "; HttpOnly"), i2.secure && (l += "; Secure"), i2.sameSite) switch ("string" == typeof i2.sameSite ? i2.sameSite.toLowerCase() : i2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, s = /; */, n = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = i;
      })();
    }, 99734, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, s, n, i;
        var a = { 993: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function s2() {
          }
          function n2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function i2(e4, t3, s3, i3, a3) {
            if ("function" != typeof s3) throw TypeError("The listener must be a function");
            var o3 = new n2(s3, i3 || e4, a3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], o3] : e4._events[l2].push(o3) : (e4._events[l2] = o3, e4._eventsCount++), e4;
          }
          function a2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new s2() : delete e4._events[t3];
          }
          function o2() {
            this._events = new s2(), this._eventsCount = 0;
          }
          Object.create && (s2.prototype = /* @__PURE__ */ Object.create(null), new s2().__proto__ || (r3 = false)), o2.prototype.eventNames = function() {
            var e4, s3, n3 = [];
            if (0 === this._eventsCount) return n3;
            for (s3 in e4 = this._events) t2.call(e4, s3) && n3.push(r3 ? s3.slice(1) : s3);
            return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(e4)) : n3;
          }, o2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, s3 = this._events[t3];
            if (!s3) return [];
            if (s3.fn) return [s3.fn];
            for (var n3 = 0, i3 = s3.length, a3 = Array(i3); n3 < i3; n3++) a3[n3] = s3[n3].fn;
            return a3;
          }, o2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, s3 = this._events[t3];
            return s3 ? s3.fn ? 1 : s3.length : 0;
          }, o2.prototype.emit = function(e4, t3, s3, n3, i3, a3) {
            var o3 = r3 ? r3 + e4 : e4;
            if (!this._events[o3]) return false;
            var l2, u2, c = this._events[o3], h = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e4, c.fn, void 0, true), h) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, s3), true;
                case 4:
                  return c.fn.call(c.context, t3, s3, n3), true;
                case 5:
                  return c.fn.call(c.context, t3, s3, n3, i3), true;
                case 6:
                  return c.fn.call(c.context, t3, s3, n3, i3, a3), true;
              }
              for (u2 = 1, l2 = Array(h - 1); u2 < h; u2++) l2[u2 - 1] = arguments[u2];
              c.fn.apply(c.context, l2);
            } else {
              var d, p = c.length;
              for (u2 = 0; u2 < p; u2++) switch (c[u2].once && this.removeListener(e4, c[u2].fn, void 0, true), h) {
                case 1:
                  c[u2].fn.call(c[u2].context);
                  break;
                case 2:
                  c[u2].fn.call(c[u2].context, t3);
                  break;
                case 3:
                  c[u2].fn.call(c[u2].context, t3, s3);
                  break;
                case 4:
                  c[u2].fn.call(c[u2].context, t3, s3, n3);
                  break;
                default:
                  if (!l2) for (d = 1, l2 = Array(h - 1); d < h; d++) l2[d - 1] = arguments[d];
                  c[u2].fn.apply(c[u2].context, l2);
              }
            }
            return true;
          }, o2.prototype.on = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, false);
          }, o2.prototype.once = function(e4, t3, r4) {
            return i2(this, e4, t3, r4, true);
          }, o2.prototype.removeListener = function(e4, t3, s3, n3) {
            var i3 = r3 ? r3 + e4 : e4;
            if (!this._events[i3]) return this;
            if (!t3) return a2(this, i3), this;
            var o3 = this._events[i3];
            if (o3.fn) o3.fn !== t3 || n3 && !o3.once || s3 && o3.context !== s3 || a2(this, i3);
            else {
              for (var l2 = 0, u2 = [], c = o3.length; l2 < c; l2++) (o3[l2].fn !== t3 || n3 && !o3[l2].once || s3 && o3[l2].context !== s3) && u2.push(o3[l2]);
              u2.length ? this._events[i3] = 1 === u2.length ? u2[0] : u2 : a2(this, i3);
            }
            return this;
          }, o2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && a2(this, t3)) : (this._events = new s2(), this._eventsCount = 0), this;
          }, o2.prototype.off = o2.prototype.removeListener, o2.prototype.addListener = o2.prototype.on, o2.prefixed = r3, o2.EventEmitter = o2, e3.exports = o2;
        }, 213: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 574: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let s2 = 0, n2 = e4.length;
            for (; n2 > 0; ) {
              let i2 = n2 / 2 | 0, a2 = s2 + i2;
              0 >= r3(e4[a2], t3) ? (s2 = ++a2, n2 -= i2 + 1) : n2 = i2;
            }
            return s2;
          };
        }, 821: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let s2 = r3(574);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let n2 = s2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(n2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 816: (e3, t2, r3) => {
          let s2 = r3(213);
          class n2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let i2 = (e4, t3, r4) => new Promise((i3, a2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) return void i3(e4);
            let o2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  i3(r4());
                } catch (e5) {
                  a2(e5);
                }
                return;
              }
              let s3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, o3 = r4 instanceof Error ? r4 : new n2(s3);
              "function" == typeof e4.cancel && e4.cancel(), a2(o3);
            }, t3);
            s2(e4.then(i3, a2), () => {
              clearTimeout(o2);
            });
          });
          e3.exports = i2, e3.exports.default = i2, e3.exports.TimeoutError = n2;
        } }, o = {};
        function l(e3) {
          var t2 = o[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = o[e3] = { exports: {} }, s2 = true;
          try {
            a[e3](r3, r3.exports, l), s2 = false;
          } finally {
            s2 && delete o[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/next/dist/compiled/p-queue/";
        var u = {};
        Object.defineProperty(u, "__esModule", { value: true }), e2 = l(993), r2 = l(816), s = l(821), n = () => {
        }, i = new r2.TimeoutError(), u.default = class extends e2 {
          constructor(e3) {
            var t2, r3, i2, a2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = n, this._resolveIdle = n, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: s.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (a2 = null == (i2 = e3.interval) ? void 0 : i2.toString()) ? a2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = n, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = n, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((s2, n2) => {
              let a2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let a3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && n2(i);
                  });
                  s2(await a3);
                } catch (e4) {
                  n2(e4);
                }
                this._next();
              };
              this._queue.enqueue(a2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = u;
      })();
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 25085, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var s = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return o;
      } };
      for (var n in s) Object.defineProperty(r, n, { enumerable: true, get: s[n] });
      let i = new (e.r(78500)).AsyncLocalStorage();
      function a(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let s2 = t2.url(e2);
        return { url: s2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function o(e2, t2, r2) {
        let s2 = a(e2, t2);
        return s2 ? i.run(s2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = i.getStore();
        return r2 || (e2 && t2 ? a(e2, t2) : void 0);
      }
    }, 28325, (e, t, r) => {
      "use strict";
      var s = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { handleFetch: function() {
        return u;
      }, interceptFetch: function() {
        return c;
      }, reader: function() {
        return o;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = e.r(25085), o = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: n2, headers: i2, body: a2, cache: o2, credentials: l2, integrity: u2, mode: c2, redirect: h, referrer: d, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: n2, headers: [...Array.from(i2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: a2 ? s.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: o2, credentials: l2, integrity: u2, mode: c2, redirect: h, referrer: d, referrerPolicy: p } };
      }
      async function u(e2, t2) {
        let r2 = (0, a.getTestReqInfo)(t2, o);
        if (!r2) return e2(t2);
        let { testData: n2, proxyPort: i2 } = r2, u2 = await l(n2, t2), c2 = await e2(`http://localhost:${i2}`, { method: "POST", body: JSON.stringify(u2), next: { internal: true } });
        if (!c2.ok) throw Object.defineProperty(Error(`Proxy request failed: ${c2.status}`), "__NEXT_ERROR_CODE", { value: "E146", enumerable: false, configurable: true });
        let h = await c2.json(), { api: d } = h;
        switch (d) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Object.defineProperty(Error(`Proxy request aborted [${t2.method} ${t2.url}]`), "__NEXT_ERROR_CODE", { value: "E145", enumerable: false, configurable: true });
          case "fetch":
            return function(e3) {
              let { status: t3, headers: r3, body: n3 } = e3.response;
              return new Response(n3 ? s.Buffer.from(n3, "base64") : null, { status: t3, headers: new Headers(r3) });
            }(h);
          default:
            return d;
        }
      }
      function c(t2) {
        return e.g.fetch = function(e2, r2) {
          var s2;
          return (null == r2 || null == (s2 = r2.next) ? void 0 : s2.internal) ? t2(e2, r2) : u(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 94165, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var s = { interceptTestApis: function() {
        return o;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var n in s) Object.defineProperty(r, n, { enumerable: true, get: s[n] });
      let i = e.r(25085), a = e.r(28325);
      function o() {
        return (0, a.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, i.withRequest)(t2, a.reader, () => e2(t2, r2));
      }
    }, 64445, (e, t, r) => {
      var s = { 226: function(t2, r2) {
        !function(s2, n2) {
          "use strict";
          var i2 = "function", a = "undefined", o = "object", l = "string", u = "major", c = "model", h = "name", d = "type", p = "vendor", f = "version", g = "architecture", m = "console", b = "mobile", y = "tablet", v = "smarttv", w = "wearable", _ = "embedded", E = "Amazon", S = "Apple", O = "ASUS", T = "BlackBerry", k = "Browser", R = "Chrome", x = "Firefox", P = "Google", C = "Huawei", A = "Microsoft", j = "Motorola", I = "Opera", N = "Samsung", $ = "Sharp", D = "Sony", L = "Xiaomi", U = "Zebra", M = "Facebook", B = "Chromium OS", q = "Mac OS", V = function(e2, t3) {
            var r3 = {};
            for (var s3 in e2) t3[s3] && t3[s3].length % 2 == 0 ? r3[s3] = t3[s3].concat(e2[s3]) : r3[s3] = e2[s3];
            return r3;
          }, F = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, W = function(e2, t3) {
            return typeof e2 === l && -1 !== H(t3).indexOf(H(e2));
          }, H = function(e2) {
            return e2.toLowerCase();
          }, G = function(e2, t3) {
            if (typeof e2 === l) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a ? e2 : e2.substring(0, 350);
          }, z = function(e2, t3) {
            for (var r3, s3, n3, a2, l2, u2, c2 = 0; c2 < t3.length && !l2; ) {
              var h2 = t3[c2], d2 = t3[c2 + 1];
              for (r3 = s3 = 0; r3 < h2.length && !l2 && h2[r3]; ) if (l2 = h2[r3++].exec(e2)) for (n3 = 0; n3 < d2.length; n3++) u2 = l2[++s3], typeof (a2 = d2[n3]) === o && a2.length > 0 ? 2 === a2.length ? typeof a2[1] == i2 ? this[a2[0]] = a2[1].call(this, u2) : this[a2[0]] = a2[1] : 3 === a2.length ? typeof a2[1] !== i2 || a2[1].exec && a2[1].test ? this[a2[0]] = u2 ? u2.replace(a2[1], a2[2]) : void 0 : this[a2[0]] = u2 ? a2[1].call(this, u2, a2[2]) : void 0 : 4 === a2.length && (this[a2[0]] = u2 ? a2[3].call(this, u2.replace(a2[1], a2[2])) : void 0) : this[a2] = u2 || void 0;
              c2 += 2;
            }
          }, K = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var s3 = 0; s3 < t3[r3].length; s3++) if (W(t3[r3][s3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (W(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, J = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, X = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [f, [h, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [f, [h, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [h, f], [/opios[\/ ]+([\w\.]+)/i], [f, [h, I + " Mini"]], [/\bopr\/([\w\.]+)/i], [f, [h, I]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [h, f], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [f, [h, "UC" + k]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [f, [h, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [f, [h, "WeChat"]], [/konqueror\/([\w\.]+)/i], [f, [h, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [f, [h, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [f, [h, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[h, /(.+)/, "$1 Secure " + k], f], [/\bfocus\/([\w\.]+)/i], [f, [h, x + " Focus"]], [/\bopt\/([\w\.]+)/i], [f, [h, I + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [f, [h, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [f, [h, "Dolphin"]], [/coast\/([\w\.]+)/i], [f, [h, I + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [f, [h, "MIUI " + k]], [/fxios\/([-\w\.]+)/i], [f, [h, x]], [/\bqihu|(qi?ho?o?|360)browser/i], [[h, "360 " + k]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[h, /(.+)/, "$1 " + k], f], [/(comodo_dragon)\/([\w\.]+)/i], [[h, /_/g, " "], f], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [h, f], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [h], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[h, M], f], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [h, f], [/\bgsa\/([\w\.]+) .*safari\//i], [f, [h, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [f, [h, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [f, [h, R + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[h, R + " WebView"], f], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [f, [h, "Android " + k]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [h, f], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [f, [h, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [f, h], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [h, [f, K, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [h, f], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[h, "Netscape"], f], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [f, [h, x + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [h, f], [/(cobalt)\/([\w\.]+)/i], [h, [f, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[g, "amd64"]], [/(ia32(?=;))/i], [[g, H]], [/((?:i[346]|x)86)[;\)]/i], [[g, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[g, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[g, "armhf"]], [/windows (ce|mobile); ppc;/i], [[g, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[g, /ower/, "", H]], [/(sun4\w)[;\)]/i], [[g, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[g, H]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [p, N], [d, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [p, N], [d, b]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [p, S], [d, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [p, S], [d, y]], [/(macintosh);/i], [c, [p, S]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [p, $], [d, b]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [p, C], [d, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [p, C], [d, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [p, L], [d, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [p, L], [d, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [p, "OPPO"], [d, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [p, "Vivo"], [d, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [p, "Realme"], [d, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [p, j], [d, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [p, j], [d, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [p, "LG"], [d, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [p, "LG"], [d, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [p, "Lenovo"], [d, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [p, "Nokia"], [d, b]], [/(pixel c)\b/i], [c, [p, P], [d, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [p, P], [d, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [p, D], [d, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [p, D], [d, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [p, "OnePlus"], [d, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [p, E], [d, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [p, E], [d, b]], [/(playbook);[-\w\),; ]+(rim)/i], [c, p, [d, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [p, T], [d, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [p, O], [d, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [p, O], [d, b]], [/(nexus 9)/i], [c, [p, "HTC"], [d, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [p, [c, /_/g, " "], [d, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [p, "Acer"], [d, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [p, "Meizu"], [d, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [p, c, [d, b]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [p, c, [d, y]], [/(surface duo)/i], [c, [p, A], [d, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [p, "Fairphone"], [d, b]], [/(u304aa)/i], [c, [p, "AT&T"], [d, b]], [/\bsie-(\w*)/i], [c, [p, "Siemens"], [d, b]], [/\b(rct\w+) b/i], [c, [p, "RCA"], [d, y]], [/\b(venue[\d ]{2,7}) b/i], [c, [p, "Dell"], [d, y]], [/\b(q(?:mv|ta)\w+) b/i], [c, [p, "Verizon"], [d, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [p, "Barnes & Noble"], [d, y]], [/\b(tm\d{3}\w+) b/i], [c, [p, "NuVision"], [d, y]], [/\b(k88) b/i], [c, [p, "ZTE"], [d, y]], [/\b(nx\d{3}j) b/i], [c, [p, "ZTE"], [d, b]], [/\b(gen\d{3}) b.+49h/i], [c, [p, "Swiss"], [d, b]], [/\b(zur\d{3}) b/i], [c, [p, "Swiss"], [d, y]], [/\b((zeki)?tb.*\b) b/i], [c, [p, "Zeki"], [d, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[p, "Dragon Touch"], c, [d, y]], [/\b(ns-?\w{0,9}) b/i], [c, [p, "Insignia"], [d, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [p, "NextBook"], [d, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[p, "Voice"], c, [d, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[p, "LvTel"], c, [d, b]], [/\b(ph-1) /i], [c, [p, "Essential"], [d, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [p, "Envizen"], [d, y]], [/\b(trio[-\w\. ]+) b/i], [c, [p, "MachSpeed"], [d, y]], [/\btu_(1491) b/i], [c, [p, "Rotor"], [d, y]], [/(shield[\w ]+) b/i], [c, [p, "Nvidia"], [d, y]], [/(sprint) (\w+)/i], [p, c, [d, b]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [p, A], [d, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [p, U], [d, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [p, U], [d, b]], [/smart-tv.+(samsung)/i], [p, [d, v]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [p, N], [d, v]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[p, "LG"], [d, v]], [/(apple) ?tv/i], [p, [c, S + " TV"], [d, v]], [/crkey/i], [[c, R + "cast"], [p, P], [d, v]], [/droid.+aft(\w)( bui|\))/i], [c, [p, E], [d, v]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [p, $], [d, v]], [/(bravia[\w ]+)( bui|\))/i], [c, [p, D], [d, v]], [/(mitv-\w{5}) bui/i], [c, [p, L], [d, v]], [/Hbbtv.*(technisat) (.*);/i], [p, c, [d, v]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[p, G], [c, G], [d, v]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, v]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [p, c, [d, m]], [/droid.+; (shield) bui/i], [c, [p, "Nvidia"], [d, m]], [/(playstation [345portablevi]+)/i], [c, [p, D], [d, m]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [p, A], [d, m]], [/((pebble))app/i], [p, c, [d, w]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [p, S], [d, w]], [/droid.+; (glass) \d/i], [c, [p, P], [d, w]], [/droid.+; (wt63?0{2,3})\)/i], [c, [p, U], [d, w]], [/(quest( 2| pro)?)/i], [c, [p, M], [d, w]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [p, [d, _]], [/(aeobc)\b/i], [c, [p, E], [d, _]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [d, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [d, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, b]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [p, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [f, [h, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [f, [h, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [h, f], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [f, h]], os: [[/microsoft (windows) (vista|xp)/i], [h, f], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [h, [f, K, J]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[h, "Windows"], [f, K, J]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[f, /_/g, "."], [h, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[h, q], [f, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [f, h], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [h, f], [/\(bb(10);/i], [f, [h, T]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [f, [h, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [f, [h, x + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [f, [h, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [f, [h, "watchOS"]], [/crkey\/([\d\.]+)/i], [f, [h, R + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[h, B], f], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [h, f], [/(sunos) ?([\w\.\d]*)/i], [[h, "Solaris"], f], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [h, f]] }, Y = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof Y)) return new Y(e2, t3).getResult();
            var r3 = typeof s2 !== a && s2.navigator ? s2.navigator : void 0, n3 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), m2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, v2 = t3 ? V(X, t3) : X, w2 = r3 && r3.userAgent == n3;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[h] = void 0, t4[f] = void 0, z.call(t4, n3, v2.browser), t4[u] = typeof (e3 = t4[f]) === l ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, w2 && r3 && r3.brave && typeof r3.brave.isBrave == i2 && (t4[h] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[g] = void 0, z.call(e3, n3, v2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[p] = void 0, e3[c] = void 0, e3[d] = void 0, z.call(e3, n3, v2.device), w2 && !e3[d] && m2 && m2.mobile && (e3[d] = b), w2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== a && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[d] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[h] = void 0, e3[f] = void 0, z.call(e3, n3, v2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[h] = void 0, e3[f] = void 0, z.call(e3, n3, v2.os), w2 && !e3[h] && m2 && "Unknown" != m2.platform && (e3[h] = m2.platform.replace(/chrome os/i, B).replace(/macos/i, q)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return n3;
            }, this.setUA = function(e3) {
              return n3 = typeof e3 === l && e3.length > 350 ? G(e3, 350) : e3, this;
            }, this.setUA(n3), this;
          };
          if (Y.VERSION = "1.0.35", Y.BROWSER = F([h, f, u]), Y.CPU = F([g]), Y.DEVICE = F([c, p, d, m, b, v, y, w, _]), Y.ENGINE = Y.OS = F([h, f]), typeof r2 !== a) t2.exports && (r2 = t2.exports = Y), r2.UAParser = Y;
          else if (typeof define === i2 && define.amd) e.r, void 0 !== Y && e.v(Y);
          else typeof s2 !== a && (s2.UAParser = Y);
          var Q = typeof s2 !== a && (s2.jQuery || s2.Zepto);
          if (Q && !Q.ua) {
            var Z = new Y();
            Q.ua = Z.getResult(), Q.ua.get = function() {
              return Z.getUA();
            }, Q.ua.set = function(e2) {
              Z.setUA(e2);
              var t3 = Z.getResult();
              for (var r3 in t3) Q.ua[r3] = t3[r3];
            };
          }
        }(this);
      } }, n = {};
      function i(e2) {
        var t2 = n[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = n[e2] = { exports: {} }, a = true;
        try {
          s[e2].call(r2.exports, r2, r2.exports, i), a = false;
        } finally {
          a && delete n[e2];
        }
        return r2.exports;
      }
      i.ab = "/ROOT/node_modules/next/dist/compiled/ua-parser-js/", t.exports = i(226);
    }, 8946, (e, t, r) => {
      "use strict";
      var s = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray;
      function a() {
      }
      var o = Symbol.for("react.transitional.element"), l = Symbol.for("react.portal"), u = Symbol.for("react.fragment"), c = Symbol.for("react.strict_mode"), h = Symbol.for("react.profiler"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.activity"), b = Symbol.for("react.view_transition"), y = Symbol.iterator, v = Object.prototype.hasOwnProperty, w = Object.assign;
      function _(e2, t2, r2) {
        var s2 = r2.ref;
        return { $$typeof: o, type: e2, key: t2, ref: void 0 !== s2 ? s2 : null, props: r2 };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === o;
      }
      var S = /\/+/g;
      function O(e2, t2) {
        var r2, s2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, s2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return s2[e3];
        })) : t2.toString(36);
      }
      function T(e2, t2, r2) {
        if (null == e2) return e2;
        var s2 = [], u2 = 0;
        return !function e3(t3, r3, s3, u3, c2) {
          var h2, d2, p2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case o:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, s3, u3, c2);
              }
          }
          if (m2) return c2 = c2(t3), m2 = "" === u3 ? "." + O(t3, 0) : u3, i(c2) ? (s3 = "", null != m2 && (s3 = m2.replace(S, "$&/") + "/"), e3(c2, r3, s3, "", function(e4) {
            return e4;
          })) : null != c2 && (E(c2) && (h2 = c2, d2 = s3 + (null == c2.key || t3 && t3.key === c2.key ? "" : ("" + c2.key).replace(S, "$&/") + "/") + m2, c2 = _(h2.type, d2, h2.props)), r3.push(c2)), 1;
          m2 = 0;
          var b2 = "" === u3 ? "." : u3 + ":";
          if (i(t3)) for (var v2 = 0; v2 < t3.length; v2++) f2 = b2 + O(u3 = t3[v2], v2), m2 += e3(u3, r3, s3, f2, c2);
          else if ("function" == typeof (v2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = y && p2[y] || p2["@@iterator"]) ? p2 : null)) for (t3 = v2.call(t3), v2 = 0; !(u3 = t3.next()).done; ) f2 = b2 + O(u3 = u3.value, v2++), m2 += e3(u3, r3, s3, f2, c2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3(function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(a, a) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            }(t3), r3, s3, u3, c2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, s2, "", "", function(e3) {
          return t2.call(r2, e3, u2++);
        }), s2;
      }
      function k(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function R() {
        return /* @__PURE__ */ new WeakMap();
      }
      function x() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: T, forEach: function(e2, t2, r2) {
        T(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return T(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return T(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error(n(143));
        return e2;
      } }, r.Fragment = u, r.Profiler = h, r.StrictMode = c, r.Suspense = p, r.ViewTransition = b, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = s, r.cache = function(e2) {
        return function() {
          var t2 = s.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(R);
          void 0 === (t2 = r2.get(e2)) && (t2 = x(), r2.set(e2, t2)), r2 = 0;
          for (var n2 = arguments.length; r2 < n2; r2++) {
            var i2 = arguments[r2];
            if ("function" == typeof i2 || "object" == typeof i2 && null !== i2) {
              var a2 = t2.o;
              null === a2 && (t2.o = a2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = a2.get(i2)) && (t2 = x(), a2.set(i2, t2));
            } else null === (a2 = t2.p) && (t2.p = a2 = /* @__PURE__ */ new Map()), void 0 === (t2 = a2.get(i2)) && (t2 = x(), a2.set(i2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var o2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = o2;
          } catch (e3) {
            throw (o2 = t2).s = 2, o2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = s.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(n(267, e2));
        var s2 = w({}, e2.props), i2 = e2.key;
        if (null != t2) for (a2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) v.call(t2, a2) && "key" !== a2 && "__self" !== a2 && "__source" !== a2 && ("ref" !== a2 || void 0 !== t2.ref) && (s2[a2] = t2[a2]);
        var a2 = arguments.length - 2;
        if (1 === a2) s2.children = r2;
        else if (1 < a2) {
          for (var o2 = Array(a2), l2 = 0; l2 < a2; l2++) o2[l2] = arguments[l2 + 2];
          s2.children = o2;
        }
        return _(e2.type, i2, s2);
      }, r.createElement = function(e2, t2, r2) {
        var s2, n2 = {}, i2 = null;
        if (null != t2) for (s2 in void 0 !== t2.key && (i2 = "" + t2.key), t2) v.call(t2, s2) && "key" !== s2 && "__self" !== s2 && "__source" !== s2 && (n2[s2] = t2[s2]);
        var a2 = arguments.length - 2;
        if (1 === a2) n2.children = r2;
        else if (1 < a2) {
          for (var o2 = Array(a2), l2 = 0; l2 < a2; l2++) o2[l2] = arguments[l2 + 2];
          n2.children = o2;
        }
        if (e2 && e2.defaultProps) for (s2 in a2 = e2.defaultProps) void 0 === n2[s2] && (n2[s2] = a2[s2]);
        return _(e2, i2, n2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: d, render: e2 };
      }, r.isValidElement = E, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: k };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return s.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return s.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return s.H.useId();
      }, r.useMemo = function(e2, t2) {
        return s.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-f93b9fd4-20251217";
    }, 40049, (e, t, r) => {
      "use strict";
      t.exports = e.r(8946);
    }, 99929, (e, t, r) => {
      "use strict";
      let s;
      Object.defineProperty(r, "__esModule", { value: true }), r.parseCookie = h, r.parse = h, r.stringifyCookie = function(e2, t2) {
        let r2 = t2?.encode || encodeURIComponent, s2 = [];
        for (let t3 of Object.keys(e2)) {
          let a2 = e2[t3];
          if (void 0 === a2) continue;
          if (!n.test(t3)) throw TypeError(`cookie name is invalid: ${t3}`);
          let o2 = r2(a2);
          if (!i.test(o2)) throw TypeError(`cookie val is invalid: ${a2}`);
          s2.push(`${t3}=${o2}`);
        }
        return s2.join("; ");
      }, r.stringifySetCookie = d, r.serialize = d, r.parseSetCookie = function(e2, t2) {
        let r2 = t2?.decode || m, s2 = e2.length, n2 = p(e2, 0, s2), i2 = f(e2, 0, n2), a2 = -1 === i2 ? { name: "", value: r2(g(e2, 0, n2)) } : { name: g(e2, 0, i2), value: r2(g(e2, i2 + 1, n2)) }, o2 = n2 + 1;
        for (; o2 < s2; ) {
          let t3 = p(e2, o2, s2), r3 = f(e2, o2, t3), n3 = -1 === r3 ? g(e2, o2, t3) : g(e2, o2, r3), i3 = -1 === r3 ? void 0 : g(e2, r3 + 1, t3);
          switch (n3.toLowerCase()) {
            case "httponly":
              a2.httpOnly = true;
              break;
            case "secure":
              a2.secure = true;
              break;
            case "partitioned":
              a2.partitioned = true;
              break;
            case "domain":
              a2.domain = i3;
              break;
            case "path":
              a2.path = i3;
              break;
            case "max-age":
              i3 && l.test(i3) && (a2.maxAge = Number(i3));
              break;
            case "expires":
              if (!i3) break;
              let u2 = new Date(i3);
              Number.isFinite(u2.valueOf()) && (a2.expires = u2);
              break;
            case "priority":
              if (!i3) break;
              let c2 = i3.toLowerCase();
              ("low" === c2 || "medium" === c2 || "high" === c2) && (a2.priority = c2);
              break;
            case "samesite":
              if (!i3) break;
              let h2 = i3.toLowerCase();
              ("lax" === h2 || "strict" === h2 || "none" === h2) && (a2.sameSite = h2);
          }
          o2 = t3 + 1;
        }
        return a2;
      }, r.stringifySetCookie = d, r.serialize = d;
      let n = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, i = /^[\u0021-\u003A\u003C-\u007E]*$/, a = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, o = /^[\u0020-\u003A\u003D-\u007E]*$/, l = /^-?\d+$/, u = Object.prototype.toString, c = ((s = function() {
      }).prototype = /* @__PURE__ */ Object.create(null), s);
      function h(e2, t2) {
        let r2 = new c(), s2 = e2.length;
        if (s2 < 2) return r2;
        let n2 = t2?.decode || m, i2 = 0;
        do {
          let t3 = f(e2, i2, s2);
          if (-1 === t3) break;
          let a2 = p(e2, i2, s2);
          if (t3 > a2) {
            i2 = e2.lastIndexOf(";", t3 - 1) + 1;
            continue;
          }
          let o2 = g(e2, i2, t3);
          void 0 === r2[o2] && (r2[o2] = n2(g(e2, t3 + 1, a2))), i2 = a2 + 1;
        } while (i2 < s2);
        return r2;
      }
      function d(e2, t2, r2) {
        let s2 = "object" == typeof e2 ? e2 : { ...r2, name: e2, value: String(t2) }, l2 = ("object" == typeof t2 ? t2 : r2)?.encode || encodeURIComponent;
        if (!n.test(s2.name)) throw TypeError(`argument name is invalid: ${s2.name}`);
        let c2 = s2.value ? l2(s2.value) : "";
        if (!i.test(c2)) throw TypeError(`argument val is invalid: ${s2.value}`);
        let h2 = s2.name + "=" + c2;
        if (void 0 !== s2.maxAge) {
          if (!Number.isInteger(s2.maxAge)) throw TypeError(`option maxAge is invalid: ${s2.maxAge}`);
          h2 += "; Max-Age=" + s2.maxAge;
        }
        if (s2.domain) {
          if (!a.test(s2.domain)) throw TypeError(`option domain is invalid: ${s2.domain}`);
          h2 += "; Domain=" + s2.domain;
        }
        if (s2.path) {
          if (!o.test(s2.path)) throw TypeError(`option path is invalid: ${s2.path}`);
          h2 += "; Path=" + s2.path;
        }
        if (s2.expires) {
          var d2;
          if (d2 = s2.expires, "[object Date]" !== u.call(d2) || !Number.isFinite(s2.expires.valueOf())) throw TypeError(`option expires is invalid: ${s2.expires}`);
          h2 += "; Expires=" + s2.expires.toUTCString();
        }
        if (s2.httpOnly && (h2 += "; HttpOnly"), s2.secure && (h2 += "; Secure"), s2.partitioned && (h2 += "; Partitioned"), s2.priority) switch ("string" == typeof s2.priority ? s2.priority.toLowerCase() : void 0) {
          case "low":
            h2 += "; Priority=Low";
            break;
          case "medium":
            h2 += "; Priority=Medium";
            break;
          case "high":
            h2 += "; Priority=High";
            break;
          default:
            throw TypeError(`option priority is invalid: ${s2.priority}`);
        }
        if (s2.sameSite) switch ("string" == typeof s2.sameSite ? s2.sameSite.toLowerCase() : s2.sameSite) {
          case true:
          case "strict":
            h2 += "; SameSite=Strict";
            break;
          case "lax":
            h2 += "; SameSite=Lax";
            break;
          case "none":
            h2 += "; SameSite=None";
            break;
          default:
            throw TypeError(`option sameSite is invalid: ${s2.sameSite}`);
        }
        return h2;
      }
      function p(e2, t2, r2) {
        let s2 = e2.indexOf(";", t2);
        return -1 === s2 ? r2 : s2;
      }
      function f(e2, t2, r2) {
        let s2 = e2.indexOf("=", t2);
        return s2 < r2 ? s2 : -1;
      }
      function g(e2, t2, r2) {
        let s2 = t2, n2 = r2;
        do {
          let t3 = e2.charCodeAt(s2);
          if (32 !== t3 && 9 !== t3) break;
        } while (++s2 < n2);
        for (; n2 > s2; ) {
          let t3 = e2.charCodeAt(n2 - 1);
          if (32 !== t3 && 9 !== t3) break;
          n2--;
        }
        return e2.slice(s2, n2);
      }
      function m(e2) {
        if (-1 === e2.indexOf("%")) return e2;
        try {
          return decodeURIComponent(e2);
        } catch (t2) {
          return e2;
        }
      }
    }, 70858, (e) => {
      "use strict";
      var t = function(e2, r2) {
        return (t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t2) {
          e3.__proto__ = t2;
        } || function(e3, t2) {
          for (var r3 in t2) Object.prototype.hasOwnProperty.call(t2, r3) && (e3[r3] = t2[r3]);
        })(e2, r2);
      };
      function r(e2, r2) {
        if ("function" != typeof r2 && null !== r2) throw TypeError("Class extends value " + String(r2) + " is not a constructor or null");
        function s2() {
          this.constructor = e2;
        }
        t(e2, r2), e2.prototype = null === r2 ? Object.create(r2) : (s2.prototype = r2.prototype, new s2());
      }
      var s = function() {
        return (s = Object.assign || function(e2) {
          for (var t2, r2 = 1, s2 = arguments.length; r2 < s2; r2++) for (var n2 in t2 = arguments[r2]) Object.prototype.hasOwnProperty.call(t2, n2) && (e2[n2] = t2[n2]);
          return e2;
        }).apply(this, arguments);
      };
      function n(e2, t2) {
        var r2 = {};
        for (var s2 in e2) Object.prototype.hasOwnProperty.call(e2, s2) && 0 > t2.indexOf(s2) && (r2[s2] = e2[s2]);
        if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) for (var n2 = 0, s2 = Object.getOwnPropertySymbols(e2); n2 < s2.length; n2++) 0 > t2.indexOf(s2[n2]) && Object.prototype.propertyIsEnumerable.call(e2, s2[n2]) && (r2[s2[n2]] = e2[s2[n2]]);
        return r2;
      }
      function i(e2, t2, r2, s2) {
        var n2, i2 = arguments.length, a2 = i2 < 3 ? t2 : null === s2 ? s2 = Object.getOwnPropertyDescriptor(t2, r2) : s2;
        if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a2 = Reflect.decorate(e2, t2, r2, s2);
        else for (var o2 = e2.length - 1; o2 >= 0; o2--) (n2 = e2[o2]) && (a2 = (i2 < 3 ? n2(a2) : i2 > 3 ? n2(t2, r2, a2) : n2(t2, r2)) || a2);
        return i2 > 3 && a2 && Object.defineProperty(t2, r2, a2), a2;
      }
      function a(e2, t2) {
        return function(r2, s2) {
          t2(r2, s2, e2);
        };
      }
      function o(e2, t2, r2, s2, n2, i2) {
        function a2(e3) {
          if (void 0 !== e3 && "function" != typeof e3) throw TypeError("Function expected");
          return e3;
        }
        for (var o2, l2 = s2.kind, u2 = "getter" === l2 ? "get" : "setter" === l2 ? "set" : "value", c2 = !t2 && e2 ? s2.static ? e2 : e2.prototype : null, h2 = t2 || (c2 ? Object.getOwnPropertyDescriptor(c2, s2.name) : {}), d2 = false, p2 = r2.length - 1; p2 >= 0; p2--) {
          var f2 = {};
          for (var g2 in s2) f2[g2] = "access" === g2 ? {} : s2[g2];
          for (var g2 in s2.access) f2.access[g2] = s2.access[g2];
          f2.addInitializer = function(e3) {
            if (d2) throw TypeError("Cannot add initializers after decoration has completed");
            i2.push(a2(e3 || null));
          };
          var m2 = (0, r2[p2])("accessor" === l2 ? { get: h2.get, set: h2.set } : h2[u2], f2);
          if ("accessor" === l2) {
            if (void 0 === m2) continue;
            if (null === m2 || "object" != typeof m2) throw TypeError("Object expected");
            (o2 = a2(m2.get)) && (h2.get = o2), (o2 = a2(m2.set)) && (h2.set = o2), (o2 = a2(m2.init)) && n2.unshift(o2);
          } else (o2 = a2(m2)) && ("field" === l2 ? n2.unshift(o2) : h2[u2] = o2);
        }
        c2 && Object.defineProperty(c2, s2.name, h2), d2 = true;
      }
      function l(e2, t2, r2) {
        for (var s2 = arguments.length > 2, n2 = 0; n2 < t2.length; n2++) r2 = s2 ? t2[n2].call(e2, r2) : t2[n2].call(e2);
        return s2 ? r2 : void 0;
      }
      function u(e2) {
        return "symbol" == typeof e2 ? e2 : "".concat(e2);
      }
      function c(e2, t2, r2) {
        return "symbol" == typeof t2 && (t2 = t2.description ? "[".concat(t2.description, "]") : ""), Object.defineProperty(e2, "name", { configurable: true, value: r2 ? "".concat(r2, " ", t2) : t2 });
      }
      function h(e2, t2) {
        if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(e2, t2);
      }
      function d(e2, t2, r2, s2) {
        return new (r2 || (r2 = Promise))(function(n2, i2) {
          function a2(e3) {
            try {
              l2(s2.next(e3));
            } catch (e4) {
              i2(e4);
            }
          }
          function o2(e3) {
            try {
              l2(s2.throw(e3));
            } catch (e4) {
              i2(e4);
            }
          }
          function l2(e3) {
            var t3;
            e3.done ? n2(e3.value) : ((t3 = e3.value) instanceof r2 ? t3 : new r2(function(e4) {
              e4(t3);
            })).then(a2, o2);
          }
          l2((s2 = s2.apply(e2, t2 || [])).next());
        });
      }
      function p(e2, t2) {
        var r2, s2, n2, i2 = { label: 0, sent: function() {
          if (1 & n2[0]) throw n2[1];
          return n2[1];
        }, trys: [], ops: [] }, a2 = Object.create(("function" == typeof Iterator ? Iterator : Object).prototype);
        return a2.next = o2(0), a2.throw = o2(1), a2.return = o2(2), "function" == typeof Symbol && (a2[Symbol.iterator] = function() {
          return this;
        }), a2;
        function o2(o3) {
          return function(l2) {
            var u2 = [o3, l2];
            if (r2) throw TypeError("Generator is already executing.");
            for (; a2 && (a2 = 0, u2[0] && (i2 = 0)), i2; ) try {
              if (r2 = 1, s2 && (n2 = 2 & u2[0] ? s2.return : u2[0] ? s2.throw || ((n2 = s2.return) && n2.call(s2), 0) : s2.next) && !(n2 = n2.call(s2, u2[1])).done) return n2;
              switch (s2 = 0, n2 && (u2 = [2 & u2[0], n2.value]), u2[0]) {
                case 0:
                case 1:
                  n2 = u2;
                  break;
                case 4:
                  return i2.label++, { value: u2[1], done: false };
                case 5:
                  i2.label++, s2 = u2[1], u2 = [0];
                  continue;
                case 7:
                  u2 = i2.ops.pop(), i2.trys.pop();
                  continue;
                default:
                  if (!(n2 = (n2 = i2.trys).length > 0 && n2[n2.length - 1]) && (6 === u2[0] || 2 === u2[0])) {
                    i2 = 0;
                    continue;
                  }
                  if (3 === u2[0] && (!n2 || u2[1] > n2[0] && u2[1] < n2[3])) {
                    i2.label = u2[1];
                    break;
                  }
                  if (6 === u2[0] && i2.label < n2[1]) {
                    i2.label = n2[1], n2 = u2;
                    break;
                  }
                  if (n2 && i2.label < n2[2]) {
                    i2.label = n2[2], i2.ops.push(u2);
                    break;
                  }
                  n2[2] && i2.ops.pop(), i2.trys.pop();
                  continue;
              }
              u2 = t2.call(e2, i2);
            } catch (e3) {
              u2 = [6, e3], s2 = 0;
            } finally {
              r2 = n2 = 0;
            }
            if (5 & u2[0]) throw u2[1];
            return { value: u2[0] ? u2[1] : void 0, done: true };
          };
        }
      }
      var f = Object.create ? function(e2, t2, r2, s2) {
        void 0 === s2 && (s2 = r2);
        var n2 = Object.getOwnPropertyDescriptor(t2, r2);
        (!n2 || ("get" in n2 ? !t2.__esModule : n2.writable || n2.configurable)) && (n2 = { enumerable: true, get: function() {
          return t2[r2];
        } }), Object.defineProperty(e2, s2, n2);
      } : function(e2, t2, r2, s2) {
        void 0 === s2 && (s2 = r2), e2[s2] = t2[r2];
      };
      function g(e2, t2) {
        for (var r2 in e2) "default" === r2 || Object.prototype.hasOwnProperty.call(t2, r2) || f(t2, e2, r2);
      }
      function m(e2) {
        var t2 = "function" == typeof Symbol && Symbol.iterator, r2 = t2 && e2[t2], s2 = 0;
        if (r2) return r2.call(e2);
        if (e2 && "number" == typeof e2.length) return { next: function() {
          return e2 && s2 >= e2.length && (e2 = void 0), { value: e2 && e2[s2++], done: !e2 };
        } };
        throw TypeError(t2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      }
      function b(e2, t2) {
        var r2 = "function" == typeof Symbol && e2[Symbol.iterator];
        if (!r2) return e2;
        var s2, n2, i2 = r2.call(e2), a2 = [];
        try {
          for (; (void 0 === t2 || t2-- > 0) && !(s2 = i2.next()).done; ) a2.push(s2.value);
        } catch (e3) {
          n2 = { error: e3 };
        } finally {
          try {
            s2 && !s2.done && (r2 = i2.return) && r2.call(i2);
          } finally {
            if (n2) throw n2.error;
          }
        }
        return a2;
      }
      function y() {
        for (var e2 = [], t2 = 0; t2 < arguments.length; t2++) e2 = e2.concat(b(arguments[t2]));
        return e2;
      }
      function v() {
        for (var e2 = 0, t2 = 0, r2 = arguments.length; t2 < r2; t2++) e2 += arguments[t2].length;
        for (var s2 = Array(e2), n2 = 0, t2 = 0; t2 < r2; t2++) for (var i2 = arguments[t2], a2 = 0, o2 = i2.length; a2 < o2; a2++, n2++) s2[n2] = i2[a2];
        return s2;
      }
      function w(e2, t2, r2) {
        if (r2 || 2 == arguments.length) for (var s2, n2 = 0, i2 = t2.length; n2 < i2; n2++) !s2 && n2 in t2 || (s2 || (s2 = Array.prototype.slice.call(t2, 0, n2)), s2[n2] = t2[n2]);
        return e2.concat(s2 || Array.prototype.slice.call(t2));
      }
      function _(e2) {
        return this instanceof _ ? (this.v = e2, this) : new _(e2);
      }
      function E(e2, t2, r2) {
        if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
        var s2, n2 = r2.apply(e2, t2 || []), i2 = [];
        return s2 = Object.create(("function" == typeof AsyncIterator ? AsyncIterator : Object).prototype), a2("next"), a2("throw"), a2("return", function(e3) {
          return function(t3) {
            return Promise.resolve(t3).then(e3, u2);
          };
        }), s2[Symbol.asyncIterator] = function() {
          return this;
        }, s2;
        function a2(e3, t3) {
          n2[e3] && (s2[e3] = function(t4) {
            return new Promise(function(r3, s3) {
              i2.push([e3, t4, r3, s3]) > 1 || o2(e3, t4);
            });
          }, t3 && (s2[e3] = t3(s2[e3])));
        }
        function o2(e3, t3) {
          try {
            var r3;
            (r3 = n2[e3](t3)).value instanceof _ ? Promise.resolve(r3.value.v).then(l2, u2) : c2(i2[0][2], r3);
          } catch (e4) {
            c2(i2[0][3], e4);
          }
        }
        function l2(e3) {
          o2("next", e3);
        }
        function u2(e3) {
          o2("throw", e3);
        }
        function c2(e3, t3) {
          e3(t3), i2.shift(), i2.length && o2(i2[0][0], i2[0][1]);
        }
      }
      function S(e2) {
        var t2, r2;
        return t2 = {}, s2("next"), s2("throw", function(e3) {
          throw e3;
        }), s2("return"), t2[Symbol.iterator] = function() {
          return this;
        }, t2;
        function s2(s3, n2) {
          t2[s3] = e2[s3] ? function(t3) {
            return (r2 = !r2) ? { value: _(e2[s3](t3)), done: false } : n2 ? n2(t3) : t3;
          } : n2;
        }
      }
      function O(e2) {
        if (!Symbol.asyncIterator) throw TypeError("Symbol.asyncIterator is not defined.");
        var t2, r2 = e2[Symbol.asyncIterator];
        return r2 ? r2.call(e2) : (e2 = m(e2), t2 = {}, s2("next"), s2("throw"), s2("return"), t2[Symbol.asyncIterator] = function() {
          return this;
        }, t2);
        function s2(r3) {
          t2[r3] = e2[r3] && function(t3) {
            return new Promise(function(s3, n2) {
              var i2, a2, o2;
              i2 = s3, a2 = n2, o2 = (t3 = e2[r3](t3)).done, Promise.resolve(t3.value).then(function(e3) {
                i2({ value: e3, done: o2 });
              }, a2);
            });
          };
        }
      }
      function T(e2, t2) {
        return Object.defineProperty ? Object.defineProperty(e2, "raw", { value: t2 }) : e2.raw = t2, e2;
      }
      var k = Object.create ? function(e2, t2) {
        Object.defineProperty(e2, "default", { enumerable: true, value: t2 });
      } : function(e2, t2) {
        e2.default = t2;
      }, R = function(e2) {
        return (R = Object.getOwnPropertyNames || function(e3) {
          var t2 = [];
          for (var r2 in e3) Object.prototype.hasOwnProperty.call(e3, r2) && (t2[t2.length] = r2);
          return t2;
        })(e2);
      };
      function x(e2) {
        if (e2 && e2.__esModule) return e2;
        var t2 = {};
        if (null != e2) for (var r2 = R(e2), s2 = 0; s2 < r2.length; s2++) "default" !== r2[s2] && f(t2, e2, r2[s2]);
        return k(t2, e2), t2;
      }
      function P(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }
      function C(e2, t2, r2, s2) {
        if ("a" === r2 && !s2) throw TypeError("Private accessor was defined without a getter");
        if ("function" == typeof t2 ? e2 !== t2 || !s2 : !t2.has(e2)) throw TypeError("Cannot read private member from an object whose class did not declare it");
        return "m" === r2 ? s2 : "a" === r2 ? s2.call(e2) : s2 ? s2.value : t2.get(e2);
      }
      function A(e2, t2, r2, s2, n2) {
        if ("m" === s2) throw TypeError("Private method is not writable");
        if ("a" === s2 && !n2) throw TypeError("Private accessor was defined without a setter");
        if ("function" == typeof t2 ? e2 !== t2 || !n2 : !t2.has(e2)) throw TypeError("Cannot write private member to an object whose class did not declare it");
        return "a" === s2 ? n2.call(e2, r2) : n2 ? n2.value = r2 : t2.set(e2, r2), r2;
      }
      function j(e2, t2) {
        if (null === t2 || "object" != typeof t2 && "function" != typeof t2) throw TypeError("Cannot use 'in' operator on non-object");
        return "function" == typeof e2 ? t2 === e2 : e2.has(t2);
      }
      function I(e2, t2, r2) {
        if (null != t2) {
          var s2, n2;
          if ("object" != typeof t2 && "function" != typeof t2) throw TypeError("Object expected.");
          if (r2) {
            if (!Symbol.asyncDispose) throw TypeError("Symbol.asyncDispose is not defined.");
            s2 = t2[Symbol.asyncDispose];
          }
          if (void 0 === s2) {
            if (!Symbol.dispose) throw TypeError("Symbol.dispose is not defined.");
            s2 = t2[Symbol.dispose], r2 && (n2 = s2);
          }
          if ("function" != typeof s2) throw TypeError("Object not disposable.");
          n2 && (s2 = function() {
            try {
              n2.call(this);
            } catch (e3) {
              return Promise.reject(e3);
            }
          }), e2.stack.push({ value: t2, dispose: s2, async: r2 });
        } else r2 && e2.stack.push({ async: true });
        return t2;
      }
      var N = "function" == typeof SuppressedError ? SuppressedError : function(e2, t2, r2) {
        var s2 = Error(r2);
        return s2.name = "SuppressedError", s2.error = e2, s2.suppressed = t2, s2;
      };
      function $(e2) {
        function t2(t3) {
          e2.error = e2.hasError ? new N(t3, e2.error, "An error was suppressed during disposal.") : t3, e2.hasError = true;
        }
        var r2, s2 = 0;
        return function n2() {
          for (; r2 = e2.stack.pop(); ) try {
            if (!r2.async && 1 === s2) return s2 = 0, e2.stack.push(r2), Promise.resolve().then(n2);
            if (r2.dispose) {
              var i2 = r2.dispose.call(r2.value);
              if (r2.async) return s2 |= 2, Promise.resolve(i2).then(n2, function(e3) {
                return t2(e3), n2();
              });
            } else s2 |= 1;
          } catch (e3) {
            t2(e3);
          }
          if (1 === s2) return e2.hasError ? Promise.reject(e2.error) : Promise.resolve();
          if (e2.hasError) throw e2.error;
        }();
      }
      function D(e2, t2) {
        return "string" == typeof e2 && /^\.\.?\//.test(e2) ? e2.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(e3, r2, s2, n2, i2) {
          return r2 ? t2 ? ".jsx" : ".js" : !s2 || n2 && i2 ? s2 + n2 + "." + i2.toLowerCase() + "js" : e3;
        }) : e2;
      }
      let L = { __extends: r, __assign: s, __rest: n, __decorate: i, __param: a, __esDecorate: o, __runInitializers: l, __propKey: u, __setFunctionName: c, __metadata: h, __awaiter: d, __generator: p, __createBinding: f, __exportStar: g, __values: m, __read: b, __spread: y, __spreadArrays: v, __spreadArray: w, __await: _, __asyncGenerator: E, __asyncDelegator: S, __asyncValues: O, __makeTemplateObject: T, __importStar: x, __importDefault: P, __classPrivateFieldGet: C, __classPrivateFieldSet: A, __classPrivateFieldIn: j, __addDisposableResource: I, __disposeResources: $, __rewriteRelativeImportExtension: D };
      e.s(["__addDisposableResource", () => I, "__assign", () => s, "__asyncDelegator", () => S, "__asyncGenerator", () => E, "__asyncValues", () => O, "__await", () => _, "__awaiter", () => d, "__classPrivateFieldGet", () => C, "__classPrivateFieldIn", () => j, "__classPrivateFieldSet", () => A, "__createBinding", () => f, "__decorate", () => i, "__disposeResources", () => $, "__esDecorate", () => o, "__exportStar", () => g, "__extends", () => r, "__generator", () => p, "__importDefault", () => P, "__importStar", () => x, "__makeTemplateObject", () => T, "__metadata", () => h, "__param", () => a, "__propKey", () => u, "__read", () => b, "__rest", () => n, "__rewriteRelativeImportExtension", () => D, "__runInitializers", () => l, "__setFunctionName", () => c, "__spread", () => y, "__spreadArray", () => w, "__spreadArrays", () => v, "__values", () => m, "default", 0, L]);
    }, 6223, (e) => {
      "use strict";
      e.s([], 47754), e.i(47754);
      var t, r, s = e.i(70858);
      class n extends Error {
        constructor(e2, t2 = "FunctionsError", r2) {
          super(e2), this.name = t2, this.context = r2;
        }
      }
      class i extends n {
        constructor(e2) {
          super("Failed to send a request to the Edge Function", "FunctionsFetchError", e2);
        }
      }
      class a extends n {
        constructor(e2) {
          super("Relay Error invoking the Edge Function", "FunctionsRelayError", e2);
        }
      }
      class o extends n {
        constructor(e2) {
          super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e2);
        }
      }
      (t = r || (r = {})).Any = "any", t.ApNortheast1 = "ap-northeast-1", t.ApNortheast2 = "ap-northeast-2", t.ApSouth1 = "ap-south-1", t.ApSoutheast1 = "ap-southeast-1", t.ApSoutheast2 = "ap-southeast-2", t.CaCentral1 = "ca-central-1", t.EuCentral1 = "eu-central-1", t.EuWest1 = "eu-west-1", t.EuWest2 = "eu-west-2", t.EuWest3 = "eu-west-3", t.SaEast1 = "sa-east-1", t.UsEast1 = "us-east-1", t.UsWest1 = "us-west-1", t.UsWest2 = "us-west-2";
      class l {
        constructor(e2, { headers: t2 = {}, customFetch: s2, region: n2 = r.Any } = {}) {
          this.url = e2, this.headers = t2, this.region = n2, this.fetch = /* @__PURE__ */ ((e3) => e3 ? (...t3) => e3(...t3) : (...e4) => fetch(...e4))(s2);
        }
        setAuth(e2) {
          this.headers.Authorization = `Bearer ${e2}`;
        }
        invoke(e2) {
          return (0, s.__awaiter)(this, arguments, void 0, function* (e3, t2 = {}) {
            var r2;
            let s2, n2;
            try {
              let l2, { headers: u, method: c, body: h, signal: d, timeout: p } = t2, f = {}, { region: g } = t2;
              g || (g = this.region);
              let m = new URL(`${this.url}/${e3}`);
              g && "any" !== g && (f["x-region"] = g, m.searchParams.set("forceFunctionRegion", g)), h && (u && !Object.prototype.hasOwnProperty.call(u, "Content-Type") || !u) ? "undefined" != typeof Blob && h instanceof Blob || h instanceof ArrayBuffer ? (f["Content-Type"] = "application/octet-stream", l2 = h) : "string" == typeof h ? (f["Content-Type"] = "text/plain", l2 = h) : "undefined" != typeof FormData && h instanceof FormData ? l2 = h : (f["Content-Type"] = "application/json", l2 = JSON.stringify(h)) : l2 = h;
              let b = d;
              p && (n2 = new AbortController(), s2 = setTimeout(() => n2.abort(), p), d ? (b = n2.signal, d.addEventListener("abort", () => n2.abort())) : b = n2.signal);
              let y = yield this.fetch(m.toString(), { method: c || "POST", headers: Object.assign(Object.assign(Object.assign({}, f), this.headers), u), body: l2, signal: b }).catch((e4) => {
                throw new i(e4);
              }), v = y.headers.get("x-relay-error");
              if (v && "true" === v) throw new a(y);
              if (!y.ok) throw new o(y);
              let w = (null != (r2 = y.headers.get("Content-Type")) ? r2 : "text/plain").split(";")[0].trim();
              return { data: "application/json" === w ? yield y.json() : "application/octet-stream" === w || "application/pdf" === w ? yield y.blob() : "text/event-stream" === w ? y : "multipart/form-data" === w ? yield y.formData() : yield y.text(), error: null, response: y };
            } catch (e4) {
              return { data: null, error: e4, response: e4 instanceof o || e4 instanceof a ? e4.context : void 0 };
            } finally {
              s2 && clearTimeout(s2);
            }
          });
        }
      }
      e.s(["FunctionRegion", () => r, "FunctionsClient", () => l, "FunctionsError", () => n, "FunctionsFetchError", () => i, "FunctionsHttpError", () => o, "FunctionsRelayError", () => a], 6223);
    }, 93143, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), r.default = class extends Error {
        constructor(e2) {
          super(e2.message), this.name = "PostgrestError", this.details = e2.details, this.hint = e2.hint, this.code = e2.code;
        }
      };
    }, 1264, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      let s = e.r(70858).__importDefault(e.r(93143));
      r.default = class {
        constructor(e2) {
          var t2, r2;
          this.shouldThrowOnError = false, this.method = e2.method, this.url = e2.url, this.headers = new Headers(e2.headers), this.schema = e2.schema, this.body = e2.body, this.shouldThrowOnError = null != (t2 = e2.shouldThrowOnError) && t2, this.signal = e2.signal, this.isMaybeSingle = null != (r2 = e2.isMaybeSingle) && r2, e2.fetch ? this.fetch = e2.fetch : this.fetch = fetch;
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        setHeader(e2, t2) {
          return this.headers = new Headers(this.headers), this.headers.set(e2, t2), this;
        }
        then(e2, t2) {
          void 0 === this.schema || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), "GET" !== this.method && "HEAD" !== this.method && this.headers.set("Content-Type", "application/json");
          let r2 = (0, this.fetch)(this.url.toString(), { method: this.method, headers: this.headers, body: JSON.stringify(this.body), signal: this.signal }).then(async (e3) => {
            var t3, r3, n, i;
            let a = null, o = null, l = null, u = e3.status, c = e3.statusText;
            if (e3.ok) {
              if ("HEAD" !== this.method) {
                let r4 = await e3.text();
                "" === r4 || (o = "text/csv" === this.headers.get("Accept") || this.headers.get("Accept") && (null == (t3 = this.headers.get("Accept")) ? void 0 : t3.includes("application/vnd.pgrst.plan+text")) ? r4 : JSON.parse(r4));
              }
              let s2 = null == (r3 = this.headers.get("Prefer")) ? void 0 : r3.match(/count=(exact|planned|estimated)/), i2 = null == (n = e3.headers.get("content-range")) ? void 0 : n.split("/");
              s2 && i2 && i2.length > 1 && (l = parseInt(i2[1])), this.isMaybeSingle && "GET" === this.method && Array.isArray(o) && (o.length > 1 ? (a = { code: "PGRST116", details: `Results contain ${o.length} rows, application/vnd.pgrst.object+json requires 1 row`, hint: null, message: "JSON object requested, multiple (or no) rows returned" }, o = null, l = null, u = 406, c = "Not Acceptable") : o = 1 === o.length ? o[0] : null);
            } else {
              let t4 = await e3.text();
              try {
                a = JSON.parse(t4), Array.isArray(a) && 404 === e3.status && (o = [], a = null, u = 200, c = "OK");
              } catch (r4) {
                404 === e3.status && "" === t4 ? (u = 204, c = "No Content") : a = { message: t4 };
              }
              if (a && this.isMaybeSingle && (null == (i = null == a ? void 0 : a.details) ? void 0 : i.includes("0 rows")) && (a = null, u = 200, c = "OK"), a && this.shouldThrowOnError) throw new s.default(a);
            }
            return { error: a, data: o, count: l, status: u, statusText: c };
          });
          return this.shouldThrowOnError || (r2 = r2.catch((e3) => {
            var t3, r3, s2, n, i, a;
            let o = "", l = null == e3 ? void 0 : e3.cause;
            if (l) {
              let i2 = null != (t3 = null == l ? void 0 : l.message) ? t3 : "", a2 = null != (r3 = null == l ? void 0 : l.code) ? r3 : "";
              o = `${null != (s2 = null == e3 ? void 0 : e3.name) ? s2 : "FetchError"}: ${null == e3 ? void 0 : e3.message}

Caused by: ${null != (n = null == l ? void 0 : l.name) ? n : "Error"}: ${i2}`, a2 && (o += ` (${a2})`), (null == l ? void 0 : l.stack) && (o += `
${l.stack}`);
            } else o = null != (i = null == e3 ? void 0 : e3.stack) ? i : "";
            return { error: { message: `${null != (a = null == e3 ? void 0 : e3.name) ? a : "FetchError"}: ${null == e3 ? void 0 : e3.message}`, details: o, hint: "", code: "" }, data: null, count: null, status: 0, statusText: "" };
          })), r2.then(e2, t2);
        }
        returns() {
          return this;
        }
        overrideTypes() {
          return this;
        }
      };
    }, 44588, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      let s = e.r(70858).__importDefault(e.r(1264));
      class n extends s.default {
        select(e2) {
          let t2 = false, r2 = (null != e2 ? e2 : "*").split("").map((e3) => /\s/.test(e3) && !t2 ? "" : ('"' === e3 && (t2 = !t2), e3)).join("");
          return this.url.searchParams.set("select", r2), this.headers.append("Prefer", "return=representation"), this;
        }
        order(e2, { ascending: t2 = true, nullsFirst: r2, foreignTable: s2, referencedTable: n2 = s2 } = {}) {
          let i = n2 ? `${n2}.order` : "order", a = this.url.searchParams.get(i);
          return this.url.searchParams.set(i, `${a ? `${a},` : ""}${e2}.${t2 ? "asc" : "desc"}${void 0 === r2 ? "" : r2 ? ".nullsfirst" : ".nullslast"}`), this;
        }
        limit(e2, { foreignTable: t2, referencedTable: r2 = t2 } = {}) {
          let s2 = void 0 === r2 ? "limit" : `${r2}.limit`;
          return this.url.searchParams.set(s2, `${e2}`), this;
        }
        range(e2, t2, { foreignTable: r2, referencedTable: s2 = r2 } = {}) {
          let n2 = void 0 === s2 ? "offset" : `${s2}.offset`, i = void 0 === s2 ? "limit" : `${s2}.limit`;
          return this.url.searchParams.set(n2, `${e2}`), this.url.searchParams.set(i, `${t2 - e2 + 1}`), this;
        }
        abortSignal(e2) {
          return this.signal = e2, this;
        }
        single() {
          return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
        }
        maybeSingle() {
          return "GET" === this.method ? this.headers.set("Accept", "application/json") : this.headers.set("Accept", "application/vnd.pgrst.object+json"), this.isMaybeSingle = true, this;
        }
        csv() {
          return this.headers.set("Accept", "text/csv"), this;
        }
        geojson() {
          return this.headers.set("Accept", "application/geo+json"), this;
        }
        explain({ analyze: e2 = false, verbose: t2 = false, settings: r2 = false, buffers: s2 = false, wal: n2 = false, format: i = "text" } = {}) {
          var a;
          let o = [e2 ? "analyze" : null, t2 ? "verbose" : null, r2 ? "settings" : null, s2 ? "buffers" : null, n2 ? "wal" : null].filter(Boolean).join("|"), l = null != (a = this.headers.get("Accept")) ? a : "application/json";
          return this.headers.set("Accept", `application/vnd.pgrst.plan+${i}; for="${l}"; options=${o};`), this;
        }
        rollback() {
          return this.headers.append("Prefer", "tx=rollback"), this;
        }
        returns() {
          return this;
        }
        maxAffected(e2) {
          return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e2}`), this;
        }
      }
      r.default = n;
    }, 37729, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      let s = e.r(70858).__importDefault(e.r(44588)), n = RegExp("[,()]");
      class i extends s.default {
        eq(e2, t2) {
          return this.url.searchParams.append(e2, `eq.${t2}`), this;
        }
        neq(e2, t2) {
          return this.url.searchParams.append(e2, `neq.${t2}`), this;
        }
        gt(e2, t2) {
          return this.url.searchParams.append(e2, `gt.${t2}`), this;
        }
        gte(e2, t2) {
          return this.url.searchParams.append(e2, `gte.${t2}`), this;
        }
        lt(e2, t2) {
          return this.url.searchParams.append(e2, `lt.${t2}`), this;
        }
        lte(e2, t2) {
          return this.url.searchParams.append(e2, `lte.${t2}`), this;
        }
        like(e2, t2) {
          return this.url.searchParams.append(e2, `like.${t2}`), this;
        }
        likeAllOf(e2, t2) {
          return this.url.searchParams.append(e2, `like(all).{${t2.join(",")}}`), this;
        }
        likeAnyOf(e2, t2) {
          return this.url.searchParams.append(e2, `like(any).{${t2.join(",")}}`), this;
        }
        ilike(e2, t2) {
          return this.url.searchParams.append(e2, `ilike.${t2}`), this;
        }
        ilikeAllOf(e2, t2) {
          return this.url.searchParams.append(e2, `ilike(all).{${t2.join(",")}}`), this;
        }
        ilikeAnyOf(e2, t2) {
          return this.url.searchParams.append(e2, `ilike(any).{${t2.join(",")}}`), this;
        }
        regexMatch(e2, t2) {
          return this.url.searchParams.append(e2, `match.${t2}`), this;
        }
        regexIMatch(e2, t2) {
          return this.url.searchParams.append(e2, `imatch.${t2}`), this;
        }
        is(e2, t2) {
          return this.url.searchParams.append(e2, `is.${t2}`), this;
        }
        isDistinct(e2, t2) {
          return this.url.searchParams.append(e2, `isdistinct.${t2}`), this;
        }
        in(e2, t2) {
          let r2 = Array.from(new Set(t2)).map((e3) => "string" == typeof e3 && n.test(e3) ? `"${e3}"` : `${e3}`).join(",");
          return this.url.searchParams.append(e2, `in.(${r2})`), this;
        }
        contains(e2, t2) {
          return "string" == typeof t2 ? this.url.searchParams.append(e2, `cs.${t2}`) : Array.isArray(t2) ? this.url.searchParams.append(e2, `cs.{${t2.join(",")}}`) : this.url.searchParams.append(e2, `cs.${JSON.stringify(t2)}`), this;
        }
        containedBy(e2, t2) {
          return "string" == typeof t2 ? this.url.searchParams.append(e2, `cd.${t2}`) : Array.isArray(t2) ? this.url.searchParams.append(e2, `cd.{${t2.join(",")}}`) : this.url.searchParams.append(e2, `cd.${JSON.stringify(t2)}`), this;
        }
        rangeGt(e2, t2) {
          return this.url.searchParams.append(e2, `sr.${t2}`), this;
        }
        rangeGte(e2, t2) {
          return this.url.searchParams.append(e2, `nxl.${t2}`), this;
        }
        rangeLt(e2, t2) {
          return this.url.searchParams.append(e2, `sl.${t2}`), this;
        }
        rangeLte(e2, t2) {
          return this.url.searchParams.append(e2, `nxr.${t2}`), this;
        }
        rangeAdjacent(e2, t2) {
          return this.url.searchParams.append(e2, `adj.${t2}`), this;
        }
        overlaps(e2, t2) {
          return "string" == typeof t2 ? this.url.searchParams.append(e2, `ov.${t2}`) : this.url.searchParams.append(e2, `ov.{${t2.join(",")}}`), this;
        }
        textSearch(e2, t2, { config: r2, type: s2 } = {}) {
          let n2 = "";
          "plain" === s2 ? n2 = "pl" : "phrase" === s2 ? n2 = "ph" : "websearch" === s2 && (n2 = "w");
          let i2 = void 0 === r2 ? "" : `(${r2})`;
          return this.url.searchParams.append(e2, `${n2}fts${i2}.${t2}`), this;
        }
        match(e2) {
          return Object.entries(e2).forEach(([e3, t2]) => {
            this.url.searchParams.append(e3, `eq.${t2}`);
          }), this;
        }
        not(e2, t2, r2) {
          return this.url.searchParams.append(e2, `not.${t2}.${r2}`), this;
        }
        or(e2, { foreignTable: t2, referencedTable: r2 = t2 } = {}) {
          let s2 = r2 ? `${r2}.or` : "or";
          return this.url.searchParams.append(s2, `(${e2})`), this;
        }
        filter(e2, t2, r2) {
          return this.url.searchParams.append(e2, `${t2}.${r2}`), this;
        }
      }
      r.default = i;
    }, 89237, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      let s = e.r(70858).__importDefault(e.r(37729));
      r.default = class {
        constructor(e2, { headers: t2 = {}, schema: r2, fetch: s2 }) {
          this.url = e2, this.headers = new Headers(t2), this.schema = r2, this.fetch = s2;
        }
        select(e2, t2) {
          let { head: r2 = false, count: n } = null != t2 ? t2 : {}, i = false, a = (null != e2 ? e2 : "*").split("").map((e3) => /\s/.test(e3) && !i ? "" : ('"' === e3 && (i = !i), e3)).join("");
          return this.url.searchParams.set("select", a), n && this.headers.append("Prefer", `count=${n}`), new s.default({ method: r2 ? "HEAD" : "GET", url: this.url, headers: this.headers, schema: this.schema, fetch: this.fetch });
        }
        insert(e2, { count: t2, defaultToNull: r2 = true } = {}) {
          var n;
          if (t2 && this.headers.append("Prefer", `count=${t2}`), r2 || this.headers.append("Prefer", "missing=default"), Array.isArray(e2)) {
            let t3 = e2.reduce((e3, t4) => e3.concat(Object.keys(t4)), []);
            if (t3.length > 0) {
              let e3 = [...new Set(t3)].map((e4) => `"${e4}"`);
              this.url.searchParams.set("columns", e3.join(","));
            }
          }
          return new s.default({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e2, fetch: null != (n = this.fetch) ? n : fetch });
        }
        upsert(e2, { onConflict: t2, ignoreDuplicates: r2 = false, count: n, defaultToNull: i = true } = {}) {
          var a;
          if (this.headers.append("Prefer", `resolution=${r2 ? "ignore" : "merge"}-duplicates`), void 0 !== t2 && this.url.searchParams.set("on_conflict", t2), n && this.headers.append("Prefer", `count=${n}`), i || this.headers.append("Prefer", "missing=default"), Array.isArray(e2)) {
            let t3 = e2.reduce((e3, t4) => e3.concat(Object.keys(t4)), []);
            if (t3.length > 0) {
              let e3 = [...new Set(t3)].map((e4) => `"${e4}"`);
              this.url.searchParams.set("columns", e3.join(","));
            }
          }
          return new s.default({ method: "POST", url: this.url, headers: this.headers, schema: this.schema, body: e2, fetch: null != (a = this.fetch) ? a : fetch });
        }
        update(e2, { count: t2 } = {}) {
          var r2;
          return t2 && this.headers.append("Prefer", `count=${t2}`), new s.default({ method: "PATCH", url: this.url, headers: this.headers, schema: this.schema, body: e2, fetch: null != (r2 = this.fetch) ? r2 : fetch });
        }
        delete({ count: e2 } = {}) {
          var t2;
          return e2 && this.headers.append("Prefer", `count=${e2}`), new s.default({ method: "DELETE", url: this.url, headers: this.headers, schema: this.schema, fetch: null != (t2 = this.fetch) ? t2 : fetch });
        }
      };
    }, 51048, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      let s = e.r(70858), n = s.__importDefault(e.r(89237)), i = s.__importDefault(e.r(37729));
      class a {
        constructor(e2, { headers: t2 = {}, schema: r2, fetch: s2 } = {}) {
          this.url = e2, this.headers = new Headers(t2), this.schemaName = r2, this.fetch = s2;
        }
        from(e2) {
          if (!e2 || "string" != typeof e2 || "" === e2.trim()) throw Error("Invalid relation name: relation must be a non-empty string.");
          let t2 = new URL(`${this.url}/${e2}`);
          return new n.default(t2, { headers: new Headers(this.headers), schema: this.schemaName, fetch: this.fetch });
        }
        schema(e2) {
          return new a(this.url, { headers: this.headers, schema: e2, fetch: this.fetch });
        }
        rpc(e2, t2 = {}, { head: r2 = false, get: s2 = false, count: n2 } = {}) {
          var a2;
          let o, l, u = new URL(`${this.url}/rpc/${e2}`);
          r2 || s2 ? (o = r2 ? "HEAD" : "GET", Object.entries(t2).filter(([e3, t3]) => void 0 !== t3).map(([e3, t3]) => [e3, Array.isArray(t3) ? `{${t3.join(",")}}` : `${t3}`]).forEach(([e3, t3]) => {
            u.searchParams.append(e3, t3);
          })) : (o = "POST", l = t2);
          let c = new Headers(this.headers);
          return n2 && c.set("Prefer", `count=${n2}`), new i.default({ method: o, url: u, headers: c, schema: this.schemaName, body: l, fetch: null != (a2 = this.fetch) ? a2 : fetch });
        }
      }
      r.default = a;
    }, 1565, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), r.PostgrestError = r.PostgrestBuilder = r.PostgrestTransformBuilder = r.PostgrestFilterBuilder = r.PostgrestQueryBuilder = r.PostgrestClient = void 0;
      let s = e.r(70858), n = s.__importDefault(e.r(51048));
      r.PostgrestClient = n.default;
      let i = s.__importDefault(e.r(89237));
      r.PostgrestQueryBuilder = i.default;
      let a = s.__importDefault(e.r(37729));
      r.PostgrestFilterBuilder = a.default;
      let o = s.__importDefault(e.r(44588));
      r.PostgrestTransformBuilder = o.default;
      let l = s.__importDefault(e.r(1264));
      r.PostgrestBuilder = l.default;
      let u = s.__importDefault(e.r(93143));
      r.PostgrestError = u.default, r.default = { PostgrestClient: n.default, PostgrestQueryBuilder: i.default, PostgrestFilterBuilder: a.default, PostgrestTransformBuilder: o.default, PostgrestBuilder: l.default, PostgrestError: u.default };
    }, 76056, (e) => {
      "use strict";
      var t, r, s, n, i, a, o, l, u, c, h, d, p, f, g, m, b, y, v;
      let w = class {
        static detectEnvironment() {
          var t2;
          if ("undefined" != typeof WebSocket) return { type: "native", constructor: WebSocket };
          if ("undefined" != typeof globalThis && void 0 !== globalThis.WebSocket) return { type: "native", constructor: globalThis.WebSocket };
          if (void 0 !== e.g.WebSocket) return { type: "native", constructor: e.g.WebSocket };
          if ("undefined" != typeof globalThis && void 0 !== globalThis.WebSocketPair && void 0 === globalThis.WebSocket) return { type: "cloudflare", error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.", workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime." };
          if ("undefined" != typeof globalThis && globalThis.EdgeRuntime || "undefined" != typeof navigator && (null == (t2 = navigator.userAgent) ? void 0 : t2.includes("Vercel-Edge"))) return { type: "unsupported", error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.", workaround: "Use serverless functions or a different deployment target for WebSocket functionality." };
          if ("undefined" != typeof process) {
            let e2 = process.versions;
            if (e2 && e2.node) {
              let t3 = parseInt(e2.node.replace(/^v/, "").split(".")[0]);
              return t3 >= 22 ? void 0 !== globalThis.WebSocket ? { type: "native", constructor: globalThis.WebSocket } : { type: "unsupported", error: `Node.js ${t3} detected but native WebSocket not found.`, workaround: "Provide a WebSocket implementation via the transport option." } : { type: "unsupported", error: `Node.js ${t3} detected without native WebSocket support.`, workaround: 'For Node.js < 22, install "ws" package and provide it via the transport option:\nimport ws from "ws"\nnew RealtimeClient(url, { transport: ws })' };
            }
          }
          return { type: "unsupported", error: "Unknown JavaScript runtime without WebSocket support.", workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation." };
        }
        static getWebSocketConstructor() {
          let e2 = this.detectEnvironment();
          if (e2.constructor) return e2.constructor;
          let t2 = e2.error || "WebSocket not supported in this environment.";
          throw e2.workaround && (t2 += `

Suggested solution: ${e2.workaround}`), Error(t2);
        }
        static createWebSocket(e2, t2) {
          return new (this.getWebSocketConstructor())(e2, t2);
        }
        static isWebSocketSupported() {
          try {
            let e2 = this.detectEnvironment();
            return "native" === e2.type || "ws" === e2.type;
          } catch (e2) {
            return false;
          }
        }
      }, _ = "1.0.0";
      (h = t || (t = {}))[h.connecting = 0] = "connecting", h[h.open = 1] = "open", h[h.closing = 2] = "closing", h[h.closed = 3] = "closed", (d = r || (r = {})).closed = "closed", d.errored = "errored", d.joined = "joined", d.joining = "joining", d.leaving = "leaving", (p = s || (s = {})).close = "phx_close", p.error = "phx_error", p.join = "phx_join", p.reply = "phx_reply", p.leave = "phx_leave", p.access_token = "access_token", (n || (n = {})).websocket = "websocket", (f = i || (i = {})).Connecting = "connecting", f.Open = "open", f.Closing = "closing", f.Closed = "closed";
      class E {
        constructor(e2) {
          this.HEADER_LENGTH = 1, this.USER_BROADCAST_PUSH_META_LENGTH = 6, this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }, this.BINARY_ENCODING = 0, this.JSON_ENCODING = 1, this.BROADCAST_EVENT = "broadcast", this.allowedMetadataKeys = [], this.allowedMetadataKeys = null != e2 ? e2 : [];
        }
        encode(e2, t2) {
          return e2.event !== this.BROADCAST_EVENT || e2.payload instanceof ArrayBuffer || "string" != typeof e2.payload.event ? t2(JSON.stringify([e2.join_ref, e2.ref, e2.topic, e2.event, e2.payload])) : t2(this._binaryEncodeUserBroadcastPush(e2));
        }
        _binaryEncodeUserBroadcastPush(e2) {
          var t2;
          return this._isArrayBuffer(null == (t2 = e2.payload) ? void 0 : t2.payload) ? this._encodeBinaryUserBroadcastPush(e2) : this._encodeJsonUserBroadcastPush(e2);
        }
        _encodeBinaryUserBroadcastPush(e2) {
          var t2, r2;
          let s2 = null != (r2 = null == (t2 = e2.payload) ? void 0 : t2.payload) ? r2 : new ArrayBuffer(0);
          return this._encodeUserBroadcastPush(e2, this.BINARY_ENCODING, s2);
        }
        _encodeJsonUserBroadcastPush(e2) {
          var t2, r2;
          let s2 = null != (r2 = null == (t2 = e2.payload) ? void 0 : t2.payload) ? r2 : {}, n2 = new TextEncoder().encode(JSON.stringify(s2)).buffer;
          return this._encodeUserBroadcastPush(e2, this.JSON_ENCODING, n2);
        }
        _encodeUserBroadcastPush(e2, t2, r2) {
          let s2 = e2.topic, n2 = null != (p2 = e2.ref) ? p2 : "", i2 = null != (f2 = e2.join_ref) ? f2 : "", a2 = e2.payload.event, o2 = this.allowedMetadataKeys ? this._pick(e2.payload, this.allowedMetadataKeys) : {}, l2 = 0 === Object.keys(o2).length ? "" : JSON.stringify(o2);
          if (i2.length > 255) throw Error(`joinRef length ${i2.length} exceeds maximum of 255`);
          if (n2.length > 255) throw Error(`ref length ${n2.length} exceeds maximum of 255`);
          if (s2.length > 255) throw Error(`topic length ${s2.length} exceeds maximum of 255`);
          if (a2.length > 255) throw Error(`userEvent length ${a2.length} exceeds maximum of 255`);
          if (l2.length > 255) throw Error(`metadata length ${l2.length} exceeds maximum of 255`);
          let u2 = this.USER_BROADCAST_PUSH_META_LENGTH + i2.length + n2.length + s2.length + a2.length + l2.length, c2 = new ArrayBuffer(this.HEADER_LENGTH + u2), h2 = new DataView(c2), d2 = 0;
          h2.setUint8(d2++, this.KINDS.userBroadcastPush), h2.setUint8(d2++, i2.length), h2.setUint8(d2++, n2.length), h2.setUint8(d2++, s2.length), h2.setUint8(d2++, a2.length), h2.setUint8(d2++, l2.length), h2.setUint8(d2++, t2), Array.from(i2, (e3) => h2.setUint8(d2++, e3.charCodeAt(0))), Array.from(n2, (e3) => h2.setUint8(d2++, e3.charCodeAt(0))), Array.from(s2, (e3) => h2.setUint8(d2++, e3.charCodeAt(0))), Array.from(a2, (e3) => h2.setUint8(d2++, e3.charCodeAt(0))), Array.from(l2, (e3) => h2.setUint8(d2++, e3.charCodeAt(0)));
          var p2, f2, g2 = new Uint8Array(c2.byteLength + r2.byteLength);
          return g2.set(new Uint8Array(c2), 0), g2.set(new Uint8Array(r2), c2.byteLength), g2.buffer;
        }
        decode(e2, t2) {
          if (this._isArrayBuffer(e2)) return t2(this._binaryDecode(e2));
          if ("string" == typeof e2) {
            let [r2, s2, n2, i2, a2] = JSON.parse(e2);
            return t2({ join_ref: r2, ref: s2, topic: n2, event: i2, payload: a2 });
          }
          return t2({});
        }
        _binaryDecode(e2) {
          let t2 = new DataView(e2), r2 = t2.getUint8(0), s2 = new TextDecoder();
          if (r2 === this.KINDS.userBroadcast) return this._decodeUserBroadcast(e2, t2, s2);
        }
        _decodeUserBroadcast(e2, t2, r2) {
          let s2 = t2.getUint8(1), n2 = t2.getUint8(2), i2 = t2.getUint8(3), a2 = t2.getUint8(4), o2 = this.HEADER_LENGTH + 4, l2 = r2.decode(e2.slice(o2, o2 + s2));
          o2 += s2;
          let u2 = r2.decode(e2.slice(o2, o2 + n2));
          o2 += n2;
          let c2 = r2.decode(e2.slice(o2, o2 + i2));
          o2 += i2;
          let h2 = e2.slice(o2, e2.byteLength), d2 = a2 === this.JSON_ENCODING ? JSON.parse(r2.decode(h2)) : h2, p2 = { type: this.BROADCAST_EVENT, event: u2, payload: d2 };
          return i2 > 0 && (p2.meta = JSON.parse(c2)), { join_ref: null, ref: null, topic: l2, event: this.BROADCAST_EVENT, payload: p2 };
        }
        _isArrayBuffer(e2) {
          var t2;
          return e2 instanceof ArrayBuffer || (null == (t2 = null == e2 ? void 0 : e2.constructor) ? void 0 : t2.name) === "ArrayBuffer";
        }
        _pick(e2, t2) {
          return e2 && "object" == typeof e2 ? Object.fromEntries(Object.entries(e2).filter(([e3]) => t2.includes(e3))) : {};
        }
      }
      class S {
        constructor(e2, t2) {
          this.callback = e2, this.timerCalc = t2, this.timer = void 0, this.tries = 0, this.callback = e2, this.timerCalc = t2;
        }
        reset() {
          this.tries = 0, clearTimeout(this.timer), this.timer = void 0;
        }
        scheduleTimeout() {
          clearTimeout(this.timer), this.timer = setTimeout(() => {
            this.tries = this.tries + 1, this.callback();
          }, this.timerCalc(this.tries + 1));
        }
      }
      (g = a || (a = {})).abstime = "abstime", g.bool = "bool", g.date = "date", g.daterange = "daterange", g.float4 = "float4", g.float8 = "float8", g.int2 = "int2", g.int4 = "int4", g.int4range = "int4range", g.int8 = "int8", g.int8range = "int8range", g.json = "json", g.jsonb = "jsonb", g.money = "money", g.numeric = "numeric", g.oid = "oid", g.reltime = "reltime", g.text = "text", g.time = "time", g.timestamp = "timestamp", g.timestamptz = "timestamptz", g.timetz = "timetz", g.tsrange = "tsrange", g.tstzrange = "tstzrange";
      let O = (e2, t2, r2 = {}) => {
        var s2;
        let n2 = null != (s2 = r2.skipTypes) ? s2 : [];
        return t2 ? Object.keys(t2).reduce((r3, s3) => (r3[s3] = T(s3, e2, t2, n2), r3), {}) : {};
      }, T = (e2, t2, r2, s2) => {
        let n2 = t2.find((t3) => t3.name === e2), i2 = null == n2 ? void 0 : n2.type, a2 = r2[e2];
        return i2 && !s2.includes(i2) ? k(i2, a2) : R(a2);
      }, k = (e2, t2) => {
        if ("_" === e2.charAt(0)) return A(t2, e2.slice(1, e2.length));
        switch (e2) {
          case a.bool:
            return x(t2);
          case a.float4:
          case a.float8:
          case a.int2:
          case a.int4:
          case a.int8:
          case a.numeric:
          case a.oid:
            return P(t2);
          case a.json:
          case a.jsonb:
            return C(t2);
          case a.timestamp:
            return j(t2);
          case a.abstime:
          case a.date:
          case a.daterange:
          case a.int4range:
          case a.int8range:
          case a.money:
          case a.reltime:
          case a.text:
          case a.time:
          case a.timestamptz:
          case a.timetz:
          case a.tsrange:
          case a.tstzrange:
          default:
            return R(t2);
        }
      }, R = (e2) => e2, x = (e2) => {
        switch (e2) {
          case "t":
            return true;
          case "f":
            return false;
          default:
            return e2;
        }
      }, P = (e2) => {
        if ("string" == typeof e2) {
          let t2 = parseFloat(e2);
          if (!Number.isNaN(t2)) return t2;
        }
        return e2;
      }, C = (e2) => {
        if ("string" == typeof e2) try {
          return JSON.parse(e2);
        } catch (e3) {
          console.log(`JSON parse error: ${e3}`);
        }
        return e2;
      }, A = (e2, t2) => {
        if ("string" != typeof e2) return e2;
        let r2 = e2.length - 1, s2 = e2[r2];
        if ("{" === e2[0] && "}" === s2) {
          let s3, n2 = e2.slice(1, r2);
          try {
            s3 = JSON.parse("[" + n2 + "]");
          } catch (e3) {
            s3 = n2 ? n2.split(",") : [];
          }
          return s3.map((e3) => k(t2, e3));
        }
        return e2;
      }, j = (e2) => "string" == typeof e2 ? e2.replace(" ", "T") : e2, I = (e2) => {
        let t2 = new URL(e2);
        return t2.protocol = t2.protocol.replace(/^ws/i, "http"), t2.pathname = t2.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), "" === t2.pathname || "/" === t2.pathname ? t2.pathname = "/api/broadcast" : t2.pathname = t2.pathname + "/api/broadcast", t2.href;
      };
      class N {
        constructor(e2, t2, r2 = {}, s2 = 1e4) {
          this.channel = e2, this.event = t2, this.payload = r2, this.timeout = s2, this.sent = false, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
        }
        resend(e2) {
          this.timeout = e2, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = false, this.send();
        }
        send() {
          this._hasReceived("timeout") || (this.startTimeout(), this.sent = true, this.channel.socket.push({ topic: this.channel.topic, event: this.event, payload: this.payload, ref: this.ref, join_ref: this.channel._joinRef() }));
        }
        updatePayload(e2) {
          this.payload = Object.assign(Object.assign({}, this.payload), e2);
        }
        receive(e2, t2) {
          var r2;
          return this._hasReceived(e2) && t2(null == (r2 = this.receivedResp) ? void 0 : r2.response), this.recHooks.push({ status: e2, callback: t2 }), this;
        }
        startTimeout() {
          if (this.timeoutTimer) return;
          this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref);
          let e2 = (e3) => {
            this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = e3, this._matchReceive(e3);
          };
          this.channel._on(this.refEvent, {}, e2), this.timeoutTimer = setTimeout(() => {
            this.trigger("timeout", {});
          }, this.timeout);
        }
        trigger(e2, t2) {
          this.refEvent && this.channel._trigger(this.refEvent, { status: e2, response: t2 });
        }
        destroy() {
          this._cancelRefEvent(), this._cancelTimeout();
        }
        _cancelRefEvent() {
          this.refEvent && this.channel._off(this.refEvent, {});
        }
        _cancelTimeout() {
          clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
        }
        _matchReceive({ status: e2, response: t2 }) {
          this.recHooks.filter((t3) => t3.status === e2).forEach((e3) => e3.callback(t2));
        }
        _hasReceived(e2) {
          return this.receivedResp && this.receivedResp.status === e2;
        }
      }
      (m = o || (o = {})).SYNC = "sync", m.JOIN = "join", m.LEAVE = "leave";
      class $ {
        constructor(e2, t2) {
          this.channel = e2, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.enabled = false, this.caller = { onJoin: () => {
          }, onLeave: () => {
          }, onSync: () => {
          } };
          const r2 = (null == t2 ? void 0 : t2.events) || { state: "presence_state", diff: "presence_diff" };
          this.channel._on(r2.state, {}, (e3) => {
            let { onJoin: t3, onLeave: r3, onSync: s2 } = this.caller;
            this.joinRef = this.channel._joinRef(), this.state = $.syncState(this.state, e3, t3, r3), this.pendingDiffs.forEach((e4) => {
              this.state = $.syncDiff(this.state, e4, t3, r3);
            }), this.pendingDiffs = [], s2();
          }), this.channel._on(r2.diff, {}, (e3) => {
            let { onJoin: t3, onLeave: r3, onSync: s2 } = this.caller;
            this.inPendingSyncState() ? this.pendingDiffs.push(e3) : (this.state = $.syncDiff(this.state, e3, t3, r3), s2());
          }), this.onJoin((e3, t3, r3) => {
            this.channel._trigger("presence", { event: "join", key: e3, currentPresences: t3, newPresences: r3 });
          }), this.onLeave((e3, t3, r3) => {
            this.channel._trigger("presence", { event: "leave", key: e3, currentPresences: t3, leftPresences: r3 });
          }), this.onSync(() => {
            this.channel._trigger("presence", { event: "sync" });
          });
        }
        static syncState(e2, t2, r2, s2) {
          let n2 = this.cloneDeep(e2), i2 = this.transformState(t2), a2 = {}, o2 = {};
          return this.map(n2, (e3, t3) => {
            i2[e3] || (o2[e3] = t3);
          }), this.map(i2, (e3, t3) => {
            let r3 = n2[e3];
            if (r3) {
              let s3 = t3.map((e4) => e4.presence_ref), n3 = r3.map((e4) => e4.presence_ref), i3 = t3.filter((e4) => 0 > n3.indexOf(e4.presence_ref)), l2 = r3.filter((e4) => 0 > s3.indexOf(e4.presence_ref));
              i3.length > 0 && (a2[e3] = i3), l2.length > 0 && (o2[e3] = l2);
            } else a2[e3] = t3;
          }), this.syncDiff(n2, { joins: a2, leaves: o2 }, r2, s2);
        }
        static syncDiff(e2, t2, r2, s2) {
          let { joins: n2, leaves: i2 } = { joins: this.transformState(t2.joins), leaves: this.transformState(t2.leaves) };
          return r2 || (r2 = () => {
          }), s2 || (s2 = () => {
          }), this.map(n2, (t3, s3) => {
            var n3;
            let i3 = null != (n3 = e2[t3]) ? n3 : [];
            if (e2[t3] = this.cloneDeep(s3), i3.length > 0) {
              let r3 = e2[t3].map((e3) => e3.presence_ref), s4 = i3.filter((e3) => 0 > r3.indexOf(e3.presence_ref));
              e2[t3].unshift(...s4);
            }
            r2(t3, i3, s3);
          }), this.map(i2, (t3, r3) => {
            let n3 = e2[t3];
            if (!n3) return;
            let i3 = r3.map((e3) => e3.presence_ref);
            n3 = n3.filter((e3) => 0 > i3.indexOf(e3.presence_ref)), e2[t3] = n3, s2(t3, n3, r3), 0 === n3.length && delete e2[t3];
          }), e2;
        }
        static map(e2, t2) {
          return Object.getOwnPropertyNames(e2).map((r2) => t2(r2, e2[r2]));
        }
        static transformState(e2) {
          return Object.getOwnPropertyNames(e2 = this.cloneDeep(e2)).reduce((t2, r2) => {
            let s2 = e2[r2];
            return "metas" in s2 ? t2[r2] = s2.metas.map((e3) => (e3.presence_ref = e3.phx_ref, delete e3.phx_ref, delete e3.phx_ref_prev, e3)) : t2[r2] = s2, t2;
          }, {});
        }
        static cloneDeep(e2) {
          return JSON.parse(JSON.stringify(e2));
        }
        onJoin(e2) {
          this.caller.onJoin = e2;
        }
        onLeave(e2) {
          this.caller.onLeave = e2;
        }
        onSync(e2) {
          this.caller.onSync = e2;
        }
        inPendingSyncState() {
          return !this.joinRef || this.joinRef !== this.channel._joinRef();
        }
      }
      (b = l || (l = {})).ALL = "*", b.INSERT = "INSERT", b.UPDATE = "UPDATE", b.DELETE = "DELETE", (y = u || (u = {})).BROADCAST = "broadcast", y.PRESENCE = "presence", y.POSTGRES_CHANGES = "postgres_changes", y.SYSTEM = "system", (v = c || (c = {})).SUBSCRIBED = "SUBSCRIBED", v.TIMED_OUT = "TIMED_OUT", v.CLOSED = "CLOSED", v.CHANNEL_ERROR = "CHANNEL_ERROR";
      let D = r;
      class L {
        constructor(e2, t2 = { config: {} }, n2) {
          var i2, a2;
          if (this.topic = e2, this.params = t2, this.socket = n2, this.bindings = {}, this.state = r.closed, this.joinedOnce = false, this.pushBuffer = [], this.subTopic = e2.replace(/^realtime:/i, ""), this.params.config = Object.assign({ broadcast: { ack: false, self: false }, presence: { key: "", enabled: false }, private: false }, t2.config), this.timeout = this.socket.timeout, this.joinPush = new N(this, s.join, this.params, this.timeout), this.rejoinTimer = new S(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
            this.state = r.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((e3) => e3.send()), this.pushBuffer = [];
          }), this._onClose(() => {
            this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = r.closed, this.socket._remove(this);
          }), this._onError((e3) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, e3), this.state = r.errored, this.rejoinTimer.scheduleTimeout());
          }), this.joinPush.receive("timeout", () => {
            this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = r.errored, this.rejoinTimer.scheduleTimeout());
          }), this.joinPush.receive("error", (e3) => {
            this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, e3), this.state = r.errored, this.rejoinTimer.scheduleTimeout());
          }), this._on(s.reply, {}, (e3, t3) => {
            this._trigger(this._replyEventName(t3), e3);
          }), this.presence = new $(this), this.broadcastEndpointURL = I(this.socket.endPoint), this.private = this.params.config.private || false, !this.private && (null == (a2 = null == (i2 = this.params.config) ? void 0 : i2.broadcast) ? void 0 : a2.replay)) throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
        }
        subscribe(e2, t2 = this.timeout) {
          var s2, n2, i2;
          if (this.socket.isConnected() || this.socket.connect(), this.state == r.closed) {
            let { config: { broadcast: a2, presence: o2, private: l2 } } = this.params, h2 = null != (n2 = null == (s2 = this.bindings.postgres_changes) ? void 0 : s2.map((e3) => e3.filter)) ? n2 : [], d2 = !!this.bindings[u.PRESENCE] && this.bindings[u.PRESENCE].length > 0 || (null == (i2 = this.params.config.presence) ? void 0 : i2.enabled) === true, p2 = {}, f2 = { broadcast: a2, presence: Object.assign(Object.assign({}, o2), { enabled: d2 }), postgres_changes: h2, private: l2 };
            this.socket.accessTokenValue && (p2.access_token = this.socket.accessTokenValue), this._onError((t3) => null == e2 ? void 0 : e2(c.CHANNEL_ERROR, t3)), this._onClose(() => null == e2 ? void 0 : e2(c.CLOSED)), this.updateJoinPayload(Object.assign({ config: f2 }, p2)), this.joinedOnce = true, this._rejoin(t2), this.joinPush.receive("ok", async ({ postgres_changes: t3 }) => {
              var s3;
              if (this.socket._isManualToken() || this.socket.setAuth(), void 0 === t3) {
                null == e2 || e2(c.SUBSCRIBED);
                return;
              }
              {
                let n3 = this.bindings.postgres_changes, i3 = null != (s3 = null == n3 ? void 0 : n3.length) ? s3 : 0, a3 = [];
                for (let s4 = 0; s4 < i3; s4++) {
                  let i4 = n3[s4], { filter: { event: o3, schema: l3, table: u2, filter: h3 } } = i4, d3 = t3 && t3[s4];
                  if (d3 && d3.event === o3 && L.isFilterValueEqual(d3.schema, l3) && L.isFilterValueEqual(d3.table, u2) && L.isFilterValueEqual(d3.filter, h3)) a3.push(Object.assign(Object.assign({}, i4), { id: d3.id }));
                  else {
                    this.unsubscribe(), this.state = r.errored, null == e2 || e2(c.CHANNEL_ERROR, Error("mismatch between server and client bindings for postgres changes"));
                    return;
                  }
                }
                this.bindings.postgres_changes = a3, e2 && e2(c.SUBSCRIBED);
                return;
              }
            }).receive("error", (t3) => {
              this.state = r.errored, null == e2 || e2(c.CHANNEL_ERROR, Error(JSON.stringify(Object.values(t3).join(", ") || "error")));
            }).receive("timeout", () => {
              null == e2 || e2(c.TIMED_OUT);
            });
          }
          return this;
        }
        presenceState() {
          return this.presence.state;
        }
        async track(e2, t2 = {}) {
          return await this.send({ type: "presence", event: "track", payload: e2 }, t2.timeout || this.timeout);
        }
        async untrack(e2 = {}) {
          return await this.send({ type: "presence", event: "untrack" }, e2);
        }
        on(e2, t2, s2) {
          return this.state === r.joined && e2 === u.PRESENCE && (this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`), this.unsubscribe().then(async () => await this.subscribe())), this._on(e2, t2, s2);
        }
        async httpSend(e2, t2, r2 = {}) {
          var s2;
          let n2 = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
          if (null == t2) return Promise.reject("Payload is required for httpSend()");
          let i2 = { method: "POST", headers: { Authorization: n2, apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: e2, payload: t2, private: this.private }] }) }, a2 = await this._fetchWithTimeout(this.broadcastEndpointURL, i2, null != (s2 = r2.timeout) ? s2 : this.timeout);
          if (202 === a2.status) return { success: true };
          let o2 = a2.statusText;
          try {
            let e3 = await a2.json();
            o2 = e3.error || e3.message || o2;
          } catch (e3) {
          }
          return Promise.reject(Error(o2));
        }
        async send(e2, t2 = {}) {
          var r2, s2;
          if (this._canPush() || "broadcast" !== e2.type) return new Promise((r3) => {
            var s3, n2, i2;
            let a2 = this._push(e2.type, e2, t2.timeout || this.timeout);
            "broadcast" !== e2.type || (null == (i2 = null == (n2 = null == (s3 = this.params) ? void 0 : s3.config) ? void 0 : n2.broadcast) ? void 0 : i2.ack) || r3("ok"), a2.receive("ok", () => r3("ok")), a2.receive("error", () => r3("error")), a2.receive("timeout", () => r3("timed out"));
          });
          {
            console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
            let { event: n2, payload: i2 } = e2, a2 = { method: "POST", headers: { Authorization: this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "", apikey: this.socket.apiKey ? this.socket.apiKey : "", "Content-Type": "application/json" }, body: JSON.stringify({ messages: [{ topic: this.subTopic, event: n2, payload: i2, private: this.private }] }) };
            try {
              let e3 = await this._fetchWithTimeout(this.broadcastEndpointURL, a2, null != (r2 = t2.timeout) ? r2 : this.timeout);
              return await (null == (s2 = e3.body) ? void 0 : s2.cancel()), e3.ok ? "ok" : "error";
            } catch (e3) {
              if ("AbortError" === e3.name) return "timed out";
              return "error";
            }
          }
        }
        updateJoinPayload(e2) {
          this.joinPush.updatePayload(e2);
        }
        unsubscribe(e2 = this.timeout) {
          this.state = r.leaving;
          let t2 = () => {
            this.socket.log("channel", `leave ${this.topic}`), this._trigger(s.close, "leave", this._joinRef());
          };
          this.joinPush.destroy();
          let n2 = null;
          return new Promise((r2) => {
            (n2 = new N(this, s.leave, {}, e2)).receive("ok", () => {
              t2(), r2("ok");
            }).receive("timeout", () => {
              t2(), r2("timed out");
            }).receive("error", () => {
              r2("error");
            }), n2.send(), this._canPush() || n2.trigger("ok", {});
          }).finally(() => {
            null == n2 || n2.destroy();
          });
        }
        teardown() {
          this.pushBuffer.forEach((e2) => e2.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = r.closed, this.bindings = {};
        }
        async _fetchWithTimeout(e2, t2, r2) {
          let s2 = new AbortController(), n2 = setTimeout(() => s2.abort(), r2), i2 = await this.socket.fetch(e2, Object.assign(Object.assign({}, t2), { signal: s2.signal }));
          return clearTimeout(n2), i2;
        }
        _push(e2, t2, r2 = this.timeout) {
          if (!this.joinedOnce) throw `tried to push '${e2}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
          let s2 = new N(this, e2, t2, r2);
          return this._canPush() ? s2.send() : this._addToPushBuffer(s2), s2;
        }
        _addToPushBuffer(e2) {
          if (e2.startTimeout(), this.pushBuffer.push(e2), this.pushBuffer.length > 100) {
            let e3 = this.pushBuffer.shift();
            e3 && (e3.destroy(), this.socket.log("channel", `discarded push due to buffer overflow: ${e3.event}`, e3.payload));
          }
        }
        _onMessage(e2, t2, r2) {
          return t2;
        }
        _isMember(e2) {
          return this.topic === e2;
        }
        _joinRef() {
          return this.joinPush.ref;
        }
        _trigger(e2, t2, r2) {
          var n2, i2;
          let a2 = e2.toLocaleLowerCase(), { close: o2, error: l2, leave: u2, join: c2 } = s;
          if (r2 && [o2, l2, u2, c2].indexOf(a2) >= 0 && r2 !== this._joinRef()) return;
          let h2 = this._onMessage(a2, t2, r2);
          if (t2 && !h2) throw "channel onMessage callbacks must return the payload, modified or unmodified";
          ["insert", "update", "delete"].includes(a2) ? null == (n2 = this.bindings.postgres_changes) || n2.filter((e3) => {
            var t3, r3, s2;
            return (null == (t3 = e3.filter) ? void 0 : t3.event) === "*" || (null == (s2 = null == (r3 = e3.filter) ? void 0 : r3.event) ? void 0 : s2.toLocaleLowerCase()) === a2;
          }).map((e3) => e3.callback(h2, r2)) : null == (i2 = this.bindings[a2]) || i2.filter((e3) => {
            var r3, s2, n3, i3, o3, l3;
            if (!["broadcast", "presence", "postgres_changes"].includes(a2)) return e3.type.toLocaleLowerCase() === a2;
            if ("id" in e3) {
              let i4 = e3.id, a3 = null == (r3 = e3.filter) ? void 0 : r3.event;
              return i4 && (null == (s2 = t2.ids) ? void 0 : s2.includes(i4)) && ("*" === a3 || (null == a3 ? void 0 : a3.toLocaleLowerCase()) === (null == (n3 = t2.data) ? void 0 : n3.type.toLocaleLowerCase()));
            }
            {
              let r4 = null == (o3 = null == (i3 = null == e3 ? void 0 : e3.filter) ? void 0 : i3.event) ? void 0 : o3.toLocaleLowerCase();
              return "*" === r4 || r4 === (null == (l3 = null == t2 ? void 0 : t2.event) ? void 0 : l3.toLocaleLowerCase());
            }
          }).map((e3) => {
            if ("object" == typeof h2 && "ids" in h2) {
              let e4 = h2.data, { schema: t3, table: r3, commit_timestamp: s2, type: n3, errors: i3 } = e4;
              h2 = Object.assign(Object.assign({}, { schema: t3, table: r3, commit_timestamp: s2, eventType: n3, new: {}, old: {}, errors: i3 }), this._getPayloadRecords(e4));
            }
            e3.callback(h2, r2);
          });
        }
        _isClosed() {
          return this.state === r.closed;
        }
        _isJoined() {
          return this.state === r.joined;
        }
        _isJoining() {
          return this.state === r.joining;
        }
        _isLeaving() {
          return this.state === r.leaving;
        }
        _replyEventName(e2) {
          return `chan_reply_${e2}`;
        }
        _on(e2, t2, r2) {
          let s2 = e2.toLocaleLowerCase(), n2 = { type: s2, filter: t2, callback: r2 };
          return this.bindings[s2] ? this.bindings[s2].push(n2) : this.bindings[s2] = [n2], this;
        }
        _off(e2, t2) {
          let r2 = e2.toLocaleLowerCase();
          return this.bindings[r2] && (this.bindings[r2] = this.bindings[r2].filter((e3) => {
            var s2;
            return !((null == (s2 = e3.type) ? void 0 : s2.toLocaleLowerCase()) === r2 && L.isEqual(e3.filter, t2));
          })), this;
        }
        static isEqual(e2, t2) {
          if (Object.keys(e2).length !== Object.keys(t2).length) return false;
          for (let r2 in e2) if (e2[r2] !== t2[r2]) return false;
          return true;
        }
        static isFilterValueEqual(e2, t2) {
          return (null != e2 ? e2 : void 0) === (null != t2 ? t2 : void 0);
        }
        _rejoinUntilConnected() {
          this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
        }
        _onClose(e2) {
          this._on(s.close, {}, e2);
        }
        _onError(e2) {
          this._on(s.error, {}, (t2) => e2(t2));
        }
        _canPush() {
          return this.socket.isConnected() && this._isJoined();
        }
        _rejoin(e2 = this.timeout) {
          this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = r.joining, this.joinPush.resend(e2));
        }
        _getPayloadRecords(e2) {
          let t2 = { new: {}, old: {} };
          return ("INSERT" === e2.type || "UPDATE" === e2.type) && (t2.new = O(e2.columns, e2.record)), ("UPDATE" === e2.type || "DELETE" === e2.type) && (t2.old = O(e2.columns, e2.old_record)), t2;
        }
      }
      let U = () => {
      }, M = [1e3, 2e3, 5e3, 1e4], B = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
      class q {
        constructor(e2, t2) {
          var r2;
          if (this.accessTokenValue = null, this.apiKey = null, this._manuallySetToken = false, this.channels = [], this.endPoint = "", this.httpEndpoint = "", this.headers = {}, this.params = {}, this.timeout = 1e4, this.transport = null, this.heartbeatIntervalMs = 25e3, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.heartbeatCallback = U, this.ref = 0, this.reconnectTimer = null, this.vsn = _, this.logger = U, this.conn = null, this.sendBuffer = [], this.serializer = new E(), this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = false, this._authPromise = null, this._resolveFetch = (e3) => e3 ? (...t3) => e3(...t3) : (...e4) => fetch(...e4), !(null == (r2 = null == t2 ? void 0 : t2.params) ? void 0 : r2.apikey)) throw Error("API key is required to connect to Realtime");
          this.apiKey = t2.params.apikey, this.endPoint = `${e2}/${n.websocket}`, this.httpEndpoint = I(e2), this._initializeOptions(t2), this._setupReconnectionTimer(), this.fetch = this._resolveFetch(null == t2 ? void 0 : t2.fetch);
        }
        connect() {
          if (!(this.isConnecting() || this.isDisconnecting() || null !== this.conn && this.isConnected())) {
            if (this._setConnectionState("connecting"), this.accessToken && !this._authPromise && this._setAuthSafely("connect"), this.transport) this.conn = new this.transport(this.endpointURL());
            else try {
              this.conn = w.createWebSocket(this.endpointURL());
            } catch (t2) {
              this._setConnectionState("disconnected");
              let e2 = t2.message;
              if (e2.includes("Node.js")) throw Error(`${e2}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`);
              throw Error(`WebSocket not available: ${e2}`);
            }
            this._setupConnectionHandlers();
          }
        }
        endpointURL() {
          return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: this.vsn }));
        }
        disconnect(e2, t2) {
          if (!this.isDisconnecting()) if (this._setConnectionState("disconnecting", true), this.conn) {
            let r2 = setTimeout(() => {
              this._setConnectionState("disconnected");
            }, 100);
            this.conn.onclose = () => {
              clearTimeout(r2), this._setConnectionState("disconnected");
            }, "function" == typeof this.conn.close && (e2 ? this.conn.close(e2, null != t2 ? t2 : "") : this.conn.close()), this._teardownConnection();
          } else this._setConnectionState("disconnected");
        }
        getChannels() {
          return this.channels;
        }
        async removeChannel(e2) {
          let t2 = await e2.unsubscribe();
          return 0 === this.channels.length && this.disconnect(), t2;
        }
        async removeAllChannels() {
          let e2 = await Promise.all(this.channels.map((e3) => e3.unsubscribe()));
          return this.channels = [], this.disconnect(), e2;
        }
        log(e2, t2, r2) {
          this.logger(e2, t2, r2);
        }
        connectionState() {
          switch (this.conn && this.conn.readyState) {
            case t.connecting:
              return i.Connecting;
            case t.open:
              return i.Open;
            case t.closing:
              return i.Closing;
            default:
              return i.Closed;
          }
        }
        isConnected() {
          return this.connectionState() === i.Open;
        }
        isConnecting() {
          return "connecting" === this._connectionState;
        }
        isDisconnecting() {
          return "disconnecting" === this._connectionState;
        }
        channel(e2, t2 = { config: {} }) {
          let r2 = `realtime:${e2}`, s2 = this.getChannels().find((e3) => e3.topic === r2);
          if (s2) return s2;
          {
            let r3 = new L(`realtime:${e2}`, t2, this);
            return this.channels.push(r3), r3;
          }
        }
        push(e2) {
          let { topic: t2, event: r2, payload: s2, ref: n2 } = e2, i2 = () => {
            this.encode(e2, (e3) => {
              var t3;
              null == (t3 = this.conn) || t3.send(e3);
            });
          };
          this.log("push", `${t2} ${r2} (${n2})`, s2), this.isConnected() ? i2() : this.sendBuffer.push(i2);
        }
        async setAuth(e2 = null) {
          this._authPromise = this._performAuth(e2);
          try {
            await this._authPromise;
          } finally {
            this._authPromise = null;
          }
        }
        _isManualToken() {
          return this._manuallySetToken;
        }
        async sendHeartbeat() {
          var e2;
          if (!this.isConnected()) {
            try {
              this.heartbeatCallback("disconnected");
            } catch (e3) {
              this.log("error", "error in heartbeat callback", e3);
            }
            return;
          }
          if (this.pendingHeartbeatRef) {
            this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
            try {
              this.heartbeatCallback("timeout");
            } catch (e3) {
              this.log("error", "error in heartbeat callback", e3);
            }
            this._wasManualDisconnect = false, null == (e2 = this.conn) || e2.close(1e3, "heartbeat timeout"), setTimeout(() => {
              var e3;
              this.isConnected() || null == (e3 = this.reconnectTimer) || e3.scheduleTimeout();
            }, 100);
            return;
          }
          this.pendingHeartbeatRef = this._makeRef(), this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
          try {
            this.heartbeatCallback("sent");
          } catch (e3) {
            this.log("error", "error in heartbeat callback", e3);
          }
          this._setAuthSafely("heartbeat");
        }
        onHeartbeat(e2) {
          this.heartbeatCallback = e2;
        }
        flushSendBuffer() {
          this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e2) => e2()), this.sendBuffer = []);
        }
        _makeRef() {
          let e2 = this.ref + 1;
          return e2 === this.ref ? this.ref = 0 : this.ref = e2, this.ref.toString();
        }
        _leaveOpenTopic(e2) {
          let t2 = this.channels.find((t3) => t3.topic === e2 && (t3._isJoined() || t3._isJoining()));
          t2 && (this.log("transport", `leaving duplicate topic "${e2}"`), t2.unsubscribe());
        }
        _remove(e2) {
          this.channels = this.channels.filter((t2) => t2.topic !== e2.topic);
        }
        _onConnMessage(e2) {
          this.decode(e2.data, (e3) => {
            if ("phoenix" === e3.topic && "phx_reply" === e3.event) try {
              this.heartbeatCallback("ok" === e3.payload.status ? "ok" : "error");
            } catch (e4) {
              this.log("error", "error in heartbeat callback", e4);
            }
            e3.ref && e3.ref === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null);
            let { topic: t2, event: r2, payload: s2, ref: n2 } = e3, i2 = n2 ? `(${n2})` : "", a2 = s2.status || "";
            this.log("receive", `${a2} ${t2} ${r2} ${i2}`.trim(), s2), this.channels.filter((e4) => e4._isMember(t2)).forEach((e4) => e4._trigger(r2, s2, n2)), this._triggerStateCallbacks("message", e3);
          });
        }
        _clearTimer(e2) {
          var t2;
          "heartbeat" === e2 && this.heartbeatTimer ? (clearInterval(this.heartbeatTimer), this.heartbeatTimer = void 0) : "reconnect" === e2 && (null == (t2 = this.reconnectTimer) || t2.reset());
        }
        _clearAllTimers() {
          this._clearTimer("heartbeat"), this._clearTimer("reconnect");
        }
        _setupConnectionHandlers() {
          this.conn && ("binaryType" in this.conn && (this.conn.binaryType = "arraybuffer"), this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e2) => this._onConnError(e2), this.conn.onmessage = (e2) => this._onConnMessage(e2), this.conn.onclose = (e2) => this._onConnClose(e2));
        }
        _teardownConnection() {
          if (this.conn) {
            if (this.conn.readyState === t.open || this.conn.readyState === t.connecting) try {
              this.conn.close();
            } catch (e2) {
              this.log("error", "Error closing connection", e2);
            }
            this.conn.onopen = null, this.conn.onerror = null, this.conn.onmessage = null, this.conn.onclose = null, this.conn = null;
          }
          this._clearAllTimers(), this.channels.forEach((e2) => e2.teardown());
        }
        _onConnOpen() {
          this._setConnectionState("connected"), this.log("transport", `connected to ${this.endpointURL()}`), (this._authPromise || (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())).then(() => {
            this.flushSendBuffer();
          }).catch((e2) => {
            this.log("error", "error waiting for auth on connect", e2), this.flushSendBuffer();
          }), this._clearTimer("reconnect"), this.worker ? this.workerRef || this._startWorkerHeartbeat() : this._startHeartbeat(), this._triggerStateCallbacks("open");
        }
        _startHeartbeat() {
          this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        _startWorkerHeartbeat() {
          this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
          let e2 = this._workerObjectUrl(this.workerUrl);
          this.workerRef = new Worker(e2), this.workerRef.onerror = (e3) => {
            this.log("worker", "worker error", e3.message), this.workerRef.terminate();
          }, this.workerRef.onmessage = (e3) => {
            "keepAlive" === e3.data.event && this.sendHeartbeat();
          }, this.workerRef.postMessage({ event: "start", interval: this.heartbeatIntervalMs });
        }
        _onConnClose(e2) {
          var t2;
          this._setConnectionState("disconnected"), this.log("transport", "close", e2), this._triggerChanError(), this._clearTimer("heartbeat"), this._wasManualDisconnect || null == (t2 = this.reconnectTimer) || t2.scheduleTimeout(), this._triggerStateCallbacks("close", e2);
        }
        _onConnError(e2) {
          this._setConnectionState("disconnected"), this.log("transport", `${e2}`), this._triggerChanError(), this._triggerStateCallbacks("error", e2);
        }
        _triggerChanError() {
          this.channels.forEach((e2) => e2._trigger(s.error));
        }
        _appendParams(e2, t2) {
          if (0 === Object.keys(t2).length) return e2;
          let r2 = e2.match(/\?/) ? "&" : "?", s2 = new URLSearchParams(t2);
          return `${e2}${r2}${s2}`;
        }
        _workerObjectUrl(e2) {
          let t2;
          if (e2) t2 = e2;
          else {
            let e3 = new Blob([B], { type: "application/javascript" });
            t2 = URL.createObjectURL(e3);
          }
          return t2;
        }
        _setConnectionState(e2, t2 = false) {
          this._connectionState = e2, "connecting" === e2 ? this._wasManualDisconnect = false : "disconnecting" === e2 && (this._wasManualDisconnect = t2);
        }
        async _performAuth(e2 = null) {
          let t2, r2 = false;
          if (e2) t2 = e2, r2 = true;
          else if (this.accessToken) try {
            t2 = await this.accessToken();
          } catch (e3) {
            this.log("error", "Error fetching access token from callback", e3), t2 = this.accessTokenValue;
          }
          else t2 = this.accessTokenValue;
          r2 ? this._manuallySetToken = true : this.accessToken && (this._manuallySetToken = false), this.accessTokenValue != t2 && (this.accessTokenValue = t2, this.channels.forEach((e3) => {
            let r3 = { access_token: t2, version: "realtime-js/2.87.1" };
            t2 && e3.updateJoinPayload(r3), e3.joinedOnce && e3._isJoined() && e3._push(s.access_token, { access_token: t2 });
          }));
        }
        async _waitForAuthIfNeeded() {
          this._authPromise && await this._authPromise;
        }
        _setAuthSafely(e2 = "general") {
          this._isManualToken() || this.setAuth().catch((t2) => {
            this.log("error", `Error setting auth in ${e2}`, t2);
          });
        }
        _triggerStateCallbacks(e2, t2) {
          try {
            this.stateChangeCallbacks[e2].forEach((r2) => {
              try {
                r2(t2);
              } catch (t3) {
                this.log("error", `error in ${e2} callback`, t3);
              }
            });
          } catch (t3) {
            this.log("error", `error triggering ${e2} callbacks`, t3);
          }
        }
        _setupReconnectionTimer() {
          this.reconnectTimer = new S(async () => {
            setTimeout(async () => {
              await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
            }, 10);
          }, this.reconnectAfterMs);
        }
        _initializeOptions(e2) {
          var t2, r2, s2, n2, i2, a2, o2, l2, u2, c2, h2, d2;
          switch (this.transport = null != (t2 = null == e2 ? void 0 : e2.transport) ? t2 : null, this.timeout = null != (r2 = null == e2 ? void 0 : e2.timeout) ? r2 : 1e4, this.heartbeatIntervalMs = null != (s2 = null == e2 ? void 0 : e2.heartbeatIntervalMs) ? s2 : 25e3, this.worker = null != (n2 = null == e2 ? void 0 : e2.worker) && n2, this.accessToken = null != (i2 = null == e2 ? void 0 : e2.accessToken) ? i2 : null, this.heartbeatCallback = null != (a2 = null == e2 ? void 0 : e2.heartbeatCallback) ? a2 : U, this.vsn = null != (o2 = null == e2 ? void 0 : e2.vsn) ? o2 : _, (null == e2 ? void 0 : e2.params) && (this.params = e2.params), (null == e2 ? void 0 : e2.logger) && (this.logger = e2.logger), ((null == e2 ? void 0 : e2.logLevel) || (null == e2 ? void 0 : e2.log_level)) && (this.logLevel = e2.logLevel || e2.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = null != (l2 = null == e2 ? void 0 : e2.reconnectAfterMs) ? l2 : (e3) => M[e3 - 1] || 1e4, this.vsn) {
            case _:
              this.encode = null != (u2 = null == e2 ? void 0 : e2.encode) ? u2 : (e3, t3) => t3(JSON.stringify(e3)), this.decode = null != (c2 = null == e2 ? void 0 : e2.decode) ? c2 : (e3, t3) => t3(JSON.parse(e3));
              break;
            case "2.0.0":
              this.encode = null != (h2 = null == e2 ? void 0 : e2.encode) ? h2 : this.serializer.encode.bind(this.serializer), this.decode = null != (d2 = null == e2 ? void 0 : e2.decode) ? d2 : this.serializer.decode.bind(this.serializer);
              break;
            default:
              throw Error(`Unsupported serializer version: ${this.vsn}`);
          }
          this.worker && (this.workerUrl = null == e2 ? void 0 : e2.workerUrl);
        }
      }
      e.s([], 67653), e.i(67653), e.s(["REALTIME_CHANNEL_STATES", 0, D, "REALTIME_LISTEN_TYPES", () => u, "REALTIME_POSTGRES_CHANGES_LISTEN_EVENT", () => l, "REALTIME_PRESENCE_LISTEN_EVENTS", () => o, "REALTIME_SUBSCRIBE_STATES", () => c, "RealtimeChannel", () => L, "RealtimeClient", () => q, "RealtimePresence", () => $, "WebSocketFactory", 0, w], 76056);
    }, 4507, (e) => {
      "use strict";
      e.s([], 32453), e.i(32453);
      var t, r, s, n = e.i(51615), i = e.i(70858);
      class a extends Error {
        constructor(e2) {
          super(e2), this.__isStorageError = true, this.name = "StorageError";
        }
      }
      function o(e2) {
        return "object" == typeof e2 && null !== e2 && "__isStorageError" in e2;
      }
      class l extends a {
        constructor(e2, t2, r2) {
          super(e2), this.name = "StorageApiError", this.status = t2, this.statusCode = r2;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      }
      class u extends a {
        constructor(e2, t2) {
          super(e2), this.name = "StorageUnknownError", this.originalError = t2;
        }
      }
      e.s(["StorageApiError", () => l, "StorageError", () => a, "StorageUnknownError", () => u, "isStorageError", () => o], 63736);
      let c = (e2) => e2 ? (...t2) => e2(...t2) : (...e3) => fetch(...e3), h = (e2) => {
        if (Array.isArray(e2)) return e2.map((e3) => h(e3));
        if ("function" == typeof e2 || e2 !== Object(e2)) return e2;
        let t2 = {};
        return Object.entries(e2).forEach(([e3, r2]) => {
          t2[e3.replace(/([-_][a-z])/gi, (e4) => e4.toUpperCase().replace(/[-_]/g, ""))] = h(r2);
        }), t2;
      }, d = (e2) => {
        var t2;
        return e2.msg || e2.message || e2.error_description || ("string" == typeof e2.error ? e2.error : null == (t2 = e2.error) ? void 0 : t2.message) || JSON.stringify(e2);
      };
      function p(e2, t2, r2, s2, n2, a2) {
        return (0, i.__awaiter)(this, void 0, void 0, function* () {
          return new Promise((o2, c2) => {
            let h2;
            e2(r2, (h2 = { method: t2, headers: (null == s2 ? void 0 : s2.headers) || {} }, "GET" === t2 || !a2 ? h2 : (((e3) => {
              if ("object" != typeof e3 || null === e3) return false;
              let t3 = Object.getPrototypeOf(e3);
              return (null === t3 || t3 === Object.prototype || null === Object.getPrototypeOf(t3)) && !(Symbol.toStringTag in e3) && !(Symbol.iterator in e3);
            })(a2) ? (h2.headers = Object.assign({ "Content-Type": "application/json" }, null == s2 ? void 0 : s2.headers), h2.body = JSON.stringify(a2)) : h2.body = a2, (null == s2 ? void 0 : s2.duplex) && (h2.duplex = s2.duplex), Object.assign(Object.assign({}, h2), n2)))).then((e3) => {
              if (!e3.ok) throw e3;
              return (null == s2 ? void 0 : s2.noResolveJson) ? e3 : e3.json();
            }).then((e3) => o2(e3)).catch((e3) => (0, i.__awaiter)(void 0, void 0, void 0, function* () {
              e3 instanceof (yield Response) && !(null == s2 ? void 0 : s2.noResolveJson) ? e3.json().then((t3) => {
                let r3 = e3.status || 500, s3 = (null == t3 ? void 0 : t3.statusCode) || r3 + "";
                c2(new l(d(t3), r3, s3));
              }).catch((e4) => {
                c2(new u(d(e4), e4));
              }) : c2(new u(d(e3), e3));
            }));
          });
        });
      }
      function f(e2, t2, r2, s2) {
        return (0, i.__awaiter)(this, void 0, void 0, function* () {
          return p(e2, "GET", t2, r2, s2);
        });
      }
      function g(e2, t2, r2, s2, n2) {
        return (0, i.__awaiter)(this, void 0, void 0, function* () {
          return p(e2, "POST", t2, s2, n2, r2);
        });
      }
      function m(e2, t2, r2, s2, n2) {
        return (0, i.__awaiter)(this, void 0, void 0, function* () {
          return p(e2, "PUT", t2, s2, n2, r2);
        });
      }
      function b(e2, t2, r2, s2, n2) {
        return (0, i.__awaiter)(this, void 0, void 0, function* () {
          return p(e2, "DELETE", t2, s2, n2, r2);
        });
      }
      class y {
        constructor(e2, t2) {
          this.downloadFn = e2, this.shouldThrowOnError = t2;
        }
        then(e2, t2) {
          return this.execute().then(e2, t2);
        }
        execute() {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: (yield this.downloadFn()).body, error: null };
            } catch (e2) {
              if (this.shouldThrowOnError) throw e2;
              if (o(e2)) return { data: null, error: e2 };
              throw e2;
            }
          });
        }
      }
      r = Symbol.toStringTag;
      let v = class {
        constructor(e2, t2) {
          this.downloadFn = e2, this.shouldThrowOnError = t2, this[r] = "BlobDownloadBuilder", this.promise = null;
        }
        asStream() {
          return new y(this.downloadFn, this.shouldThrowOnError);
        }
        then(e2, t2) {
          return this.getPromise().then(e2, t2);
        }
        catch(e2) {
          return this.getPromise().catch(e2);
        }
        finally(e2) {
          return this.getPromise().finally(e2);
        }
        getPromise() {
          return this.promise || (this.promise = this.execute()), this.promise;
        }
        execute() {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let e2 = yield this.downloadFn();
              return { data: yield e2.blob(), error: null };
            } catch (e2) {
              if (this.shouldThrowOnError) throw e2;
              if (o(e2)) return { data: null, error: e2 };
              throw e2;
            }
          });
        }
      }, w = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } }, _ = { cacheControl: "3600", contentType: "text/plain;charset=UTF-8", upsert: false };
      class E {
        constructor(e2, t2 = {}, r2, s2) {
          this.shouldThrowOnError = false, this.url = e2, this.headers = t2, this.bucketId = r2, this.fetch = c(s2);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        uploadOrUpdate(e2, t2, r2, s2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let n2, i2 = Object.assign(Object.assign({}, _), s2), a2 = Object.assign(Object.assign({}, this.headers), "POST" === e2 && { "x-upsert": String(i2.upsert) }), o2 = i2.metadata;
              "undefined" != typeof Blob && r2 instanceof Blob ? ((n2 = new FormData()).append("cacheControl", i2.cacheControl), o2 && n2.append("metadata", this.encodeMetadata(o2)), n2.append("", r2)) : "undefined" != typeof FormData && r2 instanceof FormData ? ((n2 = r2).has("cacheControl") || n2.append("cacheControl", i2.cacheControl), o2 && !n2.has("metadata") && n2.append("metadata", this.encodeMetadata(o2))) : (n2 = r2, a2["cache-control"] = `max-age=${i2.cacheControl}`, a2["content-type"] = i2.contentType, o2 && (a2["x-metadata"] = this.toBase64(this.encodeMetadata(o2))), ("undefined" != typeof ReadableStream && n2 instanceof ReadableStream || n2 && "object" == typeof n2 && "pipe" in n2 && "function" == typeof n2.pipe) && !i2.duplex && (i2.duplex = "half")), (null == s2 ? void 0 : s2.headers) && (a2 = Object.assign(Object.assign({}, a2), s2.headers));
              let l2 = this._removeEmptyFolders(t2), u2 = this._getFinalPath(l2), c2 = yield ("PUT" == e2 ? m : g)(this.fetch, `${this.url}/object/${u2}`, n2, Object.assign({ headers: a2 }, (null == i2 ? void 0 : i2.duplex) ? { duplex: i2.duplex } : {}));
              return { data: { path: l2, id: c2.Id, fullPath: c2.Key }, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        upload(e2, t2, r2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("POST", e2, t2, r2);
          });
        }
        uploadToSignedUrl(e2, t2, r2, s2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            let n2 = this._removeEmptyFolders(e2), i2 = this._getFinalPath(n2), a2 = new URL(this.url + `/object/upload/sign/${i2}`);
            a2.searchParams.set("token", t2);
            try {
              let e3, t3 = Object.assign({ upsert: _.upsert }, s2), i3 = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(t3.upsert) });
              "undefined" != typeof Blob && r2 instanceof Blob ? ((e3 = new FormData()).append("cacheControl", t3.cacheControl), e3.append("", r2)) : "undefined" != typeof FormData && r2 instanceof FormData ? (e3 = r2).append("cacheControl", t3.cacheControl) : (e3 = r2, i3["cache-control"] = `max-age=${t3.cacheControl}`, i3["content-type"] = t3.contentType);
              let o2 = yield m(this.fetch, a2.toString(), e3, { headers: i3 });
              return { data: { path: n2, fullPath: o2.Key }, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        createSignedUploadUrl(e2, t2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let r2 = this._getFinalPath(e2), s2 = Object.assign({}, this.headers);
              (null == t2 ? void 0 : t2.upsert) && (s2["x-upsert"] = "true");
              let n2 = yield g(this.fetch, `${this.url}/object/upload/sign/${r2}`, {}, { headers: s2 }), i2 = new URL(this.url + n2.url), o2 = i2.searchParams.get("token");
              if (!o2) throw new a("No token returned by API");
              return { data: { signedUrl: i2.toString(), path: e2, token: o2 }, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        update(e2, t2, r2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return this.uploadOrUpdate("PUT", e2, t2, r2);
          });
        }
        move(e2, t2, r2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield g(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: e2, destinationKey: t2, destinationBucket: null == r2 ? void 0 : r2.destinationBucket }, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        copy(e2, t2, r2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: { path: (yield g(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: e2, destinationKey: t2, destinationBucket: null == r2 ? void 0 : r2.destinationBucket }, { headers: this.headers })).Key }, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        createSignedUrl(e2, t2, r2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let s2 = this._getFinalPath(e2), n2 = yield g(this.fetch, `${this.url}/object/sign/${s2}`, Object.assign({ expiresIn: t2 }, (null == r2 ? void 0 : r2.transform) ? { transform: r2.transform } : {}), { headers: this.headers }), i2 = (null == r2 ? void 0 : r2.download) ? `&download=${true === r2.download ? "" : r2.download}` : "";
              return { data: n2 = { signedUrl: encodeURI(`${this.url}${n2.signedURL}${i2}`) }, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        createSignedUrls(e2, t2, r2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let s2 = yield g(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t2, paths: e2 }, { headers: this.headers }), n2 = (null == r2 ? void 0 : r2.download) ? `&download=${true === r2.download ? "" : r2.download}` : "";
              return { data: s2.map((e3) => Object.assign(Object.assign({}, e3), { signedUrl: e3.signedURL ? encodeURI(`${this.url}${e3.signedURL}${n2}`) : null })), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        download(e2, t2) {
          let r2 = void 0 !== (null == t2 ? void 0 : t2.transform) ? "render/image/authenticated" : "object", s2 = this.transformOptsToQueryString((null == t2 ? void 0 : t2.transform) || {}), n2 = s2 ? `?${s2}` : "", i2 = this._getFinalPath(e2);
          return new v(() => f(this.fetch, `${this.url}/${r2}/${i2}${n2}`, { headers: this.headers, noResolveJson: true }), this.shouldThrowOnError);
        }
        info(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            let t2 = this._getFinalPath(e2);
            try {
              let e3 = yield f(this.fetch, `${this.url}/object/info/${t2}`, { headers: this.headers });
              return { data: h(e3), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        exists(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            let t2 = this._getFinalPath(e2);
            try {
              return yield function(e3, t3, r2, s2) {
                return (0, i.__awaiter)(this, void 0, void 0, function* () {
                  return p(e3, "HEAD", t3, Object.assign(Object.assign({}, r2), { noResolveJson: true }), void 0);
                });
              }(this.fetch, `${this.url}/object/${t2}`, { headers: this.headers }), { data: true, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3) && e3 instanceof u) {
                let t3 = e3.originalError;
                if ([400, 404].includes(null == t3 ? void 0 : t3.status)) return { data: false, error: e3 };
              }
              throw e3;
            }
          });
        }
        getPublicUrl(e2, t2) {
          let r2 = this._getFinalPath(e2), s2 = [], n2 = (null == t2 ? void 0 : t2.download) ? `download=${true === t2.download ? "" : t2.download}` : "";
          "" !== n2 && s2.push(n2);
          let i2 = void 0 !== (null == t2 ? void 0 : t2.transform), a2 = this.transformOptsToQueryString((null == t2 ? void 0 : t2.transform) || {});
          "" !== a2 && s2.push(a2);
          let o2 = s2.join("&");
          return "" !== o2 && (o2 = `?${o2}`), { data: { publicUrl: encodeURI(`${this.url}/${i2 ? "render/image" : "object"}/public/${r2}${o2}`) } };
        }
        remove(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield b(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e2 }, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        list(e2, t2, r2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let s2 = Object.assign(Object.assign(Object.assign({}, w), t2), { prefix: e2 || "" });
              return { data: yield g(this.fetch, `${this.url}/object/list/${this.bucketId}`, s2, { headers: this.headers }, r2), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        listV2(e2, t2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let r2 = Object.assign({}, e2);
              return { data: yield g(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, r2, { headers: this.headers }, t2), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        encodeMetadata(e2) {
          return JSON.stringify(e2);
        }
        toBase64(e2) {
          return void 0 !== n.Buffer ? n.Buffer.from(e2).toString("base64") : btoa(e2);
        }
        _getFinalPath(e2) {
          return `${this.bucketId}/${e2.replace(/^\/+/, "")}`;
        }
        _removeEmptyFolders(e2) {
          return e2.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
        }
        transformOptsToQueryString(e2) {
          let t2 = [];
          return e2.width && t2.push(`width=${e2.width}`), e2.height && t2.push(`height=${e2.height}`), e2.resize && t2.push(`resize=${e2.resize}`), e2.format && t2.push(`format=${e2.format}`), e2.quality && t2.push(`quality=${e2.quality}`), t2.join("&");
        }
      }
      let S = "2.87.1", O = { "X-Client-Info": `storage-js/${S}` };
      class T {
        constructor(e2, t2 = {}, r2, s2) {
          this.shouldThrowOnError = false;
          const n2 = new URL(e2);
          (null == s2 ? void 0 : s2.useNewHostname) && /supabase\.(co|in|red)$/.test(n2.hostname) && !n2.hostname.includes("storage.supabase.") && (n2.hostname = n2.hostname.replace("supabase.", "storage.supabase.")), this.url = n2.href.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, O), t2), this.fetch = c(r2);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        listBuckets(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let t2 = this.listBucketOptionsToQueryString(e2);
              return { data: yield f(this.fetch, `${this.url}/bucket${t2}`, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        getBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield f(this.fetch, `${this.url}/bucket/${e2}`, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        createBucket(e2) {
          return (0, i.__awaiter)(this, arguments, void 0, function* (e3, t2 = { public: false }) {
            try {
              return { data: yield g(this.fetch, `${this.url}/bucket`, { id: e3, name: e3, type: t2.type, public: t2.public, file_size_limit: t2.fileSizeLimit, allowed_mime_types: t2.allowedMimeTypes }, { headers: this.headers }), error: null };
            } catch (e4) {
              if (this.shouldThrowOnError) throw e4;
              if (o(e4)) return { data: null, error: e4 };
              throw e4;
            }
          });
        }
        updateBucket(e2, t2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield m(this.fetch, `${this.url}/bucket/${e2}`, { id: e2, name: e2, public: t2.public, file_size_limit: t2.fileSizeLimit, allowed_mime_types: t2.allowedMimeTypes }, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        emptyBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield g(this.fetch, `${this.url}/bucket/${e2}/empty`, {}, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        deleteBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield b(this.fetch, `${this.url}/bucket/${e2}`, {}, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        listBucketOptionsToQueryString(e2) {
          let t2 = {};
          return e2 && ("limit" in e2 && (t2.limit = String(e2.limit)), "offset" in e2 && (t2.offset = String(e2.offset)), e2.search && (t2.search = e2.search), e2.sortColumn && (t2.sortColumn = e2.sortColumn), e2.sortOrder && (t2.sortOrder = e2.sortOrder)), Object.keys(t2).length > 0 ? "?" + new URLSearchParams(t2).toString() : "";
        }
      }
      var k = class extends Error {
        constructor(e2, t2) {
          super(e2), this.name = "IcebergError", this.status = t2.status, this.icebergType = t2.icebergType, this.icebergCode = t2.icebergCode, this.details = t2.details, this.isCommitStateUnknown = "CommitStateUnknownException" === t2.icebergType || [500, 502, 504].includes(t2.status) && t2.icebergType?.includes("CommitState") === true;
        }
        isNotFound() {
          return 404 === this.status;
        }
        isConflict() {
          return 409 === this.status;
        }
        isAuthenticationTimeout() {
          return 419 === this.status;
        }
      };
      async function R(e2) {
        return e2 && "none" !== e2.type ? "bearer" === e2.type ? { Authorization: `Bearer ${e2.token}` } : "header" === e2.type ? { [e2.name]: e2.value } : "custom" === e2.type ? await e2.getHeaders() : {} : {};
      }
      function x(e2) {
        return e2.join("");
      }
      var P = class {
        constructor(e2, t2 = "") {
          this.client = e2, this.prefix = t2;
        }
        async listNamespaces(e2) {
          let t2 = e2 ? { parent: x(e2.namespace) } : void 0;
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces`, query: t2 })).data.namespaces.map((e3) => ({ namespace: e3 }));
        }
        async createNamespace(e2, t2) {
          let r2 = { namespace: e2.namespace, properties: t2?.properties };
          return (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces`, body: r2 })).data;
        }
        async dropNamespace(e2) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${x(e2.namespace)}` });
        }
        async loadNamespaceMetadata(e2) {
          return { properties: (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${x(e2.namespace)}` })).data.properties };
        }
        async namespaceExists(e2) {
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${x(e2.namespace)}` }), true;
          } catch (e3) {
            if (e3 instanceof k && 404 === e3.status) return false;
            throw e3;
          }
        }
        async createNamespaceIfNotExists(e2, t2) {
          try {
            return await this.createNamespace(e2, t2);
          } catch (e3) {
            if (e3 instanceof k && 409 === e3.status) return;
            throw e3;
          }
        }
      };
      function C(e2) {
        return e2.join("");
      }
      var A = class {
        constructor(e2, t2 = "", r2) {
          this.client = e2, this.prefix = t2, this.accessDelegation = r2;
        }
        async listTables(e2) {
          return (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${C(e2.namespace)}/tables` })).data.identifiers;
        }
        async createTable(e2, t2) {
          let r2 = {};
          return this.accessDelegation && (r2["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${C(e2.namespace)}/tables`, body: t2, headers: r2 })).data.metadata;
        }
        async updateTable(e2, t2) {
          let r2 = await this.client.request({ method: "POST", path: `${this.prefix}/namespaces/${C(e2.namespace)}/tables/${e2.name}`, body: t2 });
          return { "metadata-location": r2.data["metadata-location"], metadata: r2.data.metadata };
        }
        async dropTable(e2, t2) {
          await this.client.request({ method: "DELETE", path: `${this.prefix}/namespaces/${C(e2.namespace)}/tables/${e2.name}`, query: { purgeRequested: String(t2?.purge ?? false) } });
        }
        async loadTable(e2) {
          let t2 = {};
          return this.accessDelegation && (t2["X-Iceberg-Access-Delegation"] = this.accessDelegation), (await this.client.request({ method: "GET", path: `${this.prefix}/namespaces/${C(e2.namespace)}/tables/${e2.name}`, headers: t2 })).data.metadata;
        }
        async tableExists(e2) {
          let t2 = {};
          this.accessDelegation && (t2["X-Iceberg-Access-Delegation"] = this.accessDelegation);
          try {
            return await this.client.request({ method: "HEAD", path: `${this.prefix}/namespaces/${C(e2.namespace)}/tables/${e2.name}`, headers: t2 }), true;
          } catch (e3) {
            if (e3 instanceof k && 404 === e3.status) return false;
            throw e3;
          }
        }
        async createTableIfNotExists(e2, t2) {
          try {
            return await this.createTable(e2, t2);
          } catch (r2) {
            if (r2 instanceof k && 409 === r2.status) return await this.loadTable({ namespace: e2.namespace, name: t2.name });
            throw r2;
          }
        }
      }, j = class {
        constructor(e2) {
          let t2 = "v1";
          e2.catalogName && (t2 += `/${e2.catalogName}`);
          const r2 = e2.baseUrl.endsWith("/") ? e2.baseUrl : `${e2.baseUrl}/`;
          this.client = function(e3) {
            let t3 = e3.fetchImpl ?? globalThis.fetch;
            return { async request({ method: r3, path: s2, query: n2, body: i2, headers: a2 }) {
              let o2 = function(e4, t4, r4) {
                let s3 = new URL(t4, e4);
                if (r4) for (let [e5, t5] of Object.entries(r4)) void 0 !== t5 && s3.searchParams.set(e5, t5);
                return s3.toString();
              }(e3.baseUrl, s2, n2), l2 = await R(e3.auth), u2 = await t3(o2, { method: r3, headers: { ...i2 ? { "Content-Type": "application/json" } : {}, ...l2, ...a2 }, body: i2 ? JSON.stringify(i2) : void 0 }), c2 = await u2.text(), h2 = (u2.headers.get("content-type") || "").includes("application/json"), d2 = h2 && c2 ? JSON.parse(c2) : c2;
              if (!u2.ok) {
                let e4 = h2 ? d2 : void 0, t4 = e4?.error;
                throw new k(t4?.message ?? `Request failed with status ${u2.status}`, { status: u2.status, icebergType: t4?.type, icebergCode: t4?.code, details: e4 });
              }
              return { status: u2.status, headers: u2.headers, data: d2 };
            } };
          }({ baseUrl: r2, auth: e2.auth, fetchImpl: e2.fetch }), this.accessDelegation = e2.accessDelegation?.join(","), this.namespaceOps = new P(this.client, t2), this.tableOps = new A(this.client, t2, this.accessDelegation);
        }
        async listNamespaces(e2) {
          return this.namespaceOps.listNamespaces(e2);
        }
        async createNamespace(e2, t2) {
          return this.namespaceOps.createNamespace(e2, t2);
        }
        async dropNamespace(e2) {
          await this.namespaceOps.dropNamespace(e2);
        }
        async loadNamespaceMetadata(e2) {
          return this.namespaceOps.loadNamespaceMetadata(e2);
        }
        async listTables(e2) {
          return this.tableOps.listTables(e2);
        }
        async createTable(e2, t2) {
          return this.tableOps.createTable(e2, t2);
        }
        async updateTable(e2, t2) {
          return this.tableOps.updateTable(e2, t2);
        }
        async dropTable(e2, t2) {
          await this.tableOps.dropTable(e2, t2);
        }
        async loadTable(e2) {
          return this.tableOps.loadTable(e2);
        }
        async namespaceExists(e2) {
          return this.namespaceOps.namespaceExists(e2);
        }
        async tableExists(e2) {
          return this.tableOps.tableExists(e2);
        }
        async createNamespaceIfNotExists(e2, t2) {
          return this.namespaceOps.createNamespaceIfNotExists(e2, t2);
        }
        async createTableIfNotExists(e2, t2) {
          return this.tableOps.createTableIfNotExists(e2, t2);
        }
      };
      class I {
        constructor(e2, t2 = {}, r2) {
          this.shouldThrowOnError = false, this.url = e2.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, O), t2), this.fetch = c(r2);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        createBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield g(this.fetch, `${this.url}/bucket`, { name: e2 }, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        listBuckets(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              let t2 = new URLSearchParams();
              (null == e2 ? void 0 : e2.limit) !== void 0 && t2.set("limit", e2.limit.toString()), (null == e2 ? void 0 : e2.offset) !== void 0 && t2.set("offset", e2.offset.toString()), (null == e2 ? void 0 : e2.sortColumn) && t2.set("sortColumn", e2.sortColumn), (null == e2 ? void 0 : e2.sortOrder) && t2.set("sortOrder", e2.sortOrder), (null == e2 ? void 0 : e2.search) && t2.set("search", e2.search);
              let r2 = t2.toString(), s2 = r2 ? `${this.url}/bucket?${r2}` : `${this.url}/bucket`;
              return { data: yield f(this.fetch, s2, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        deleteBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield b(this.fetch, `${this.url}/bucket/${e2}`, {}, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (o(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        from(e2) {
          if (!(!(!e2 || "string" != typeof e2 || 0 === e2.length || e2.length > 100 || e2.trim() !== e2 || e2.includes("/") || e2.includes("\\")) && /^[\w!.\*'() &$@=;:+,?-]+$/.test(e2))) throw new a("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");
          let t2 = new j({ baseUrl: this.url, catalogName: e2, auth: { type: "custom", getHeaders: () => (0, i.__awaiter)(this, void 0, void 0, function* () {
            return this.headers;
          }) }, fetch: this.fetch }), r2 = this.shouldThrowOnError;
          return new Proxy(t2, { get(e3, t3) {
            let s2 = e3[t3];
            return "function" != typeof s2 ? s2 : (...t4) => (0, i.__awaiter)(this, void 0, void 0, function* () {
              try {
                return { data: yield s2.apply(e3, t4), error: null };
              } catch (e4) {
                if (r2) throw e4;
                return { data: null, error: e4 };
              }
            });
          } });
        }
      }
      let N = { "X-Client-Info": `storage-js/${S}`, "Content-Type": "application/json" };
      class $ extends Error {
        constructor(e2) {
          super(e2), this.__isStorageVectorsError = true, this.name = "StorageVectorsError";
        }
      }
      function D(e2) {
        return "object" == typeof e2 && null !== e2 && "__isStorageVectorsError" in e2;
      }
      class L extends $ {
        constructor(e2, t2, r2) {
          super(e2), this.name = "StorageVectorsApiError", this.status = t2, this.statusCode = r2;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, statusCode: this.statusCode };
        }
      }
      class U extends $ {
        constructor(e2, t2) {
          super(e2), this.name = "StorageVectorsUnknownError", this.originalError = t2;
        }
      }
      (t = s || (s = {})).InternalError = "InternalError", t.S3VectorConflictException = "S3VectorConflictException", t.S3VectorNotFoundException = "S3VectorNotFoundException", t.S3VectorBucketNotEmpty = "S3VectorBucketNotEmpty", t.S3VectorMaxBucketsExceeded = "S3VectorMaxBucketsExceeded", t.S3VectorMaxIndexesExceeded = "S3VectorMaxIndexesExceeded";
      let M = (e2) => e2 ? (...t2) => e2(...t2) : (...e3) => fetch(...e3), B = () => Response, q = (e2) => {
        if ("object" != typeof e2 || null === e2) return false;
        let t2 = Object.getPrototypeOf(e2);
        return (null === t2 || t2 === Object.prototype || null === Object.getPrototypeOf(t2)) && !(Symbol.toStringTag in e2) && !(Symbol.iterator in e2);
      }, V = (e2) => Array.from(new Float32Array(e2)), F = (e2, t2) => {
        if (void 0 !== t2 && e2.float32.length !== t2) throw Error(`Vector dimension mismatch: expected ${t2}, got ${e2.float32.length}`);
      }, W = (e2) => e2.msg || e2.message || e2.error_description || e2.error || JSON.stringify(e2);
      function H(e2, t2, r2, s2, n2) {
        return (0, i.__awaiter)(this, void 0, void 0, function* () {
          return function(e3, t3, r3, s3, n3, a2) {
            return (0, i.__awaiter)(this, void 0, void 0, function* () {
              return new Promise((o2, l2) => {
                let u2;
                e3(r3, (u2 = { method: t3, headers: (null == s3 ? void 0 : s3.headers) || {} }, "GET" === t3 || !a2 ? u2 : (q(a2) ? (u2.headers = Object.assign({ "Content-Type": "application/json" }, null == s3 ? void 0 : s3.headers), u2.body = JSON.stringify(a2)) : u2.body = a2, Object.assign(Object.assign({}, u2), n3)))).then((e4) => {
                  if (!e4.ok) throw e4;
                  if (null == s3 ? void 0 : s3.noResolveJson) return e4;
                  let t4 = e4.headers.get("content-type");
                  return t4 && t4.includes("application/json") ? e4.json() : {};
                }).then((e4) => o2(e4)).catch((e4) => (0, i.__awaiter)(void 0, void 0, void 0, function* () {
                  if (!(e4 && "object" == typeof e4 && "status" in e4 && "ok" in e4 && "number" == typeof e4.status) || (null == s3 ? void 0 : s3.noResolveJson)) l2(new U(W(e4), e4));
                  else {
                    let t4 = e4.status || 500;
                    "function" == typeof e4.json ? e4.json().then((e5) => {
                      let r4 = (null == e5 ? void 0 : e5.statusCode) || (null == e5 ? void 0 : e5.code) || t4 + "";
                      l2(new L(W(e5), t4, r4));
                    }).catch(() => {
                      l2(new L(e4.statusText || `HTTP ${t4} error`, t4, t4 + ""));
                    }) : l2(new L(e4.statusText || `HTTP ${t4} error`, t4, t4 + ""));
                  }
                }));
              });
            });
          }(e2, "POST", t2, s2, n2, r2);
        });
      }
      class G {
        constructor(e2, t2 = {}, r2) {
          this.shouldThrowOnError = false, this.url = e2.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, N), t2), this.fetch = M(r2);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        createIndex(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: (yield H(this.fetch, `${this.url}/CreateIndex`, e2, { headers: this.headers })) || {}, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        getIndex(e2, t2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield H(this.fetch, `${this.url}/GetIndex`, { vectorBucketName: e2, indexName: t2 }, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        listIndexes(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield H(this.fetch, `${this.url}/ListIndexes`, e2, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        deleteIndex(e2, t2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: (yield H(this.fetch, `${this.url}/DeleteIndex`, { vectorBucketName: e2, indexName: t2 }, { headers: this.headers })) || {}, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
      }
      class z {
        constructor(e2, t2 = {}, r2) {
          this.shouldThrowOnError = false, this.url = e2.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, N), t2), this.fetch = M(r2);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        putVectors(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              if (e2.vectors.length < 1 || e2.vectors.length > 500) throw Error("Vector batch size must be between 1 and 500 items");
              return { data: (yield H(this.fetch, `${this.url}/PutVectors`, e2, { headers: this.headers })) || {}, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        getVectors(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield H(this.fetch, `${this.url}/GetVectors`, e2, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        listVectors(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              if (void 0 !== e2.segmentCount) {
                if (e2.segmentCount < 1 || e2.segmentCount > 16) throw Error("segmentCount must be between 1 and 16");
                if (void 0 !== e2.segmentIndex && (e2.segmentIndex < 0 || e2.segmentIndex >= e2.segmentCount)) throw Error(`segmentIndex must be between 0 and ${e2.segmentCount - 1}`);
              }
              return { data: yield H(this.fetch, `${this.url}/ListVectors`, e2, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        queryVectors(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield H(this.fetch, `${this.url}/QueryVectors`, e2, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        deleteVectors(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              if (e2.keys.length < 1 || e2.keys.length > 500) throw Error("Keys batch size must be between 1 and 500 items");
              return { data: (yield H(this.fetch, `${this.url}/DeleteVectors`, e2, { headers: this.headers })) || {}, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
      }
      class K {
        constructor(e2, t2 = {}, r2) {
          this.shouldThrowOnError = false, this.url = e2.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, N), t2), this.fetch = M(r2);
        }
        throwOnError() {
          return this.shouldThrowOnError = true, this;
        }
        createBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: (yield H(this.fetch, `${this.url}/CreateVectorBucket`, { vectorBucketName: e2 }, { headers: this.headers })) || {}, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        getBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: yield H(this.fetch, `${this.url}/GetVectorBucket`, { vectorBucketName: e2 }, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        listBuckets() {
          return (0, i.__awaiter)(this, arguments, void 0, function* (e2 = {}) {
            try {
              return { data: yield H(this.fetch, `${this.url}/ListVectorBuckets`, e2, { headers: this.headers }), error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
        deleteBucket(e2) {
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            try {
              return { data: (yield H(this.fetch, `${this.url}/DeleteVectorBucket`, { vectorBucketName: e2 }, { headers: this.headers })) || {}, error: null };
            } catch (e3) {
              if (this.shouldThrowOnError) throw e3;
              if (D(e3)) return { data: null, error: e3 };
              throw e3;
            }
          });
        }
      }
      class J extends K {
        constructor(e2, t2 = {}) {
          super(e2, t2.headers || {}, t2.fetch);
        }
        from(e2) {
          return new X(this.url, this.headers, e2, this.fetch);
        }
        createBucket(e2) {
          let t2 = Object.create(null, { createBucket: { get: () => super.createBucket } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.createBucket.call(this, e2);
          });
        }
        getBucket(e2) {
          let t2 = Object.create(null, { getBucket: { get: () => super.getBucket } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.getBucket.call(this, e2);
          });
        }
        listBuckets() {
          let e2 = Object.create(null, { listBuckets: { get: () => super.listBuckets } });
          return (0, i.__awaiter)(this, arguments, void 0, function* (t2 = {}) {
            return e2.listBuckets.call(this, t2);
          });
        }
        deleteBucket(e2) {
          let t2 = Object.create(null, { deleteBucket: { get: () => super.deleteBucket } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.deleteBucket.call(this, e2);
          });
        }
      }
      class X extends G {
        constructor(e2, t2, r2, s2) {
          super(e2, t2, s2), this.vectorBucketName = r2;
        }
        createIndex(e2) {
          let t2 = Object.create(null, { createIndex: { get: () => super.createIndex } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.createIndex.call(this, Object.assign(Object.assign({}, e2), { vectorBucketName: this.vectorBucketName }));
          });
        }
        listIndexes() {
          let e2 = Object.create(null, { listIndexes: { get: () => super.listIndexes } });
          return (0, i.__awaiter)(this, arguments, void 0, function* (t2 = {}) {
            return e2.listIndexes.call(this, Object.assign(Object.assign({}, t2), { vectorBucketName: this.vectorBucketName }));
          });
        }
        getIndex(e2) {
          let t2 = Object.create(null, { getIndex: { get: () => super.getIndex } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.getIndex.call(this, this.vectorBucketName, e2);
          });
        }
        deleteIndex(e2) {
          let t2 = Object.create(null, { deleteIndex: { get: () => super.deleteIndex } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.deleteIndex.call(this, this.vectorBucketName, e2);
          });
        }
        index(e2) {
          return new Y(this.url, this.headers, this.vectorBucketName, e2, this.fetch);
        }
      }
      class Y extends z {
        constructor(e2, t2, r2, s2, n2) {
          super(e2, t2, n2), this.vectorBucketName = r2, this.indexName = s2;
        }
        putVectors(e2) {
          let t2 = Object.create(null, { putVectors: { get: () => super.putVectors } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.putVectors.call(this, Object.assign(Object.assign({}, e2), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
          });
        }
        getVectors(e2) {
          let t2 = Object.create(null, { getVectors: { get: () => super.getVectors } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.getVectors.call(this, Object.assign(Object.assign({}, e2), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
          });
        }
        listVectors() {
          let e2 = Object.create(null, { listVectors: { get: () => super.listVectors } });
          return (0, i.__awaiter)(this, arguments, void 0, function* (t2 = {}) {
            return e2.listVectors.call(this, Object.assign(Object.assign({}, t2), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
          });
        }
        queryVectors(e2) {
          let t2 = Object.create(null, { queryVectors: { get: () => super.queryVectors } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.queryVectors.call(this, Object.assign(Object.assign({}, e2), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
          });
        }
        deleteVectors(e2) {
          let t2 = Object.create(null, { deleteVectors: { get: () => super.deleteVectors } });
          return (0, i.__awaiter)(this, void 0, void 0, function* () {
            return t2.deleteVectors.call(this, Object.assign(Object.assign({}, e2), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
          });
        }
      }
      class Q extends T {
        constructor(e2, t2 = {}, r2, s2) {
          super(e2, t2, r2, s2);
        }
        from(e2) {
          return new E(this.url, this.headers, e2, this.fetch);
        }
        get vectors() {
          return new J(this.url + "/vector", { headers: this.headers, fetch: this.fetch });
        }
        get analytics() {
          return new I(this.url + "/iceberg", this.headers, this.fetch);
        }
      }
      e.s([], 4561), e.i(4561), e.i(63736), e.s([], 2370), e.i(2370), e.s(["StorageVectorsApiError", () => L, "StorageVectorsClient", () => J, "StorageVectorsError", () => $, "StorageVectorsErrorCode", () => s, "StorageVectorsUnknownError", () => U, "VectorBucketApi", () => K, "VectorBucketScope", () => X, "VectorDataApi", () => z, "VectorIndexApi", () => G, "VectorIndexScope", () => Y, "isPlainObject", 0, q, "isStorageVectorsError", () => D, "normalizeToFloat32", 0, V, "resolveFetch", 0, M, "resolveResponse", 0, B, "validateVectorDimension", 0, F], 87152), e.i(87152), e.s(["StorageAnalyticsClient", () => I, "StorageApiError", () => l, "StorageClient", () => Q, "StorageError", () => a, "StorageUnknownError", () => u, "StorageVectorsApiError", () => L, "StorageVectorsClient", () => J, "StorageVectorsError", () => $, "StorageVectorsErrorCode", () => s, "StorageVectorsUnknownError", () => U, "VectorBucketApi", () => K, "VectorBucketScope", () => X, "VectorDataApi", () => z, "VectorIndexApi", () => G, "VectorIndexScope", () => Y, "isPlainObject", 0, q, "isStorageError", () => o, "isStorageVectorsError", () => D, "normalizeToFloat32", 0, V, "resolveFetch", 0, M, "resolveResponse", 0, B, "validateVectorDimension", 0, F], 4507);
    }, 40822, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), r.version = void 0, r.version = "2.87.1";
    }, 50355, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), r.DEFAULT_REALTIME_OPTIONS = r.DEFAULT_AUTH_OPTIONS = r.DEFAULT_DB_OPTIONS = r.DEFAULT_GLOBAL_OPTIONS = r.DEFAULT_HEADERS = void 0;
      let s = e.r(40822), n = "";
      n = "undefined" != typeof Deno ? "deno" : "undefined" != typeof document ? "web" : "undefined" != typeof navigator && "ReactNative" === navigator.product ? "react-native" : "node", r.DEFAULT_HEADERS = { "X-Client-Info": `supabase-js-${n}/${s.version}` }, r.DEFAULT_GLOBAL_OPTIONS = { headers: r.DEFAULT_HEADERS }, r.DEFAULT_DB_OPTIONS = { schema: "public" }, r.DEFAULT_AUTH_OPTIONS = { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, flowType: "implicit" }, r.DEFAULT_REALTIME_OPTIONS = {};
    }, 27785, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), r.fetchWithAuth = r.resolveHeadersConstructor = r.resolveFetch = void 0, r.resolveFetch = (e2) => e2 ? (...t2) => e2(...t2) : (...e3) => fetch(...e3), r.resolveHeadersConstructor = () => Headers, r.fetchWithAuth = (e2, t2, s) => {
        let n = (0, r.resolveFetch)(s), i = (0, r.resolveHeadersConstructor)();
        return async (r2, s2) => {
          var a;
          let o = null != (a = await t2()) ? a : e2, l = new i(null == s2 ? void 0 : s2.headers);
          return l.has("apikey") || l.set("apikey", e2), l.has("Authorization") || l.set("Authorization", `Bearer ${o}`), n(r2, Object.assign(Object.assign({}, s2), { headers: l }));
        };
      };
    }, 95057, (e, t, r) => {
      "use strict";
      function s(e2) {
        return e2.endsWith("/") ? e2 : e2 + "/";
      }
      Object.defineProperty(r, "__esModule", { value: true }), r.isBrowser = void 0, r.uuid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
          var t2 = 16 * Math.random() | 0;
          return ("x" == e2 ? t2 : 3 & t2 | 8).toString(16);
        });
      }, r.ensureTrailingSlash = s, r.applySettingDefaults = function(e2, t2) {
        var r2, s2;
        let { db: n, auth: i, realtime: a, global: o } = e2, { db: l, auth: u, realtime: c, global: h } = t2, d = { db: Object.assign(Object.assign({}, l), n), auth: Object.assign(Object.assign({}, u), i), realtime: Object.assign(Object.assign({}, c), a), storage: {}, global: Object.assign(Object.assign(Object.assign({}, h), o), { headers: Object.assign(Object.assign({}, null != (r2 = null == h ? void 0 : h.headers) ? r2 : {}), null != (s2 = null == o ? void 0 : o.headers) ? s2 : {}) }), accessToken: async () => "" };
        return e2.accessToken ? d.accessToken = e2.accessToken : delete d.accessToken, d;
      }, r.validateSupabaseUrl = function(e2) {
        let t2 = null == e2 ? void 0 : e2.trim();
        if (!t2) throw Error("supabaseUrl is required.");
        if (!t2.match(/^https?:\/\//i)) throw Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
        try {
          return new URL(s(t2));
        } catch (e3) {
          throw Error("Invalid supabaseUrl: Provided URL is malformed.");
        }
      }, r.isBrowser = () => false;
    }, 96827, (e) => {
      "use strict";
      var t = e.i(70858);
      let r = "2.87.1", s = { "X-Client-Info": `gotrue-js/${r}` }, n = "X-Supabase-Api-Version", i = { "2024-01-01": { timestamp: Date.parse("2024-01-01T00:00:00.0Z"), name: "2024-01-01" } }, a = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i;
      class o extends Error {
        constructor(e2, t2, r2) {
          super(e2), this.__isAuthError = true, this.name = "AuthError", this.status = t2, this.code = r2;
        }
      }
      function l(e2) {
        return "object" == typeof e2 && null !== e2 && "__isAuthError" in e2;
      }
      class u extends o {
        constructor(e2, t2, r2) {
          super(e2, t2, r2), this.name = "AuthApiError", this.status = t2, this.code = r2;
        }
      }
      function c(e2) {
        return l(e2) && "AuthApiError" === e2.name;
      }
      class h extends o {
        constructor(e2, t2) {
          super(e2), this.name = "AuthUnknownError", this.originalError = t2;
        }
      }
      class d extends o {
        constructor(e2, t2, r2, s2) {
          super(e2, r2, s2), this.name = t2, this.status = r2;
        }
      }
      class p extends d {
        constructor() {
          super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
        }
      }
      function f(e2) {
        return l(e2) && "AuthSessionMissingError" === e2.name;
      }
      class g extends d {
        constructor() {
          super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
        }
      }
      class m extends d {
        constructor(e2) {
          super(e2, "AuthInvalidCredentialsError", 400, void 0);
        }
      }
      class b extends d {
        constructor(e2, t2 = null) {
          super(e2, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t2;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      function y(e2) {
        return l(e2) && "AuthImplicitGrantRedirectError" === e2.name;
      }
      class v extends d {
        constructor(e2, t2 = null) {
          super(e2, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t2;
        }
        toJSON() {
          return { name: this.name, message: this.message, status: this.status, details: this.details };
        }
      }
      class w extends d {
        constructor(e2, t2) {
          super(e2, "AuthRetryableFetchError", t2, void 0);
        }
      }
      function _(e2) {
        return l(e2) && "AuthRetryableFetchError" === e2.name;
      }
      class E extends d {
        constructor(e2, t2, r2) {
          super(e2, "AuthWeakPasswordError", t2, "weak_password"), this.reasons = r2;
        }
      }
      function S(e2) {
        return l(e2) && "AuthWeakPasswordError" === e2.name;
      }
      class O extends d {
        constructor(e2) {
          super(e2, "AuthInvalidJwtError", 400, "invalid_jwt");
        }
      }
      e.s(["AuthApiError", () => u, "AuthError", () => o, "AuthImplicitGrantRedirectError", () => b, "AuthInvalidCredentialsError", () => m, "AuthInvalidJwtError", () => O, "AuthInvalidTokenResponseError", () => g, "AuthPKCEGrantCodeExchangeError", () => v, "AuthRetryableFetchError", () => w, "AuthSessionMissingError", () => p, "AuthUnknownError", () => h, "AuthWeakPasswordError", () => E, "CustomAuthError", () => d, "isAuthApiError", () => c, "isAuthError", () => l, "isAuthImplicitGrantRedirectError", () => y, "isAuthRetryableFetchError", () => _, "isAuthSessionMissingError", () => f, "isAuthWeakPasswordError", () => S], 68896);
      let T = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), k = " 	\n\r=".split(""), R = (() => {
        let e2 = Array(128);
        for (let t2 = 0; t2 < e2.length; t2 += 1) e2[t2] = -1;
        for (let t2 = 0; t2 < k.length; t2 += 1) e2[k[t2].charCodeAt(0)] = -2;
        for (let t2 = 0; t2 < T.length; t2 += 1) e2[T[t2].charCodeAt(0)] = t2;
        return e2;
      })();
      function x(e2, t2, r2) {
        if (null !== e2) for (t2.queue = t2.queue << 8 | e2, t2.queuedBits += 8; t2.queuedBits >= 6; ) r2(T[t2.queue >> t2.queuedBits - 6 & 63]), t2.queuedBits -= 6;
        else if (t2.queuedBits > 0) for (t2.queue = t2.queue << 6 - t2.queuedBits, t2.queuedBits = 6; t2.queuedBits >= 6; ) r2(T[t2.queue >> t2.queuedBits - 6 & 63]), t2.queuedBits -= 6;
      }
      function P(e2, t2, r2) {
        let s2 = R[e2];
        if (s2 > -1) for (t2.queue = t2.queue << 6 | s2, t2.queuedBits += 6; t2.queuedBits >= 8; ) r2(t2.queue >> t2.queuedBits - 8 & 255), t2.queuedBits -= 8;
        else if (-2 === s2) return;
        else throw Error(`Invalid Base64-URL character "${String.fromCharCode(e2)}"`);
      }
      function C(e2) {
        let t2 = [], r2 = (e3) => {
          t2.push(String.fromCodePoint(e3));
        }, s2 = { utf8seq: 0, codepoint: 0 }, n2 = { queue: 0, queuedBits: 0 }, i2 = (e3) => {
          !function(e4, t3, r3) {
            if (0 === t3.utf8seq) {
              if (e4 <= 127) return r3(e4);
              for (let r4 = 1; r4 < 6; r4 += 1) if ((e4 >> 7 - r4 & 1) == 0) {
                t3.utf8seq = r4;
                break;
              }
              if (2 === t3.utf8seq) t3.codepoint = 31 & e4;
              else if (3 === t3.utf8seq) t3.codepoint = 15 & e4;
              else if (4 === t3.utf8seq) t3.codepoint = 7 & e4;
              else throw Error("Invalid UTF-8 sequence");
              t3.utf8seq -= 1;
            } else if (t3.utf8seq > 0) {
              if (e4 <= 127) throw Error("Invalid UTF-8 sequence");
              t3.codepoint = t3.codepoint << 6 | 63 & e4, t3.utf8seq -= 1, 0 === t3.utf8seq && r3(t3.codepoint);
            }
          }(e3, s2, r2);
        };
        for (let t3 = 0; t3 < e2.length; t3 += 1) P(e2.charCodeAt(t3), n2, i2);
        return t2.join("");
      }
      function A(e2) {
        let t2 = [], r2 = { queue: 0, queuedBits: 0 }, s2 = (e3) => {
          t2.push(e3);
        };
        for (let t3 = 0; t3 < e2.length; t3 += 1) P(e2.charCodeAt(t3), r2, s2);
        return new Uint8Array(t2);
      }
      function j(e2) {
        let t2 = [], r2 = { queue: 0, queuedBits: 0 }, s2 = (e3) => {
          t2.push(e3);
        };
        return e2.forEach((e3) => x(e3, r2, s2)), x(null, r2, s2), t2.join("");
      }
      let I = (e2) => e2 ? (...t2) => e2(...t2) : (...e3) => fetch(...e3), N = async (e2, t2, r2) => {
        await e2.setItem(t2, JSON.stringify(r2));
      }, $ = async (e2, t2) => {
        let r2 = await e2.getItem(t2);
        if (!r2) return null;
        try {
          return JSON.parse(r2);
        } catch (e3) {
          return r2;
        }
      }, D = async (e2, t2) => {
        await e2.removeItem(t2);
      };
      class L {
        constructor() {
          this.promise = new L.promiseConstructor((e2, t2) => {
            this.resolve = e2, this.reject = t2;
          });
        }
      }
      function U(e2) {
        let t2 = e2.split(".");
        if (3 !== t2.length) throw new O("Invalid JWT structure");
        for (let e3 = 0; e3 < t2.length; e3++) if (!a.test(t2[e3])) throw new O("JWT not in base64url format");
        return { header: JSON.parse(C(t2[0])), payload: JSON.parse(C(t2[1])), signature: A(t2[2]), raw: { header: t2[0], payload: t2[1] } };
      }
      async function M(e2) {
        return await new Promise((t2) => {
          setTimeout(() => t2(null), e2);
        });
      }
      function B(e2) {
        return ("0" + e2.toString(16)).substr(-2);
      }
      async function q(e2) {
        let t2 = new TextEncoder().encode(e2);
        return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", t2))).map((e3) => String.fromCharCode(e3)).join("");
      }
      async function V(e2) {
        return "undefined" == typeof crypto || void 0 === crypto.subtle || "undefined" == typeof TextEncoder ? (console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), e2) : btoa(await q(e2)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      }
      async function F(e2, t2, r2 = false) {
        let s2 = function() {
          let e3 = new Uint32Array(56);
          if ("undefined" == typeof crypto) {
            let e4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", t3 = e4.length, r3 = "";
            for (let s3 = 0; s3 < 56; s3++) r3 += e4.charAt(Math.floor(Math.random() * t3));
            return r3;
          }
          return crypto.getRandomValues(e3), Array.from(e3, B).join("");
        }(), n2 = s2;
        r2 && (n2 += "/PASSWORD_RECOVERY"), await N(e2, `${t2}-code-verifier`, n2);
        let i2 = await V(s2), a2 = s2 === i2 ? "plain" : "s256";
        return [i2, a2];
      }
      L.promiseConstructor = Promise;
      let W = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i, H = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
      function G(e2) {
        if (!H.test(e2)) throw Error("@supabase/auth-js: Expected parameter to be UUID but is not");
      }
      function z() {
        return new Proxy({}, { get: (e2, t2) => {
          if ("__isUserNotAvailableProxy" === t2) return true;
          if ("symbol" == typeof t2) {
            let e3 = t2.toString();
            if ("Symbol(Symbol.toPrimitive)" === e3 || "Symbol(Symbol.toStringTag)" === e3 || "Symbol(util.inspect.custom)" === e3) return;
          }
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t2}" property of the session object is not supported. Please use getUser() instead.`);
        }, set: (e2, t2) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t2}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        }, deleteProperty: (e2, t2) => {
          throw Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t2}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
        } });
      }
      function K(e2) {
        return JSON.parse(JSON.stringify(e2));
      }
      let J = (e2) => e2.msg || e2.message || e2.error_description || e2.error || JSON.stringify(e2), X = [502, 503, 504];
      async function Y(e2) {
        var t2;
        let r2, s2;
        if (!("object" == typeof e2 && null !== e2 && "status" in e2 && "ok" in e2 && "json" in e2 && "function" == typeof e2.json)) throw new w(J(e2), 0);
        if (X.includes(e2.status)) throw new w(J(e2), e2.status);
        try {
          r2 = await e2.json();
        } catch (e3) {
          throw new h(J(e3), e3);
        }
        let a2 = function(e3) {
          let t3 = e3.headers.get(n);
          if (!t3 || !t3.match(W)) return null;
          try {
            return /* @__PURE__ */ new Date(`${t3}T00:00:00.0Z`);
          } catch (e4) {
            return null;
          }
        }(e2);
        if (a2 && a2.getTime() >= i["2024-01-01"].timestamp && "object" == typeof r2 && r2 && "string" == typeof r2.code ? s2 = r2.code : "object" == typeof r2 && r2 && "string" == typeof r2.error_code && (s2 = r2.error_code), s2) {
          if ("weak_password" === s2) throw new E(J(r2), e2.status, (null == (t2 = r2.weak_password) ? void 0 : t2.reasons) || []);
          else if ("session_not_found" === s2) throw new p();
        } else if ("object" == typeof r2 && r2 && "object" == typeof r2.weak_password && r2.weak_password && Array.isArray(r2.weak_password.reasons) && r2.weak_password.reasons.length && r2.weak_password.reasons.reduce((e3, t3) => e3 && "string" == typeof t3, true)) throw new E(J(r2), e2.status, r2.weak_password.reasons);
        throw new u(J(r2), e2.status || 500, s2);
      }
      async function Q(e2, t2, r2, s2) {
        var a2;
        let o2 = Object.assign({}, null == s2 ? void 0 : s2.headers);
        o2[n] || (o2[n] = i["2024-01-01"].name), (null == s2 ? void 0 : s2.jwt) && (o2.Authorization = `Bearer ${s2.jwt}`);
        let l2 = null != (a2 = null == s2 ? void 0 : s2.query) ? a2 : {};
        (null == s2 ? void 0 : s2.redirectTo) && (l2.redirect_to = s2.redirectTo);
        let u2 = Object.keys(l2).length ? "?" + new URLSearchParams(l2).toString() : "", c2 = await Z(e2, t2, r2 + u2, { headers: o2, noResolveJson: null == s2 ? void 0 : s2.noResolveJson }, {}, null == s2 ? void 0 : s2.body);
        return (null == s2 ? void 0 : s2.xform) ? null == s2 ? void 0 : s2.xform(c2) : { data: Object.assign({}, c2), error: null };
      }
      async function Z(e2, t2, r2, s2, n2, i2) {
        let a2, o2, l2 = (o2 = { method: t2, headers: (null == s2 ? void 0 : s2.headers) || {} }, "GET" === t2 ? o2 : (o2.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, null == s2 ? void 0 : s2.headers), o2.body = JSON.stringify(i2), Object.assign(Object.assign({}, o2), n2)));
        try {
          a2 = await e2(r2, Object.assign({}, l2));
        } catch (e3) {
          throw console.error(e3), new w(J(e3), 0);
        }
        if (a2.ok || await Y(a2), null == s2 ? void 0 : s2.noResolveJson) return a2;
        try {
          return await a2.json();
        } catch (e3) {
          await Y(e3);
        }
      }
      function ee(e2) {
        var t2, r2, s2;
        let n2 = null;
        (s2 = e2).access_token && s2.refresh_token && s2.expires_in && (n2 = Object.assign({}, e2), e2.expires_at || (n2.expires_at = (r2 = e2.expires_in, Math.round(Date.now() / 1e3) + r2)));
        return { data: { session: n2, user: null != (t2 = e2.user) ? t2 : e2 }, error: null };
      }
      function et(e2) {
        let t2 = ee(e2);
        return !t2.error && e2.weak_password && "object" == typeof e2.weak_password && Array.isArray(e2.weak_password.reasons) && e2.weak_password.reasons.length && e2.weak_password.message && "string" == typeof e2.weak_password.message && e2.weak_password.reasons.reduce((e3, t3) => e3 && "string" == typeof t3, true) && (t2.data.weak_password = e2.weak_password), t2;
      }
      function er(e2) {
        var t2;
        return { data: { user: null != (t2 = e2.user) ? t2 : e2 }, error: null };
      }
      function es(e2) {
        return { data: e2, error: null };
      }
      function en(e2) {
        let { action_link: r2, email_otp: s2, hashed_token: n2, redirect_to: i2, verification_type: a2 } = e2;
        return { data: { properties: { action_link: r2, email_otp: s2, hashed_token: n2, redirect_to: i2, verification_type: a2 }, user: Object.assign({}, (0, t.__rest)(e2, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"])) }, error: null };
      }
      function ei(e2) {
        return e2;
      }
      let ea = ["global", "local", "others"];
      e.s(["SIGN_OUT_SCOPES", 0, ea], 20749);
      class eo {
        constructor({ url: e2 = "", headers: t2 = {}, fetch: r2 }) {
          this.url = e2, this.headers = t2, this.fetch = I(r2), this.mfa = { listFactors: this._listFactors.bind(this), deleteFactor: this._deleteFactor.bind(this) }, this.oauth = { listClients: this._listOAuthClients.bind(this), createClient: this._createOAuthClient.bind(this), getClient: this._getOAuthClient.bind(this), updateClient: this._updateOAuthClient.bind(this), deleteClient: this._deleteOAuthClient.bind(this), regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this) };
        }
        async signOut(e2, t2 = ea[0]) {
          if (0 > ea.indexOf(t2)) throw Error(`@supabase/auth-js: Parameter scope must be one of ${ea.join(", ")}`);
          try {
            return await Q(this.fetch, "POST", `${this.url}/logout?scope=${t2}`, { headers: this.headers, jwt: e2, noResolveJson: true }), { data: null, error: null };
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
        async inviteUserByEmail(e2, t2 = {}) {
          try {
            return await Q(this.fetch, "POST", `${this.url}/invite`, { body: { email: e2, data: t2.data }, headers: this.headers, redirectTo: t2.redirectTo, xform: er });
          } catch (e3) {
            if (l(e3)) return { data: { user: null }, error: e3 };
            throw e3;
          }
        }
        async generateLink(e2) {
          try {
            let { options: r2 } = e2, s2 = (0, t.__rest)(e2, ["options"]), n2 = Object.assign(Object.assign({}, s2), r2);
            return "newEmail" in s2 && (n2.new_email = null == s2 ? void 0 : s2.newEmail, delete n2.newEmail), await Q(this.fetch, "POST", `${this.url}/admin/generate_link`, { body: n2, headers: this.headers, xform: en, redirectTo: null == r2 ? void 0 : r2.redirectTo });
          } catch (e3) {
            if (l(e3)) return { data: { properties: null, user: null }, error: e3 };
            throw e3;
          }
        }
        async createUser(e2) {
          try {
            return await Q(this.fetch, "POST", `${this.url}/admin/users`, { body: e2, headers: this.headers, xform: er });
          } catch (e3) {
            if (l(e3)) return { data: { user: null }, error: e3 };
            throw e3;
          }
        }
        async listUsers(e2) {
          var t2, r2, s2, n2, i2, a2, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await Q(this.fetch, "GET", `${this.url}/admin/users`, { headers: this.headers, noResolveJson: true, query: { page: null != (r2 = null == (t2 = null == e2 ? void 0 : e2.page) ? void 0 : t2.toString()) ? r2 : "", per_page: null != (n2 = null == (s2 = null == e2 ? void 0 : e2.perPage) ? void 0 : s2.toString()) ? n2 : "" }, xform: ei });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null != (i2 = u2.headers.get("x-total-count")) ? i2 : 0, d2 = null != (o2 = null == (a2 = u2.headers.get("link")) ? void 0 : a2.split(",")) ? o2 : [];
            return d2.length > 0 && (d2.forEach((e3) => {
              let t3 = parseInt(e3.split(";")[0].split("=")[1].substring(0, 1)), r3 = JSON.parse(e3.split(";")[1].split("=")[1]);
              l2[`${r3}Page`] = t3;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e3) {
            if (l(e3)) return { data: { users: [] }, error: e3 };
            throw e3;
          }
        }
        async getUserById(e2) {
          G(e2);
          try {
            return await Q(this.fetch, "GET", `${this.url}/admin/users/${e2}`, { headers: this.headers, xform: er });
          } catch (e3) {
            if (l(e3)) return { data: { user: null }, error: e3 };
            throw e3;
          }
        }
        async updateUserById(e2, t2) {
          G(e2);
          try {
            return await Q(this.fetch, "PUT", `${this.url}/admin/users/${e2}`, { body: t2, headers: this.headers, xform: er });
          } catch (e3) {
            if (l(e3)) return { data: { user: null }, error: e3 };
            throw e3;
          }
        }
        async deleteUser(e2, t2 = false) {
          G(e2);
          try {
            return await Q(this.fetch, "DELETE", `${this.url}/admin/users/${e2}`, { headers: this.headers, body: { should_soft_delete: t2 }, xform: er });
          } catch (e3) {
            if (l(e3)) return { data: { user: null }, error: e3 };
            throw e3;
          }
        }
        async _listFactors(e2) {
          G(e2.userId);
          try {
            let { data: t2, error: r2 } = await Q(this.fetch, "GET", `${this.url}/admin/users/${e2.userId}/factors`, { headers: this.headers, xform: (e3) => ({ data: { factors: e3 }, error: null }) });
            return { data: t2, error: r2 };
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
        async _deleteFactor(e2) {
          G(e2.userId), G(e2.id);
          try {
            return { data: await Q(this.fetch, "DELETE", `${this.url}/admin/users/${e2.userId}/factors/${e2.id}`, { headers: this.headers }), error: null };
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
        async _listOAuthClients(e2) {
          var t2, r2, s2, n2, i2, a2, o2;
          try {
            let l2 = { nextPage: null, lastPage: 0, total: 0 }, u2 = await Q(this.fetch, "GET", `${this.url}/admin/oauth/clients`, { headers: this.headers, noResolveJson: true, query: { page: null != (r2 = null == (t2 = null == e2 ? void 0 : e2.page) ? void 0 : t2.toString()) ? r2 : "", per_page: null != (n2 = null == (s2 = null == e2 ? void 0 : e2.perPage) ? void 0 : s2.toString()) ? n2 : "" }, xform: ei });
            if (u2.error) throw u2.error;
            let c2 = await u2.json(), h2 = null != (i2 = u2.headers.get("x-total-count")) ? i2 : 0, d2 = null != (o2 = null == (a2 = u2.headers.get("link")) ? void 0 : a2.split(",")) ? o2 : [];
            return d2.length > 0 && (d2.forEach((e3) => {
              let t3 = parseInt(e3.split(";")[0].split("=")[1].substring(0, 1)), r3 = JSON.parse(e3.split(";")[1].split("=")[1]);
              l2[`${r3}Page`] = t3;
            }), l2.total = parseInt(h2)), { data: Object.assign(Object.assign({}, c2), l2), error: null };
          } catch (e3) {
            if (l(e3)) return { data: { clients: [] }, error: e3 };
            throw e3;
          }
        }
        async _createOAuthClient(e2) {
          try {
            return await Q(this.fetch, "POST", `${this.url}/admin/oauth/clients`, { body: e2, headers: this.headers, xform: (e3) => ({ data: e3, error: null }) });
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
        async _getOAuthClient(e2) {
          try {
            return await Q(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e2}`, { headers: this.headers, xform: (e3) => ({ data: e3, error: null }) });
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
        async _updateOAuthClient(e2, t2) {
          try {
            return await Q(this.fetch, "PUT", `${this.url}/admin/oauth/clients/${e2}`, { body: t2, headers: this.headers, xform: (e3) => ({ data: e3, error: null }) });
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
        async _deleteOAuthClient(e2) {
          try {
            return await Q(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e2}`, { headers: this.headers, noResolveJson: true }), { data: null, error: null };
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
        async _regenerateOAuthClientSecret(e2) {
          try {
            return await Q(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e2}/regenerate_secret`, { headers: this.headers, xform: (e3) => ({ data: e3, error: null }) });
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            throw e3;
          }
        }
      }
      function el(e2 = {}) {
        return { getItem: (t2) => e2[t2] || null, setItem: (t2, r2) => {
          e2[t2] = r2;
        }, removeItem: (t2) => {
          delete e2[t2];
        } };
      }
      let eu = { debug: (globalThis && 0, false) };
      class ec extends Error {
        constructor(e2) {
          super(e2), this.isAcquireTimeout = true;
        }
      }
      class eh extends ec {
      }
      class ed extends ec {
      }
      async function ep(e2, t2, r2) {
        eu.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", e2, t2);
        let s2 = new globalThis.AbortController();
        return t2 > 0 && setTimeout(() => {
          s2.abort(), eu.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", e2);
        }, t2), await Promise.resolve().then(() => globalThis.navigator.locks.request(e2, 0 === t2 ? { mode: "exclusive", ifAvailable: true } : { mode: "exclusive", signal: s2.signal }, async (s3) => {
          if (s3) {
            eu.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", e2, s3.name);
            try {
              return await r2();
            } finally {
              eu.debug && console.log("@supabase/gotrue-js: navigatorLock: released", e2, s3.name);
            }
          }
          if (0 === t2) throw eu.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", e2), new eh(`Acquiring an exclusive Navigator LockManager lock "${e2}" immediately failed`);
          if (eu.debug) try {
            let e3 = await globalThis.navigator.locks.query();
            console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(e3, null, "  "));
          } catch (e3) {
            console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e3);
          }
          return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await r2();
        }));
      }
      let ef = {};
      async function eg(e2, t2, r2) {
        var s2;
        let n2 = null != (s2 = ef[e2]) ? s2 : Promise.resolve(), i2 = Promise.race([n2.catch(() => null), t2 >= 0 ? new Promise((r3, s3) => {
          setTimeout(() => {
            s3(new ed(`Acquring process lock with name "${e2}" timed out`));
          }, t2);
        }) : null].filter((e3) => e3)).catch((e3) => {
          if (e3 && e3.isAcquireTimeout) throw e3;
          return null;
        }).then(async () => await r2());
        return ef[e2] = i2.catch(async (e3) => {
          if (e3 && e3.isAcquireTimeout) return await n2, null;
          throw e3;
        }), await i2;
      }
      function em(e2) {
        if (!/^0x[a-fA-F0-9]{40}$/.test(e2)) throw Error(`@supabase/auth-js: Address "${e2}" is invalid.`);
        return e2.toLowerCase();
      }
      class eb extends Error {
        constructor({ message: e2, code: t2, cause: r2, name: s2 }) {
          var n2;
          super(e2, { cause: r2 }), this.__isWebAuthnError = true, this.name = null != (n2 = null != s2 ? s2 : r2 instanceof Error ? r2.name : void 0) ? n2 : "Unknown Error", this.code = t2;
        }
      }
      class ey extends eb {
        constructor(e2, t2) {
          super({ code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: t2, message: e2 }), this.name = "WebAuthnUnknownError", this.originalError = t2;
        }
      }
      let ev = new class {
        createNewAbortSignal() {
          if (this.controller) {
            let e3 = Error("Cancelling existing WebAuthn API call for new one");
            e3.name = "AbortError", this.controller.abort(e3);
          }
          let e2 = new AbortController();
          return this.controller = e2, e2.signal;
        }
        cancelCeremony() {
          if (this.controller) {
            let e2 = Error("Manually cancelling existing WebAuthn API call");
            e2.name = "AbortError", this.controller.abort(e2), this.controller = void 0;
          }
        }
      }();
      function ew(e2) {
        return "localhost" === e2 || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(e2);
      }
      async function e_(e2) {
        try {
          let t2 = await navigator.credentials.create(e2);
          if (!t2) return { data: null, error: new ey("Empty credential response", t2) };
          if (!(t2 instanceof PublicKeyCredential)) return { data: null, error: new ey("Browser returned unexpected credential type", t2) };
          return { data: t2, error: null };
        } catch (t2) {
          return { data: null, error: function({ error: e3, options: t3 }) {
            var r2, s2, n2;
            let { publicKey: i2 } = t3;
            if (!i2) throw Error("options was missing required publicKey property");
            if ("AbortError" === e3.name) {
              if (t3.signal instanceof AbortSignal) return new eb({ message: "Registration ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e3 });
            } else if ("ConstraintError" === e3.name) {
              if ((null == (r2 = i2.authenticatorSelection) ? void 0 : r2.requireResidentKey) === true) return new eb({ message: "Discoverable credentials were required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT", cause: e3 });
              else if ("conditional" === t3.mediation && (null == (s2 = i2.authenticatorSelection) ? void 0 : s2.userVerification) === "required") return new eb({ message: "User verification was required during automatic registration but it could not be performed", code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE", cause: e3 });
              else if ((null == (n2 = i2.authenticatorSelection) ? void 0 : n2.userVerification) === "required") return new eb({ message: "User verification was required but no available authenticator supported it", code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT", cause: e3 });
            } else if ("InvalidStateError" === e3.name) return new eb({ message: "The authenticator was previously registered", code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED", cause: e3 });
            else if ("NotAllowedError" === e3.name) return new eb({ message: e3.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e3 });
            else if ("NotSupportedError" === e3.name) return new eb(0 === i2.pubKeyCredParams.filter((e4) => "public-key" === e4.type).length ? { message: 'No entry in pubKeyCredParams was of type "public-key"', code: "ERROR_MALFORMED_PUBKEYCREDPARAMS", cause: e3 } : { message: "No available authenticator supported any of the specified pubKeyCredParams algorithms", code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG", cause: e3 });
            else if ("SecurityError" === e3.name) {
              let t4 = window.location.hostname;
              if (!ew(t4)) return new eb({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e3 });
              if (i2.rp.id !== t4) return new eb({ message: `The RP ID "${i2.rp.id}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e3 });
            } else if ("TypeError" === e3.name) {
              if (i2.user.id.byteLength < 1 || i2.user.id.byteLength > 64) return new eb({ message: "User ID was not between 1 and 64 characters", code: "ERROR_INVALID_USER_ID_LENGTH", cause: e3 });
            } else if ("UnknownError" === e3.name) return new eb({ message: "The authenticator was unable to process the specified options, or could not create a new credential", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e3 });
            return new eb({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e3 });
          }({ error: t2, options: e2 }) };
        }
      }
      async function eE(e2) {
        try {
          let t2 = await navigator.credentials.get(e2);
          if (!t2) return { data: null, error: new ey("Empty credential response", t2) };
          if (!(t2 instanceof PublicKeyCredential)) return { data: null, error: new ey("Browser returned unexpected credential type", t2) };
          return { data: t2, error: null };
        } catch (t2) {
          return { data: null, error: function({ error: e3, options: t3 }) {
            let { publicKey: r2 } = t3;
            if (!r2) throw Error("options was missing required publicKey property");
            if ("AbortError" === e3.name) {
              if (t3.signal instanceof AbortSignal) return new eb({ message: "Authentication ceremony was sent an abort signal", code: "ERROR_CEREMONY_ABORTED", cause: e3 });
            } else if ("NotAllowedError" === e3.name) return new eb({ message: e3.message, code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e3 });
            else if ("SecurityError" === e3.name) {
              let t4 = window.location.hostname;
              if (!ew(t4)) return new eb({ message: `${window.location.hostname} is an invalid domain`, code: "ERROR_INVALID_DOMAIN", cause: e3 });
              if (r2.rpId !== t4) return new eb({ message: `The RP ID "${r2.rpId}" is invalid for this domain`, code: "ERROR_INVALID_RP_ID", cause: e3 });
            } else if ("UnknownError" === e3.name) return new eb({ message: "The authenticator was unable to process the specified options, or could not create a new assertion signature", code: "ERROR_AUTHENTICATOR_GENERAL_ERROR", cause: e3 });
            return new eb({ message: "a Non-Webauthn related error has occurred", code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY", cause: e3 });
          }({ error: t2, options: e2 }) };
        }
      }
      let eS = { hints: ["security-key"], authenticatorSelection: { authenticatorAttachment: "cross-platform", requireResidentKey: false, userVerification: "preferred", residentKey: "discouraged" }, attestation: "direct" }, eO = { userVerification: "preferred", hints: ["security-key"], attestation: "direct" };
      function eT(...e2) {
        let t2 = (e3) => null !== e3 && "object" == typeof e3 && !Array.isArray(e3), r2 = (e3) => e3 instanceof ArrayBuffer || ArrayBuffer.isView(e3), s2 = {};
        for (let n2 of e2) if (n2) for (let e3 in n2) {
          let i2 = n2[e3];
          if (void 0 !== i2) if (Array.isArray(i2)) s2[e3] = i2;
          else if (r2(i2)) s2[e3] = i2;
          else if (t2(i2)) {
            let r3 = s2[e3];
            t2(r3) ? s2[e3] = eT(r3, i2) : s2[e3] = eT(i2);
          } else s2[e3] = i2;
        }
        return s2;
      }
      class ek {
        constructor(e2) {
          this.client = e2, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
        }
        async _enroll(e2) {
          return this.client.mfa.enroll(Object.assign(Object.assign({}, e2), { factorType: "webauthn" }));
        }
        async _challenge({ factorId: e2, webauthn: t2, friendlyName: r2, signal: s2 }, n2) {
          try {
            var i2, a2, o2, u2;
            let { data: l2, error: c2 } = await this.client.mfa.challenge({ factorId: e2, webauthn: t2 });
            if (!l2) return { data: null, error: c2 };
            let h2 = null != s2 ? s2 : ev.createNewAbortSignal();
            if ("create" === l2.webauthn.type) {
              let { user: e3 } = l2.webauthn.credential_options.publicKey;
              e3.name || (e3.name = `${e3.id}:${r2}`), e3.displayName || (e3.displayName = e3.name);
            }
            switch (l2.webauthn.type) {
              case "create": {
                let t3 = (i2 = l2.webauthn.credential_options.publicKey, a2 = null == n2 ? void 0 : n2.create, eT(eS, i2, a2 || {})), { data: r3, error: s3 } = await e_({ publicKey: t3, signal: h2 });
                if (r3) return { data: { factorId: e2, challengeId: l2.id, webauthn: { type: l2.webauthn.type, credential_response: r3 } }, error: null };
                return { data: null, error: s3 };
              }
              case "request": {
                let t3 = (o2 = l2.webauthn.credential_options.publicKey, u2 = null == n2 ? void 0 : n2.request, eT(eO, o2, u2 || {})), { data: r3, error: s3 } = await eE(Object.assign(Object.assign({}, l2.webauthn.credential_options), { publicKey: t3, signal: h2 }));
                if (r3) return { data: { factorId: e2, challengeId: l2.id, webauthn: { type: l2.webauthn.type, credential_response: r3 } }, error: null };
                return { data: null, error: s3 };
              }
            }
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            return { data: null, error: new h("Unexpected error in challenge", e3) };
          }
        }
        async _verify({ challengeId: e2, factorId: t2, webauthn: r2 }) {
          return this.client.mfa.verify({ factorId: t2, challengeId: e2, webauthn: r2 });
        }
        async _authenticate({ factorId: e2, webauthn: { rpId: t2, rpOrigins: r2, signal: s2 } = {} }, n2) {
          if (!t2) return { data: null, error: new o("rpId is required for WebAuthn authentication") };
          try {
            1;
            return { data: null, error: new h("Browser does not support WebAuthn", null) };
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            return { data: null, error: new h("Unexpected error in authenticate", e3) };
          }
        }
        async _register({ friendlyName: e2, webauthn: { rpId: t2, rpOrigins: r2, signal: s2 } = {} }, n2) {
          if (!t2) return { data: null, error: new o("rpId is required for WebAuthn registration") };
          try {
            1;
            return { data: null, error: new h("Browser does not support WebAuthn", null) };
          } catch (e3) {
            if (l(e3)) return { data: null, error: e3 };
            return { data: null, error: new h("Unexpected error in register", e3) };
          }
        }
      }
      if ("object" != typeof globalThis) try {
        Object.defineProperty(Object.prototype, "__magic__", { get: function() {
          return this;
        }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
      } catch (e2) {
        "undefined" != typeof self && (self.globalThis = self);
      }
      let eR = { url: "http://localhost:9999", storageKey: "supabase.auth.token", autoRefreshToken: true, persistSession: true, detectSessionInUrl: true, headers: s, flowType: "implicit", debug: false, hasCustomAuthorizationHeader: false, throwOnError: false };
      async function ex(e2, t2, r2) {
        return await r2();
      }
      let eP = {};
      class eC {
        get jwks() {
          var e2, t2;
          return null != (t2 = null == (e2 = eP[this.storageKey]) ? void 0 : e2.jwks) ? t2 : { keys: [] };
        }
        set jwks(e2) {
          eP[this.storageKey] = Object.assign(Object.assign({}, eP[this.storageKey]), { jwks: e2 });
        }
        get jwks_cached_at() {
          var e2, t2;
          return null != (t2 = null == (e2 = eP[this.storageKey]) ? void 0 : e2.cachedAt) ? t2 : Number.MIN_SAFE_INTEGER;
        }
        set jwks_cached_at(e2) {
          eP[this.storageKey] = Object.assign(Object.assign({}, eP[this.storageKey]), { cachedAt: e2 });
        }
        constructor(e2) {
          var t2;
          this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = true, this.hasCustomAuthorizationHeader = false, this.suppressGetSessionWarning = false, this.lockAcquired = false, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log;
          const r2 = Object.assign(Object.assign({}, eR), e2);
          this.storageKey = r2.storageKey, this.instanceID = null != (t2 = eC.nextInstanceID[this.storageKey]) ? t2 : 0, eC.nextInstanceID[this.storageKey] = this.instanceID + 1, this.logDebugMessages = !!r2.debug, "function" == typeof r2.debug && (this.logger = r2.debug), this.instanceID, this.persistSession = r2.persistSession, this.autoRefreshToken = r2.autoRefreshToken, this.admin = new eo({ url: r2.url, headers: r2.headers, fetch: r2.fetch }), this.url = r2.url, this.headers = r2.headers, this.fetch = I(r2.fetch), this.lock = r2.lock || ex, this.detectSessionInUrl = r2.detectSessionInUrl, this.flowType = r2.flowType, this.hasCustomAuthorizationHeader = r2.hasCustomAuthorizationHeader, this.throwOnError = r2.throwOnError, r2.lock ? this.lock = r2.lock : (this.persistSession, this.lock = ex), this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = { verify: this._verify.bind(this), enroll: this._enroll.bind(this), unenroll: this._unenroll.bind(this), challenge: this._challenge.bind(this), listFactors: this._listFactors.bind(this), challengeAndVerify: this._challengeAndVerify.bind(this), getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this), webauthn: new ek(this) }, this.oauth = { getAuthorizationDetails: this._getAuthorizationDetails.bind(this), approveAuthorization: this._approveAuthorization.bind(this), denyAuthorization: this._denyAuthorization.bind(this), listGrants: this._listOAuthGrants.bind(this), revokeGrant: this._revokeOAuthGrant.bind(this) }, this.persistSession ? (r2.storage ? this.storage = r2.storage : (this.memoryStorage = {}, this.storage = el(this.memoryStorage)), r2.userStorage && (this.userStorage = r2.userStorage)) : (this.memoryStorage = {}, this.storage = el(this.memoryStorage)), this.initialize();
        }
        isThrowOnErrorEnabled() {
          return this.throwOnError;
        }
        _returnResult(e2) {
          if (this.throwOnError && e2 && e2.error) throw e2.error;
          return e2;
        }
        _logPrefix() {
          return `GoTrueClient@${this.storageKey}:${this.instanceID} (${r}) ${(/* @__PURE__ */ new Date()).toISOString()}`;
        }
        _debug(...e2) {
          return this.logDebugMessages && this.logger(this._logPrefix(), ...e2), this;
        }
        async initialize() {
          return this.initializePromise || (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))()), await this.initializePromise;
        }
        async _initialize() {
          try {
            return await this._recoverAndRefresh(), { error: null };
          } catch (e2) {
            if (l(e2)) return this._returnResult({ error: e2 });
            return this._returnResult({ error: new h("Unexpected error during initialization", e2) });
          } finally {
            await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
          }
        }
        async signInAnonymously(e2) {
          var t2, r2, s2;
          try {
            let { data: n2, error: i2 } = await Q(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { data: null != (r2 = null == (t2 = null == e2 ? void 0 : e2.options) ? void 0 : t2.data) ? r2 : {}, gotrue_meta_security: { captcha_token: null == (s2 = null == e2 ? void 0 : e2.options) ? void 0 : s2.captchaToken } }, xform: ee });
            if (i2 || !n2) return this._returnResult({ data: { user: null, session: null }, error: i2 });
            let a2 = n2.session, o2 = n2.user;
            return n2.session && (await this._saveSession(n2.session), await this._notifyAllSubscribers("SIGNED_IN", a2)), this._returnResult({ data: { user: o2, session: a2 }, error: null });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async signUp(e2) {
          var t2, r2, s2;
          try {
            let n2;
            if ("email" in e2) {
              let { email: r3, password: s3, options: i3 } = e2, a3 = null, o3 = null;
              "pkce" === this.flowType && ([a3, o3] = await F(this.storage, this.storageKey)), n2 = await Q(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, redirectTo: null == i3 ? void 0 : i3.emailRedirectTo, body: { email: r3, password: s3, data: null != (t2 = null == i3 ? void 0 : i3.data) ? t2 : {}, gotrue_meta_security: { captcha_token: null == i3 ? void 0 : i3.captchaToken }, code_challenge: a3, code_challenge_method: o3 }, xform: ee });
            } else if ("phone" in e2) {
              let { phone: t3, password: i3, options: a3 } = e2;
              n2 = await Q(this.fetch, "POST", `${this.url}/signup`, { headers: this.headers, body: { phone: t3, password: i3, data: null != (r2 = null == a3 ? void 0 : a3.data) ? r2 : {}, channel: null != (s2 = null == a3 ? void 0 : a3.channel) ? s2 : "sms", gotrue_meta_security: { captcha_token: null == a3 ? void 0 : a3.captchaToken } }, xform: ee });
            } else throw new m("You must provide either an email or phone number and a password");
            let { data: i2, error: a2 } = n2;
            if (a2 || !i2) return await D(this.storage, `${this.storageKey}-code-verifier`), this._returnResult({ data: { user: null, session: null }, error: a2 });
            let o2 = i2.session, l2 = i2.user;
            return i2.session && (await this._saveSession(i2.session), await this._notifyAllSubscribers("SIGNED_IN", o2)), this._returnResult({ data: { user: l2, session: o2 }, error: null });
          } catch (e3) {
            if (await D(this.storage, `${this.storageKey}-code-verifier`), l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async signInWithPassword(e2) {
          try {
            let t2;
            if ("email" in e2) {
              let { email: r3, password: s3, options: n2 } = e2;
              t2 = await Q(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { email: r3, password: s3, gotrue_meta_security: { captcha_token: null == n2 ? void 0 : n2.captchaToken } }, xform: et });
            } else if ("phone" in e2) {
              let { phone: r3, password: s3, options: n2 } = e2;
              t2 = await Q(this.fetch, "POST", `${this.url}/token?grant_type=password`, { headers: this.headers, body: { phone: r3, password: s3, gotrue_meta_security: { captcha_token: null == n2 ? void 0 : n2.captchaToken } }, xform: et });
            } else throw new m("You must provide either an email or phone number and a password");
            let { data: r2, error: s2 } = t2;
            if (s2) return this._returnResult({ data: { user: null, session: null }, error: s2 });
            if (!r2 || !r2.session || !r2.user) {
              let e3 = new g();
              return this._returnResult({ data: { user: null, session: null }, error: e3 });
            }
            return r2.session && (await this._saveSession(r2.session), await this._notifyAllSubscribers("SIGNED_IN", r2.session)), this._returnResult({ data: Object.assign({ user: r2.user, session: r2.session }, r2.weak_password ? { weakPassword: r2.weak_password } : null), error: s2 });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async signInWithOAuth(e2) {
          var t2, r2, s2, n2;
          return await this._handleProviderSignIn(e2.provider, { redirectTo: null == (t2 = e2.options) ? void 0 : t2.redirectTo, scopes: null == (r2 = e2.options) ? void 0 : r2.scopes, queryParams: null == (s2 = e2.options) ? void 0 : s2.queryParams, skipBrowserRedirect: null == (n2 = e2.options) ? void 0 : n2.skipBrowserRedirect });
        }
        async exchangeCodeForSession(e2) {
          return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e2));
        }
        async signInWithWeb3(e2) {
          let { chain: t2 } = e2;
          switch (t2) {
            case "ethereum":
              return await this.signInWithEthereum(e2);
            case "solana":
              return await this.signInWithSolana(e2);
            default:
              throw Error(`@supabase/auth-js: Unsupported chain "${t2}"`);
          }
        }
        async signInWithEthereum(e2) {
          var t2, r2, s2, n2, i2, a2, o2, u2, c2, h2, d2, p2;
          let f2, m2;
          if ("message" in e2) f2 = e2.message, m2 = e2.signature;
          else {
            let { chain: l2, wallet: h3, statement: d3, options: g2 } = e2;
            if ("object" != typeof h3 || !(null == g2 ? void 0 : g2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            let b2 = new URL(null != (t2 = null == g2 ? void 0 : g2.url) ? t2 : window.location.href), y2 = await h3.request({ method: "eth_requestAccounts" }).then((e3) => e3).catch(() => {
              throw Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
            });
            if (!y2 || 0 === y2.length) throw Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
            let v2 = em(y2[0]), w2 = null == (r2 = null == g2 ? void 0 : g2.signInWithEthereum) ? void 0 : r2.chainId;
            w2 || (w2 = parseInt(await h3.request({ method: "eth_chainId" }), 16)), f2 = function(e3) {
              var t3;
              let { chainId: r3, domain: s3, expirationTime: n3, issuedAt: i3 = /* @__PURE__ */ new Date(), nonce: a3, notBefore: o3, requestId: l3, resources: u3, scheme: c3, uri: h4, version: d4 } = e3;
              if (!Number.isInteger(r3)) throw Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r3}`);
              if (!s3) throw Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
              if (a3 && a3.length < 8) throw Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a3}`);
              if (!h4) throw Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
              if ("1" !== d4) throw Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d4}`);
              if (null == (t3 = e3.statement) ? void 0 : t3.includes("\n")) throw Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${e3.statement}`);
              let p3 = em(e3.address), f3 = c3 ? `${c3}://${s3}` : s3, g3 = e3.statement ? `${e3.statement}
` : "", m3 = `${f3} wants you to sign in with your Ethereum account:
${p3}

${g3}`, b3 = `URI: ${h4}
Version: ${d4}
Chain ID: ${r3}${a3 ? `
Nonce: ${a3}` : ""}
Issued At: ${i3.toISOString()}`;
              if (n3 && (b3 += `
Expiration Time: ${n3.toISOString()}`), o3 && (b3 += `
Not Before: ${o3.toISOString()}`), l3 && (b3 += `
Request ID: ${l3}`), u3) {
                let e4 = "\nResources:";
                for (let t4 of u3) {
                  if (!t4 || "string" != typeof t4) throw Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${t4}`);
                  e4 += `
- ${t4}`;
                }
                b3 += e4;
              }
              return `${m3}
${b3}`;
            }({ domain: b2.host, address: v2, statement: d3, uri: b2.href, version: "1", chainId: w2, nonce: null == (s2 = null == g2 ? void 0 : g2.signInWithEthereum) ? void 0 : s2.nonce, issuedAt: null != (i2 = null == (n2 = null == g2 ? void 0 : g2.signInWithEthereum) ? void 0 : n2.issuedAt) ? i2 : /* @__PURE__ */ new Date(), expirationTime: null == (a2 = null == g2 ? void 0 : g2.signInWithEthereum) ? void 0 : a2.expirationTime, notBefore: null == (o2 = null == g2 ? void 0 : g2.signInWithEthereum) ? void 0 : o2.notBefore, requestId: null == (u2 = null == g2 ? void 0 : g2.signInWithEthereum) ? void 0 : u2.requestId, resources: null == (c2 = null == g2 ? void 0 : g2.signInWithEthereum) ? void 0 : c2.resources }), m2 = await h3.request({ method: "personal_sign", params: [(p2 = f2, "0x" + Array.from(new TextEncoder().encode(p2), (e3) => e3.toString(16).padStart(2, "0")).join("")), v2] });
          }
          try {
            let { data: t3, error: r3 } = await Q(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "ethereum", message: f2, signature: m2 }, (null == (h2 = e2.options) ? void 0 : h2.captchaToken) ? { gotrue_meta_security: { captcha_token: null == (d2 = e2.options) ? void 0 : d2.captchaToken } } : null), xform: ee });
            if (r3) throw r3;
            if (!t3 || !t3.session || !t3.user) {
              let e3 = new g();
              return this._returnResult({ data: { user: null, session: null }, error: e3 });
            }
            return t3.session && (await this._saveSession(t3.session), await this._notifyAllSubscribers("SIGNED_IN", t3.session)), this._returnResult({ data: Object.assign({}, t3), error: r3 });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async signInWithSolana(e2) {
          var t2, r2, s2, n2, i2, a2, o2, u2, c2, h2, d2, p2;
          let f2, m2;
          if ("message" in e2) f2 = e2.message, m2 = e2.signature;
          else {
            let { chain: l2, wallet: d3, statement: p3, options: g2 } = e2;
            if ("object" != typeof d3 || !(null == g2 ? void 0 : g2.url)) throw Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
            let b2 = new URL(null != (t2 = null == g2 ? void 0 : g2.url) ? t2 : window.location.href);
            if ("signIn" in d3 && d3.signIn) {
              let e3, t3 = await d3.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, null == g2 ? void 0 : g2.signInWithSolana), { version: "1", domain: b2.host, uri: b2.href }), p3 ? { statement: p3 } : null));
              if (Array.isArray(t3) && t3[0] && "object" == typeof t3[0]) e3 = t3[0];
              else if (t3 && "object" == typeof t3 && "signedMessage" in t3 && "signature" in t3) e3 = t3;
              else throw Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
              if ("signedMessage" in e3 && "signature" in e3 && ("string" == typeof e3.signedMessage || e3.signedMessage instanceof Uint8Array) && e3.signature instanceof Uint8Array) f2 = "string" == typeof e3.signedMessage ? e3.signedMessage : new TextDecoder().decode(e3.signedMessage), m2 = e3.signature;
              else throw Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
            } else {
              if (!("signMessage" in d3) || "function" != typeof d3.signMessage || !("publicKey" in d3) || "object" != typeof d3 || !d3.publicKey || !("toBase58" in d3.publicKey) || "function" != typeof d3.publicKey.toBase58) throw Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
              f2 = [`${b2.host} wants you to sign in with your Solana account:`, d3.publicKey.toBase58(), ...p3 ? ["", p3, ""] : [""], "Version: 1", `URI: ${b2.href}`, `Issued At: ${null != (s2 = null == (r2 = null == g2 ? void 0 : g2.signInWithSolana) ? void 0 : r2.issuedAt) ? s2 : (/* @__PURE__ */ new Date()).toISOString()}`, ...(null == (n2 = null == g2 ? void 0 : g2.signInWithSolana) ? void 0 : n2.notBefore) ? [`Not Before: ${g2.signInWithSolana.notBefore}`] : [], ...(null == (i2 = null == g2 ? void 0 : g2.signInWithSolana) ? void 0 : i2.expirationTime) ? [`Expiration Time: ${g2.signInWithSolana.expirationTime}`] : [], ...(null == (a2 = null == g2 ? void 0 : g2.signInWithSolana) ? void 0 : a2.chainId) ? [`Chain ID: ${g2.signInWithSolana.chainId}`] : [], ...(null == (o2 = null == g2 ? void 0 : g2.signInWithSolana) ? void 0 : o2.nonce) ? [`Nonce: ${g2.signInWithSolana.nonce}`] : [], ...(null == (u2 = null == g2 ? void 0 : g2.signInWithSolana) ? void 0 : u2.requestId) ? [`Request ID: ${g2.signInWithSolana.requestId}`] : [], ...(null == (h2 = null == (c2 = null == g2 ? void 0 : g2.signInWithSolana) ? void 0 : c2.resources) ? void 0 : h2.length) ? ["Resources", ...g2.signInWithSolana.resources.map((e4) => `- ${e4}`)] : []].join("\n");
              let e3 = await d3.signMessage(new TextEncoder().encode(f2), "utf8");
              if (!e3 || !(e3 instanceof Uint8Array)) throw Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
              m2 = e3;
            }
          }
          try {
            let { data: t3, error: r3 } = await Q(this.fetch, "POST", `${this.url}/token?grant_type=web3`, { headers: this.headers, body: Object.assign({ chain: "solana", message: f2, signature: j(m2) }, (null == (d2 = e2.options) ? void 0 : d2.captchaToken) ? { gotrue_meta_security: { captcha_token: null == (p2 = e2.options) ? void 0 : p2.captchaToken } } : null), xform: ee });
            if (r3) throw r3;
            if (!t3 || !t3.session || !t3.user) {
              let e3 = new g();
              return this._returnResult({ data: { user: null, session: null }, error: e3 });
            }
            return t3.session && (await this._saveSession(t3.session), await this._notifyAllSubscribers("SIGNED_IN", t3.session)), this._returnResult({ data: Object.assign({}, t3), error: r3 });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async _exchangeCodeForSession(e2) {
          let t2 = await $(this.storage, `${this.storageKey}-code-verifier`), [r2, s2] = (null != t2 ? t2 : "").split("/");
          try {
            let { data: t3, error: n2 } = await Q(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, { headers: this.headers, body: { auth_code: e2, code_verifier: r2 }, xform: ee });
            if (await D(this.storage, `${this.storageKey}-code-verifier`), n2) throw n2;
            if (!t3 || !t3.session || !t3.user) {
              let e3 = new g();
              return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e3 });
            }
            return t3.session && (await this._saveSession(t3.session), await this._notifyAllSubscribers("SIGNED_IN", t3.session)), this._returnResult({ data: Object.assign(Object.assign({}, t3), { redirectType: null != s2 ? s2 : null }), error: n2 });
          } catch (e3) {
            if (await D(this.storage, `${this.storageKey}-code-verifier`), l(e3)) return this._returnResult({ data: { user: null, session: null, redirectType: null }, error: e3 });
            throw e3;
          }
        }
        async signInWithIdToken(e2) {
          try {
            let { options: t2, provider: r2, token: s2, access_token: n2, nonce: i2 } = e2, { data: a2, error: o2 } = await Q(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, body: { provider: r2, id_token: s2, access_token: n2, nonce: i2, gotrue_meta_security: { captcha_token: null == t2 ? void 0 : t2.captchaToken } }, xform: ee });
            if (o2) return this._returnResult({ data: { user: null, session: null }, error: o2 });
            if (!a2 || !a2.session || !a2.user) {
              let e3 = new g();
              return this._returnResult({ data: { user: null, session: null }, error: e3 });
            }
            return a2.session && (await this._saveSession(a2.session), await this._notifyAllSubscribers("SIGNED_IN", a2.session)), this._returnResult({ data: a2, error: o2 });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async signInWithOtp(e2) {
          var t2, r2, s2, n2, i2;
          try {
            if ("email" in e2) {
              let { email: s3, options: n3 } = e2, i3 = null, a2 = null;
              "pkce" === this.flowType && ([i3, a2] = await F(this.storage, this.storageKey));
              let { error: o2 } = await Q(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { email: s3, data: null != (t2 = null == n3 ? void 0 : n3.data) ? t2 : {}, create_user: null == (r2 = null == n3 ? void 0 : n3.shouldCreateUser) || r2, gotrue_meta_security: { captcha_token: null == n3 ? void 0 : n3.captchaToken }, code_challenge: i3, code_challenge_method: a2 }, redirectTo: null == n3 ? void 0 : n3.emailRedirectTo });
              return this._returnResult({ data: { user: null, session: null }, error: o2 });
            }
            if ("phone" in e2) {
              let { phone: t3, options: r3 } = e2, { data: a2, error: o2 } = await Q(this.fetch, "POST", `${this.url}/otp`, { headers: this.headers, body: { phone: t3, data: null != (s2 = null == r3 ? void 0 : r3.data) ? s2 : {}, create_user: null == (n2 = null == r3 ? void 0 : r3.shouldCreateUser) || n2, gotrue_meta_security: { captcha_token: null == r3 ? void 0 : r3.captchaToken }, channel: null != (i2 = null == r3 ? void 0 : r3.channel) ? i2 : "sms" } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == a2 ? void 0 : a2.message_id }, error: o2 });
            }
            throw new m("You must provide either an email or phone number.");
          } catch (e3) {
            if (await D(this.storage, `${this.storageKey}-code-verifier`), l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async verifyOtp(e2) {
          var t2, r2;
          try {
            let s2, n2;
            "options" in e2 && (s2 = null == (t2 = e2.options) ? void 0 : t2.redirectTo, n2 = null == (r2 = e2.options) ? void 0 : r2.captchaToken);
            let { data: i2, error: a2 } = await Q(this.fetch, "POST", `${this.url}/verify`, { headers: this.headers, body: Object.assign(Object.assign({}, e2), { gotrue_meta_security: { captcha_token: n2 } }), redirectTo: s2, xform: ee });
            if (a2) throw a2;
            if (!i2) throw Error("An error occurred on token verification.");
            let o2 = i2.session, l2 = i2.user;
            return (null == o2 ? void 0 : o2.access_token) && (await this._saveSession(o2), await this._notifyAllSubscribers("recovery" == e2.type ? "PASSWORD_RECOVERY" : "SIGNED_IN", o2)), this._returnResult({ data: { user: l2, session: o2 }, error: null });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async signInWithSSO(e2) {
          var t2, r2, s2, n2;
          try {
            let i2 = null, a2 = null;
            "pkce" === this.flowType && ([i2, a2] = await F(this.storage, this.storageKey));
            let o2 = await Q(this.fetch, "POST", `${this.url}/sso`, { body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e2 ? { provider_id: e2.providerId } : null), "domain" in e2 ? { domain: e2.domain } : null), { redirect_to: null != (r2 = null == (t2 = e2.options) ? void 0 : t2.redirectTo) ? r2 : void 0 }), (null == (s2 = null == e2 ? void 0 : e2.options) ? void 0 : s2.captchaToken) ? { gotrue_meta_security: { captcha_token: e2.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: i2, code_challenge_method: a2 }), headers: this.headers, xform: es });
            return null == (n2 = o2.data) || n2.url, this._returnResult(o2);
          } catch (e3) {
            if (await D(this.storage, `${this.storageKey}-code-verifier`), l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async reauthenticate() {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
        }
        async _reauthenticate() {
          try {
            return await this._useSession(async (e2) => {
              let { data: { session: t2 }, error: r2 } = e2;
              if (r2) throw r2;
              if (!t2) throw new p();
              let { error: s2 } = await Q(this.fetch, "GET", `${this.url}/reauthenticate`, { headers: this.headers, jwt: t2.access_token });
              return this._returnResult({ data: { user: null, session: null }, error: s2 });
            });
          } catch (e2) {
            if (l(e2)) return this._returnResult({ data: { user: null, session: null }, error: e2 });
            throw e2;
          }
        }
        async resend(e2) {
          try {
            let t2 = `${this.url}/resend`;
            if ("email" in e2) {
              let { email: r2, type: s2, options: n2 } = e2, { error: i2 } = await Q(this.fetch, "POST", t2, { headers: this.headers, body: { email: r2, type: s2, gotrue_meta_security: { captcha_token: null == n2 ? void 0 : n2.captchaToken } }, redirectTo: null == n2 ? void 0 : n2.emailRedirectTo });
              return this._returnResult({ data: { user: null, session: null }, error: i2 });
            }
            if ("phone" in e2) {
              let { phone: r2, type: s2, options: n2 } = e2, { data: i2, error: a2 } = await Q(this.fetch, "POST", t2, { headers: this.headers, body: { phone: r2, type: s2, gotrue_meta_security: { captcha_token: null == n2 ? void 0 : n2.captchaToken } } });
              return this._returnResult({ data: { user: null, session: null, messageId: null == i2 ? void 0 : i2.message_id }, error: a2 });
            }
            throw new m("You must provide either an email or phone number and a type");
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async getSession() {
          return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (e2) => e2));
        }
        async _acquireLock(e2, t2) {
          this._debug("#_acquireLock", "begin", e2);
          try {
            if (this.lockAcquired) {
              let e3 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), r2 = (async () => (await e3, await t2()))();
              return this.pendingInLock.push((async () => {
                try {
                  await r2;
                } catch (e4) {
                }
              })()), r2;
            }
            return await this.lock(`lock:${this.storageKey}`, e2, async () => {
              this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
              try {
                this.lockAcquired = true;
                let e3 = t2();
                for (this.pendingInLock.push((async () => {
                  try {
                    await e3;
                  } catch (e4) {
                  }
                })()), await e3; this.pendingInLock.length; ) {
                  let e4 = [...this.pendingInLock];
                  await Promise.all(e4), this.pendingInLock.splice(0, e4.length);
                }
                return await e3;
              } finally {
                this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = false;
              }
            });
          } finally {
            this._debug("#_acquireLock", "end");
          }
        }
        async _useSession(e2) {
          this._debug("#_useSession", "begin");
          try {
            let t2 = await this.__loadSession();
            return await e2(t2);
          } finally {
            this._debug("#_useSession", "end");
          }
        }
        async __loadSession() {
          this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", Error().stack);
          try {
            let t2 = null, r2 = await $(this.storage, this.storageKey);
            if (this._debug("#getSession()", "session from storage", r2), null !== r2 && (this._isValidSession(r2) ? t2 = r2 : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !t2) return { data: { session: null }, error: null };
            let s2 = !!t2.expires_at && 1e3 * t2.expires_at - Date.now() < 9e4;
            if (this._debug("#__loadSession()", `session has${s2 ? "" : " not"} expired`, "expires_at", t2.expires_at), !s2) {
              if (this.userStorage) {
                let e3 = await $(this.userStorage, this.storageKey + "-user");
                (null == e3 ? void 0 : e3.user) ? t2.user = e3.user : t2.user = z();
              }
              if (this.storage.isServer && t2.user && !t2.user.__isUserNotAvailableProxy) {
                var e2;
                let r3 = { value: this.suppressGetSessionWarning };
                t2.user = (e2 = t2.user, new Proxy(e2, { get: (e3, t3, s3) => {
                  if ("__isInsecureUserWarningProxy" === t3) return true;
                  if ("symbol" == typeof t3) {
                    let r4 = t3.toString();
                    if ("Symbol(Symbol.toPrimitive)" === r4 || "Symbol(Symbol.toStringTag)" === r4 || "Symbol(util.inspect.custom)" === r4 || "Symbol(nodejs.util.inspect.custom)" === r4) return Reflect.get(e3, t3, s3);
                  }
                  return r3.value || "string" != typeof t3 || (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), r3.value = true), Reflect.get(e3, t3, s3);
                } })), r3.value && (this.suppressGetSessionWarning = true);
              }
              return { data: { session: t2 }, error: null };
            }
            let { data: n2, error: i2 } = await this._callRefreshToken(t2.refresh_token);
            if (i2) return this._returnResult({ data: { session: null }, error: i2 });
            return this._returnResult({ data: { session: n2 }, error: null });
          } finally {
            this._debug("#__loadSession()", "end");
          }
        }
        async getUser(e2) {
          if (e2) return await this._getUser(e2);
          await this.initializePromise;
          let t2 = await this._acquireLock(-1, async () => await this._getUser());
          return t2.data.user && (this.suppressGetSessionWarning = true), t2;
        }
        async _getUser(e2) {
          try {
            if (e2) return await Q(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: e2, xform: er });
            return await this._useSession(async (e3) => {
              var t2, r2, s2;
              let { data: n2, error: i2 } = e3;
              if (i2) throw i2;
              return (null == (t2 = n2.session) ? void 0 : t2.access_token) || this.hasCustomAuthorizationHeader ? await Q(this.fetch, "GET", `${this.url}/user`, { headers: this.headers, jwt: null != (s2 = null == (r2 = n2.session) ? void 0 : r2.access_token) ? s2 : void 0, xform: er }) : { data: { user: null }, error: new p() };
            });
          } catch (e3) {
            if (l(e3)) return f(e3) && (await this._removeSession(), await D(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ data: { user: null }, error: e3 });
            throw e3;
          }
        }
        async updateUser(e2, t2 = {}) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e2, t2));
        }
        async _updateUser(e2, t2 = {}) {
          try {
            return await this._useSession(async (r2) => {
              let { data: s2, error: n2 } = r2;
              if (n2) throw n2;
              if (!s2.session) throw new p();
              let i2 = s2.session, a2 = null, o2 = null;
              "pkce" === this.flowType && null != e2.email && ([a2, o2] = await F(this.storage, this.storageKey));
              let { data: l2, error: u2 } = await Q(this.fetch, "PUT", `${this.url}/user`, { headers: this.headers, redirectTo: null == t2 ? void 0 : t2.emailRedirectTo, body: Object.assign(Object.assign({}, e2), { code_challenge: a2, code_challenge_method: o2 }), jwt: i2.access_token, xform: er });
              if (u2) throw u2;
              return i2.user = l2.user, await this._saveSession(i2), await this._notifyAllSubscribers("USER_UPDATED", i2), this._returnResult({ data: { user: i2.user }, error: null });
            });
          } catch (e3) {
            if (await D(this.storage, `${this.storageKey}-code-verifier`), l(e3)) return this._returnResult({ data: { user: null }, error: e3 });
            throw e3;
          }
        }
        async setSession(e2) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e2));
        }
        async _setSession(e2) {
          try {
            if (!e2.access_token || !e2.refresh_token) throw new p();
            let t2 = Date.now() / 1e3, r2 = t2, s2 = true, n2 = null, { payload: i2 } = U(e2.access_token);
            if (i2.exp && (s2 = (r2 = i2.exp) <= t2), s2) {
              let { data: t3, error: r3 } = await this._callRefreshToken(e2.refresh_token);
              if (r3) return this._returnResult({ data: { user: null, session: null }, error: r3 });
              if (!t3) return { data: { user: null, session: null }, error: null };
              n2 = t3;
            } else {
              let { data: s3, error: i3 } = await this._getUser(e2.access_token);
              if (i3) throw i3;
              n2 = { access_token: e2.access_token, refresh_token: e2.refresh_token, user: s3.user, token_type: "bearer", expires_in: r2 - t2, expires_at: r2 }, await this._saveSession(n2), await this._notifyAllSubscribers("SIGNED_IN", n2);
            }
            return this._returnResult({ data: { user: n2.user, session: n2 }, error: null });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { session: null, user: null }, error: e3 });
            throw e3;
          }
        }
        async refreshSession(e2) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e2));
        }
        async _refreshSession(e2) {
          try {
            return await this._useSession(async (t2) => {
              var r2;
              if (!e2) {
                let { data: s3, error: n3 } = t2;
                if (n3) throw n3;
                e2 = null != (r2 = s3.session) ? r2 : void 0;
              }
              if (!(null == e2 ? void 0 : e2.refresh_token)) throw new p();
              let { data: s2, error: n2 } = await this._callRefreshToken(e2.refresh_token);
              return n2 ? this._returnResult({ data: { user: null, session: null }, error: n2 }) : s2 ? this._returnResult({ data: { user: s2.user, session: s2 }, error: null }) : this._returnResult({ data: { user: null, session: null }, error: null });
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
            throw e3;
          }
        }
        async _getSessionFromURL(e2, t2) {
          try {
            throw new b("No browser detected.");
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: { session: null, redirectType: null }, error: e3 });
            throw e3;
          }
        }
        _isImplicitGrantCallback(e2) {
          return !!(e2.access_token || e2.error_description);
        }
        async _isPKCECallback(e2) {
          let t2 = await $(this.storage, `${this.storageKey}-code-verifier`);
          return !!(e2.code && t2);
        }
        async signOut(e2 = { scope: "global" }) {
          return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e2));
        }
        async _signOut({ scope: e2 } = { scope: "global" }) {
          return await this._useSession(async (t2) => {
            var r2;
            let { data: s2, error: n2 } = t2;
            if (n2) return this._returnResult({ error: n2 });
            let i2 = null == (r2 = s2.session) ? void 0 : r2.access_token;
            if (i2) {
              let { error: t3 } = await this.admin.signOut(i2, e2);
              if (t3 && !(c(t3) && (404 === t3.status || 401 === t3.status || 403 === t3.status))) return this._returnResult({ error: t3 });
            }
            return "others" !== e2 && (await this._removeSession(), await D(this.storage, `${this.storageKey}-code-verifier`)), this._returnResult({ error: null });
          });
        }
        onAuthStateChange(e2) {
          let t2 = Symbol("auth-callback"), r2 = { id: t2, callback: e2, unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", t2), this.stateChangeEmitters.delete(t2);
          } };
          return this._debug("#onAuthStateChange()", "registered callback with id", t2), this.stateChangeEmitters.set(t2, r2), (async () => {
            await this.initializePromise, await this._acquireLock(-1, async () => {
              this._emitInitialSession(t2);
            });
          })(), { data: { subscription: r2 } };
        }
        async _emitInitialSession(e2) {
          return await this._useSession(async (t2) => {
            var r2, s2;
            try {
              let { data: { session: s3 }, error: n2 } = t2;
              if (n2) throw n2;
              await (null == (r2 = this.stateChangeEmitters.get(e2)) ? void 0 : r2.callback("INITIAL_SESSION", s3)), this._debug("INITIAL_SESSION", "callback id", e2, "session", s3);
            } catch (t3) {
              await (null == (s2 = this.stateChangeEmitters.get(e2)) ? void 0 : s2.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e2, "error", t3), console.error(t3);
            }
          });
        }
        async resetPasswordForEmail(e2, t2 = {}) {
          let r2 = null, s2 = null;
          "pkce" === this.flowType && ([r2, s2] = await F(this.storage, this.storageKey, true));
          try {
            return await Q(this.fetch, "POST", `${this.url}/recover`, { body: { email: e2, code_challenge: r2, code_challenge_method: s2, gotrue_meta_security: { captcha_token: t2.captchaToken } }, headers: this.headers, redirectTo: t2.redirectTo });
          } catch (e3) {
            if (await D(this.storage, `${this.storageKey}-code-verifier`), l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async getUserIdentities() {
          var e2;
          try {
            let { data: t2, error: r2 } = await this.getUser();
            if (r2) throw r2;
            return this._returnResult({ data: { identities: null != (e2 = t2.user.identities) ? e2 : [] }, error: null });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async linkIdentity(e2) {
          return "token" in e2 ? this.linkIdentityIdToken(e2) : this.linkIdentityOAuth(e2);
        }
        async linkIdentityOAuth(e2) {
          try {
            let { data: t2, error: r2 } = await this._useSession(async (t3) => {
              var r3, s2, n2, i2, a2;
              let { data: o2, error: l2 } = t3;
              if (l2) throw l2;
              let u2 = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e2.provider, { redirectTo: null == (r3 = e2.options) ? void 0 : r3.redirectTo, scopes: null == (s2 = e2.options) ? void 0 : s2.scopes, queryParams: null == (n2 = e2.options) ? void 0 : n2.queryParams, skipBrowserRedirect: true });
              return await Q(this.fetch, "GET", u2, { headers: this.headers, jwt: null != (a2 = null == (i2 = o2.session) ? void 0 : i2.access_token) ? a2 : void 0 });
            });
            if (r2) throw r2;
            return this._returnResult({ data: { provider: e2.provider, url: null == t2 ? void 0 : t2.url }, error: null });
          } catch (t2) {
            if (l(t2)) return this._returnResult({ data: { provider: e2.provider, url: null }, error: t2 });
            throw t2;
          }
        }
        async linkIdentityIdToken(e2) {
          return await this._useSession(async (t2) => {
            var r2;
            try {
              let { error: s2, data: { session: n2 } } = t2;
              if (s2) throw s2;
              let { options: i2, provider: a2, token: o2, access_token: l2, nonce: u2 } = e2, { data: c2, error: h2 } = await Q(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, { headers: this.headers, jwt: null != (r2 = null == n2 ? void 0 : n2.access_token) ? r2 : void 0, body: { provider: a2, id_token: o2, access_token: l2, nonce: u2, link_identity: true, gotrue_meta_security: { captcha_token: null == i2 ? void 0 : i2.captchaToken } }, xform: ee });
              if (h2) return this._returnResult({ data: { user: null, session: null }, error: h2 });
              if (!c2 || !c2.session || !c2.user) return this._returnResult({ data: { user: null, session: null }, error: new g() });
              return c2.session && (await this._saveSession(c2.session), await this._notifyAllSubscribers("USER_UPDATED", c2.session)), this._returnResult({ data: c2, error: h2 });
            } catch (e3) {
              if (await D(this.storage, `${this.storageKey}-code-verifier`), l(e3)) return this._returnResult({ data: { user: null, session: null }, error: e3 });
              throw e3;
            }
          });
        }
        async unlinkIdentity(e2) {
          try {
            return await this._useSession(async (t2) => {
              var r2, s2;
              let { data: n2, error: i2 } = t2;
              if (i2) throw i2;
              return await Q(this.fetch, "DELETE", `${this.url}/user/identities/${e2.identity_id}`, { headers: this.headers, jwt: null != (s2 = null == (r2 = n2.session) ? void 0 : r2.access_token) ? s2 : void 0 });
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async _refreshAccessToken(e2) {
          let t2 = `#_refreshAccessToken(${e2.substring(0, 5)}...)`;
          this._debug(t2, "begin");
          try {
            var r2, s2;
            let n2 = Date.now();
            return await (r2 = async (r3) => (r3 > 0 && await M(200 * Math.pow(2, r3 - 1)), this._debug(t2, "refreshing attempt", r3), await Q(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, { body: { refresh_token: e2 }, headers: this.headers, xform: ee })), s2 = (e3, t3) => {
              let r3 = 200 * Math.pow(2, e3);
              return t3 && _(t3) && Date.now() + r3 - n2 < 3e4;
            }, new Promise((e3, t3) => {
              (async () => {
                for (let n3 = 0; n3 < 1 / 0; n3++) try {
                  let t4 = await r2(n3);
                  if (!s2(n3, null, t4)) return void e3(t4);
                } catch (e4) {
                  if (!s2(n3, e4)) return void t3(e4);
                }
              })();
            }));
          } catch (e3) {
            if (this._debug(t2, "error", e3), l(e3)) return this._returnResult({ data: { session: null, user: null }, error: e3 });
            throw e3;
          } finally {
            this._debug(t2, "end");
          }
        }
        _isValidSession(e2) {
          return "object" == typeof e2 && null !== e2 && "access_token" in e2 && "refresh_token" in e2 && "expires_at" in e2;
        }
        async _handleProviderSignIn(e2, t2) {
          let r2 = await this._getUrlForProvider(`${this.url}/authorize`, e2, { redirectTo: t2.redirectTo, scopes: t2.scopes, queryParams: t2.queryParams });
          return this._debug("#_handleProviderSignIn()", "provider", e2, "options", t2, "url", r2), { data: { provider: e2, url: r2 }, error: null };
        }
        async _recoverAndRefresh() {
          var e2, t2;
          let r2 = "#_recoverAndRefresh()";
          this._debug(r2, "begin");
          try {
            let s2 = await $(this.storage, this.storageKey);
            if (s2 && this.userStorage) {
              let t3 = await $(this.userStorage, this.storageKey + "-user");
              !this.storage.isServer && Object.is(this.storage, this.userStorage) && !t3 && (t3 = { user: s2.user }, await N(this.userStorage, this.storageKey + "-user", t3)), s2.user = null != (e2 = null == t3 ? void 0 : t3.user) ? e2 : z();
            } else if (s2 && !s2.user && !s2.user) {
              let e3 = await $(this.storage, this.storageKey + "-user");
              e3 && (null == e3 ? void 0 : e3.user) ? (s2.user = e3.user, await D(this.storage, this.storageKey + "-user"), await N(this.storage, this.storageKey, s2)) : s2.user = z();
            }
            if (this._debug(r2, "session from storage", s2), !this._isValidSession(s2)) {
              this._debug(r2, "session is not valid"), null !== s2 && await this._removeSession();
              return;
            }
            let n2 = (null != (t2 = s2.expires_at) ? t2 : 1 / 0) * 1e3 - Date.now() < 9e4;
            if (this._debug(r2, `session has${n2 ? "" : " not"} expired with margin of 90000s`), n2) {
              if (this.autoRefreshToken && s2.refresh_token) {
                let { error: e3 } = await this._callRefreshToken(s2.refresh_token);
                e3 && (console.error(e3), _(e3) || (this._debug(r2, "refresh failed with a non-retryable error, removing the session", e3), await this._removeSession()));
              }
            } else if (s2.user && true === s2.user.__isUserNotAvailableProxy) try {
              let { data: e3, error: t3 } = await this._getUser(s2.access_token);
              !t3 && (null == e3 ? void 0 : e3.user) ? (s2.user = e3.user, await this._saveSession(s2), await this._notifyAllSubscribers("SIGNED_IN", s2)) : this._debug(r2, "could not get user data, skipping SIGNED_IN notification");
            } catch (e3) {
              console.error("Error getting user data:", e3), this._debug(r2, "error getting user data, skipping SIGNED_IN notification", e3);
            }
            else await this._notifyAllSubscribers("SIGNED_IN", s2);
          } catch (e3) {
            this._debug(r2, "error", e3), console.error(e3);
            return;
          } finally {
            this._debug(r2, "end");
          }
        }
        async _callRefreshToken(e2) {
          var t2, r2;
          if (!e2) throw new p();
          if (this.refreshingDeferred) return this.refreshingDeferred.promise;
          let s2 = `#_callRefreshToken(${e2.substring(0, 5)}...)`;
          this._debug(s2, "begin");
          try {
            this.refreshingDeferred = new L();
            let { data: t3, error: r3 } = await this._refreshAccessToken(e2);
            if (r3) throw r3;
            if (!t3.session) throw new p();
            await this._saveSession(t3.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", t3.session);
            let s3 = { data: t3.session, error: null };
            return this.refreshingDeferred.resolve(s3), s3;
          } catch (e3) {
            if (this._debug(s2, "error", e3), l(e3)) {
              let r3 = { data: null, error: e3 };
              return _(e3) || await this._removeSession(), null == (t2 = this.refreshingDeferred) || t2.resolve(r3), r3;
            }
            throw null == (r2 = this.refreshingDeferred) || r2.reject(e3), e3;
          } finally {
            this.refreshingDeferred = null, this._debug(s2, "end");
          }
        }
        async _notifyAllSubscribers(e2, t2, r2 = true) {
          let s2 = `#_notifyAllSubscribers(${e2})`;
          this._debug(s2, "begin", t2, `broadcast = ${r2}`);
          try {
            this.broadcastChannel && r2 && this.broadcastChannel.postMessage({ event: e2, session: t2 });
            let s3 = [], n2 = Array.from(this.stateChangeEmitters.values()).map(async (r3) => {
              try {
                await r3.callback(e2, t2);
              } catch (e3) {
                s3.push(e3);
              }
            });
            if (await Promise.all(n2), s3.length > 0) {
              for (let e3 = 0; e3 < s3.length; e3 += 1) console.error(s3[e3]);
              throw s3[0];
            }
          } finally {
            this._debug(s2, "end");
          }
        }
        async _saveSession(e2) {
          this._debug("#_saveSession()", e2), this.suppressGetSessionWarning = true, await D(this.storage, `${this.storageKey}-code-verifier`);
          let t2 = Object.assign({}, e2), r2 = t2.user && true === t2.user.__isUserNotAvailableProxy;
          if (this.userStorage) {
            !r2 && t2.user && await N(this.userStorage, this.storageKey + "-user", { user: t2.user });
            let e3 = Object.assign({}, t2);
            delete e3.user;
            let s2 = K(e3);
            await N(this.storage, this.storageKey, s2);
          } else {
            let e3 = K(t2);
            await N(this.storage, this.storageKey, e3);
          }
        }
        async _removeSession() {
          this._debug("#_removeSession()"), this.suppressGetSessionWarning = false, await D(this.storage, this.storageKey), await D(this.storage, this.storageKey + "-code-verifier"), await D(this.storage, this.storageKey + "-user"), this.userStorage && await D(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
        }
        _removeVisibilityChangedCallback() {
          this._debug("#_removeVisibilityChangedCallback()"), this.visibilityChangedCallback, this.visibilityChangedCallback = null;
        }
        async _startAutoRefresh() {
          await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
          let e2 = setInterval(() => this._autoRefreshTokenTick(), 3e4);
          this.autoRefreshTicker = e2, e2 && "object" == typeof e2 && "function" == typeof e2.unref ? e2.unref() : "undefined" != typeof Deno && "function" == typeof Deno.unrefTimer && Deno.unrefTimer(e2), setTimeout(async () => {
            await this.initializePromise, await this._autoRefreshTokenTick();
          }, 0);
        }
        async _stopAutoRefresh() {
          this._debug("#_stopAutoRefresh()");
          let e2 = this.autoRefreshTicker;
          this.autoRefreshTicker = null, e2 && clearInterval(e2);
        }
        async startAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
        }
        async stopAutoRefresh() {
          this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
        }
        async _autoRefreshTokenTick() {
          this._debug("#_autoRefreshTokenTick()", "begin");
          try {
            await this._acquireLock(0, async () => {
              try {
                let e2 = Date.now();
                try {
                  return await this._useSession(async (t2) => {
                    let { data: { session: r2 } } = t2;
                    if (!r2 || !r2.refresh_token || !r2.expires_at) return void this._debug("#_autoRefreshTokenTick()", "no session");
                    let s2 = Math.floor((1e3 * r2.expires_at - e2) / 3e4);
                    this._debug("#_autoRefreshTokenTick()", `access token expires in ${s2} ticks, a tick lasts 30000ms, refresh threshold is 3 ticks`), s2 <= 3 && await this._callRefreshToken(r2.refresh_token);
                  });
                } catch (e3) {
                  console.error("Auto refresh tick failed with error. This is likely a transient error.", e3);
                }
              } finally {
                this._debug("#_autoRefreshTokenTick()", "end");
              }
            });
          } catch (e2) {
            if (e2.isAcquireTimeout || e2 instanceof ec) this._debug("auto refresh token tick lock not available");
            else throw e2;
          }
        }
        async _handleVisibilityChange() {
          return this._debug("#_handleVisibilityChange()"), this.autoRefreshToken && this.startAutoRefresh(), false;
        }
        async _onVisibilityChanged(e2) {
          let t2 = `#_onVisibilityChanged(${e2})`;
          this._debug(t2, "visibilityState", document.visibilityState), "visible" === document.visibilityState ? (this.autoRefreshToken && this._startAutoRefresh(), e2 || (await this.initializePromise, await this._acquireLock(-1, async () => {
            "visible" !== document.visibilityState ? this._debug(t2, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting") : await this._recoverAndRefresh();
          }))) : "hidden" === document.visibilityState && this.autoRefreshToken && this._stopAutoRefresh();
        }
        async _getUrlForProvider(e2, t2, r2) {
          let s2 = [`provider=${encodeURIComponent(t2)}`];
          if ((null == r2 ? void 0 : r2.redirectTo) && s2.push(`redirect_to=${encodeURIComponent(r2.redirectTo)}`), (null == r2 ? void 0 : r2.scopes) && s2.push(`scopes=${encodeURIComponent(r2.scopes)}`), "pkce" === this.flowType) {
            let [e3, t3] = await F(this.storage, this.storageKey), r3 = new URLSearchParams({ code_challenge: `${encodeURIComponent(e3)}`, code_challenge_method: `${encodeURIComponent(t3)}` });
            s2.push(r3.toString());
          }
          if (null == r2 ? void 0 : r2.queryParams) {
            let e3 = new URLSearchParams(r2.queryParams);
            s2.push(e3.toString());
          }
          return (null == r2 ? void 0 : r2.skipBrowserRedirect) && s2.push(`skip_http_redirect=${r2.skipBrowserRedirect}`), `${e2}?${s2.join("&")}`;
        }
        async _unenroll(e2) {
          try {
            return await this._useSession(async (t2) => {
              var r2;
              let { data: s2, error: n2 } = t2;
              return n2 ? this._returnResult({ data: null, error: n2 }) : await Q(this.fetch, "DELETE", `${this.url}/factors/${e2.factorId}`, { headers: this.headers, jwt: null == (r2 = null == s2 ? void 0 : s2.session) ? void 0 : r2.access_token });
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async _enroll(e2) {
          try {
            return await this._useSession(async (t2) => {
              var r2, s2;
              let { data: n2, error: i2 } = t2;
              if (i2) return this._returnResult({ data: null, error: i2 });
              let a2 = Object.assign({ friendly_name: e2.friendlyName, factor_type: e2.factorType }, "phone" === e2.factorType ? { phone: e2.phone } : "totp" === e2.factorType ? { issuer: e2.issuer } : {}), { data: o2, error: l2 } = await Q(this.fetch, "POST", `${this.url}/factors`, { body: a2, headers: this.headers, jwt: null == (r2 = null == n2 ? void 0 : n2.session) ? void 0 : r2.access_token });
              return l2 ? this._returnResult({ data: null, error: l2 }) : ("totp" === e2.factorType && "totp" === o2.type && (null == (s2 = null == o2 ? void 0 : o2.totp) ? void 0 : s2.qr_code) && (o2.totp.qr_code = `data:image/svg+xml;utf-8,${o2.totp.qr_code}`), this._returnResult({ data: o2, error: null }));
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async _verify(e2) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (t2) => {
                var r2, s2, n2;
                let { data: i2, error: a2 } = t2;
                if (a2) return this._returnResult({ data: null, error: a2 });
                let o2 = Object.assign({ challenge_id: e2.challengeId }, "webauthn" in e2 ? { webauthn: Object.assign(Object.assign({}, e2.webauthn), { credential_response: "create" === e2.webauthn.type ? (s2 = e2.webauthn.credential_response, "toJSON" in s2 && "function" == typeof s2.toJSON ? s2.toJSON() : { id: s2.id, rawId: s2.id, response: { attestationObject: j(new Uint8Array(s2.response.attestationObject)), clientDataJSON: j(new Uint8Array(s2.response.clientDataJSON)) }, type: "public-key", clientExtensionResults: s2.getClientExtensionResults(), authenticatorAttachment: null != (n2 = s2.authenticatorAttachment) ? n2 : void 0 }) : function(e3) {
                  var t3;
                  if ("toJSON" in e3 && "function" == typeof e3.toJSON) return e3.toJSON();
                  let r3 = e3.getClientExtensionResults(), s3 = e3.response;
                  return { id: e3.id, rawId: e3.id, response: { authenticatorData: j(new Uint8Array(s3.authenticatorData)), clientDataJSON: j(new Uint8Array(s3.clientDataJSON)), signature: j(new Uint8Array(s3.signature)), userHandle: s3.userHandle ? j(new Uint8Array(s3.userHandle)) : void 0 }, type: "public-key", clientExtensionResults: r3, authenticatorAttachment: null != (t3 = e3.authenticatorAttachment) ? t3 : void 0 };
                }(e2.webauthn.credential_response) }) } : { code: e2.code }), { data: l2, error: u2 } = await Q(this.fetch, "POST", `${this.url}/factors/${e2.factorId}/verify`, { body: o2, headers: this.headers, jwt: null == (r2 = null == i2 ? void 0 : i2.session) ? void 0 : r2.access_token });
                return u2 ? this._returnResult({ data: null, error: u2 }) : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + l2.expires_in }, l2)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", l2), this._returnResult({ data: l2, error: u2 }));
              });
            } catch (e3) {
              if (l(e3)) return this._returnResult({ data: null, error: e3 });
              throw e3;
            }
          });
        }
        async _challenge(e2) {
          return this._acquireLock(-1, async () => {
            try {
              return await this._useSession(async (r2) => {
                var s2;
                let { data: n2, error: i2 } = r2;
                if (i2) return this._returnResult({ data: null, error: i2 });
                let a2 = await Q(this.fetch, "POST", `${this.url}/factors/${e2.factorId}/challenge`, { body: e2, headers: this.headers, jwt: null == (s2 = null == n2 ? void 0 : n2.session) ? void 0 : s2.access_token });
                if (a2.error) return a2;
                let { data: o2 } = a2;
                if ("webauthn" !== o2.type) return { data: o2, error: null };
                switch (o2.webauthn.type) {
                  case "create":
                    return { data: Object.assign(Object.assign({}, o2), { webauthn: Object.assign(Object.assign({}, o2.webauthn), { credential_options: Object.assign(Object.assign({}, o2.webauthn.credential_options), { publicKey: function(e3) {
                      if (!e3) throw Error("Credential creation options are required");
                      if ("undefined" != typeof PublicKeyCredential && "parseCreationOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseCreationOptionsFromJSON) return PublicKeyCredential.parseCreationOptionsFromJSON(e3);
                      let { challenge: r3, user: s3, excludeCredentials: n3 } = e3, i3 = (0, t.__rest)(e3, ["challenge", "user", "excludeCredentials"]), a3 = A(r3).buffer, o3 = Object.assign(Object.assign({}, s3), { id: A(s3.id).buffer }), l2 = Object.assign(Object.assign({}, i3), { challenge: a3, user: o3 });
                      if (n3 && n3.length > 0) {
                        l2.excludeCredentials = Array(n3.length);
                        for (let e4 = 0; e4 < n3.length; e4++) {
                          let t2 = n3[e4];
                          l2.excludeCredentials[e4] = Object.assign(Object.assign({}, t2), { id: A(t2.id).buffer, type: t2.type || "public-key", transports: t2.transports });
                        }
                      }
                      return l2;
                    }(o2.webauthn.credential_options.publicKey) }) }) }), error: null };
                  case "request":
                    return { data: Object.assign(Object.assign({}, o2), { webauthn: Object.assign(Object.assign({}, o2.webauthn), { credential_options: Object.assign(Object.assign({}, o2.webauthn.credential_options), { publicKey: function(e3) {
                      if (!e3) throw Error("Credential request options are required");
                      if ("undefined" != typeof PublicKeyCredential && "parseRequestOptionsFromJSON" in PublicKeyCredential && "function" == typeof PublicKeyCredential.parseRequestOptionsFromJSON) return PublicKeyCredential.parseRequestOptionsFromJSON(e3);
                      let { challenge: r3, allowCredentials: s3 } = e3, n3 = (0, t.__rest)(e3, ["challenge", "allowCredentials"]), i3 = A(r3).buffer, a3 = Object.assign(Object.assign({}, n3), { challenge: i3 });
                      if (s3 && s3.length > 0) {
                        a3.allowCredentials = Array(s3.length);
                        for (let e4 = 0; e4 < s3.length; e4++) {
                          let t2 = s3[e4];
                          a3.allowCredentials[e4] = Object.assign(Object.assign({}, t2), { id: A(t2.id).buffer, type: t2.type || "public-key", transports: t2.transports });
                        }
                      }
                      return a3;
                    }(o2.webauthn.credential_options.publicKey) }) }) }), error: null };
                }
              });
            } catch (e3) {
              if (l(e3)) return this._returnResult({ data: null, error: e3 });
              throw e3;
            }
          });
        }
        async _challengeAndVerify(e2) {
          let { data: t2, error: r2 } = await this._challenge({ factorId: e2.factorId });
          return r2 ? this._returnResult({ data: null, error: r2 }) : await this._verify({ factorId: e2.factorId, challengeId: t2.id, code: e2.code });
        }
        async _listFactors() {
          var e2;
          let { data: { user: t2 }, error: r2 } = await this.getUser();
          if (r2) return { data: null, error: r2 };
          let s2 = { all: [], phone: [], totp: [], webauthn: [] };
          for (let r3 of null != (e2 = null == t2 ? void 0 : t2.factors) ? e2 : []) s2.all.push(r3), "verified" === r3.status && s2[r3.factor_type].push(r3);
          return { data: s2, error: null };
        }
        async _getAuthenticatorAssuranceLevel() {
          var e2, t2;
          let { data: { session: r2 }, error: s2 } = await this.getSession();
          if (s2) return this._returnResult({ data: null, error: s2 });
          if (!r2) return { data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] }, error: null };
          let { payload: n2 } = U(r2.access_token), i2 = null;
          n2.aal && (i2 = n2.aal);
          let a2 = i2;
          return (null != (t2 = null == (e2 = r2.user.factors) ? void 0 : e2.filter((e3) => "verified" === e3.status)) ? t2 : []).length > 0 && (a2 = "aal2"), { data: { currentLevel: i2, nextLevel: a2, currentAuthenticationMethods: n2.amr || [] }, error: null };
        }
        async _getAuthorizationDetails(e2) {
          try {
            return await this._useSession(async (t2) => {
              let { data: { session: r2 }, error: s2 } = t2;
              return s2 ? this._returnResult({ data: null, error: s2 }) : r2 ? await Q(this.fetch, "GET", `${this.url}/oauth/authorizations/${e2}`, { headers: this.headers, jwt: r2.access_token, xform: (e3) => ({ data: e3, error: null }) }) : this._returnResult({ data: null, error: new p() });
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async _approveAuthorization(e2, t2) {
          try {
            return await this._useSession(async (t3) => {
              let { data: { session: r2 }, error: s2 } = t3;
              if (s2) return this._returnResult({ data: null, error: s2 });
              if (!r2) return this._returnResult({ data: null, error: new p() });
              let n2 = await Q(this.fetch, "POST", `${this.url}/oauth/authorizations/${e2}/consent`, { headers: this.headers, jwt: r2.access_token, body: { action: "approve" }, xform: (e3) => ({ data: e3, error: null }) });
              return n2.data && n2.data.redirect_url, n2;
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async _denyAuthorization(e2, t2) {
          try {
            return await this._useSession(async (t3) => {
              let { data: { session: r2 }, error: s2 } = t3;
              if (s2) return this._returnResult({ data: null, error: s2 });
              if (!r2) return this._returnResult({ data: null, error: new p() });
              let n2 = await Q(this.fetch, "POST", `${this.url}/oauth/authorizations/${e2}/consent`, { headers: this.headers, jwt: r2.access_token, body: { action: "deny" }, xform: (e3) => ({ data: e3, error: null }) });
              return n2.data && n2.data.redirect_url, n2;
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async _listOAuthGrants() {
          try {
            return await this._useSession(async (e2) => {
              let { data: { session: t2 }, error: r2 } = e2;
              return r2 ? this._returnResult({ data: null, error: r2 }) : t2 ? await Q(this.fetch, "GET", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: t2.access_token, xform: (e3) => ({ data: e3, error: null }) }) : this._returnResult({ data: null, error: new p() });
            });
          } catch (e2) {
            if (l(e2)) return this._returnResult({ data: null, error: e2 });
            throw e2;
          }
        }
        async _revokeOAuthGrant(e2) {
          try {
            return await this._useSession(async (t2) => {
              let { data: { session: r2 }, error: s2 } = t2;
              return s2 ? this._returnResult({ data: null, error: s2 }) : r2 ? (await Q(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, { headers: this.headers, jwt: r2.access_token, query: { client_id: e2.clientId }, noResolveJson: true }), { data: {}, error: null }) : this._returnResult({ data: null, error: new p() });
            });
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
        async fetchJwk(e2, t2 = { keys: [] }) {
          let r2 = t2.keys.find((t3) => t3.kid === e2);
          if (r2) return r2;
          let s2 = Date.now();
          if ((r2 = this.jwks.keys.find((t3) => t3.kid === e2)) && this.jwks_cached_at + 6e5 > s2) return r2;
          let { data: n2, error: i2 } = await Q(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, { headers: this.headers });
          if (i2) throw i2;
          return n2.keys && 0 !== n2.keys.length && (this.jwks = n2, this.jwks_cached_at = s2, r2 = n2.keys.find((t3) => t3.kid === e2)) ? r2 : null;
        }
        async getClaims(e2, t2 = {}) {
          try {
            var r2;
            let s2, n2 = e2;
            if (!n2) {
              let { data: e3, error: t3 } = await this.getSession();
              if (t3 || !e3.session) return this._returnResult({ data: null, error: t3 });
              n2 = e3.session.access_token;
            }
            let { header: i2, payload: a2, signature: o2, raw: { header: l2, payload: u2 } } = U(n2);
            (null == t2 ? void 0 : t2.allowExpired) || function(e3) {
              if (!e3) throw Error("Missing exp claim");
              if (e3 <= Math.floor(Date.now() / 1e3)) throw Error("JWT has expired");
            }(a2.exp);
            let c2 = !i2.alg || i2.alg.startsWith("HS") || !i2.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(i2.kid, (null == t2 ? void 0 : t2.keys) ? { keys: t2.keys } : null == t2 ? void 0 : t2.jwks);
            if (!c2) {
              let { error: e3 } = await this.getUser(n2);
              if (e3) throw e3;
              return { data: { claims: a2, header: i2, signature: o2 }, error: null };
            }
            let h2 = function(e3) {
              switch (e3) {
                case "RS256":
                  return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
                case "ES256":
                  return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
                default:
                  throw Error("Invalid alg claim");
              }
            }(i2.alg), d2 = await crypto.subtle.importKey("jwk", c2, h2, true, ["verify"]);
            if (!await crypto.subtle.verify(h2, d2, o2, (r2 = `${l2}.${u2}`, s2 = [], !function(e3, t3) {
              for (let r3 = 0; r3 < e3.length; r3 += 1) {
                let s3 = e3.charCodeAt(r3);
                if (s3 > 55295 && s3 <= 56319) {
                  let t4 = (s3 - 55296) * 1024 & 65535;
                  s3 = (e3.charCodeAt(r3 + 1) - 56320 & 65535 | t4) + 65536, r3 += 1;
                }
                !function(e4, t4) {
                  if (e4 <= 127) return t4(e4);
                  if (e4 <= 2047) {
                    t4(192 | e4 >> 6), t4(128 | 63 & e4);
                    return;
                  }
                  if (e4 <= 65535) {
                    t4(224 | e4 >> 12), t4(128 | e4 >> 6 & 63), t4(128 | 63 & e4);
                    return;
                  }
                  if (e4 <= 1114111) {
                    t4(240 | e4 >> 18), t4(128 | e4 >> 12 & 63), t4(128 | e4 >> 6 & 63), t4(128 | 63 & e4);
                    return;
                  }
                  throw Error(`Unrecognized Unicode codepoint: ${e4.toString(16)}`);
                }(s3, t3);
              }
            }(r2, (e3) => s2.push(e3)), new Uint8Array(s2)))) throw new O("Invalid JWT signature");
            return { data: { claims: a2, header: i2, signature: o2 }, error: null };
          } catch (e3) {
            if (l(e3)) return this._returnResult({ data: null, error: e3 });
            throw e3;
          }
        }
      }
      eC.nextInstanceID = {}, e.s([], 2307), e.i(2307), e.i(20749), e.i(68896), e.s(["AuthAdminApi", 0, eo, "AuthApiError", () => u, "AuthClient", 0, eC, "AuthError", () => o, "AuthImplicitGrantRedirectError", () => b, "AuthInvalidCredentialsError", () => m, "AuthInvalidJwtError", () => O, "AuthInvalidTokenResponseError", () => g, "AuthPKCEGrantCodeExchangeError", () => v, "AuthRetryableFetchError", () => w, "AuthSessionMissingError", () => p, "AuthUnknownError", () => h, "AuthWeakPasswordError", () => E, "CustomAuthError", () => d, "GoTrueAdminApi", () => eo, "GoTrueClient", 0, eC, "NavigatorLockAcquireTimeoutError", () => eh, "SIGN_OUT_SCOPES", 0, ea, "isAuthApiError", () => c, "isAuthError", () => l, "isAuthImplicitGrantRedirectError", () => y, "isAuthRetryableFetchError", () => _, "isAuthSessionMissingError", () => f, "isAuthWeakPasswordError", () => S, "lockInternals", 0, eu, "navigatorLock", () => ep, "processLock", () => eg], 96827);
    }, 31623, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true }), r.SupabaseAuthClient = void 0;
      let s = e.r(96827);
      class n extends s.AuthClient {
        constructor(e2) {
          super(e2);
        }
      }
      r.SupabaseAuthClient = n;
    }, 77645, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      let s = e.r(6223), n = e.r(1565), i = e.r(76056), a = e.r(4507), o = e.r(50355), l = e.r(27785), u = e.r(95057), c = e.r(31623);
      r.default = class {
        constructor(e2, t2, r2) {
          var s2, i2, c2;
          this.supabaseUrl = e2, this.supabaseKey = t2;
          const h = (0, u.validateSupabaseUrl)(e2);
          if (!t2) throw Error("supabaseKey is required.");
          this.realtimeUrl = new URL("realtime/v1", h), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", h), this.storageUrl = new URL("storage/v1", h), this.functionsUrl = new URL("functions/v1", h);
          const d = `sb-${h.hostname.split(".")[0]}-auth-token`, p = { db: o.DEFAULT_DB_OPTIONS, realtime: o.DEFAULT_REALTIME_OPTIONS, auth: Object.assign(Object.assign({}, o.DEFAULT_AUTH_OPTIONS), { storageKey: d }), global: o.DEFAULT_GLOBAL_OPTIONS }, f = (0, u.applySettingDefaults)(null != r2 ? r2 : {}, p);
          this.storageKey = null != (s2 = f.auth.storageKey) ? s2 : "", this.headers = null != (i2 = f.global.headers) ? i2 : {}, f.accessToken ? (this.accessToken = f.accessToken, this.auth = new Proxy({}, { get: (e3, t3) => {
            throw Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(t3)} is not possible`);
          } })) : this.auth = this._initSupabaseAuthClient(null != (c2 = f.auth) ? c2 : {}, this.headers, f.global.fetch), this.fetch = (0, l.fetchWithAuth)(t2, this._getAccessToken.bind(this), f.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, f.realtime)), this.accessToken && this.accessToken().then((e3) => this.realtime.setAuth(e3)).catch((e3) => console.warn("Failed to set initial Realtime auth token:", e3)), this.rest = new n.PostgrestClient(new URL("rest/v1", h).href, { headers: this.headers, schema: f.db.schema, fetch: this.fetch }), this.storage = new a.StorageClient(this.storageUrl.href, this.headers, this.fetch, null == r2 ? void 0 : r2.storage), f.accessToken || this._listenForAuthEvents();
        }
        get functions() {
          return new s.FunctionsClient(this.functionsUrl.href, { headers: this.headers, customFetch: this.fetch });
        }
        from(e2) {
          return this.rest.from(e2);
        }
        schema(e2) {
          return this.rest.schema(e2);
        }
        rpc(e2, t2 = {}, r2 = { head: false, get: false, count: void 0 }) {
          return this.rest.rpc(e2, t2, r2);
        }
        channel(e2, t2 = { config: {} }) {
          return this.realtime.channel(e2, t2);
        }
        getChannels() {
          return this.realtime.getChannels();
        }
        removeChannel(e2) {
          return this.realtime.removeChannel(e2);
        }
        removeAllChannels() {
          return this.realtime.removeAllChannels();
        }
        async _getAccessToken() {
          var e2, t2;
          if (this.accessToken) return await this.accessToken();
          let { data: r2 } = await this.auth.getSession();
          return null != (t2 = null == (e2 = r2.session) ? void 0 : e2.access_token) ? t2 : this.supabaseKey;
        }
        _initSupabaseAuthClient({ autoRefreshToken: e2, persistSession: t2, detectSessionInUrl: r2, storage: s2, userStorage: n2, storageKey: i2, flowType: a2, lock: o2, debug: l2, throwOnError: u2 }, h, d) {
          let p = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
          return new c.SupabaseAuthClient({ url: this.authUrl.href, headers: Object.assign(Object.assign({}, p), h), storageKey: i2, autoRefreshToken: e2, persistSession: t2, detectSessionInUrl: r2, storage: s2, userStorage: n2, flowType: a2, lock: o2, debug: l2, throwOnError: u2, fetch: d, hasCustomAuthorizationHeader: Object.keys(this.headers).some((e3) => "authorization" === e3.toLowerCase()) });
        }
        _initRealtimeClient(e2) {
          return new i.RealtimeClient(this.realtimeUrl.href, Object.assign(Object.assign({}, e2), { params: Object.assign({ apikey: this.supabaseKey }, null == e2 ? void 0 : e2.params) }));
        }
        _listenForAuthEvents() {
          return this.auth.onAuthStateChange((e2, t2) => {
            this._handleTokenChanged(e2, "CLIENT", null == t2 ? void 0 : t2.access_token);
          });
        }
        _handleTokenChanged(e2, t2, r2) {
          ("TOKEN_REFRESHED" === e2 || "SIGNED_IN" === e2) && this.changedAccessToken !== r2 ? (this.changedAccessToken = r2, this.realtime.setAuth(r2)) : "SIGNED_OUT" === e2 && (this.realtime.setAuth(), "STORAGE" == t2 && this.auth.signOut(), this.changedAccessToken = void 0);
        }
      };
    }, 92581, (e, t, r) => {
      "use strict";
      var s = e.e && e.e.__createBinding || (Object.create ? function(e2, t2, r2, s2) {
        void 0 === s2 && (s2 = r2);
        var n2 = Object.getOwnPropertyDescriptor(t2, r2);
        (!n2 || ("get" in n2 ? !t2.__esModule : n2.writable || n2.configurable)) && (n2 = { enumerable: true, get: function() {
          return t2[r2];
        } }), Object.defineProperty(e2, s2, n2);
      } : function(e2, t2, r2, s2) {
        void 0 === s2 && (s2 = r2), e2[s2] = t2[r2];
      }), n = e.e && e.e.__exportStar || function(e2, t2) {
        for (var r2 in e2) "default" === r2 || Object.prototype.hasOwnProperty.call(t2, r2) || s(t2, e2, r2);
      }, i = e.e && e.e.__importDefault || function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      };
      Object.defineProperty(r, "__esModule", { value: true }), r.createClient = r.SupabaseClient = r.FunctionRegion = r.FunctionsError = r.FunctionsRelayError = r.FunctionsFetchError = r.FunctionsHttpError = r.PostgrestError = void 0;
      let a = i(e.r(77645));
      n(e.r(96827), r);
      var o = e.r(1565);
      Object.defineProperty(r, "PostgrestError", { enumerable: true, get: function() {
        return o.PostgrestError;
      } });
      var l = e.r(6223);
      Object.defineProperty(r, "FunctionsHttpError", { enumerable: true, get: function() {
        return l.FunctionsHttpError;
      } }), Object.defineProperty(r, "FunctionsFetchError", { enumerable: true, get: function() {
        return l.FunctionsFetchError;
      } }), Object.defineProperty(r, "FunctionsRelayError", { enumerable: true, get: function() {
        return l.FunctionsRelayError;
      } }), Object.defineProperty(r, "FunctionsError", { enumerable: true, get: function() {
        return l.FunctionsError;
      } }), Object.defineProperty(r, "FunctionRegion", { enumerable: true, get: function() {
        return l.FunctionRegion;
      } }), n(e.r(76056), r);
      var u = e.r(77645);
      Object.defineProperty(r, "SupabaseClient", { enumerable: true, get: function() {
        return i(u).default;
      } }), r.createClient = (e2, t2, r2) => new a.default(e2, t2, r2), function() {
        if ("undefined" == typeof process) return false;
        let e2 = process.version;
        if (null == e2) return false;
        let t2 = e2.match(/^v(\d+)\./);
        return !!t2 && 18 >= parseInt(t2[1], 10);
      }() && console.warn(`\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217`);
    }, 39990, (e, t, r) => {
    }, 42738, (e) => {
      "use strict";
      let t, r;
      async function s() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      let n = null;
      async function i() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        n || (n = s());
        let e10 = await n;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function a(...e10) {
        let t10 = await s();
        try {
          var r2;
          await (null == t10 || null == (r2 = t10.onRequestError) ? void 0 : r2.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let o = null;
      function l() {
        return o || (o = i()), o;
      }
      function u(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r2) {
            if ("then" === r2) return {};
            throw Object.defineProperty(Error(u(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, construct() {
            throw Object.defineProperty(Error(u(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          }, apply(r2, s2, n2) {
            if ("function" == typeof n2[0]) return n2[0](t10);
            throw Object.defineProperty(Error(u(e10)), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      l();
      class c extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class h extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class d extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
      let p = "_N_T_", f = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function g(e10) {
        var t10, r2, s2, n2, i2, a2 = [], o2 = 0;
        function l2() {
          for (; o2 < e10.length && /\s/.test(e10.charAt(o2)); ) o2 += 1;
          return o2 < e10.length;
        }
        for (; o2 < e10.length; ) {
          for (t10 = o2, i2 = false; l2(); ) if ("," === (r2 = e10.charAt(o2))) {
            for (s2 = o2, o2 += 1, l2(), n2 = o2; o2 < e10.length && "=" !== (r2 = e10.charAt(o2)) && ";" !== r2 && "," !== r2; ) o2 += 1;
            o2 < e10.length && "=" === e10.charAt(o2) ? (i2 = true, o2 = n2, a2.push(e10.substring(t10, s2)), t10 = o2) : o2 = s2 + 1;
          } else o2 += 1;
          (!i2 || o2 >= e10.length) && a2.push(e10.substring(t10, e10.length));
        }
        return a2;
      }
      function m(e10) {
        let t10 = {}, r2 = [];
        if (e10) for (let [s2, n2] of e10.entries()) "set-cookie" === s2.toLowerCase() ? (r2.push(...g(n2)), t10[s2] = 1 === r2.length ? r2[0] : r2) : t10[s2] = n2;
        return t10;
      }
      function b(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Object.defineProperty(Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 }), "__NEXT_ERROR_CODE", { value: "E61", enumerable: false, configurable: true });
        }
      }
      ({ ...f, GROUP: { builtinReact: [f.reactServerComponents, f.actionBrowser], serverOnly: [f.reactServerComponents, f.actionBrowser, f.instrument, f.middleware], neutralTarget: [f.apiNode, f.apiEdge], clientOnly: [f.serverSideRendering, f.appPagesBrowser], bundled: [f.reactServerComponents, f.actionBrowser, f.serverSideRendering, f.appPagesBrowser, f.shared, f.instrument, f.middleware], appPages: [f.reactServerComponents, f.serverSideRendering, f.appPagesBrowser, f.actionBrowser] } });
      let y = Symbol("response"), v = Symbol("passThrough"), w = Symbol("waitUntil");
      class _ {
        constructor(e10, t10) {
          this[v] = false, this[w] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[y] || (this[y] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[v] = true;
        }
        waitUntil(e10) {
          if ("external" === this[w].kind) return (0, this[w].function)(e10);
          this[w].promises.push(e10);
        }
      }
      class E extends _ {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      function S(e10) {
        return e10.replace(/\/$/, "") || "/";
      }
      function O(e10) {
        let t10 = e10.indexOf("#"), r2 = e10.indexOf("?"), s2 = r2 > -1 && (t10 < 0 || r2 < t10);
        return s2 || t10 > -1 ? { pathname: e10.substring(0, s2 ? r2 : t10), query: s2 ? e10.substring(r2, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function T(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r2, query: s2, hash: n2 } = O(e10);
        return `${t10}${r2}${s2}${n2}`;
      }
      function k(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r2, query: s2, hash: n2 } = O(e10);
        return `${r2}${t10}${s2}${n2}`;
      }
      function R(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r2 } = O(e10);
        return r2 === t10 || r2.startsWith(t10 + "/");
      }
      let x = /* @__PURE__ */ new WeakMap();
      function P(e10, t10) {
        let r2;
        if (!t10) return { pathname: e10 };
        let s2 = x.get(t10);
        s2 || (s2 = t10.map((e11) => e11.toLowerCase()), x.set(t10, s2));
        let n2 = e10.split("/", 2);
        if (!n2[1]) return { pathname: e10 };
        let i2 = n2[1].toLowerCase(), a2 = s2.indexOf(i2);
        return a2 < 0 ? { pathname: e10 } : (r2 = t10[a2], { pathname: e10 = e10.slice(r2.length + 1) || "/", detectedLocale: r2 });
      }
      let C = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function A(e10, t10) {
        return new URL(String(e10).replace(C, "localhost"), t10 && String(t10).replace(C, "localhost"));
      }
      let j = Symbol("NextURLInternal");
      class I {
        constructor(e10, t10, r2) {
          let s2, n2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (s2 = t10, n2 = r2 || {}) : n2 = r2 || t10 || {}, this[j] = { url: A(e10, s2 ?? n2.base), options: n2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r2, s2, n2;
          let i2 = function(e11, t11) {
            let { basePath: r3, i18n: s3, trailingSlash: n3 } = t11.nextConfig ?? {}, i3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : n3 };
            r3 && R(i3.pathname, r3) && (i3.pathname = function(e12, t12) {
              if (!R(e12, t12)) return e12;
              let r4 = e12.slice(t12.length);
              return r4.startsWith("/") ? r4 : `/${r4}`;
            }(i3.pathname, r3), i3.basePath = r3);
            let a3 = i3.pathname;
            if (i3.pathname.startsWith("/_next/data/") && i3.pathname.endsWith(".json")) {
              let e12 = i3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              i3.buildId = e12[0], a3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (i3.pathname = a3);
            }
            if (s3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(i3.pathname) : P(i3.pathname, s3.locales);
              i3.locale = e12.detectedLocale, i3.pathname = e12.pathname ?? i3.pathname, !e12.detectedLocale && i3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a3) : P(a3, s3.locales)).detectedLocale && (i3.locale = e12.detectedLocale);
            }
            return i3;
          }(this[j].url.pathname, { nextConfig: this[j].options.nextConfig, parseData: true, i18nProvider: this[j].options.i18nProvider }), a2 = function(e11, t11) {
            let r3;
            if (t11?.host && !Array.isArray(t11.host)) r3 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r3 = e11.hostname;
            }
            return r3.toLowerCase();
          }(this[j].url, this[j].options.headers);
          this[j].domainLocale = this[j].options.i18nProvider ? this[j].options.i18nProvider.detectDomainLocale(a2) : function(e11, t11, r3) {
            if (e11) {
              for (let s3 of (r3 && (r3 = r3.toLowerCase()), e11)) if (t11 === s3.domain?.split(":", 1)[0].toLowerCase() || r3 === s3.defaultLocale.toLowerCase() || s3.locales?.some((e12) => e12.toLowerCase() === r3)) return s3;
            }
          }(null == (t10 = this[j].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, a2);
          let o2 = (null == (r2 = this[j].domainLocale) ? void 0 : r2.defaultLocale) || (null == (n2 = this[j].options.nextConfig) || null == (s2 = n2.i18n) ? void 0 : s2.defaultLocale);
          this[j].url.pathname = i2.pathname, this[j].defaultLocale = o2, this[j].basePath = i2.basePath ?? "", this[j].buildId = i2.buildId, this[j].locale = i2.locale ?? o2, this[j].trailingSlash = i2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = function(e11, t11, r2, s2) {
            if (!t11 || t11 === r2) return e11;
            let n2 = e11.toLowerCase();
            return !s2 && (R(n2, "/api") || R(n2, `/${t11.toLowerCase()}`)) ? e11 : T(e11, `/${t11}`);
          }((e10 = { basePath: this[j].basePath, buildId: this[j].buildId, defaultLocale: this[j].options.forceLocale ? void 0 : this[j].defaultLocale, locale: this[j].locale, pathname: this[j].url.pathname, trailingSlash: this[j].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = S(t10)), e10.buildId && (t10 = k(T(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = T(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : k(t10, "/") : S(t10);
        }
        formatSearch() {
          return this[j].url.search;
        }
        get buildId() {
          return this[j].buildId;
        }
        set buildId(e10) {
          this[j].buildId = e10;
        }
        get locale() {
          return this[j].locale ?? "";
        }
        set locale(e10) {
          var t10, r2;
          if (!this[j].locale || !(null == (r2 = this[j].options.nextConfig) || null == (t10 = r2.i18n) ? void 0 : t10.locales.includes(e10))) throw Object.defineProperty(TypeError(`The NextURL configuration includes no locale "${e10}"`), "__NEXT_ERROR_CODE", { value: "E597", enumerable: false, configurable: true });
          this[j].locale = e10;
        }
        get defaultLocale() {
          return this[j].defaultLocale;
        }
        get domainLocale() {
          return this[j].domainLocale;
        }
        get searchParams() {
          return this[j].url.searchParams;
        }
        get host() {
          return this[j].url.host;
        }
        set host(e10) {
          this[j].url.host = e10;
        }
        get hostname() {
          return this[j].url.hostname;
        }
        set hostname(e10) {
          this[j].url.hostname = e10;
        }
        get port() {
          return this[j].url.port;
        }
        set port(e10) {
          this[j].url.port = e10;
        }
        get protocol() {
          return this[j].url.protocol;
        }
        set protocol(e10) {
          this[j].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[j].url = A(e10), this.analyze();
        }
        get origin() {
          return this[j].url.origin;
        }
        get pathname() {
          return this[j].url.pathname;
        }
        set pathname(e10) {
          this[j].url.pathname = e10;
        }
        get hash() {
          return this[j].url.hash;
        }
        set hash(e10) {
          this[j].url.hash = e10;
        }
        get search() {
          return this[j].url.search;
        }
        set search(e10) {
          this[j].url.search = e10;
        }
        get password() {
          return this[j].url.password;
        }
        set password(e10) {
          this[j].url.password = e10;
        }
        get username() {
          return this[j].url.username;
        }
        set username(e10) {
          this[j].url.username = e10;
        }
        get basePath() {
          return this[j].basePath;
        }
        set basePath(e10) {
          this[j].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new I(String(this), this[j].options);
        }
      }
      var N, $, D, L, U, M, B, q, V, F, W, H, G = e.i(28042);
      let z = Symbol("internal request");
      class K extends Request {
        constructor(e10, t10 = {}) {
          const r2 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          b(r2), e10 instanceof Request ? super(e10, t10) : super(r2, t10);
          const s2 = new I(r2, { headers: m(this.headers), nextConfig: t10.nextConfig });
          this[z] = { cookies: new G.RequestCookies(this.headers), nextUrl: s2, url: s2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[z].cookies;
        }
        get nextUrl() {
          return this[z].nextUrl;
        }
        get page() {
          throw new h();
        }
        get ua() {
          throw new d();
        }
        get url() {
          return this[z].url;
        }
      }
      class J {
        static get(e10, t10, r2) {
          let s2 = Reflect.get(e10, t10, r2);
          return "function" == typeof s2 ? s2.bind(e10) : s2;
        }
        static set(e10, t10, r2, s2) {
          return Reflect.set(e10, t10, r2, s2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let X = Symbol("internal response"), Y = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function Q(e10, t10) {
        var r2;
        if (null == e10 || null == (r2 = e10.request) ? void 0 : r2.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Object.defineProperty(Error("request.headers must be an instance of Headers"), "__NEXT_ERROR_CODE", { value: "E119", enumerable: false, configurable: true });
          let r3 = [];
          for (let [s2, n2] of e10.request.headers) t10.set("x-middleware-request-" + s2, n2), r3.push(s2);
          t10.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class Z extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          const r2 = this.headers, s2 = new Proxy(new G.ResponseCookies(r2), { get(e11, s3, n2) {
            switch (s3) {
              case "delete":
              case "set":
                return (...n3) => {
                  let i2 = Reflect.apply(e11[s3], e11, n3), a2 = new Headers(r2);
                  return i2 instanceof G.ResponseCookies && r2.set("x-middleware-set-cookie", i2.getAll().map((e12) => (0, G.stringifyCookie)(e12)).join(",")), Q(t10, a2), i2;
                };
              default:
                return J.get(e11, s3, n2);
            }
          } });
          this[X] = { cookies: s2, url: t10.url ? new I(t10.url, { headers: m(r2), nextConfig: t10.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[X].cookies;
        }
        static json(e10, t10) {
          let r2 = Response.json(e10, t10);
          return new Z(r2.body, r2);
        }
        static redirect(e10, t10) {
          let r2 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!Y.has(r2)) throw Object.defineProperty(RangeError('Failed to execute "redirect" on "response": Invalid status code'), "__NEXT_ERROR_CODE", { value: "E529", enumerable: false, configurable: true });
          let s2 = "object" == typeof t10 ? t10 : {}, n2 = new Headers(null == s2 ? void 0 : s2.headers);
          return n2.set("Location", b(e10)), new Z(null, { ...s2, headers: n2, status: r2 });
        }
        static rewrite(e10, t10) {
          let r2 = new Headers(null == t10 ? void 0 : t10.headers);
          return r2.set("x-middleware-rewrite", b(e10)), Q(t10, r2), new Z(null, { ...t10, headers: r2 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), Q(e10, t10), new Z(null, { ...e10, headers: t10 });
        }
      }
      function ee(e10, t10) {
        let r2 = "string" == typeof t10 ? new URL(t10) : t10, s2 = new URL(e10, t10), n2 = s2.origin === r2.origin;
        return { url: n2 ? s2.toString().slice(r2.origin.length) : s2.toString(), isRelative: n2 };
      }
      let et = "next-router-prefetch", er = ["rsc", "next-router-state-tree", et, "next-hmr-refresh", "next-router-segment-prefetch"], es = "_rsc";
      class en extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new en();
        }
      }
      class ei extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r2, s2) {
            if ("symbol" == typeof r2) return J.get(t10, r2, s2);
            let n2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            if (void 0 !== i2) return J.get(t10, i2, s2);
          }, set(t10, r2, s2, n2) {
            if ("symbol" == typeof r2) return J.set(t10, r2, s2, n2);
            let i2 = r2.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            return J.set(t10, a2 ?? r2, s2, n2);
          }, has(t10, r2) {
            if ("symbol" == typeof r2) return J.has(t10, r2);
            let s2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === s2);
            return void 0 !== n2 && J.has(t10, n2);
          }, deleteProperty(t10, r2) {
            if ("symbol" == typeof r2) return J.deleteProperty(t10, r2);
            let s2 = r2.toLowerCase(), n2 = Object.keys(e10).find((e11) => e11.toLowerCase() === s2);
            return void 0 === n2 || J.deleteProperty(t10, n2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r2) {
            switch (t10) {
              case "append":
              case "delete":
              case "set":
                return en.callable;
              default:
                return J.get(e11, t10, r2);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new ei(e10);
        }
        append(e10, t10) {
          let r2 = this.headers[e10];
          "string" == typeof r2 ? this.headers[e10] = [r2, t10] : Array.isArray(r2) ? r2.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r2, s2] of this.entries()) e10.call(t10, s2, r2, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r2 = this.get(t10);
            yield [t10, r2];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let ea = Object.defineProperty(Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", { value: "E504", enumerable: false, configurable: true });
      class eo {
        disable() {
          throw ea;
        }
        getStore() {
        }
        run() {
          throw ea;
        }
        exit() {
          throw ea;
        }
        enterWith() {
          throw ea;
        }
        static bind(e10) {
          return e10;
        }
      }
      let el = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function eu() {
        return el ? new el() : new eo();
      }
      let ec = eu();
      class eh extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new eh();
        }
      }
      class ed {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r2) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eh.callable;
              default:
                return J.get(e11, t10, r2);
            }
          } });
        }
      }
      let ep = Symbol.for("next.mutated.cookies");
      class ef {
        static wrap(e10, t10) {
          let r2 = new G.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r2.set(t11);
          let s2 = [], n2 = /* @__PURE__ */ new Set(), i2 = () => {
            let e11 = ec.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), s2 = r2.getAll().filter((e12) => n2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of s2) {
                let r3 = new G.ResponseCookies(new Headers());
                r3.set(t11), e12.push(r3.toString());
              }
              t10(e12);
            }
          }, a2 = new Proxy(r2, { get(e11, t11, r3) {
            switch (t11) {
              case ep:
                return s2;
              case "delete":
                return function(...t12) {
                  n2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), a2;
                  } finally {
                    i2();
                  }
                };
              case "set":
                return function(...t12) {
                  n2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), a2;
                  } finally {
                    i2();
                  }
                };
              default:
                return J.get(e11, t11, r3);
            }
          } });
          return a2;
        }
      }
      function eg(e10, t10) {
        if ("action" !== e10.phase) throw new eh();
      }
      var em = ((N = em || {}).handleRequest = "BaseServer.handleRequest", N.run = "BaseServer.run", N.pipe = "BaseServer.pipe", N.getStaticHTML = "BaseServer.getStaticHTML", N.render = "BaseServer.render", N.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", N.renderToResponse = "BaseServer.renderToResponse", N.renderToHTML = "BaseServer.renderToHTML", N.renderError = "BaseServer.renderError", N.renderErrorToResponse = "BaseServer.renderErrorToResponse", N.renderErrorToHTML = "BaseServer.renderErrorToHTML", N.render404 = "BaseServer.render404", N), eb = (($ = eb || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", $.loadComponents = "LoadComponents.loadComponents", $), ey = ((D = ey || {}).getRequestHandler = "NextServer.getRequestHandler", D.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", D.getServer = "NextServer.getServer", D.getServerRequestHandler = "NextServer.getServerRequestHandler", D.createServer = "createServer.createServer", D), ev = ((L = ev || {}).compression = "NextNodeServer.compression", L.getBuildId = "NextNodeServer.getBuildId", L.createComponentTree = "NextNodeServer.createComponentTree", L.clientComponentLoading = "NextNodeServer.clientComponentLoading", L.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", L.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", L.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", L.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", L.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", L.sendRenderResult = "NextNodeServer.sendRenderResult", L.proxyRequest = "NextNodeServer.proxyRequest", L.runApi = "NextNodeServer.runApi", L.render = "NextNodeServer.render", L.renderHTML = "NextNodeServer.renderHTML", L.imageOptimizer = "NextNodeServer.imageOptimizer", L.getPagePath = "NextNodeServer.getPagePath", L.getRoutesManifest = "NextNodeServer.getRoutesManifest", L.findPageComponents = "NextNodeServer.findPageComponents", L.getFontManifest = "NextNodeServer.getFontManifest", L.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", L.getRequestHandler = "NextNodeServer.getRequestHandler", L.renderToHTML = "NextNodeServer.renderToHTML", L.renderError = "NextNodeServer.renderError", L.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", L.render404 = "NextNodeServer.render404", L.startResponse = "NextNodeServer.startResponse", L.route = "route", L.onProxyReq = "onProxyReq", L.apiResolver = "apiResolver", L.internalFetch = "internalFetch", L), ew = ((U = ew || {}).startServer = "startServer.startServer", U), e_ = ((M = e_ || {}).getServerSideProps = "Render.getServerSideProps", M.getStaticProps = "Render.getStaticProps", M.renderToString = "Render.renderToString", M.renderDocument = "Render.renderDocument", M.createBodyResult = "Render.createBodyResult", M), eE = ((B = eE || {}).renderToString = "AppRender.renderToString", B.renderToReadableStream = "AppRender.renderToReadableStream", B.getBodyResult = "AppRender.getBodyResult", B.fetch = "AppRender.fetch", B), eS = ((q = eS || {}).executeRoute = "Router.executeRoute", q), eO = ((V = eO || {}).runHandler = "Node.runHandler", V), eT = ((F = eT || {}).runHandler = "AppRouteRouteHandlers.runHandler", F), ek = ((W = ek || {}).generateMetadata = "ResolveMetadata.generateMetadata", W.generateViewport = "ResolveMetadata.generateViewport", W), eR = ((H = eR || {}).execute = "Middleware.execute", H);
      let ex = /* @__PURE__ */ new Set(["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), eP = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function eC(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let eA = process.env.NEXT_OTEL_PERFORMANCE_PREFIX, { context: ej, propagation: eI, trace: eN, SpanStatusCode: e$, SpanKind: eD, ROOT_CONTEXT: eL } = t = e.r(59110);
      class eU extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let eM = (e10, t10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof eU && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: e$.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end();
      }, eB = /* @__PURE__ */ new Map(), eq = t.createContextKey("next.rootSpanId"), eV = 0, eF = { set(e10, t10, r2) {
        e10.push({ key: t10, value: r2 });
      } }, eW = (r = new class e {
        getTracerInstance() {
          return eN.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ej;
        }
        getTracePropagationData() {
          let e10 = ej.active(), t10 = [];
          return eI.inject(e10, t10, eF), t10;
        }
        getActiveScopeSpan() {
          return eN.getSpan(null == ej ? void 0 : ej.active());
        }
        withPropagatedContext(e10, t10, r2) {
          let s2 = ej.active();
          if (eN.getSpanContext(s2)) return t10();
          let n2 = eI.extract(s2, e10, r2);
          return ej.with(n2, t10);
        }
        trace(...e10) {
          let [t10, r2, s2] = e10, { fn: n2, options: i2 } = "function" == typeof r2 ? { fn: r2, options: {} } : { fn: s2, options: { ...r2 } }, a2 = i2.spanName ?? t10;
          if (!ex.has(t10) && "1" !== process.env.NEXT_OTEL_VERBOSE || i2.hideSpan) return n2();
          let o2 = this.getSpanContext((null == i2 ? void 0 : i2.parentSpan) ?? this.getActiveScopeSpan());
          o2 || (o2 = (null == ej ? void 0 : ej.active()) ?? eL);
          let l2 = o2.getValue(eq), u2 = "number" != typeof l2 || !eB.has(l2), c2 = eV++;
          return i2.attributes = { "next.span_name": a2, "next.span_type": t10, ...i2.attributes }, ej.with(o2.setValue(eq, c2), () => this.getTracerInstance().startActiveSpan(a2, i2, (e11) => {
            let r3;
            eA && t10 && eP.has(t10) && (r3 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let s3 = false, a3 = () => {
              !s3 && (s3 = true, eB.delete(c2), r3 && performance.measure(`${eA}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r3, end: performance.now() }));
            };
            if (u2 && eB.set(c2, new Map(Object.entries(i2.attributes ?? {}))), n2.length > 1) try {
              return n2(e11, (t11) => eM(e11, t11));
            } catch (t11) {
              throw eM(e11, t11), t11;
            } finally {
              a3();
            }
            try {
              let t11 = n2(e11);
              if (eC(t11)) return t11.then((t12) => (e11.end(), t12)).catch((t12) => {
                throw eM(e11, t12), t12;
              }).finally(a3);
              return e11.end(), a3(), t11;
            } catch (t11) {
              throw eM(e11, t11), a3(), t11;
            }
          }));
        }
        wrap(...e10) {
          let t10 = this, [r2, s2, n2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return ex.has(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = s2;
            "function" == typeof e11 && "function" == typeof n2 && (e11 = e11.apply(this, arguments));
            let i2 = arguments.length - 1, a2 = arguments[i2];
            if ("function" != typeof a2) return t10.trace(r2, e11, () => n2.apply(this, arguments));
            {
              let s3 = t10.getContext().bind(ej.active(), a2);
              return t10.trace(r2, e11, (e12, t11) => (arguments[i2] = function(e13) {
                return null == t11 || t11(e13), s3.apply(this, arguments);
              }, n2.apply(this, arguments)));
            }
          } : n2;
        }
        startSpan(...e10) {
          let [t10, r2] = e10, s2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t10, r2, s2);
        }
        getSpanContext(e10) {
          return e10 ? eN.setSpan(ej.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ej.active().getValue(eq);
          return eB.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r2 = ej.active().getValue(eq), s2 = eB.get(r2);
          s2 && !s2.has(e10) && s2.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r2 = eN.setSpan(ej.active(), e10);
          return ej.with(r2, t10);
        }
      }(), () => r), eH = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eH);
      class eG {
        constructor(e10, t10, r2, s2) {
          var n2;
          const i2 = e10 && function(e11, t11) {
            let r3 = ei.from(e11.headers);
            return { isOnDemandRevalidate: r3.get("x-prerender-revalidate") === t11.previewModeId, revalidateOnlyGenerated: r3.has("x-prerender-revalidate-if-generated") };
          }(t10, e10).isOnDemandRevalidate, a2 = null == (n2 = r2.get(eH)) ? void 0 : n2.value;
          this._isEnabled = !!(!i2 && a2 && e10 && a2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = s2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Object.defineProperty(Error("Invariant: previewProps missing previewModeId this should never happen"), "__NEXT_ERROR_CODE", { value: "E93", enumerable: false, configurable: true });
          this._mutableCookies.set({ name: eH, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: eH, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      function ez(e10, t10) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r2 = e10.headers["x-middleware-set-cookie"], s2 = new Headers();
          for (let e11 of g(r2)) s2.append("set-cookie", e11);
          for (let e11 of new G.ResponseCookies(s2).getAll()) t10.set(e11);
        }
      }
      let eK = eu();
      class eJ extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var eX = e.i(99734);
      e.i(51615);
      process.env.NEXT_PRIVATE_DEBUG_CACHE, Symbol.for("@next/cache-handlers");
      let eY = Symbol.for("@next/cache-handlers-map"), eQ = Symbol.for("@next/cache-handlers-set"), eZ = globalThis;
      function e0() {
        if (eZ[eY]) return eZ[eY].entries();
      }
      async function e1(e10, t10) {
        if (!e10) return t10();
        let r2 = e2(e10);
        try {
          return await t10();
        } finally {
          var s2, n2;
          let t11, i2, a2 = (s2 = r2, n2 = e2(e10), t11 = new Set(s2.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return `${e11.tag}:${t12}`;
          })), i2 = new Set(s2.pendingRevalidateWrites), { pendingRevalidatedTags: n2.pendingRevalidatedTags.filter((e11) => {
            let r3 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return !t11.has(`${e11.tag}:${r3}`);
          }), pendingRevalidates: Object.fromEntries(Object.entries(n2.pendingRevalidates).filter(([e11]) => !(e11 in s2.pendingRevalidates))), pendingRevalidateWrites: n2.pendingRevalidateWrites.filter((e11) => !i2.has(e11)) });
          await e6(e10, a2);
        }
      }
      function e2(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? [...e10.pendingRevalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function e3(e10, t10, r2) {
        if (0 === e10.length) return;
        let s2 = function() {
          if (eZ[eQ]) return eZ[eQ].values();
        }(), n2 = [], i2 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r3 = t11.profile;
          for (let [t12] of i2) if ("string" == typeof t12 && "string" == typeof r3 && t12 === r3 || "object" == typeof t12 && "object" == typeof r3 && JSON.stringify(t12) === JSON.stringify(r3) || t12 === r3) {
            e11 = t12;
            break;
          }
          let s3 = e11 || r3;
          i2.has(s3) || i2.set(s3, []), i2.get(s3).push(t11.tag);
        }
        for (let [e11, o2] of i2) {
          let i3;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11) {
              var a2;
              if (!(t11 = null == r2 || null == (a2 = r2.cacheLifeProfiles) ? void 0 : a2[e11])) throw Object.defineProperty(Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`), "__NEXT_ERROR_CODE", { value: "E873", enumerable: false, configurable: true });
            }
            t11 && (i3 = { expire: t11.expire });
          }
          for (let t11 of s2 || []) e11 ? n2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2, i3)) : n2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2));
          t10 && n2.push(t10.revalidateTag(o2, i3));
        }
        await Promise.all(n2);
      }
      async function e6(e10, t10) {
        let r2 = (null == t10 ? void 0 : t10.pendingRevalidatedTags) ?? e10.pendingRevalidatedTags ?? [], s2 = (null == t10 ? void 0 : t10.pendingRevalidates) ?? e10.pendingRevalidates ?? {}, n2 = (null == t10 ? void 0 : t10.pendingRevalidateWrites) ?? e10.pendingRevalidateWrites ?? [];
        return Promise.all([e3(r2, e10.incrementalCache, e10), ...Object.values(s2), ...n2]);
      }
      let e5 = eu();
      class e4 {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r2 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r2, this.callbackQueue = new eX.default(), this.callbackQueue.pause();
        }
        after(e10) {
          if (eC(e10)) this.waitUntil || e8(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10) this.addCallback(e10);
          else throw Object.defineProperty(Error("`after()`: Argument must be a promise or a function"), "__NEXT_ERROR_CODE", { value: "E50", enumerable: false, configurable: true });
        }
        addCallback(e10) {
          var t10;
          this.waitUntil || e8();
          let r2 = eK.getStore();
          r2 && this.workUnitStores.add(r2);
          let s2 = e5.getStore(), n2 = s2 ? s2.rootTaskSpawnPhase : null == r2 ? void 0 : r2.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i2 = (t10 = async () => {
            try {
              await e5.run({ rootTaskSpawnPhase: n2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, el ? el.bind(t10) : eo.bind(t10));
          this.callbackQueue.add(i2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          for (let e11 of this.workUnitStores) e11.phase = "after";
          let e10 = ec.getStore();
          if (!e10) throw Object.defineProperty(new eJ("Missing workStore in AfterContext.runCallbacks"), "__NEXT_ERROR_CODE", { value: "E547", enumerable: false, configurable: true });
          return e1(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(Object.defineProperty(new eJ("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }), "__NEXT_ERROR_CODE", { value: "E569", enumerable: false, configurable: true }));
          }
        }
      }
      function e8() {
        throw Object.defineProperty(Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment."), "__NEXT_ERROR_CODE", { value: "E91", enumerable: false, configurable: true });
      }
      function e9(e10) {
        let t10, r2 = { then: (s2, n2) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r2.value = e11;
        }).catch(() => {
        }), t10.then(s2, n2)) };
        return r2;
      }
      class e7 {
        onClose(e10) {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot subscribe to a closed CloseController"), "__NEXT_ERROR_CODE", { value: "E365", enumerable: false, configurable: true });
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Object.defineProperty(Error("Cannot close a CloseController multiple times"), "__NEXT_ERROR_CODE", { value: "E229", enumerable: false, configurable: true });
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function te() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tt = Symbol.for("@next/request-context");
      async function tr(e10, t10, r2) {
        let s2 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r3 = e11.split("/");
            for (let e12 = 1; e12 < r3.length + 1; e12++) {
              let s3 = r3.slice(0, e12).join("/");
              s3 && (s3.endsWith("/page") || s3.endsWith("/route") || (s3 = `${s3}${!s3.endsWith("/") ? "/" : ""}layout`), t12.push(s3));
            }
          }
          return t12;
        })(e10)) t11 = `${p}${t11}`, s2.add(t11);
        if (t10.pathname && (!r2 || 0 === r2.size)) {
          let e11 = `${p}${t10.pathname}`;
          s2.add(e11);
        }
        s2.has(`${p}/`) && s2.add(`${p}/index`), s2.has(`${p}/index`) && s2.add(`${p}/`);
        let n2 = Array.from(s2);
        return { tags: n2, expirationsByCacheKind: function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r3 = e0();
          if (r3) for (let [s3, n3] of r3) "getExpiration" in n3 && t11.set(s3, e9(async () => n3.getExpiration(e11)));
          return t11;
        }(n2) };
      }
      class ts extends K {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        respondWith() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
        waitUntil() {
          throw Object.defineProperty(new c({ page: this.sourcePage }), "__NEXT_ERROR_CODE", { value: "E394", enumerable: false, configurable: true });
        }
      }
      let tn = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, ti = (e10, t10) => eW().withPropagatedContext(e10.headers, t10, tn), ta = false;
      async function to(t10) {
        var r2, s2, n2, i2;
        let a2, o2, u2, c2, h2;
        !function() {
          if (!ta && (ta = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r3 } = e.r(94165);
            t11(), ti = r3(ti);
          }
        }(), await l();
        let d2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let p2 = t10.bypassNextUrl ? new URL(t10.request.url) : new I(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...p2.searchParams.keys()]) {
          let t11 = p2.searchParams.getAll(e10), r3 = function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          }(e10);
          if (r3) {
            for (let e11 of (p2.searchParams.delete(r3), t11)) p2.searchParams.append(r3, e11);
            p2.searchParams.delete(e10);
          }
        }
        let f2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in p2 && (f2 = p2.buildId || "", p2.buildId = "");
        let g2 = function(e10) {
          let t11 = new Headers();
          for (let [r3, s3] of Object.entries(e10)) for (let e11 of Array.isArray(s3) ? s3 : [s3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r3, e11));
          return t11;
        }(t10.request.headers), m2 = g2.has("x-nextjs-data"), b2 = "1" === g2.get("rsc");
        m2 && "/index" === p2.pathname && (p2.pathname = "/");
        let y2 = /* @__PURE__ */ new Map();
        if (!d2) for (let e10 of er) {
          let t11 = g2.get(e10);
          null !== t11 && (y2.set(e10, t11), g2.delete(e10));
        }
        let v2 = p2.searchParams.get(es), _2 = new ts({ page: t10.page, input: ((c2 = (u2 = "string" == typeof p2) ? new URL(p2) : p2).searchParams.delete(es), u2 ? c2.toString() : c2).toString(), init: { body: t10.request.body, headers: g2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        m2 && Object.defineProperty(_2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: te() }) }));
        let S2 = t10.request.waitUntil ?? (null == (r2 = null == (h2 = globalThis[tt]) ? void 0 : h2.get()) ? void 0 : r2.waitUntil), O2 = new E({ request: _2, page: t10.page, context: S2 ? { waitUntil: S2 } : void 0 });
        if ((a2 = await ti(_2, () => {
          if ("/middleware" === t10.page || "/src/middleware" === t10.page || "/proxy" === t10.page || "/src/proxy" === t10.page) {
            let e10 = O2.waitUntil.bind(O2), r3 = new e7();
            return eW().trace(eR.execute, { spanName: `middleware ${_2.method}`, attributes: { "http.target": _2.nextUrl.pathname, "http.method": _2.method } }, async () => {
              try {
                var s3, n3, i3, a3, l2, u3;
                let c3 = te(), h3 = await tr("/", _2.nextUrl, null), d3 = (l2 = _2.nextUrl, u3 = (e11) => {
                  o2 = e11;
                }, function(e11, t11, r4, s4, n4, i4, a4, o3, l3, u4, c4, h4) {
                  function d4(e12) {
                    r4 && r4.setHeader("Set-Cookie", e12);
                  }
                  let p4 = {};
                  return { type: "request", phase: e11, implicitTags: i4, url: { pathname: s4.pathname, search: s4.search ?? "" }, rootParams: n4, get headers() {
                    return p4.headers || (p4.headers = function(e12) {
                      let t12 = ei.from(e12);
                      for (let e13 of er) t12.delete(e13);
                      return ei.seal(t12);
                    }(t11.headers)), p4.headers;
                  }, get cookies() {
                    if (!p4.cookies) {
                      let e12 = new G.RequestCookies(ei.from(t11.headers));
                      ez(t11, e12), p4.cookies = ed.seal(e12);
                    }
                    return p4.cookies;
                  }, set cookies(value) {
                    p4.cookies = value;
                  }, get mutableCookies() {
                    if (!p4.mutableCookies) {
                      var f3, g3;
                      let e12, s5 = (f3 = t11.headers, g3 = a4 || (r4 ? d4 : void 0), e12 = new G.RequestCookies(ei.from(f3)), ef.wrap(e12, g3));
                      ez(t11, s5), p4.mutableCookies = s5;
                    }
                    return p4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!p4.userspaceMutableCookies) {
                      var m3;
                      let e12;
                      m3 = this, p4.userspaceMutableCookies = e12 = new Proxy(m3.mutableCookies, { get(t12, r5, s5) {
                        switch (r5) {
                          case "delete":
                            return function(...r6) {
                              return eg(m3, "cookies().delete"), t12.delete(...r6), e12;
                            };
                          case "set":
                            return function(...r6) {
                              return eg(m3, "cookies().set"), t12.set(...r6), e12;
                            };
                          default:
                            return J.get(t12, r5, s5);
                        }
                      } });
                    }
                    return p4.userspaceMutableCookies;
                  }, get draftMode() {
                    return p4.draftMode || (p4.draftMode = new eG(l3, t11, this.cookies, this.mutableCookies)), p4.draftMode;
                  }, renderResumeDataCache: null, isHmrRefresh: u4, serverComponentsHmrCache: c4 || globalThis.__serverComponentsHmrCache, devFallbackParams: null };
                }("action", _2, void 0, l2, {}, h3, u3, null, c3, false, void 0, null)), p3 = function({ page: e11, renderOpts: t11, isPrefetchRequest: r4, buildId: s4, previouslyRevalidatedTags: n4, nonce: i4 }) {
                  var a4;
                  let o3 = !t11.shouldWaitOnAllReady && !t11.supportsDynamicResponse && !t11.isDraftMode && !t11.isPossibleServerAction, l3 = t11.dev ?? false, u4 = l3 || o3 && (!!process.env.NEXT_DEBUG_BUILD || "1" === process.env.NEXT_SSG_FETCH_METRICS), c4 = { isStaticGeneration: o3, page: e11, route: (a4 = e11.split("/").reduce((e12, t12, r5, s5) => t12 ? "(" === t12[0] && t12.endsWith(")") || "@" === t12[0] || ("page" === t12 || "route" === t12) && r5 === s5.length - 1 ? e12 : `${e12}/${t12}` : e12, "")).startsWith("/") ? a4 : `/${a4}`, incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, isBuildTimePrerendering: t11.nextExport, hasReadableErrorStacks: t11.hasReadableErrorStacks, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, isDraftMode: t11.isDraftMode, isPrefetchRequest: r4, buildId: s4, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: i4, afterContext: function(e12) {
                    let { waitUntil: t12, onClose: r5, onAfterTaskError: s5 } = e12;
                    return new e4({ waitUntil: t12, onClose: r5, onTaskError: s5 });
                  }(t11), cacheComponentsEnabled: t11.cacheComponents, dev: l3, previouslyRevalidatedTags: n4, refreshTagsByCacheKind: function() {
                    let e12 = /* @__PURE__ */ new Map(), t12 = e0();
                    if (t12) for (let [r5, s5] of t12) "refreshTags" in s5 && e12.set(r5, e9(async () => s5.refreshTags()));
                    return e12;
                  }(), runInCleanSnapshot: el ? el.snapshot() : function(e12, ...t12) {
                    return e12(...t12);
                  }, shouldTrackFetchMetrics: u4, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                  return t11.store = c4, c4;
                }({ page: "/", renderOpts: { cacheLifeProfiles: null == (n3 = t10.request.nextConfig) || null == (s3 = n3.experimental) ? void 0 : s3.cacheLife, cacheComponents: false, experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (a3 = t10.request.nextConfig) || null == (i3 = a3.experimental) ? void 0 : i3.authInterrupts) }, supportsDynamicResponse: true, waitUntil: e10, onClose: r3.onClose.bind(r3), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === _2.headers.get(et), buildId: f2 ?? "", previouslyRevalidatedTags: [] });
                return await ec.run(p3, () => eK.run(d3, t10.handler, _2, O2));
              } finally {
                setTimeout(() => {
                  r3.dispatchClose();
                }, 0);
              }
            });
          }
          return t10.handler(_2, O2);
        })) && !(a2 instanceof Response)) throw Object.defineProperty(TypeError("Expected an instance of Response to be returned"), "__NEXT_ERROR_CODE", { value: "E567", enumerable: false, configurable: true });
        a2 && o2 && a2.headers.set("set-cookie", o2);
        let T2 = null == a2 ? void 0 : a2.headers.get("x-middleware-rewrite");
        if (a2 && T2 && (b2 || !d2)) {
          let e10 = new I(T2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          d2 || e10.host !== _2.nextUrl.host || (e10.buildId = f2 || e10.buildId, a2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r3, isRelative: o3 } = ee(e10.toString(), p2.toString());
          !d2 && m2 && a2.headers.set("x-nextjs-rewrite", r3);
          let l2 = !o3 && (null == (i2 = t10.request.nextConfig) || null == (n2 = i2.experimental) || null == (s2 = n2.clientParamParsingOrigins) ? void 0 : s2.some((t11) => new RegExp(t11).test(e10.origin)));
          b2 && (o3 || l2) && (p2.pathname !== e10.pathname && a2.headers.set("x-nextjs-rewritten-path", e10.pathname), p2.search !== e10.search && a2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (a2 && T2 && b2 && v2) {
          let e10 = new URL(T2);
          e10.searchParams.has(es) || (e10.searchParams.set(es, v2), a2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let k2 = null == a2 ? void 0 : a2.headers.get("Location");
        if (a2 && k2 && !d2) {
          let e10 = new I(k2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          a2 = new Response(a2.body, a2), e10.host === p2.host && (e10.buildId = f2 || e10.buildId, a2.headers.set("Location", e10.toString())), m2 && (a2.headers.delete("Location"), a2.headers.set("x-nextjs-redirect", ee(e10.toString(), p2.toString()).url));
        }
        let R2 = a2 || Z.next(), x2 = R2.headers.get("x-middleware-override-headers"), P2 = [];
        if (x2) {
          for (let [e10, t11] of y2) R2.headers.set(`x-middleware-request-${e10}`, t11), P2.push(e10);
          P2.length > 0 && R2.headers.set("x-middleware-override-headers", x2 + "," + P2.join(","));
        }
        return { response: R2, waitUntil: ("internal" === O2[w].kind ? Promise.all(O2[w].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: _2.fetchMetrics };
      }
      e.i(64445), "undefined" == typeof URLPattern || URLPattern;
      var tl = e.i(40049);
      if (/* @__PURE__ */ new WeakMap(), tl.default.unstable_postpone, false === ("Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("needs to bail out of prerendering at this point because it used") && "Route %%% needs to bail out of prerendering at this point because it used ^^^. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error".includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error"))) throw Object.defineProperty(Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", { value: "E296", enumerable: false, configurable: true });
      RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at __next_root_layout_boundary__ \\([^\\n]*\\)`), RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`), e.s([], 85835), e.i(85835);
      var tu = e.i(99929);
      tu.parse, tu.serialize;
      let tc = { path: "/", sameSite: "lax", httpOnly: false, maxAge: 3456e4 }, th = /^(.*)[.](0|[1-9][0-9]*)$/;
      function td(e10, t10) {
        if (e10 === t10) return true;
        let r2 = e10.match(th);
        return !!r2 && r2[1] === t10;
      }
      function tp(e10, t10, r2) {
        let s2 = r2 ?? 3180, n2 = encodeURIComponent(t10);
        if (n2.length <= s2) return [{ name: e10, value: t10 }];
        let i2 = [];
        for (; n2.length > 0; ) {
          let e11 = n2.slice(0, s2), t11 = e11.lastIndexOf("%");
          t11 > s2 - 3 && (e11 = e11.slice(0, t11));
          let r3 = "";
          for (; e11.length > 0; ) try {
            r3 = decodeURIComponent(e11);
            break;
          } catch (t12) {
            if (t12 instanceof URIError && "%" === e11.at(-3) && e11.length > 3) e11 = e11.slice(0, e11.length - 3);
            else throw t12;
          }
          i2.push(r3), n2 = n2.slice(e11.length);
        }
        return i2.map((t11, r3) => ({ name: `${e10}.${r3}`, value: t11 }));
      }
      async function tf(e10, t10) {
        let r2 = await t10(e10);
        if (r2) return r2;
        let s2 = [];
        for (let r3 = 0; ; r3++) {
          let n2 = `${e10}.${r3}`, i2 = await t10(n2);
          if (!i2) break;
          s2.push(i2);
        }
        return s2.length > 0 ? s2.join("") : null;
      }
      let tg = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), tm = " 	\n\r=".split(""), tb = (() => {
        let e10 = Array(128);
        for (let t10 = 0; t10 < e10.length; t10 += 1) e10[t10] = -1;
        for (let t10 = 0; t10 < tm.length; t10 += 1) e10[tm[t10].charCodeAt(0)] = -2;
        for (let t10 = 0; t10 < tg.length; t10 += 1) e10[tg[t10].charCodeAt(0)] = t10;
        return e10;
      })();
      function ty(e10) {
        let t10 = [], r2 = 0, s2 = 0;
        if (function(e11, t11) {
          for (let r3 = 0; r3 < e11.length; r3 += 1) {
            let s3 = e11.charCodeAt(r3);
            if (s3 > 55295 && s3 <= 56319) {
              let t12 = (s3 - 55296) * 1024 & 65535;
              s3 = (e11.charCodeAt(r3 + 1) - 56320 & 65535 | t12) + 65536, r3 += 1;
            }
            !function(e12, t12) {
              if (e12 <= 127) return t12(e12);
              if (e12 <= 2047) {
                t12(192 | e12 >> 6), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 65535) {
                t12(224 | e12 >> 12), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              if (e12 <= 1114111) {
                t12(240 | e12 >> 18), t12(128 | e12 >> 12 & 63), t12(128 | e12 >> 6 & 63), t12(128 | 63 & e12);
                return;
              }
              throw Error(`Unrecognized Unicode codepoint: ${e12.toString(16)}`);
            }(s3, t11);
          }
        }(e10, (e11) => {
          for (r2 = r2 << 8 | e11, s2 += 8; s2 >= 6; ) {
            let e12 = r2 >> s2 - 6 & 63;
            t10.push(tg[e12]), s2 -= 6;
          }
        }), s2 > 0) for (r2 <<= 6 - s2, s2 = 6; s2 >= 6; ) {
          let e11 = r2 >> s2 - 6 & 63;
          t10.push(tg[e11]), s2 -= 6;
        }
        return t10.join("");
      }
      function tv(e10) {
        let t10 = [], r2 = (e11) => {
          t10.push(String.fromCodePoint(e11));
        }, s2 = { utf8seq: 0, codepoint: 0 }, n2 = 0, i2 = 0;
        for (let t11 = 0; t11 < e10.length; t11 += 1) {
          let a2 = tb[e10.charCodeAt(t11)];
          if (a2 > -1) for (n2 = n2 << 6 | a2, i2 += 6; i2 >= 8; ) (function(e11, t12, r3) {
            if (0 === t12.utf8seq) {
              if (e11 <= 127) return r3(e11);
              for (let r4 = 1; r4 < 6; r4 += 1) if ((e11 >> 7 - r4 & 1) == 0) {
                t12.utf8seq = r4;
                break;
              }
              if (2 === t12.utf8seq) t12.codepoint = 31 & e11;
              else if (3 === t12.utf8seq) t12.codepoint = 15 & e11;
              else if (4 === t12.utf8seq) t12.codepoint = 7 & e11;
              else throw Error("Invalid UTF-8 sequence");
              t12.utf8seq -= 1;
            } else if (t12.utf8seq > 0) {
              if (e11 <= 127) throw Error("Invalid UTF-8 sequence");
              t12.codepoint = t12.codepoint << 6 | 63 & e11, t12.utf8seq -= 1, 0 === t12.utf8seq && r3(t12.codepoint);
            }
          })(n2 >> i2 - 8 & 255, s2, r2), i2 -= 8;
          else if (-2 === a2) continue;
          else throw Error(`Invalid Base64-URL character "${e10.at(t11)}" at position ${t11}`);
        }
        return t10.join("");
      }
      let tw = "base64-";
      async function t_({ getAll: e10, setAll: t10, setItems: r2, removedItems: s2 }, n2) {
        let i2 = n2.cookieEncoding, a2 = n2.cookieOptions ?? null, o2 = await e10([...r2 ? Object.keys(r2) : [], ...s2 ? Object.keys(s2) : []]), l2 = o2?.map(({ name: e11 }) => e11) || [], u2 = Object.keys(s2).flatMap((e11) => l2.filter((t11) => td(t11, e11))), c2 = Object.keys(r2).flatMap((e11) => {
          let t11 = new Set(l2.filter((t12) => td(t12, e11))), s3 = r2[e11];
          "base64url" === i2 && (s3 = tw + ty(s3));
          let n3 = tp(e11, s3);
          return n3.forEach((e12) => {
            t11.delete(e12.name);
          }), u2.push(...t11), n3;
        }), h2 = { ...tc, ...a2, maxAge: 0 }, d2 = { ...tc, ...a2, maxAge: tc.maxAge };
        delete h2.name, delete d2.name, await t10([...u2.map((e11) => ({ name: e11, value: "", options: h2 })), ...c2.map(({ name: e11, value: t11 }) => ({ name: e11, value: t11, options: d2 }))]);
      }
      var tE = e.i(92581);
      let { PostgrestError: tS, FunctionsHttpError: tO, FunctionsFetchError: tT, FunctionsRelayError: tk, FunctionsError: tR, FunctionRegion: tx, SupabaseClient: tP, createClient: tC, GoTrueAdminApi: tA, GoTrueClient: tj, AuthAdminApi: tI, AuthClient: tN, navigatorLock: t$, NavigatorLockAcquireTimeoutError: tD, lockInternals: tL, processLock: tU, SIGN_OUT_SCOPES: tM, AuthError: tB, AuthApiError: tq, AuthUnknownError: tV, CustomAuthError: tF, AuthSessionMissingError: tW, AuthInvalidTokenResponseError: tH, AuthInvalidCredentialsError: tG, AuthImplicitGrantRedirectError: tz, AuthPKCEGrantCodeExchangeError: tK, AuthRetryableFetchError: tJ, AuthWeakPasswordError: tX, AuthInvalidJwtError: tY, isAuthError: tQ, isAuthApiError: tZ, isAuthSessionMissingError: t0, isAuthImplicitGrantRedirectError: t1, isAuthRetryableFetchError: t2, isAuthWeakPasswordError: t3, RealtimePresence: t6, RealtimeChannel: t5, RealtimeClient: t4, REALTIME_LISTEN_TYPES: t8, REALTIME_POSTGRES_CHANGES_LISTEN_EVENT: t9, REALTIME_PRESENCE_LISTEN_EVENTS: t7, REALTIME_SUBSCRIBE_STATES: re, REALTIME_CHANNEL_STATES: rt } = tE.default || tE;
      if (tE.default, e.i(39990), "undefined" != typeof process && process.env?.npm_package_name) {
        let e10 = process.env.npm_package_name;
        ["@supabase/auth-helpers-nextjs", "@supabase/auth-helpers-react", "@supabase/auth-helpers-remix", "@supabase/auth-helpers-sveltekit"].includes(e10) && console.warn(`
\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
\u2551 \u26A0\uFE0F  IMPORTANT: Package Consolidation Notice                                \u2551
\u2551                                                                            \u2551
\u2551 The ${e10.padEnd(35)} package name is deprecated.  \u2551
\u2551                                                                            \u2551
\u2551 You are now using @supabase/ssr - a unified solution for all frameworks.  \u2551
\u2551                                                                            \u2551
\u2551 The auth-helpers packages have been consolidated into @supabase/ssr       \u2551
\u2551 to provide better maintenance and consistent APIs across frameworks.      \u2551
\u2551                                                                            \u2551
\u2551 Please update your package.json to use @supabase/ssr directly:            \u2551
\u2551   npm uninstall ${e10.padEnd(42)} \u2551
\u2551   npm install @supabase/ssr                                               \u2551
\u2551                                                                            \u2551
\u2551 For more information, visit:                                              \u2551
\u2551 https://supabase.com/docs/guides/auth/server-side                         \u2551
\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D
    `);
      }
      async function rr(e10) {
        let t10 = Z.next({ request: e10 }), r2 = function(e11, t11, r3) {
          if (!e11 || !t11) throw Error(`Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`);
          let { storage: s2, getAll: n2, setAll: i2, setItems: a2, removedItems: o2 } = function(e12, t12) {
            let r4, s3, n3 = e12.cookies ?? null, i3 = e12.cookieEncoding, a3 = {}, o3 = {};
            if (n3) if ("get" in n3) {
              let e13 = async (e14) => {
                let t13 = e14.flatMap((e15) => [e15, ...Array.from({ length: 5 }).map((t14, r6) => `${e15}.${r6}`)]), r5 = [];
                for (let e15 = 0; e15 < t13.length; e15 += 1) {
                  let s4 = await n3.get(t13[e15]);
                  (s4 || "string" == typeof s4) && r5.push({ name: t13[e15], value: s4 });
                }
                return r5;
              };
              if (r4 = async (t13) => await e13(t13), "set" in n3 && "remove" in n3) s3 = async (e14) => {
                for (let t13 = 0; t13 < e14.length; t13 += 1) {
                  let { name: r5, value: s4, options: i4 } = e14[t13];
                  s4 ? await n3.set(r5, s4, i4) : await n3.remove(r5, i4);
                }
              };
              else if (t12) s3 = async () => {
                console.warn("@supabase/ssr: createServerClient was configured without set and remove cookie methods, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness. Consider switching to the getAll and setAll cookie methods instead of get, set and remove which are deprecated and can be difficult to use correctly.");
              };
              else throw Error("@supabase/ssr: createBrowserClient requires configuring a getAll and setAll cookie method (deprecated: alternatively both get, set and remove can be used)");
            } else if ("getAll" in n3) if (r4 = async () => await n3.getAll(), "setAll" in n3) s3 = n3.setAll;
            else if (t12) s3 = async () => {
              console.warn("@supabase/ssr: createServerClient was configured without the setAll cookie method, but the client needs to set cookies. This can lead to issues such as random logouts, early session termination or increased token refresh requests. If in NextJS, check your middleware.ts file, route handlers and server actions for correctness.");
            };
            else throw Error("@supabase/ssr: createBrowserClient requires configuring both getAll and setAll cookie methods (deprecated: alternatively both get, set and remove can be used)");
            else throw Error(`@supabase/ssr: ${t12 ? "createServerClient" : "createBrowserClient"} requires configuring getAll and setAll cookie methods (deprecated: alternatively use get, set and remove).`);
            else if (t12 || 1) if (t12) throw Error("@supabase/ssr: createServerClient must be initialized with cookie options that specify getAll and setAll functions (deprecated, not recommended: alternatively use get, set and remove)");
            else r4 = () => [], s3 = () => {
              throw Error("@supabase/ssr: createBrowserClient in non-browser runtimes (including Next.js pre-rendering mode) was not initialized cookie options that specify getAll and setAll functions (deprecated: alternatively use get, set and remove), but they were needed");
            };
            else r4 = () => {
              let e13;
              return Object.keys(e13 = (0, tu.parse)(document.cookie)).map((t13) => ({ name: t13, value: e13[t13] ?? "" }));
            }, s3 = (e13) => {
              e13.forEach(({ name: e14, value: t13, options: r5 }) => {
                document.cookie = (0, tu.serialize)(e14, t13, r5);
              });
            };
            return t12 ? { getAll: r4, setAll: s3, setItems: a3, removedItems: o3, storage: { isServer: true, getItem: async (e13) => {
              if ("string" == typeof a3[e13]) return a3[e13];
              if (o3[e13]) return null;
              let t13 = await r4([e13]), s4 = await tf(e13, async (e14) => {
                let r5 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r5 ? r5.value : null;
              });
              if (!s4) return null;
              let n4 = s4;
              return "string" == typeof s4 && s4.startsWith(tw) && (n4 = tv(s4.substring(tw.length))), n4;
            }, setItem: async (t13, n4) => {
              t13.endsWith("-code-verifier") && await t_({ getAll: r4, setAll: s3, setItems: { [t13]: n4 }, removedItems: {} }, { cookieOptions: e12?.cookieOptions ?? null, cookieEncoding: i3 }), a3[t13] = n4, delete o3[t13];
            }, removeItem: async (e13) => {
              delete a3[e13], o3[e13] = true;
            } } } : { getAll: r4, setAll: s3, setItems: a3, removedItems: o3, storage: { isServer: false, getItem: async (e13) => {
              let t13 = await r4([e13]), s4 = await tf(e13, async (e14) => {
                let r5 = t13?.find(({ name: t14 }) => t14 === e14) || null;
                return r5 ? r5.value : null;
              });
              if (!s4) return null;
              let n4 = s4;
              return s4.startsWith(tw) && (n4 = tv(s4.substring(tw.length))), n4;
            }, setItem: async (t13, n4) => {
              let a4 = await r4([t13]), o4 = new Set((a4?.map(({ name: e13 }) => e13) || []).filter((e13) => td(e13, t13))), l3 = n4;
              "base64url" === i3 && (l3 = tw + ty(n4));
              let u2 = tp(t13, l3);
              u2.forEach(({ name: e13 }) => {
                o4.delete(e13);
              });
              let c2 = { ...tc, ...e12?.cookieOptions, maxAge: 0 }, h2 = { ...tc, ...e12?.cookieOptions, maxAge: tc.maxAge };
              delete c2.name, delete h2.name;
              let d2 = [...[...o4].map((e13) => ({ name: e13, value: "", options: c2 })), ...u2.map(({ name: e13, value: t14 }) => ({ name: e13, value: t14, options: h2 }))];
              d2.length > 0 && await s3(d2);
            }, removeItem: async (t13) => {
              let n4 = await r4([t13]), i4 = (n4?.map(({ name: e13 }) => e13) || []).filter((e13) => td(e13, t13)), a4 = { ...tc, ...e12?.cookieOptions, maxAge: 0 };
              delete a4.name, i4.length > 0 && await s3(i4.map((e13) => ({ name: e13, value: "", options: a4 })));
            } } };
          }({ ...r3, cookieEncoding: r3?.cookieEncoding ?? "base64url" }, true), l2 = tC(e11, t11, { ...r3, global: { ...r3?.global, headers: { ...r3?.global?.headers, "X-Client-Info": "supabase-ssr/0.8.0 createServerClient" } }, auth: { ...r3?.cookieOptions?.name ? { storageKey: r3.cookieOptions.name } : null, ...r3?.auth, flowType: "pkce", autoRefreshToken: false, detectSessionInUrl: false, persistSession: true, storage: s2, ...r3?.cookies && "encode" in r3.cookies && "tokens-only" === r3.cookies.encode ? { userStorage: r3?.auth?.userStorage ?? /* @__PURE__ */ function(e12 = {}) {
            return { getItem: (t12) => e12[t12] || null, setItem: (t12, r4) => {
              e12[t12] = r4;
            }, removeItem: (t12) => {
              delete e12[t12];
            } };
          }() } : null } });
          return l2.auth.onAuthStateChange(async (e12) => {
            (Object.keys(a2).length > 0 || Object.keys(o2).length > 0) && ("SIGNED_IN" === e12 || "TOKEN_REFRESHED" === e12 || "USER_UPDATED" === e12 || "PASSWORD_RECOVERY" === e12 || "SIGNED_OUT" === e12 || "MFA_CHALLENGE_VERIFIED" === e12) && await t_({ getAll: n2, setAll: i2, setItems: a2, removedItems: o2 }, { cookieOptions: r3?.cookieOptions ?? null, cookieEncoding: r3?.cookieEncoding ?? "base64url" });
          }), l2;
        }("https://ffskbbkdhpgvrsvwwadm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc2tiYmtkaHBndnJzdnd3YWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NjQwNjMsImV4cCI6MjA4MTM0MDA2M30.nvnm6rT_nUnnaGVAfgVQo7foOHc3tZmE1Pd7ybLIqAA", { cookies: { getAll: () => e10.cookies.getAll(), setAll(e11) {
          e11.forEach(({ name: e12, value: r3, options: s2 }) => {
            t10.cookies.set(e12, r3, s2);
          });
        } } });
        return await r2.auth.getUser(), t10;
      }
      e.s(["config", 0, { matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"] }, "middleware", () => rr], 99446);
      var rs = e.i(99446);
      Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let rn = { ...rs }, ri = "/middleware", ra = rn.middleware || rn.default;
      if ("function" != typeof ra) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${ri}" must export a function named \`middleware\` or a default function.`);
      e.s(["default", 0, (e10) => to({ ...e10, page: ri, handler: async (...e11) => {
        try {
          return await ra(...e11);
        } catch (n2) {
          let t10 = e11[0], r2 = new URL(t10.url), s2 = r2.pathname + r2.search;
          throw await a(n2, { path: s2, method: t10.method, headers: Object.fromEntries(t10.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), n2;
        }
      } })], 42738);
    }]);
  }
});

// .next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1008d6bf.js
var require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_1008d6bf = __commonJS({
  ".next/server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1008d6bf.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1008d6bf.js", { otherChunks: ["chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_3b93bb62.js", "chunks/[root-of-the-server]__ece68763._.js"], runtimeModuleIds: [38022] }]), (() => {
      let e;
      if (!Array.isArray(globalThis.TURBOPACK)) return;
      let t = /* @__PURE__ */ new WeakMap();
      function r(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let n = r.prototype, o = Object.prototype.hasOwnProperty, u = "undefined" != typeof Symbol && Symbol.toStringTag;
      function l(e2, t2, r2) {
        o.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function i(e2, t2) {
        let r2 = e2[t2];
        return r2 || (r2 = s(t2), e2[t2] = r2), r2;
      }
      function s(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function a(e2, t2) {
        l(e2, "__esModule", { value: true }), u && l(e2, u, { value: "Module" });
        let r2 = 0;
        for (; r2 < t2.length; ) {
          let n2 = t2[r2++], o2 = t2[r2++];
          if ("number" == typeof o2) if (0 === o2) l(e2, n2, { value: t2[r2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[r2] ? l(e2, n2, { get: o2, set: t2[r2++], enumerable: true }) : l(e2, n2, { get: o2, enumerable: true });
        }
        Object.seal(e2);
      }
      n.s = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = i(this.c, t2)).exports : (r2 = this.m, n2 = this.e), r2.namespaceObject = n2, a(n2, e2);
      }, n.j = function(e2, r2) {
        var n2, u2;
        let l2, s2, a2;
        null != r2 ? s2 = (l2 = i(this.c, r2)).exports : (l2 = this.m, s2 = this.e);
        let c2 = (n2 = l2, u2 = s2, (a2 = t.get(n2)) || (t.set(n2, a2 = []), n2.exports = n2.namespaceObject = new Proxy(u2, { get(e3, t2) {
          if (o.call(e3, t2) || "default" === t2 || "__esModule" === t2) return Reflect.get(e3, t2);
          for (let e4 of a2) {
            let r3 = Reflect.get(e4, t2);
            if (void 0 !== r3) return r3;
          }
        }, ownKeys(e3) {
          let t2 = Reflect.ownKeys(e3);
          for (let e4 of a2) for (let r3 of Reflect.ownKeys(e4)) "default" === r3 || t2.includes(r3) || t2.push(r3);
          return t2;
        } })), a2);
        "object" == typeof e2 && null !== e2 && c2.push(e2);
      }, n.v = function(e2, t2) {
        (null != t2 ? i(this.c, t2) : this.m).exports = e2;
      }, n.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? i(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let c = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, f = [null, c({}), c([]), c(c)];
      function d(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !f.includes(t3); t3 = c(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ function(e3, t4) {
          return () => e3[t4];
        }(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), a(t2, n2), t2;
      }
      function p(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function h(e2) {
        let t2 = N(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = d(r2, p(r2), r2 && r2.__esModule);
      }
      function m(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function b(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      function y() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      n.i = h, n.A = function(e2) {
        return this.r(e2)(h.bind(this));
      }, n.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, n.r = function(e2) {
        return N(e2, this.m).exports;
      }, n.f = function(e2) {
        function t2(t3) {
          if (t3 = m(t3), o.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = m(t3), o.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let O = Symbol("turbopack queues"), g = Symbol("turbopack exports"), w = Symbol("turbopack error");
      function _(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      n.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: l2, promise: i2 } = y(), s2 = Object.assign(i2, { [g]: r2.exports, [O]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), s2.catch(() => {
          });
        } }), a2 = { get: () => s2, set(e3) {
          e3 !== s2 && (s2[g] = e3);
        } };
        Object.defineProperty(r2, "exports", a2), Object.defineProperty(r2, "namespaceObject", a2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (O in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [g]: {}, [O]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[g] = e5, _(t4);
                }, (e5) => {
                  r4[w] = e5, _(t4);
                }), r4;
              }
            }
            return { [g]: e4, [O]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[w]) throw e4[w];
            return e4[g];
          }), { promise: u3, resolve: l3 } = y(), i3 = Object.assign(() => l3(r3), { queueCount: 0 });
          function s3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (i3.queueCount++, e4.push(i3)));
          }
          return t3.map((e4) => e4[O](s3)), i3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? l2(s2[w] = e3) : u2(s2[g]), _(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let C = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function j(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      C.prototype = URL.prototype, n.U = C, n.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, n.g = globalThis;
      let k = r.prototype;
      var U, R = ((U = R || {})[U.Runtime = 0] = "Runtime", U[U.Parent = 1] = "Parent", U[U.Update = 2] = "Update", U);
      let P = /* @__PURE__ */ new Map();
      n.M = P;
      let v = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map();
      async function $(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return M(e2, t2, A(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!P.has(e3) || v.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        let l2 = r2.moduleChunks || [], i2 = l2.map((e3) => T.get(e3)).filter((e3) => e3);
        if (i2.length > 0) {
          if (i2.length === l2.length) return void await Promise.all(i2);
          let r3 = /* @__PURE__ */ new Set();
          for (let e3 of l2) T.has(e3) || r3.add(e3);
          for (let n3 of r3) {
            let r4 = M(e2, t2, A(n3));
            T.set(n3, r4), i2.push(r4);
          }
          n2 = Promise.all(i2);
        } else {
          for (let o3 of (n2 = M(e2, t2, A(r2.path)), l2)) T.has(o3) || T.set(o3, n2);
        }
        for (let e3 of o2) v.has(e3) || v.set(e3, n2);
        await n2;
      }
      k.l = function(e2) {
        return $(1, this.m.id, e2);
      };
      let x = Promise.resolve(void 0), E = /* @__PURE__ */ new WeakMap();
      function M(t2, r2, n2) {
        let o2 = e.loadChunkCached(t2, n2), u2 = E.get(o2);
        if (void 0 === u2) {
          let e2 = E.set.bind(E, o2, x);
          u2 = o2.then(e2).catch((e3) => {
            let o3;
            switch (t2) {
              case 0:
                o3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case 1:
                o3 = `from module ${r2}`;
                break;
              case 2:
                o3 = "from an HMR update";
                break;
              default:
                j(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let u3 = Error(`Failed to load chunk ${n2} ${o3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw u3.name = "ChunkLoadError", u3;
          }), E.set(o2, u2);
        }
        return u2;
      }
      function A(e2) {
        return `${e2.split("/").map((e3) => encodeURIComponent(e3)).join("/")}`;
      }
      k.L = function(e2) {
        return M(1, this.m.id, e2);
      }, k.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, k.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, k.b = function(e2) {
        let t2 = new Blob([`self.TURBOPACK_WORKER_LOCATION = ${JSON.stringify(location.origin)};
self.TURBOPACK_CHUNK_SUFFIX = ${JSON.stringify("")};
self.TURBOPACK_NEXT_CHUNK_URLS = ${JSON.stringify(e2.reverse().map(A), null, 2)};
importScripts(...self.TURBOPACK_NEXT_CHUNK_URLS.map(c => self.TURBOPACK_WORKER_LOCATION + c).reverse());`], { type: "text/javascript" });
        return URL.createObjectURL(t2);
      };
      let K = /\.js(?:\?[^#]*)?(?:#.*)?$/;
      n.w = function(t2, r2, n2) {
        return e.loadWebAssembly(1, this.m.id, t2, r2, n2);
      }, n.u = function(t2, r2) {
        return e.loadWebAssemblyModule(1, this.m.id, t2, r2);
      };
      let S = {};
      n.c = S;
      let N = (e2, t2) => {
        let r2 = S[e2];
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return q(e2, R.Parent, t2.id);
      };
      function q(e2, t2, n2) {
        let o2 = P.get(e2);
        if ("function" != typeof o2) throw Error(function(e3, t3, r2) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r2}`;
              break;
            case 1:
              n3 = `because it was required from module ${r2}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              j(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        }(e2, t2, n2));
        let u2 = s(e2), l2 = u2.exports;
        S[e2] = u2;
        let i2 = new r(u2, l2);
        try {
          o2(i2, u2, l2);
        } catch (e3) {
          throw u2.error = e3, e3;
        }
        return u2.namespaceObject && u2.exports !== u2.namespaceObject && d(u2.exports, u2.namespaceObject), u2;
      }
      function L(t2) {
        let r2, n2 = function(e2) {
          if ("string" == typeof e2) return e2;
          let t3 = decodeURIComponent(("undefined" != typeof TURBOPACK_NEXT_CHUNK_URLS ? TURBOPACK_NEXT_CHUNK_URLS.pop() : e2.getAttribute("src")).replace(/[?#].*$/, ""));
          return t3.startsWith("") ? t3.slice(0) : t3;
        }(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !function(e2, t3, r3, n3) {
          let o2 = 1;
          for (; o2 < e2.length; ) {
            let t4 = e2[o2], n4 = o2 + 1;
            for (; n4 < e2.length && "function" != typeof e2[n4]; ) n4++;
            if (n4 === e2.length) throw Error("malformed chunk format, expected a factory function");
            if (!r3.has(t4)) {
              let u2 = e2[n4];
              for (Object.defineProperty(u2, "name", { value: "module evaluation" }); o2 < n4; o2++) t4 = e2[o2], r3.set(t4, u2);
            }
            o2 = n4 + 1;
          }
        }(t2, 0, P)), e.registerChunk(n2, r2);
      }
      function B(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : d(n2, p(n2), true);
      }
      n.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? d(t2.default, p(t2), true) : t2;
      }, B.resolve = (e2, t2) => __require.resolve(e2, t2), n.x = B, e = { registerChunk(e2, t2) {
        I.add(e2), function(e3) {
          let t3 = W.get(e3);
          if (null != t3) {
            for (let r2 of t3) r2.requiredChunks.delete(e3), 0 === r2.requiredChunks.size && F(r2.runtimeModuleIds, r2.chunkPath);
            W.delete(e3);
          }
        }(e2), null != t2 && (0 === t2.otherChunks.length ? F(t2.runtimeModuleIds, e2) : function(e3, t3, r2) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r2, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = b(e4);
            if (I.has(t4)) continue;
            n2.add(t4);
            let r3 = W.get(t4);
            null == r3 && (r3 = /* @__PURE__ */ new Set(), W.set(t4, r3)), r3.add(o2);
          }
          0 === o2.requiredChunks.size && F(o2.runtimeModuleIds, o2.chunkPath);
        }(e2, t2.otherChunks.filter((e3) => {
          var t3;
          return t3 = b(e3), K.test(t3);
        }), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      }, async loadWebAssembly(e2, t2, r2, n2, o2) {
        let u2 = await H(r2, n2);
        return await WebAssembly.instantiate(u2, o2);
      }, loadWebAssemblyModule: async (e2, t2, r2, n2) => H(r2, n2) };
      let I = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Map();
      function F(e2, t2) {
        for (let r2 of e2) !function(e3, t3) {
          let r3 = S[t3];
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          q(t3, R.Runtime, e3);
        }(t2, r2);
      }
      async function H(e2, t2) {
        let r2;
        try {
          r2 = t2();
        } catch (e3) {
        }
        if (!r2) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return r2;
      }
      let X = globalThis.TURBOPACK;
      globalThis.TURBOPACK = { push: L }, X.forEach(L);
    })();
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path3)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*))(\\\\.json)?[\\/#\\?]?$"] }];
    require_node_modules_next_dist_esm_build_templates_edge_wrapper_3b93bb62();
    require_root_of_the_server_ece68763();
    require_turbopack_node_modules_next_dist_esm_build_templates_edge_wrapper_1008d6bf();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "distDir": ".next", "cacheComponents": false, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "assetPrefix": "", "output": "standalone", "trailingSlash": false, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [], "qualities": [75], "unoptimized": false }, "reactMaxHeadersLength": 6e3, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "basePath": "", "expireTime": 31536e3, "generateEtags": true, "poweredByHeader": true, "cacheHandlers": {}, "cacheMaxMemorySize": 52428800, "compress": true, "i18n": null, "httpAgentOptions": { "keepAlive": true }, "pageExtensions": ["tsx", "ts", "jsx", "js"], "useFileSystemPublicRoutes": true, "experimental": { "ppr": false, "staleTimes": { "dynamic": 0, "static": 300 }, "dynamicOnHover": false, "inlineCss": false, "authInterrupts": false, "fetchCacheKeyPrefix": "", "isrFlushToDisk": true, "optimizeCss": false, "nextScriptWorkers": false, "disableOptimizedLoading": false, "largePageDataBytes": 128e3, "serverComponentsHmrCache": true, "caseSensitiveRoutes": false, "validateRSCRequestHeaders": false, "useSkewCookie": false, "preloadEntriesOnStart": true, "hideLogsAfterAbort": false, "removeUncaughtErrorAndRejectionListeners": false, "imgOptConcurrency": null, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptSkipMetadata": null, "imgOptTimeoutInSeconds": 7, "proxyClientMaxBodySize": 10485760, "trustHostHeader": false, "isExperimentalCompile": false } };
var BuildId = "aKjPXWGwD4ecodSTDaVuq";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/assinaturas", "regex": "^/admin/assinaturas(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/assinaturas(?:/)?$" }, { "page": "/admin/daws", "regex": "^/admin/daws(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/daws(?:/)?$" }, { "page": "/admin/drum-kit", "regex": "^/admin/drum\\-kit(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/drum\\-kit(?:/)?$" }, { "page": "/admin/plugins", "regex": "^/admin/plugins(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/plugins(?:/)?$" }, { "page": "/admin/programas", "regex": "^/admin/programas(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/programas(?:/)?$" }, { "page": "/api/admin/assinaturas/atualizar", "regex": "^/api/admin/assinaturas/atualizar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/assinaturas/atualizar(?:/)?$" }, { "page": "/api/admin/assinaturas/listar", "regex": "^/api/admin/assinaturas/listar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/assinaturas/listar(?:/)?$" }, { "page": "/api/admin/assinaturas/redefinir-senha", "regex": "^/api/admin/assinaturas/redefinir\\-senha(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/assinaturas/redefinir\\-senha(?:/)?$" }, { "page": "/api/admin/daws/criar", "regex": "^/api/admin/daws/criar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/daws/criar(?:/)?$" }, { "page": "/api/admin/daws/deletar", "regex": "^/api/admin/daws/deletar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/daws/deletar(?:/)?$" }, { "page": "/api/admin/daws/editar", "regex": "^/api/admin/daws/editar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/daws/editar(?:/)?$" }, { "page": "/api/admin/daws/editar-arquivos", "regex": "^/api/admin/daws/editar\\-arquivos(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/daws/editar\\-arquivos(?:/)?$" }, { "page": "/api/admin/daws/listar", "regex": "^/api/admin/daws/listar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/daws/listar(?:/)?$" }, { "page": "/api/admin/daws/obter", "regex": "^/api/admin/daws/obter(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/daws/obter(?:/)?$" }, { "page": "/api/admin/drum-kit/criar", "regex": "^/api/admin/drum\\-kit/criar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/drum\\-kit/criar(?:/)?$" }, { "page": "/api/admin/drum-kit/deletar", "regex": "^/api/admin/drum\\-kit/deletar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/drum\\-kit/deletar(?:/)?$" }, { "page": "/api/admin/drum-kit/editar", "regex": "^/api/admin/drum\\-kit/editar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/drum\\-kit/editar(?:/)?$" }, { "page": "/api/admin/drum-kit/editar-arquivos", "regex": "^/api/admin/drum\\-kit/editar\\-arquivos(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/drum\\-kit/editar\\-arquivos(?:/)?$" }, { "page": "/api/admin/drum-kit/listar", "regex": "^/api/admin/drum\\-kit/listar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/drum\\-kit/listar(?:/)?$" }, { "page": "/api/admin/drum-kit/obter", "regex": "^/api/admin/drum\\-kit/obter(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/drum\\-kit/obter(?:/)?$" }, { "page": "/api/admin/plugins/criar", "regex": "^/api/admin/plugins/criar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/plugins/criar(?:/)?$" }, { "page": "/api/admin/plugins/deletar", "regex": "^/api/admin/plugins/deletar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/plugins/deletar(?:/)?$" }, { "page": "/api/admin/plugins/editar", "regex": "^/api/admin/plugins/editar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/plugins/editar(?:/)?$" }, { "page": "/api/admin/plugins/editar-arquivos", "regex": "^/api/admin/plugins/editar\\-arquivos(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/plugins/editar\\-arquivos(?:/)?$" }, { "page": "/api/admin/plugins/listar", "regex": "^/api/admin/plugins/listar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/plugins/listar(?:/)?$" }, { "page": "/api/admin/plugins/obter", "regex": "^/api/admin/plugins/obter(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/plugins/obter(?:/)?$" }, { "page": "/api/admin/programas/criar", "regex": "^/api/admin/programas/criar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/programas/criar(?:/)?$" }, { "page": "/api/admin/programas/deletar", "regex": "^/api/admin/programas/deletar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/programas/deletar(?:/)?$" }, { "page": "/api/admin/programas/editar", "regex": "^/api/admin/programas/editar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/programas/editar(?:/)?$" }, { "page": "/api/admin/programas/editar-arquivos", "regex": "^/api/admin/programas/editar\\-arquivos(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/programas/editar\\-arquivos(?:/)?$" }, { "page": "/api/admin/programas/listar", "regex": "^/api/admin/programas/listar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/programas/listar(?:/)?$" }, { "page": "/api/admin/programas/obter", "regex": "^/api/admin/programas/obter(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/programas/obter(?:/)?$" }, { "page": "/api/admin/usuarios/buscar", "regex": "^/api/admin/usuarios/buscar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/usuarios/buscar(?:/)?$" }, { "page": "/api/admin/validar", "regex": "^/api/admin/validar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/validar(?:/)?$" }, { "page": "/api/assinaturas/inativar", "regex": "^/api/assinaturas/inativar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/assinaturas/inativar(?:/)?$" }, { "page": "/api/assinaturas/me", "regex": "^/api/assinaturas/me(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/assinaturas/me(?:/)?$" }, { "page": "/api/contato", "regex": "^/api/contato(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/contato(?:/)?$" }, { "page": "/api/daws", "regex": "^/api/daws(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/daws(?:/)?$" }, { "page": "/api/download", "regex": "^/api/download(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/download(?:/)?$" }, { "page": "/api/download-gratis/baixar", "regex": "^/api/download\\-gratis/baixar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/download\\-gratis/baixar(?:/)?$" }, { "page": "/api/download-gratis/iniciar", "regex": "^/api/download\\-gratis/iniciar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/download\\-gratis/iniciar(?:/)?$" }, { "page": "/api/download-gratis/status", "regex": "^/api/download\\-gratis/status(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/download\\-gratis/status(?:/)?$" }, { "page": "/api/drum-kit", "regex": "^/api/drum\\-kit(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/drum\\-kit(?:/)?$" }, { "page": "/api/imagem", "regex": "^/api/imagem(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/imagem(?:/)?$" }, { "page": "/api/me", "regex": "^/api/me(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/me(?:/)?$" }, { "page": "/api/minha-conta", "regex": "^/api/minha\\-conta(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/minha\\-conta(?:/)?$" }, { "page": "/api/pagamentos/ggpix/criar", "regex": "^/api/pagamentos/ggpix/criar(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/pagamentos/ggpix/criar(?:/)?$" }, { "page": "/api/plugins", "regex": "^/api/plugins(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/plugins(?:/)?$" }, { "page": "/api/programas", "regex": "^/api/programas(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/programas(?:/)?$" }, { "page": "/api/webhooks/ggpix", "regex": "^/api/webhooks/ggpix(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/webhooks/ggpix(?:/)?$" }, { "page": "/assinaturas", "regex": "^/assinaturas(?:/)?$", "routeKeys": {}, "namedRegex": "^/assinaturas(?:/)?$" }, { "page": "/auth/callback", "regex": "^/auth/callback(?:/)?$", "routeKeys": {}, "namedRegex": "^/auth/callback(?:/)?$" }, { "page": "/contato", "regex": "^/contato(?:/)?$", "routeKeys": {}, "namedRegex": "^/contato(?:/)?$" }, { "page": "/daws", "regex": "^/daws(?:/)?$", "routeKeys": {}, "namedRegex": "^/daws(?:/)?$" }, { "page": "/drum-kit", "regex": "^/drum\\-kit(?:/)?$", "routeKeys": {}, "namedRegex": "^/drum\\-kit(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/login", "regex": "^/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/login(?:/)?$" }, { "page": "/minha-conta", "regex": "^/minha\\-conta(?:/)?$", "routeKeys": {}, "namedRegex": "^/minha\\-conta(?:/)?$" }, { "page": "/plugins", "regex": "^/plugins(?:/)?$", "routeKeys": {}, "namedRegex": "^/plugins(?:/)?$" }, { "page": "/privacidade", "regex": "^/privacidade(?:/)?$", "routeKeys": {}, "namedRegex": "^/privacidade(?:/)?$" }, { "page": "/programas", "regex": "^/programas(?:/)?$", "routeKeys": {}, "namedRegex": "^/programas(?:/)?$" }, { "page": "/redefinir-senha", "regex": "^/redefinir\\-senha(?:/)?$", "routeKeys": {}, "namedRegex": "^/redefinir\\-senha(?:/)?$" }, { "page": "/termos-de-uso", "regex": "^/termos\\-de\\-uso(?:/)?$", "routeKeys": {}, "namedRegex": "^/termos\\-de\\-uso(?:/)?$" }], "dynamic": [{ "page": "/admin/daws/[slug]", "regex": "^/admin/daws/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/admin/daws/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/admin/drum-kit/[slug]", "regex": "^/admin/drum\\-kit/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/admin/drum\\-kit/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/admin/plugins/[slug]", "regex": "^/admin/plugins/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/admin/plugins/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/admin/programas/[slug]", "regex": "^/admin/programas/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/admin/programas/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/daws/[slug]", "regex": "^/daws/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/daws/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/drum-kit/[slug]", "regex": "^/drum\\-kit/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/drum\\-kit/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/plugins/[slug]", "regex": "^/plugins/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/plugins/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/programas/[slug]", "regex": "^/programas/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/programas/(?<nxtPslug>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "d6296ea39454471adecd18c450d6d93f", "previewModeSigningKey": "a29ff855040e94f4558237862a1193aa13ecdf0cdf922429800e2b72f9aabaf6", "previewModeEncryptionKey": "d0cc8957587d311e656521836cf229759b9648e487e9209abc9df92918a0060b" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/node_modules_next_dist_esm_build_templates_edge-wrapper_3b93bb62.js", "server/edge/chunks/[root-of-the-server]__ece68763._.js", "server/edge/chunks/turbopack-node_modules_next_dist_esm_build_templates_edge-wrapper_1008d6bf.js"], "name": "middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next\\/static|_next\\/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*))(\\\\.json)?[\\/#\\?]?$", "originalSource": "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "aKjPXWGwD4ecodSTDaVuq", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "ieKliFKwyprFHLfywfbK+lTwAuMQspWrDmT21dNS+D0=", "__NEXT_PREVIEW_MODE_ID": "d6296ea39454471adecd18c450d6d93f", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "d0cc8957587d311e656521836cf229759b9648e487e9209abc9df92918a0060b", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "a29ff855040e94f4558237862a1193aa13ecdf0cdf922429800e2b72f9aabaf6" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/admin/assinaturas/page": "/admin/assinaturas", "/admin/daws/[slug]/page": "/admin/daws/[slug]", "/admin/daws/page": "/admin/daws", "/admin/drum-kit/[slug]/page": "/admin/drum-kit/[slug]", "/admin/drum-kit/page": "/admin/drum-kit", "/admin/page": "/admin", "/admin/plugins/[slug]/page": "/admin/plugins/[slug]", "/admin/plugins/page": "/admin/plugins", "/admin/programas/[slug]/page": "/admin/programas/[slug]", "/admin/programas/page": "/admin/programas", "/api/admin/assinaturas/atualizar/route": "/api/admin/assinaturas/atualizar", "/api/admin/assinaturas/listar/route": "/api/admin/assinaturas/listar", "/api/admin/assinaturas/redefinir-senha/route": "/api/admin/assinaturas/redefinir-senha", "/api/admin/daws/criar/route": "/api/admin/daws/criar", "/api/admin/daws/deletar/route": "/api/admin/daws/deletar", "/api/admin/daws/editar-arquivos/route": "/api/admin/daws/editar-arquivos", "/api/admin/daws/editar/route": "/api/admin/daws/editar", "/api/admin/daws/listar/route": "/api/admin/daws/listar", "/api/admin/daws/obter/route": "/api/admin/daws/obter", "/api/admin/drum-kit/criar/route": "/api/admin/drum-kit/criar", "/api/admin/drum-kit/deletar/route": "/api/admin/drum-kit/deletar", "/api/admin/drum-kit/editar-arquivos/route": "/api/admin/drum-kit/editar-arquivos", "/api/admin/drum-kit/editar/route": "/api/admin/drum-kit/editar", "/api/admin/drum-kit/listar/route": "/api/admin/drum-kit/listar", "/api/admin/drum-kit/obter/route": "/api/admin/drum-kit/obter", "/api/admin/plugins/criar/route": "/api/admin/plugins/criar", "/api/admin/plugins/deletar/route": "/api/admin/plugins/deletar", "/api/admin/plugins/editar-arquivos/route": "/api/admin/plugins/editar-arquivos", "/api/admin/plugins/editar/route": "/api/admin/plugins/editar", "/api/admin/plugins/listar/route": "/api/admin/plugins/listar", "/api/admin/plugins/obter/route": "/api/admin/plugins/obter", "/api/admin/programas/criar/route": "/api/admin/programas/criar", "/api/admin/programas/deletar/route": "/api/admin/programas/deletar", "/api/admin/programas/editar-arquivos/route": "/api/admin/programas/editar-arquivos", "/api/admin/programas/editar/route": "/api/admin/programas/editar", "/api/admin/programas/listar/route": "/api/admin/programas/listar", "/api/admin/programas/obter/route": "/api/admin/programas/obter", "/api/admin/usuarios/buscar/route": "/api/admin/usuarios/buscar", "/api/admin/validar/route": "/api/admin/validar", "/api/assinaturas/inativar/route": "/api/assinaturas/inativar", "/api/assinaturas/me/route": "/api/assinaturas/me", "/api/contato/route": "/api/contato", "/api/daws/route": "/api/daws", "/api/download-gratis/baixar/route": "/api/download-gratis/baixar", "/api/download-gratis/iniciar/route": "/api/download-gratis/iniciar", "/api/download-gratis/status/route": "/api/download-gratis/status", "/api/download/route": "/api/download", "/api/drum-kit/route": "/api/drum-kit", "/api/imagem/route": "/api/imagem", "/api/me/route": "/api/me", "/api/minha-conta/route": "/api/minha-conta", "/api/pagamentos/ggpix/criar/route": "/api/pagamentos/ggpix/criar", "/api/plugins/route": "/api/plugins", "/api/programas/route": "/api/programas", "/api/webhooks/ggpix/route": "/api/webhooks/ggpix", "/assinaturas/page": "/assinaturas", "/auth/callback/page": "/auth/callback", "/contato/page": "/contato", "/daws/[slug]/page": "/daws/[slug]", "/daws/page": "/daws", "/drum-kit/[slug]/page": "/drum-kit/[slug]", "/drum-kit/page": "/drum-kit", "/favicon.ico/route": "/favicon.ico", "/login/page": "/login", "/minha-conta/page": "/minha-conta", "/page": "/", "/plugins/[slug]/page": "/plugins/[slug]", "/plugins/page": "/plugins", "/privacidade/page": "/privacidade", "/programas/[slug]/page": "/programas/[slug]", "/programas/page": "/programas", "/redefinir-senha/page": "/redefinir-senha", "/termos-de-uso/page": "/termos-de-uso" };
var FunctionsConfigManifest = { "version": 1, "functions": { "/api/admin/assinaturas/redefinir-senha": {}, "/api/admin/daws/criar": {}, "/api/admin/daws/editar-arquivos": {}, "/api/admin/drum-kit/criar": {}, "/api/admin/drum-kit/editar-arquivos": {}, "/api/admin/plugins/criar": {}, "/api/admin/plugins/editar-arquivos": {}, "/api/admin/programas/criar": {}, "/api/admin/programas/editar-arquivos": {}, "/api/daws": {}, "/api/download-gratis/baixar": {}, "/api/download-gratis/iniciar": {}, "/api/download-gratis/status": {}, "/api/drum-kit": {}, "/api/plugins": {}, "/api/programas": {} } };
var PagesManifest = { "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: constructNextUrl(internalEvent.url, `/${detectedLocale}`)
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return getQueryFromIterator(queryParts.map((p) => {
    const [key, value] = p.split("=");
    return [key, value];
  }));
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const queryStrings = [];
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => queryStrings.push(`${key}=${entry}`));
    } else {
      queryStrings.push(`${key}=${value}`);
    }
  });
  return queryStrings.length > 0 ? `?${queryStrings.join("&")}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));
function normalizeLocationHeader(location2, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location2)) {
    return location2;
  }
  const locationURL = new URL(location2);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
    delete value.meta?.headers?.["x-next-cache-tags"];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
async function computeCacheControl(path3, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest?.routes ?? {}).find((p) => p[0] === path3)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path3}/` : path3;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        MessageDeduplicationId: hash(`${path3}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path3)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  try {
    const segmentHeader = `${event.headers[NEXT_SEGMENT_PREFETCH_HEADER]}`;
    const isSegmentResponse = Boolean(segmentHeader) && segmentHeader in (cachedValue.segmentData || {});
    const body = isSegmentResponse ? cachedValue.segmentData[segmentHeader] : cachedValue.rsc;
    return {
      body,
      additionalHeaders: isSegmentResponse ? { [NEXT_PRERENDER_HEADER]: "1", [NEXT_POSTPONED_HEADER]: "2" } : {}
    };
  } catch (e) {
    error("Error while getting body for app router from cache:", e);
    return { body: cachedValue.rsc, additionalHeaders: {} };
  }
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = Boolean(event.headers.rsc);
    if (isDataRequest) {
      const { body: appRouterBody, additionalHeaders: appHeaders } = getBodyForAppRouter(event, cachedValue);
      body = appRouterBody;
      additionalHeaders = appHeaders;
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    // Sometimes other status codes can be cached, like 404. For these cases, we should return the correct status code
    // Also set the status code to the rewriteStatusCode if defined
    // This can happen in handleMiddleware in routingHandler.
    // `NextResponse.rewrite(url, { status: xxx})
    // The rewrite status code should take precedence over the cached one
    statusCode: event.rewriteStatusCode ?? cachedValue.meta?.status ?? 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers,
      vary: VARY_HEADER,
      ...additionalHeaders
    }
  };
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => {
    try {
      return escapePathDelimiters(decodeURIComponent(segment), true);
    } catch (e) {
      return segment;
    }
  }).join("/");
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  localizedPath = decodePathParams(localizedPath);
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath ?? "/") || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath ?? "/index");
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app" || cachedData.value?.type === "route") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = cachedData.shouldBypassTagCache ? false : await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(localizedPath, cachedData.value.body, host, cachedData.value.revalidate, cachedData.lastModified);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          return {
            type: "core",
            statusCode: event.rewriteStatusCode ?? cachedData.value.meta?.status ?? 200,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers: {
              ...cacheControl,
              ...cachedData.value.meta?.headers,
              vary: VARY_HEADER
            },
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(queryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(new RegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"] && headers["x-prerender-revalidate"] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(key.toLowerCase()))
        return;
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else if (REDIRECTS.has(statusCode) && key.toLowerCase() === "location") {
        resHeaders[key] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[key] = value;
      }
    }
  });
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventOrResult, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const keyPrefix = isResult ? "" : MIDDLEWARE_HEADER_PREFIX;
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
        delete event.headers[key];
      }
    }
    let headers = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    if (middlewareHeadersPrioritized) {
      headers = {
        ...headers,
        ...middlewareEventOrResult.responseHeaders
      };
    } else {
      headers = {
        ...middlewareEventOrResult.responseHeaders,
        ...headers
      };
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyMiddlewareHeaders(assetResult, headers);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0)) {
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult);
      if (isInternalResult(eventOrResult)) {
        applyMiddlewareHeaders(eventOrResult, headers);
        return eventOrResult;
      }
    }
    applyMiddlewareHeaders(eventOrResult, headers);
    const resolvedRoutes = [
      ...foundStaticRoute,
      ...foundDynamicRoute
    ];
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
