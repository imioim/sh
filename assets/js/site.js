/* 공통 머리글·바닥글과 작은 화면 요소
   각 페이지의 <body>에 data-root(사이트 최상위까지의 상대 경로)와 data-page(현재 페이지 경로)를 적습니다. */

(function () {
  var body = document.body;
  var HS = window.HS = window.HS || {};
  HS.root = body.getAttribute("data-root") || "";
  var page = body.getAttribute("data-page") || "index.html";
  var R = HS.root;

  HS.nav = [
    { label: "화성연구회", href: "about/index.html", sub: [
      ["인사말", "about/index.html#greeting"], ["설립 목적과 연혁", "about/index.html#history"],
      ["역대 이사장", "about/index.html#chairs"], ["수상 기록", "about/index.html#awards"], ["찾아오시는 길", "about/index.html#location"]
    ]},
    { label: "사업과 행사", href: "programs/index.html", sub: [
      ["주요 사업", "programs/index.html"], ["대표 행사", "programs/events.html"], ["행사 기록", "programs/archive.html"]
    ]},
    { label: "참여하기", href: "participate/index.html", sub: [
      ["행사·프로그램 일정", "participate/index.html"], ["프로그램 신청", "participate/apply.html"],
      ["회원·후원·자원봉사", "participate/member.html"], ["신청 내역 확인", "participate/check.html"]
    ]},
    { label: "수원화성", href: "hwaseong/index.html", sub: [
      ["수원화성 개요", "hwaseong/index.html"], ["축성 이야기와 연표", "hwaseong/history.html"],
      ["시설물 지도", "hwaseong/map.html"], ["화성행궁·화령전", "hwaseong/palace.html"],
      ["기록유산과 관련 유산", "hwaseong/records.html"], ["용어 사전", "hwaseong/glossary.html"]
    ]},
    { label: "관광 안내", href: "tour/index.html", sub: [
      ["관람 정보", "tour/index.html"], ["답사 코스 추천", "tour/courses.html"], ["축제 일정", "tour/festivals.html"]
    ]},
    { label: "소식·자료", href: "news/index.html", sub: [
      ["공지사항", "news/index.html#notice"], ["언론 보도", "news/index.html#press"], ["자료실", "news/index.html#files"]
    ]}
  ];

  var section = page.split("/")[0];

  var logo =
    '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4c6 0 11 2 13 7s1 9-1 13-5 9-12 12C13 33 9 29 7 24S4 13 8 9s6-5 12-5z" fill="#dbe8e3" stroke="#1d2428" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M24 6c-1 9-3 17-6 28" fill="none" stroke="#5b8db0" stroke-width="2.2" stroke-linecap="round"/>' +
    '<circle cx="20" cy="4.5" r="2.6" fill="#d7a32b" stroke="#1d2428" stroke-width="1.2"/><circle cx="20" cy="35.5" r="2.6" fill="#d7a32b" stroke="#1d2428" stroke-width="1.2"/>' +
    '<circle cx="33.5" cy="15" r="2.6" fill="#d7a32b" stroke="#1d2428" stroke-width="1.2"/><circle cx="6.5" cy="18" r="2.6" fill="#d7a32b" stroke="#1d2428" stroke-width="1.2"/></svg>';

  function navHtml() {
    var h = '<ul>';
    HS.nav.forEach(function (m) {
      var cur = m.href.split("/")[0] === section;
      h += '<li class="' + (cur ? "is-current" : "") + '"><a href="' + R + m.href + '">' + m.label + '</a><ul class="sub">';
      m.sub.forEach(function (s) { h += '<li><a href="' + R + s[1] + '">' + s[0] + '</a></li>'; });
      h += '</ul></li>';
    });
    return h + '</ul>';
  }

  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="wrap">' +
      '<a class="brand" href="' + R + 'index.html">' + logo +
        '<span class="brand-name">화성연구회<small>사단법인, 수원화성 연구와 보존</small></span></a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="gnb">메뉴</button>' +
      '<nav class="gnb" id="gnb" aria-label="주 메뉴">' + navHtml() + '</nav>' +
    '</div>';
  var skip = document.createElement("a");
  skip.className = "skip-link"; skip.href = "#main"; skip.textContent = "본문 바로가기";
  body.insertBefore(header, body.firstChild);
  body.insertBefore(skip, body.firstChild);

  var toggle = header.querySelector(".nav-toggle");
  var gnb = header.querySelector(".gnb");
  toggle.addEventListener("click", function () {
    var open = gnb.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "닫기" : "메뉴";
  });

  // 하위 메뉴(페이지 안쪽 탭) 자동 생성: <nav class="subnav" data-section="hwaseong"></nav>
  document.querySelectorAll(".subnav[data-section]").forEach(function (el) {
    var m = HS.nav.filter(function (x) { return x.href.split("/")[0] === el.getAttribute("data-section"); })[0];
    if (!m) return;
    var h = '<div class="wrap"><ul>';
    var seen = {};
    m.sub.forEach(function (s) {
      var file = s[1].split("#")[0];
      if (seen[file] && s[1].indexOf("#") > -1) return;
      var cur = file === page;
      h += '<li><a href="' + R + s[1] + '"' + (cur && !seen[file] ? ' aria-current="page"' : '') + '>' + s[0] + '</a></li>';
      seen[file] = true;
    });
    el.innerHTML = h + '</ul></div>';
    el.setAttribute("aria-label", m.label + " 하위 메뉴");
  });

  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap"><div class="cols">' +
      '<div><h2>사단법인 화성연구회</h2>' +
        '<p>수원화성의 연구, 보존, 홍보를 하는 시민단체입니다.</p>' +
        '<p class="small">주소: [사무실 주소 입력]<br>전화: [000-0000-0000]<br>이메일: [이메일 입력]<br>고유번호: [법인 고유번호 입력]</p></div>' +
      '<div><h2>바로가기</h2><ul>' +
        '<li><a href="' + R + 'participate/apply.html">프로그램 신청</a></li>' +
        '<li><a href="' + R + 'participate/member.html">회원 가입 안내</a></li>' +
        '<li><a href="' + R + 'hwaseong/map.html">시설물 지도</a></li>' +
        '<li><a href="' + R + 'tour/index.html">관람 정보</a></li></ul></div>' +
      '<div><h2>안내</h2><ul>' +
        '<li><a href="' + R + 'news/index.html#notice">공지사항</a></li>' +
        '<li><a href="' + R + 'credits.html">이미지 출처와 라이선스</a></li>' +
        '<li><a href="' + R + 'privacy.html">개인정보처리방침</a></li></ul></div>' +
    '</div>' +
    '<p class="legal">이 사이트의 사진은 위키미디어 공용의 자유 이용 사진이며, 저작자와 라이선스는 ‘이미지 출처와 라이선스’ 페이지에 적었습니다. 참가 신청 화면은 예시이며 실제로 접수되지 않습니다.</p></div>';
  body.appendChild(footer);

  /* ---------- 사진 넣기: <figure data-img="janganmun" data-w="1280" data-ratio="16/9"></figure> ---------- */
  HS.renderPhoto = function (fig, key, w) {
    var im = HS.images[key];
    if (!im) { fig.innerHTML = '<div class="photo"><div class="photo-fallback">사진 준비 중</div></div>'; return; }
    var ratio = fig.getAttribute("data-ratio");
    var style = ratio ? ' style="aspect-ratio:' + ratio + '"' : '';
    fig.innerHTML =
      '<div class="photo"' + style + '><img loading="lazy" alt="' + im.title + '" src="' + HS.imgUrl(key, w) + '"></div>' +
      (fig.hasAttribute("data-nocap") ? '' :
      '<figcaption>' + im.title + ', 사진 ' + im.author + ', <a href="' + HS.imgPage(key) + '" target="_blank" rel="noopener">' + im.license + '</a></figcaption>');
    var img = fig.querySelector("img");
    img.addEventListener("error", function () {
      img.parentNode.innerHTML = '<div class="photo-fallback">사진을 불러오지 못했습니다</div>';
    });
  };
  document.querySelectorAll("figure[data-img]").forEach(function (f) {
    HS.renderPhoto(f, f.getAttribute("data-img"), parseInt(f.getAttribute("data-w") || "1280", 10));
  });

  /* ---------- 날짜 도구 ---------- */
  HS.parseDate = function (s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); };
  HS.fmt = function (s) { var d = HS.parseDate(s); return (d.getMonth() + 1) + "월 " + d.getDate() + "일"; };
  HS.fmtRange = function (e) {
    var a = HS.parseDate(e.start), b = HS.parseDate(e.end), days = "일월화수목금토";
    var s = a.getFullYear() + ". " + (a.getMonth() + 1) + ". " + a.getDate() + ".(" + days[a.getDay()] + ")";
    if (e.end !== e.start) s += " ~ " + (b.getMonth() + 1) + ". " + b.getDate() + ".(" + days[b.getDay()] + ")";
    return s;
  };
  HS.today = function () { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };

  /* ---------- 다가오는 행사 목록: <ul class="event-list" data-upcoming="5"></ul> ---------- */
  document.querySelectorAll("[data-upcoming]").forEach(function (ul) {
    var n = parseInt(ul.getAttribute("data-upcoming"), 10) || 5;
    var t = HS.today();
    var list = HS.events.filter(function (e) { return HS.parseDate(e.end) >= t; })
      .sort(function (a, b) { return HS.parseDate(a.start) - HS.parseDate(b.start); }).slice(0, n);
    if (!list.length) { ul.innerHTML = '<li>예정된 일정이 없습니다. 새 일정이 올라오면 이곳에 표시됩니다.</li>'; return; }
    ul.innerHTML = list.map(function (e) {
      var kind = e.kind === "own" ? '<span class="tag">연구회</span>' : e.kind === "ext" ? '<span class="tag tag-g">수원시 등</span>' : '<span class="tag tag-y">예시</span>';
      var act = e.apply ? '<a class="btn btn-line small" href="' + R + 'participate/apply.html?id=' + e.id + '">신청하기</a>' : '';
      return '<li><span class="d">' + HS.fmt(e.start) + (e.end !== e.start ? '~' : '') + '</span>' +
        '<span><span class="t">' + kind + e.title + '</span><br><span class="p">' + e.place + '</span></span>' + act + '</li>';
    }).join("");
  });

  /* ---------- 연표: <div data-timeline></div> ---------- */
  document.querySelectorAll("[data-timeline]").forEach(function (box) {
    var only = box.getAttribute("data-timeline");
    var data = HS.timeline.filter(function (x) { return !only || x.cat === only; });
    var cats = ["전체", "축성", "훼손", "복원", "지정", "연구회"];
    var h = only ? '' : '<div class="timeline-filter" role="group" aria-label="연표 분류">' +
      cats.map(function (c, i) { return '<button type="button" class="chip" aria-pressed="' + (i === 0) + '" data-cat="' + c + '">' + c + '</button>'; }).join("") + '</div>';
    h += '<ol class="timeline">' + data.map(function (x) {
      return '<li data-cat="' + x.cat + '"><span class="year">' + x.y + '</span><div class="ev">' + x.t + '<br><small>' + x.cat + '</small></div></li>';
    }).join("") + '</ol>';
    box.innerHTML = h;
    box.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () {
        box.querySelectorAll(".chip").forEach(function (o) { o.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        var c = b.getAttribute("data-cat");
        box.querySelectorAll(".timeline li").forEach(function (li) { li.hidden = !(c === "전체" || li.getAttribute("data-cat") === c); });
      });
    });
  });

  /* ---------- 탭: <div class="tabs"> 안에 role=tab 버튼과 role=tabpanel ---------- */
  document.querySelectorAll(".tabs").forEach(function (tabs) {
    var btns = tabs.querySelectorAll('[role="tab"]');
    function select(id) {
      btns.forEach(function (b) {
        var on = b.getAttribute("aria-controls") === id;
        b.setAttribute("aria-selected", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
    }
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(b.getAttribute("aria-controls")); history.replaceState(null, "", "#" + b.getAttribute("aria-controls")); });
      b.addEventListener("keydown", function (ev) {
        if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
        var n = (i + (ev.key === "ArrowRight" ? 1 : -1) + btns.length) % btns.length;
        btns[n].focus(); btns[n].click();
      });
    });
    var hash = location.hash.slice(1);
    var hit = Array.prototype.filter.call(btns, function (b) { return b.getAttribute("aria-controls") === hash; })[0];
    select(hit ? hash : btns[0].getAttribute("aria-controls"));
  });

  /* ---------- 용어 사전 ---------- */
  var gl = document.querySelector("[data-glossary]");
  if (gl) {
    var input = document.getElementById("gloss-q");
    var draw = function () {
      var q = (input.value || "").trim();
      var list = HS.glossary.filter(function (g) { return !q || (g.w + g.hj + g.d).indexOf(q) > -1; });
      gl.innerHTML = list.length ? list.map(function (g) {
        return '<article><h3>' + g.w + '<span class="hj">' + g.hj + '</span></h3><p>' + g.d + '</p></article>';
      }).join("") : '<p>‘' + q + '’에 해당하는 용어가 없습니다. 다른 낱말로 찾아보세요.</p>';
    };
    input.addEventListener("input", draw);
    draw();
  }
})();
