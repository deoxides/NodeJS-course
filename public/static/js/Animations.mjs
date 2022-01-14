window.onload = function(){
    var background = document.createElement('div');
    background.className = 'background';
    for (let index = 1; index <=10; index++) {
        var bubble = document.createElement('span');
        bubble.className = 'bubble'
        background.append(bubble);
    }
}
