"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var crypto_js_1 = __importDefault(require("crypto-js"));
function createValidationString(data, secretKey) {
    if (!secretKey) {
        throw new Error('secretKey is required!');
    }
    var filteredKeys = lodash_1.default.without(Object.keys(data).filter(function (k) { return data[k] && data[k] !== '0'; }), 'verification_code');
    var ans = lodash_1.default(filteredKeys)
        .map(function (k, i) { return ({ v: data[k], i: String(i) }); })
        .sortBy('i')
        .map(function (o) { return o.v; })
        .value()
        .join('|');
    var hmac = crypto_js_1.default.HmacSHA1(ans, secretKey);
    var hmacStr = hmac.toString(crypto_js_1.default.enc.Hex);
    return hmacStr;
}
exports.createValidationString = createValidationString;
function validateIPN(data, secretKey) {
    return createValidationString(data, secretKey) === data.verification_code;
}
exports.validateIPN = validateIPN;
exports.default = validateIPN;
