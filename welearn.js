function removePrefix(str, prefixes) {
    for (const prefix of prefixes) {
        if (str.startsWith(prefix)) {
            return str.slice(prefix.length).trim();
        }
    }
    return str;
}
function FillAnswer() {
    // v1.2
    // 自动填充答案：按f12然后点控制台，粘贴即可，目前支持选择题、填空题和解答题
    const iframe = document.getElementById('contentFrame');
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
    const results = iframeDocument.querySelectorAll('div[data-itemtype="result"]');
    var cnt = 1;
    results.forEach(result => {
        // 获取答案文本
        const solution = result.textContent;
        var answer = solution.split("/")[0].trim(); // 在多个答案中选择第一个
        answer=removePrefix(answer,["(Answers may vary.)","(Sample writing)"]);

        // 找到输入元素
        const input = result.closest('div').parentElement.querySelector(
                        'input[data-itemtype="input"], textarea[data-itemtype="textarea"]');
        if (input) {
            input.value = answer;
            console.log(cnt+": Modified an input or textarea element");
        }else{
            console.log(cnt+": Input or textarea element not found");
        }
        const myResult = result.closest('div').parentElement.querySelector('div[data-itemtype="myresult"]');
        if (myResult) {
            myResult.innerHTML = answer;
            console.log(cnt+": Modified the div named myresult");
        }else{
            console.log(cnt+": The div named myresult not found");
        }
        const choiceList = result.closest('div[data-controltype="choice"], div[data-controltype="multichoice"]');
        if(choiceList){
            const optionItems = choiceList.querySelectorAll('li[data-solution=""]');

            optionItems.forEach(option => {
                option.setAttribute('data-choiced', ''); // 设置 data-choiced 属性
                console.log(cnt+": Modified a choice");
            });
        }
        console.log("\n");
        cnt++;
    });
}
FillAnswer();