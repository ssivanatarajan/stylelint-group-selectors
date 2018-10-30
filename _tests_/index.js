const testRule = require("stylelint-test-rule-tape");
const groupSelectors = require("..");

testRule(groupSelectors.rule, {
    ruleName: groupSelectors.ruleName,
    config: [true],

    accept: [{
        code: ".a,.b { display: inline; }span{display:block;}"
    }],
    reject: [{
            code: '.a{display:block;}\nspan{display:block;}',

            message: "span(2:1) and .a(1:1) have same properties, group them. (" + groupSelectors.ruleName + ")",
            line: 2,
            column: 1
        },


    ]
});