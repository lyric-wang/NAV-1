let init = [
  { logo: 'B', url: "https://baidu.com" },
  { logo: 'T', url: "https://taobao.com" },
];
let string = localStorage.getItem("x") || JSON.stringify(init);
a = JSON.parse(string);
a.forEach(render);
$(".addbutton").on('click', function (e) {
  let url = window.prompt("请输入要添加的网址");
  if (url === null || url === undefined) {
    return;
  } else if (url.indexOf("https:") !== 0) {
    url = "https:" + url;
    let newa = { logo: simplifyUrl(url)[0].toUpperCase(), url: url };
    a.push(newa);
    let string = JSON.stringify(a);
    localStorage.setItem("x", string);
    render(newa);
  }
})

function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "");
}
function render(element) {

  let $li = $(`<li class="sitelist">
        <div class="a">
          <div class="logo">${element.logo}</div>
          <div class="url">${simplifyUrl(element.url)}</div>
          <svg class="icon deleteIcon" style="width:20px;height:20px">
            <use xlink:href="#icon-delete"></use>
          </svg>
          </div>
      </li>`).insertBefore($(".addbutton"));
  $li.on('click', function () {
    window.open(element.url);
  })
  $li.on('click', '.deleteIcon', function (e) {
    $li.remove();
    let index = $li.index();
    a.splice(index, 1);
    localStorage.setItem('x', JSON.stringify(a));
    e.stopPropagation();
  })
}
