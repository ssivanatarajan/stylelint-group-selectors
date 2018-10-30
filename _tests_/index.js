const testRule = require("stylelint-test-rule-tape");
const groupSelectors = require("..");

testRule(groupSelectors.rule, {
    ruleName: groupSelectors.ruleName,
    config: [true],

    accept: [{
        code: ".a,.b { display: inline; },span{display:block;}"
    }],
    reject: [{
            code: '.a,{color:black;},span{display:block;}',

            message: "Unexpected empty selector near '.a' (" + groupSelectors.ruleName + ")",
            line: 1,
            column: 1
        },

        {
            code: ',.abhd,.ab{color:black;}',
            message: 'Unexpected empty selector (' + groupSelectors.ruleName + ')',
            line: 1,
            column: 1
        },
    ]
});