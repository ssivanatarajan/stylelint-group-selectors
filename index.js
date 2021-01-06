var stylelint = require("stylelint");
var md5 = require('md5');
var ruleName = "plugin/stylelint-group-selectors";


var messages = stylelint.utils.ruleMessages(ruleName, {
    expected: function(selector1, selector2) {
        return '" ' + selector1 + ' " and ' + selector2 + " have same properties, group them."
    }
});

module.exports = stylelint.createPlugin(ruleName, function(enabled) {
    if (!enabled) {
        return;
    }
    return function(root, result) {

        var selectorGroups = [];
        root.walkRules(rule => {
            var selector = rule.selector;
            if (rule != undefined && rule.parent != undefined && rule.parent.type != "rule" && rule.parent.type != 'atrule' && (!(selector.includes('-webkit-') || selector.includes('-moz-') || selector.includes('-o-') || selector.includes('-ms-')))) {
                var cssContent = "";
                var hashValue = 0;
                var cssArray = [];
                rule.nodes.forEach(function(property) {
                    if (property.type == "decl") {
                        var prop = property.prop;
                        var value = property.value;
                        var propval = "";
                        if (property != undefined && value != undefined) {
                            if (property.important)
                                propval = prop + value + "!important";
                            else
                                propval = prop + value;
                            cssArray.push(propval);
                        }
                    }
                })

                cssArray = cssArray.sort();
                cssContent = cssArray.toString();
                if (cssContent.trim().length > 0) {
                    hashValue = md5(cssContent);
                    var selectorWithlineNO = selector + "(" + rule.source.start.line + ":" + rule.source.start.column + ")";
                    var selObj = selectorGroups[hashValue]
                    if (selObj) {
                        if (selectorGroups[hashValue].selectors.indexOf(selector) == -1) {

                            var lastSelector = selectorGroups[hashValue].selectors[selectorGroups[hashValue].selectors.length - 1];
                            stylelint.utils.report({
                                result,
                                ruleName,
                                message: messages.expected(selector, lastSelector),
                                node: rule,
                                word: rule.node
                            });
                            selectorGroups[hashValue].selectors.push(selector);
                        }
                    } else {
                        var Obj = {};
                        Obj.selectors = [];
                        Obj.selectors.push(selectorWithlineNO);
                        selectorGroups[hashValue] = Obj
                    }
                }
            }
        });
    }
});
module.exports.ruleName = ruleName;
module.exports.messages = messages;