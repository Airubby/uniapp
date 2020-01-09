"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPropertyDescriptor_1 = require("../IPropertyDescriptor");
var tokenizer_1 = require("../syntax/tokenizer");
exports.fontFamily = {
    name: "font-family",
    initialValue: '',
    prefix: false,
    type: IPropertyDescriptor_1.PropertyDescriptorParsingType.LIST,
    parse: function (tokens) {
        return tokens.filter(isStringToken).map(function (token) { return token.value; });
    }
};
var isStringToken = function (token) {
    return token.type === tokenizer_1.TokenType.STRING_TOKEN || token.type === tokenizer_1.TokenType.IDENT_TOKEN;
};
//# sourceMappingURL=font-family.js.map