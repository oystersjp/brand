import { d as directive, a as apply } from '../common/twind-43b88e2b.js';

// src/css/index.ts

var includes = (value, search) => !!~value.indexOf(search);

var hyphenate = value => value.replace(/[A-Z]/g, "-$&").toLowerCase();

var evalThunk = (value, context) => {
  while (typeof value == "function") {
    value = value(context);
  }

  return value;
};

var isCSSProperty = (key, value) => !includes("@:&", key[0]) && (includes("rg", (typeof value)[5]) || Array.isArray(value));

var merge = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
  const value = evalThunk(source[key], context);

  if (isCSSProperty(key, value)) {
    target2[hyphenate(key)] = value;
  } else {
    target2[key] = key[0] == "@" && includes("figa", key[1]) ? (target2[key] || []).concat(value) : merge(target2[key] || {}, value, context);
  }

  return target2;
}, target) : target;

var translate = (tokens, context) => {
  const collect = (target, token) => Array.isArray(token) ? token.reduce(collect, target) : merge(target, evalThunk(token, context), context);

  return tokens.reduce(collect, {});
};

var newRule = /\s*(?:([\w-%@]+)\s*:?\s*([^{;]+?)\s*(?:;|$|})|([^;}{]*?)\s*{)|(})/gi;
var ruleClean = /\/\*[\s\S]*?\*\/|\s+|\n/gm;

var decorate = (selectors, currentBlock) => selectors.reduceRight((rules, selector) => ({
  [selector]: rules
}), currentBlock);

var saveBlock = (rules, selectors, currentBlock) => {
  if (currentBlock) {
    rules.push(decorate(selectors, currentBlock));
  }
};

var interleave = (strings, interpolations, context) => {
  let buffer = strings[0];
  const result = [];

  for (let index = 0; index < interpolations.length;) {
    const interpolation = evalThunk(interpolations[index], context);

    if (interpolation && typeof interpolation == "object") {
      result.push(buffer, interpolation);
      buffer = strings[++index];
    } else {
      buffer += (interpolation || "") + strings[++index];
    }
  }

  result.push(buffer);
  return result;
};

var astish = (values, context) => {
  const selectors = [];
  const rules = [];
  let currentBlock;
  let match;

  for (let index = 0; index < values.length; index++) {
    const value = values[index];

    if (typeof value == "string") {
      while (match = newRule.exec(value.replace(ruleClean, " "))) {
        if (!match[0]) continue;

        if (match[4]) {
          currentBlock = saveBlock(rules, selectors, currentBlock);
          selectors.pop();
        }

        if (match[3]) {
          currentBlock = saveBlock(rules, selectors, currentBlock);
          selectors.push(match[3]);
        } else if (!match[4]) {
          if (!currentBlock) currentBlock = {};
          const value2 = match[2] && /\S/.test(match[2]) ? match[2] : values[++index];

          if (value2) {
            if (match[1] == "@apply") {
              merge(currentBlock, evalThunk(apply(value2), context), context);
            } else {
              currentBlock[match[1]] = value2;
            }
          }
        }
      }
    } else {
      currentBlock = saveBlock(rules, selectors, currentBlock);
      rules.push(decorate(selectors, value));
    }
  }

  saveBlock(rules, selectors, currentBlock);
  return rules;
};

var cssFactory = (tokens, context) => translate(Array.isArray(tokens[0]) && Array.isArray(tokens[0].raw) ? astish(interleave(tokens[0], tokens.slice(1), context), context) : tokens, context);

var css = (...tokens) => directive(cssFactory, tokens);

export { css };
