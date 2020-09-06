let init = [
  { logo: "B", url: "https://baidu.com" },
  { logo: "T", url: "https://taobao.com" },
];
let string = localStorage.getItem("x") || JSON.stringify(init);
a = JSON.parse(string);
a.forEach(render);
$(".addbutton").on("click", function (e) {
  let url = window.prompt("请输入要添加的网址");
  $(e.currentTarget).css({ background: "none" });
  if (url === null || url === undefined || url === "") {
    return;
  } else if (url.indexOf("http") !== 0) {
    url = "https://" + url;
    let newa = { logo: simplifyUrl(url)[0].toUpperCase(), url: url };
    a.push(newa);
    let string = JSON.stringify(a);
    localStorage.setItem("x", string);
    render(newa);
  }
});

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
  $li.on("click", function (e) {
    window.open(element.url);
    $(e.currentTarget).css({ background: "none" });
  });
  $li.on("click", ".deleteIcon", function (e) {
    $li.remove();
    let index = $li.index();
    a.splice(index, 1);
    localStorage.setItem("x", JSON.stringify(a));
    e.stopPropagation();
  });
  $li.on({
    touchstart: function (e) {
      // 长按事件触发
      timeOutEvent = setTimeout(function () {
        timeOutEvent = 0;
        //console.log("hi");
        let whether = confirm("删除当前标签？");
        if (whether === false) {
          return;
        } else {
          $($(e.currentTarget).children().children()[2]).trigger(
            "click",
            ".deleteIcon"
          );
        }
      }, 400);
      //长按400毫秒
      // e.preventDefault();
    },
    touchmove: function () {
      clearTimeout(timeOutEvent);
      timeOutEvent = 0;
    },
    touchend: function (e) {
      clearTimeout(timeOutEvent);
      if (timeOutEvent != 0) {
        // 点击事件
        // location.href = '/a/live-rooms.html';
        //alert("你点击了");
        $(e.currentTarget).trigger("click");
      }
      return false;
    },
  });
}
