/* 수원화성 성곽 개념도 (SVG)
   - 성곽선은 실제 지도를 본뜬 개념도이며 축척과 위치가 정확하지 않습니다.
   - 시설물 위치는 data.js의 t 값(성곽선 위 비율)으로 정합니다.
   사용: HS.Fortress(element, { mode: "mini" | "full", onSelect: function(fac){} }) */

(function () {
  var NS = "http://www.w3.org/2000/svg";
  // 남쪽 팔달문에서 출발해 동쪽, 북쪽, 서쪽(팔달산)을 거쳐 돌아오는 성곽선
  var WALL = "M300,600 C340,600 380,582 410,556 C450,522 474,470 488,412 C498,372 504,342 500,318 " +
    "C494,288 478,262 458,238 C436,212 408,184 378,164 C350,146 320,116 290,110 C256,107 226,124 202,148 " +
    "C182,168 162,184 146,200 C120,230 100,280 86,330 C76,370 80,410 94,440 C104,464 100,490 82,520 " +
    "C70,542 92,558 122,542 C160,524 200,560 240,584 C260,596 280,600 300,600 Z";

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  window.HS.Fortress = function (host, opts) {
    opts = opts || {};
    var full = opts.mode === "full";
    var svg = el("svg", { viewBox: "0 0 600 660", role: "group", "aria-label": "수원화성 성곽 개념도. 시설물 점을 누르면 정보가 열립니다." });
    host.appendChild(svg);

    el("ellipse", { class: "hill", cx: 105, cy: 395, rx: 70, ry: 115 }, svg);
    el("text", { class: "label label-sm", x: 60, y: 300 }, svg).textContent = "팔달산";

    var wall = el("path", { class: "wall", d: WALL }, svg);
    el("path", { class: "wall-inner", d: WALL, transform: "translate(300 355) scale(.94) translate(-300 -355)" }, svg);
    var L = wall.getTotalLength();
    var pt = function (t) { return wall.getPointAtLength(((t % 1) + 1) % 1 * L); };

    // 수원천: 화홍문에서 남수문까지
    var fN = HS.facilities.filter(function (f) { return f.n === 19; })[0];
    var fS = HS.facilities.filter(function (f) { return f.n === 2; })[0];
    var a = pt(fN.t), b = pt(fS.t);
    el("path", { class: "river", d: "M" + (a.x + 10) + "," + (a.y - 70) + " L" + a.x + "," + a.y +
      " C" + (a.x - 10) + "," + (a.y + 140) + " " + (b.x + 30) + "," + (b.y - 200) + " " + b.x + "," + b.y +
      " L" + (b.x + 8) + "," + (b.y + 50) }, svg);
    el("text", { class: "label label-sm", x: a.x + 18, y: a.y + 120 }, svg).textContent = "수원천";

    // 성 안 주요 유적
    var inner = [
      { name: "화성행궁", x: 214, y: 392, w: 62, h: 40, href: "hwaseong/palace.html" },
      { name: "화령전", x: 180, y: 352, w: 34, h: 24, href: "hwaseong/palace.html#hwaryeong" }
    ];
    inner.forEach(function (s) {
      var g = el("a", { class: "inner-site", href: HS.root + s.href }, svg);
      el("rect", { x: s.x - s.w / 2, y: s.y - s.h / 2, width: s.w, height: s.h, rx: 2 }, g);
      el("text", { class: "label label-sm", x: s.x, y: s.y + s.h / 2 + 15, "text-anchor": "middle" }, g).textContent = s.name;
    });

    el("text", { class: "compass", x: 560, y: 40, "text-anchor": "middle" }, svg).textContent = "북";
    el("path", { d: "M560,48 L553,70 L560,64 L567,70 Z", fill: "#6f787c" }, svg);

    var tip = document.createElement("div");
    tip.className = "pt-tip";
    host.appendChild(tip);

    var nodes = {};
    var labelFor = full ? function (f) { return f.type === "gate" || f.treasure || f.n === 34 || f.n === 19; }
                        : function (f) { return f.type === "gate" || f.n === 18 || f.n === 34; };

    HS.facilities.forEach(function (f) {
      var p = pt(f.t);
      var g = el("g", { class: "pt" + (f.type === "gate" ? " gate" : "") + (f.treasure ? " treasure" : ""),
        tabindex: 0, role: "button", "aria-label": f.n + "번 " + f.name + " (" + HS.facilityTypes[f.type] + ")" }, svg);
      el("circle", { cx: p.x, cy: p.y, r: f.type === "gate" ? 11 : (full ? 7 : 5.5) }, g);
      if (labelFor(f)) {
        var dx = p.x < 300 ? -16 : 16, anchor = p.x < 300 ? "end" : "start";
        if (Math.abs(p.x - 300) < 60) { dx = 0; anchor = "middle"; }
        var dy = p.y < 200 ? -18 : (p.y > 560 ? 32 : 5);
        el("text", { x: p.x + dx, y: p.y + dy, "text-anchor": anchor }, g).textContent = f.name.replace(/\(.*\)/, "");
      }
      function show() {
        var r = svg.getBoundingClientRect(), s = r.width / 600;
        tip.textContent = f.n + ". " + f.name + " (" + HS.facilityTypes[f.type] + ")";
        tip.style.left = (p.x * s) + "px"; tip.style.top = (p.y * s) + "px"; tip.style.display = "block";
      }
      function hide() { tip.style.display = "none"; }
      g.addEventListener("mouseenter", show);
      g.addEventListener("mouseleave", hide);
      g.addEventListener("focus", show);
      g.addEventListener("blur", hide);
      function pick() { if (opts.onSelect) opts.onSelect(f); }
      g.addEventListener("click", pick);
      g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); pick(); } });
      nodes[f.n] = g;
    });

    return {
      setActive: function (n) {
        for (var k in nodes) nodes[k].classList.toggle("is-active", +k === n);
      },
      filter: function (type) {
        HS.facilities.forEach(function (f) { nodes[f.n].classList.toggle("is-dim", !!type && f.type !== type); });
      }
    };
  };
})();
