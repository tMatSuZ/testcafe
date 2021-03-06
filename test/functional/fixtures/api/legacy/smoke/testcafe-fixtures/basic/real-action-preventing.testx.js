'@fixture click';
'@page http://localhost:3000/legacy-fixtures/regression/prevent-real-action/pages/same-domain.html';

'@require ../../../../../../legacy-fixtures/upload/testcafe-fixtures/mixin.js';


'@test'['Preventing real actions'] = {
    '1.Wait for element': function () {
        act.wait(5000, function () {
            return $('#input', $('#iframe').contents()).length;
        });
    },

    '2.Type in input': function () {
        const input = $('#input', $('#iframe').contents());

        act.type(input, 'Hello, world!');
    },

    '3.Perform native click': inIFrame('#iframe', function () {
        // NOTE: We simulate a click performed by a user during TestCafe test execution. If TestCafe
        // doesn't prevent a click, test will fail with an unexpected alert dialog error.
        window['%hammerhead%'].nativeMethods.click.call(document.getElementById('alertDiv'));
    })
};
