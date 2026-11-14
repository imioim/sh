/* 참여하기: 행사 달력, 프로그램 목록, 신청서(예시), 신청 내역 확인(예시)
   신청 자료는 서버가 아니라 방문자 브라우저(localStorage)에만 저장됩니다.
   실제 운영 때는 saveApplication / findApplications 두 함수만 서버 API 호출로 바꾸면 됩니다. */

(function () {
  var HS = window.HS;
  var KEY = "hs-demo-applications";

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function store(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); return true; } catch (e) { return false; } }
  function saveApplication(app) { var l = load(); l.push(app); return store(l); }
  function findApplications(phone, pin) { return load().filter(function (a) { return a.phone === phone && a.pin === pin; }); }
  function removeApplication(no) { store(load().filter(function (a) { return a.no !== no; })); }
  function byId(id) { return HS.events.filter(function (e) { return e.id === id; })[0]; }
  function takenOf(e) { return (e.taken || 0) + load().filter(function (a) { return a.event === e.id; }).reduce(function (s, a) { return s + a.people; }, 0); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- 달력 ---------- */
  var calBox = document.getElementById("calendar");
  if (calBox) {
    var detail = document.getElementById("ev-detail");
    var t = HS.today();
    var cur = new Date(t.getFullYear(), t.getMonth(), 1);
    var q = new URLSearchParams(location.search).get("m");
    if (q && /^\d{4}-\d{2}$/.test(q)) cur = new Date(+q.slice(0, 4), +q.slice(5) - 1, 1);

    var drawCal = function () {
      var y = cur.getFullYear(), m = cur.getMonth();
      var first = new Date(y, m, 1), startDay = first.getDay();
      var start = new Date(y, m, 1 - startDay);
      var h = '<div class="cal-head"><h2 id="cal-title">' + y + '년 ' + (m + 1) + '월</h2><div class="btns">' +
        '<button class="btn btn-line" type="button" data-move="-1">이전 달</button>' +
        '<button class="btn btn-line" type="button" data-move="0">이번 달</button>' +
        '<button class="btn btn-line" type="button" data-move="1">다음 달</button></div></div>' +
        '<div class="table-wrap"><table class="cal" aria-labelledby="cal-title"><thead><tr>' +
        "일월화수목금토".split("").map(function (d) { return '<th scope="col">' + d + '</th>'; }).join("") + '</tr></thead><tbody>';
      for (var w = 0; w < 6; w++) {
        h += '<tr>';
        for (var d = 0; d < 7; d++) {
          var day = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d);
          var cls = (day.getMonth() !== m ? "other " : "") + (+day === +t ? "today" : "");
          var evs = HS.events.filter(function (e) { return HS.parseDate(e.start) <= day && HS.parseDate(e.end) >= day; });
          // 기간이 긴 외부 행사는 시작일과 매주 일요일에만 표시해 칸이 넘치지 않게 합니다
          evs = evs.filter(function (e) { return e.start === e.end || +HS.parseDate(e.start) === +day || day.getDay() === 0 || day.getDate() === 1; });
          h += '<td class="' + cls + '"><span class="dn">' + day.getDate() + '</span>' +
            evs.map(function (e) {
              var k = e.kind === "ext" ? " ext" : e.kind === "sample" ? " sample" : "";
              return '<button type="button" class="ev-btn' + k + '" data-ev="' + e.id + '" title="' + esc(e.title) + '">' + esc(e.title.replace("[예시] ", "")) + '</button>';
            }).join("") + '</td>';
        }
        h += '</tr>';
        if (new Date(start.getFullYear(), start.getMonth(), start.getDate() + (w + 1) * 7).getMonth() !== m && w >= 3) break;
      }
      h += '</tbody></table></div>' +
        '<p class="legend"><span><i style="background:#dbe8e3"></i>화성연구회 행사</span><span><i style="background:#e3ecf3"></i>수원시 등 외부 행사</span><span><i style="background:#f6ecd2"></i>예시 프로그램(가상 일정)</span></p>';
      calBox.innerHTML = h;
      calBox.querySelectorAll("[data-move]").forEach(function (b) {
        b.addEventListener("click", function () {
          var mv = +b.getAttribute("data-move");
          cur = mv === 0 ? new Date(t.getFullYear(), t.getMonth(), 1) : new Date(cur.getFullYear(), cur.getMonth() + mv, 1);
          drawCal();
          document.getElementById("cal-title").focus && calBox.querySelector("h2").setAttribute("tabindex", "-1");
        });
      });
      calBox.querySelectorAll("[data-ev]").forEach(function (b) {
        b.addEventListener("click", function () { showDetail(byId(b.getAttribute("data-ev"))); });
      });
    };

    var showDetail = function (e) {
      var full = e.cap && takenOf(e) >= e.cap;
      var act = e.apply
        ? (full ? '<button class="btn" type="button" disabled>정원 마감</button>'
                : '<a class="btn" href="apply.html?id=' + e.id + '">이 프로그램 신청하기</a>')
        : (e.page ? '<a class="btn btn-line" href="' + HS.root + e.page + '">행사 안내 보기</a>' : '');
      detail.innerHTML = '<div class="block"><h3>' + esc(e.title) + '</h3><dl class="facts">' +
        '<dt>일시</dt><dd>' + HS.fmtRange(e) + (e.time ? ' ' + e.time : '') + '</dd>' +
        '<dt>장소</dt><dd>' + esc(e.place) + '</dd>' +
        (e.cap ? '<dt>정원</dt><dd>' + e.cap + '명 중 ' + Math.min(takenOf(e), e.cap) + '명 신청</dd>' : '') +
        (e.fee ? '<dt>참가비</dt><dd>' + e.fee + '</dd>' : '') +
        '<dt>안내</dt><dd>' + esc(e.note || "") + '</dd></dl>' + act + '</div>';
      detail.querySelector(".block").setAttribute("tabindex", "-1");
      detail.querySelector(".block").focus();
    };
    drawCal();
  }

  /* ---------- 신청 가능한 프로그램 목록: <div id="prog-list"></div> ---------- */
  var progList = document.getElementById("prog-list");
  if (progList) {
    var t2 = HS.today();
    var items = HS.events.filter(function (e) { return e.apply && HS.parseDate(e.end) >= t2; });
    progList.innerHTML = items.length ? items.map(function (e) {
      var taken = Math.min(takenOf(e), e.cap), full = taken >= e.cap;
      return '<div class="prog"><div><h3>' + esc(e.title) + '</h3><p>' + HS.fmtRange(e) + ' ' + (e.time || '') + ', ' + esc(e.place) + '</p>' +
        '<p>' + esc(e.note) + '</p><div class="seat-bar" aria-label="정원 ' + e.cap + '명 중 ' + taken + '명 신청"><span style="width:' + Math.round(taken / e.cap * 100) + '%"></span></div>' +
        '<p class="small muted">정원 ' + e.cap + '명, ' + (full ? '마감' : '남은 자리 ' + (e.cap - taken) + '명') + '</p></div>' +
        (full ? '<button class="btn" disabled>정원 마감</button>' : '<a class="btn" href="apply.html?id=' + e.id + '">신청하기</a>') + '</div>';
    }).join("") : '<p>지금 신청할 수 있는 프로그램이 없습니다. 일정이 올라오면 이곳에 표시됩니다.</p>';
  }

  /* ---------- 신청서 ---------- */
  var form = document.getElementById("apply-form");
  if (form) {
    var sel = form.querySelector("#f-event");
    var t3 = HS.today();
    var open = HS.events.filter(function (e) { return e.apply && HS.parseDate(e.end) >= t3; });
    sel.innerHTML = '<option value="">프로그램을 고르세요</option>' + open.map(function (e) {
      var full = takenOf(e) >= e.cap;
      return '<option value="' + e.id + '"' + (full ? ' disabled' : '') + '>' + esc(e.title) + ' (' + HS.fmt(e.start) + ')' + (full ? ' - 마감' : '') + '</option>';
    }).join("");
    var pre = new URLSearchParams(location.search).get("id");
    if (pre && byId(pre) && takenOf(byId(pre)) < byId(pre).cap) sel.value = pre;

    var summary = document.getElementById("prog-summary");
    var drawSummary = function () {
      var e = byId(sel.value);
      if (!e) { summary.hidden = true; return; }
      summary.hidden = false;
      summary.innerHTML = '<strong>' + esc(e.title) + '</strong><br>' + HS.fmtRange(e) + ' ' + (e.time || '') + ', ' + esc(e.place) +
        '<br>남은 자리 ' + (e.cap - takenOf(e)) + '명, 참가비 ' + e.fee;
      form.querySelector("#f-people").max = Math.min(5, e.cap - takenOf(e));
    };
    sel.addEventListener("change", drawSummary);
    drawSummary();

    var setErr = function (id, msg) {
      var f = form.querySelector("#" + id).closest(".field");
      f.classList.toggle("has-error", !!msg);
      f.querySelector(".err").textContent = msg || "";
      return !msg;
    };

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var v = function (id) { return form.querySelector("#" + id).value.trim(); };
      var ok = true;
      var e = byId(v("f-event"));
      ok = setErr("f-event", e ? "" : "신청할 프로그램을 고르세요.") && ok;
      ok = setErr("f-name", v("f-name").length >= 2 ? "" : "이름을 2자 이상 적으세요.") && ok;
      var phone = v("f-phone").replace(/[^0-9]/g, "");
      ok = setErr("f-phone", /^01\d{8,9}$/.test(phone) ? "" : "휴대전화 번호를 숫자 10~11자리로 적으세요. 예: 01012345678") && ok;
      var mail = v("f-email");
      ok = setErr("f-email", !mail || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail) ? "" : "이메일 형식을 확인하세요. 예: name@example.com") && ok;
      var people = parseInt(v("f-people"), 10);
      var left = e ? e.cap - takenOf(e) : 0;
      ok = setErr("f-people", people >= 1 && people <= Math.min(5, left) ? "" : "인원은 1명부터 " + Math.min(5, left) + "명까지 신청할 수 있습니다.") && ok;
      var pin = v("f-pin");
      ok = setErr("f-pin", /^\d{4}$/.test(pin) ? "" : "신청 내역을 확인할 때 쓸 숫자 4자리를 정하세요.") && ok;
      ok = setErr("f-consent", form.querySelector("#f-consent").checked ? "" : "개인정보 수집·이용에 동의해야 신청할 수 있습니다.") && ok;
      if (!ok) { var first = form.querySelector(".has-error input, .has-error select"); if (first) first.focus(); return; }

      var no = "HS" + e.start.replace(/-/g, "").slice(2) + "-" + String(Math.floor(Math.random() * 9000) + 1000);
      var app = { no: no, event: e.id, name: v("f-name"), phone: phone, email: mail, people: people, memo: v("f-memo"), pin: pin, at: new Date().toISOString() };
      var saved = saveApplication(app);
      var res = document.getElementById("apply-result");
      form.hidden = true;
      res.hidden = false;
      res.innerHTML = '<div class="result" tabindex="-1"><h2>신청이 접수되었습니다</h2>' +
        '<dl class="facts"><dt>접수번호</dt><dd><strong>' + no + '</strong></dd><dt>프로그램</dt><dd>' + esc(e.title) + '</dd>' +
        '<dt>일시</dt><dd>' + HS.fmtRange(e) + ' ' + (e.time || '') + '</dd><dt>장소</dt><dd>' + esc(e.place) + '</dd>' +
        '<dt>신청자</dt><dd>' + esc(app.name) + ' 외 ' + (people - 1) + '명</dd></dl>' +
        '<p>신청 내역은 휴대전화 번호와 확인 번호 4자리로 볼 수 있습니다.' + (saved ? '' : ' 이 브라우저는 저장소를 쓸 수 없어 내역이 남지 않습니다.') + '</p>' +
        '<p class="small muted">예시 화면이므로 실제로 접수되지 않았습니다. 신청 내용은 이 브라우저에만 저장됩니다.</p>' +
        '<a class="btn" href="check.html">신청 내역 확인</a> <a class="btn btn-line" href="index.html">일정으로 돌아가기</a></div>';
      res.querySelector(".result").focus();
    });
  }

  /* ---------- 신청 내역 확인 ---------- */
  var cf = document.getElementById("check-form");
  if (cf) {
    var out = document.getElementById("check-result");
    var run = function () {
      var phone = cf.querySelector("#c-phone").value.replace(/[^0-9]/g, "");
      var pin = cf.querySelector("#c-pin").value.trim();
      var list = findApplications(phone, pin);
      if (!list.length) {
        out.innerHTML = '<p class="note">입력한 휴대전화 번호와 확인 번호에 맞는 신청 내역이 없습니다. 번호를 다시 확인하거나, 이 브라우저에서 신청했는지 확인하세요.</p>';
        return;
      }
      out.innerHTML = '<div class="table-wrap"><table><thead><tr><th>접수번호</th><th>프로그램</th><th>일시</th><th>인원</th><th>취소</th></tr></thead><tbody>' +
        list.map(function (a) {
          var e = byId(a.event) || { title: "(삭제된 일정)", start: a.at.slice(0, 10), end: a.at.slice(0, 10) };
          return '<tr><td>' + a.no + '</td><td>' + esc(e.title) + '</td><td>' + HS.fmtRange(e) + '</td><td>' + a.people + '명</td>' +
            '<td><button class="btn btn-line small" type="button" data-cancel="' + a.no + '">신청 취소</button></td></tr>';
        }).join("") + '</tbody></table></div>';
      out.querySelectorAll("[data-cancel]").forEach(function (b) {
        b.addEventListener("click", function () {
          removeApplication(b.getAttribute("data-cancel"));
          run();
          var p = document.createElement("p"); p.className = "note"; p.textContent = "접수번호 " + b.getAttribute("data-cancel") + " 신청을 취소했습니다.";
          out.prepend(p);
        });
      });
    };
    cf.addEventListener("submit", function (ev) { ev.preventDefault(); run(); });
  }

  /* ---------- 회원 가입 신청(예시) ---------- */
  var mf = document.getElementById("member-form");
  if (mf) {
    mf.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = mf.querySelector("#m-name").value.trim();
      var phone = mf.querySelector("#m-phone").value.replace(/[^0-9]/g, "");
      var consent = mf.querySelector("#m-consent").checked;
      var msg = document.getElementById("member-result");
      if (name.length < 2 || !/^01\d{8,9}$/.test(phone) || !consent) {
        msg.innerHTML = '<p class="note">이름(2자 이상), 휴대전화 번호, 개인정보 수집·이용 동의를 모두 확인하세요.</p>';
        return;
      }
      mf.hidden = true;
      msg.innerHTML = '<div class="result"><h3>가입 신청서를 받았습니다</h3><p>' + esc(name) + '님, 사무국에서 확인한 뒤 연락드립니다.</p><p class="small muted">예시 화면이므로 실제로 전송되지 않았습니다.</p></div>';
    });
  }
})();
