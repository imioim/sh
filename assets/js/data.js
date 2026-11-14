/* 홈페이지 공통 데이터
   - 사실 정보는 수원시, 국가유산청, 유네스코, 언론 보도를 근거로 정리했습니다.
   - "예시"로 표시한 일정·프로그램은 화면 구성을 보여 주기 위한 가상 자료입니다. 운영 전에 실제 자료로 바꾸세요. */

window.HS = window.HS || {};

/* ---------- 이미지 (위키미디어 공용) ----------
   file: 위키미디어 공용 파일 이름. 주소는 Special:FilePath로 만듭니다.
   이미지를 저장소에 직접 넣어 쓰려면 local 값에 assets/img/파일명 을 적으면 그 파일을 먼저 씁니다. */
HS.images = {
  janganmun: {
    file: "Janganmun Gate (181476589).jpeg",
    title: "장안문 야경",
    author: "Jongsun Lee",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/"
  },
  hwaseomun: {
    file: "Hwaseong Fortress-002.jpg",
    title: "화서문과 서북공심돈",
    author: "Craig Wyzik",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/"
  },
  banghwa: {
    file: "방화수류정 Banghwa Suryu Pavilion, Hwaseong Fortress.jpg",
    title: "방화수류정(동북각루)",
    author: "김병모 (공유마당 경유)",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  haenggung: {
    file: "Hwaseong Haenggung Palace.jpg",
    title: "화성행궁",
    author: "Adil",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
  },
  wall: {
    file: "Hwaseong Fortress 01.jpg",
    title: "수원화성 성벽",
    author: "Bernard Gagnon",
    license: "퍼블릭 도메인 기증",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/"
  },
  jeondo: {
    file: "Hwaseong Jeondo.jpg",
    title: "화성전도(『화성성역의궤』 수록)",
    author: "조선 1795~1801년 간행 도판",
    license: "퍼블릭 도메인",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Public_domain"
  },
  uigwe: {
    file: "Hwaseong seongyeok uigwe 01.jpg",
    title: "『화성성역의궤』",
    author: "조선 1801년 간행",
    license: "퍼블릭 도메인",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Public_domain"
  },
  haenggungdo: {
    file: "화성행궁도(규장각소장본).jpg",
    title: "화성행궁도(규장각 소장본)",
    author: "조선시대 회화",
    license: "퍼블릭 도메인",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Public_domain"
  },
  procession: {
    file: "Painting of the Royal Procession to Hwaseong on Eight-panel Folding Screen part1.jpg",
    title: "화성원행도 병풍(부분)",
    author: "조선 18세기 말 궁중 회화",
    license: "퍼블릭 도메인",
    licenseUrl: "https://commons.wikimedia.org/wiki/Commons:Public_domain"
  }
};

HS.imgUrl = function (key, width) {
  var im = HS.images[key];
  if (!im) return "";
  if (im.local) return HS.root + im.local;
  return "https://commons.wikimedia.org/wiki/Special:FilePath/" +
    encodeURIComponent(im.file.replace(/ /g, "_")) + "?width=" + (width || 1280);
};
HS.imgPage = function (key) {
  var im = HS.images[key];
  return "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(im.file.replace(/ /g, "_"));
};

/* ---------- 시설물 41곳 (수원시 공식 소개 순서) ----------
   t: 개념도 성곽선 위 위치(0~1). 실제 측량 좌표가 아닙니다. */
HS.facilityTypes = {
  gate: "성문", amun: "암문", sumun: "수문", chi: "치성", poru1: "포루(舖樓)", poru2: "포루(砲樓)",
  nodae: "노대", jeokdae: "적대", gangnu: "각루", gongsimdon: "공심돈", jangdae: "장대", bongdon: "봉돈"
};

HS.facilities = [
  { n: 1, name: "팔달문", hj: "八達門", type: "gate", t: 0.000, treasure: "보물", img: null,
    desc: "수원화성의 남문입니다. ‘사방으로 길이 열린다’는 뜻을 담았고, 축조 당시 원형이 거의 그대로 남아 있습니다. 문 좌우 성벽이 끊긴 자리에 길과 건물이 들어서면서 팔달문시장, 영동시장 같은 전통시장이 발달했습니다." },
  { n: 2, name: "남수문", hj: "南水門", type: "sumun", t: 0.038, img: null,
    desc: "수원천이 화성 남쪽으로 빠져나가는 수문입니다. 홍수로 사라졌다가 2012년에 복원되었습니다." },
  { n: 3, name: "동남각루", hj: "東南角樓", type: "gangnu", t: 0.075, img: null,
    desc: "성곽 동남쪽 모서리의 감시·지휘용 누각입니다. 수원화성 각루 가운데 시야가 가장 넓은 곳으로 꼽힙니다." },
  { n: 4, name: "동삼치", hj: "東三雉", type: "chi", t: 0.100, img: null,
    desc: "성벽 바깥으로 돌출시켜 쌓은 치성입니다. 성벽에 붙은 적을 옆에서 공격할 수 있습니다." },
  { n: 5, name: "동이포루", hj: "東二舖樓", type: "poru1", t: 0.122, img: null,
    desc: "치성 위에 지은 목조 누각입니다. 군사가 머물며 망을 보던 시설입니다." },
  { n: 6, name: "봉돈", hj: "烽墩", type: "bongdon", t: 0.145, img: null,
    desc: "연기와 불로 신호를 보내던 시설입니다. 전체를 벽돌로 쌓았고 원형이 잘 남아 있습니다." },
  { n: 7, name: "동이치", hj: "東二雉", type: "chi", t: 0.165, img: null,
    desc: "성벽 바깥으로 돌출시켜 쌓은 치성입니다." },
  { n: 8, name: "동포루", hj: "東砲樓", type: "poru2", t: 0.185, img: null,
    desc: "벽돌로 쌓은 화포 발사 시설입니다. 위아래 층에서 동시에 공격할 수 있게 만들었습니다." },
  { n: 9, name: "동일치", hj: "東一雉", type: "chi", t: 0.205, img: null,
    desc: "성벽 바깥으로 돌출시켜 쌓은 치성입니다." },
  { n: 10, name: "동일포루", hj: "東一舖樓", type: "poru1", t: 0.225, img: null,
    desc: "치성 위에 지은 목조 누각입니다." },
  { n: 11, name: "창룡문", hj: "蒼龍門", type: "gate", t: 0.255, img: null,
    desc: "수원화성의 동문입니다. 창(蒼)은 푸른색을 뜻하며 동쪽을 지키는 청룡을 상징합니다. 성벽 왼쪽에 공사를 맡은 감독관과 석공 우두머리 이름을 새긴 공사실명판이 남아 있습니다." },
  { n: 12, name: "동북노대", hj: "東北弩臺", type: "nodae", t: 0.280, img: null,
    desc: "쇠뇌(노)를 쏘던 대입니다. 노대와 좌우 성벽이 만나는 곳을 좁혀 쌓았는데, 『화성성역의궤』는 그 모양을 벌의 허리에 견주어 적었습니다." },
  { n: 13, name: "동북공심돈", hj: "東北空心墩", type: "gongsimdon", t: 0.300, img: null,
    desc: "3층 원통형 벽돌 건물입니다. 출입문에서 통로를 따라 돌며 올라가면 꼭대기 망루에 닿습니다. 한국전쟁 등을 거치며 절반 이상 무너졌다가 1976년에 복원되었습니다." },
  { n: 14, name: "동장대(연무대)", hj: "東將臺·鍊武臺", type: "jangdae", t: 0.318, img: null,
    desc: "동쪽 지휘소이자 군사 훈련 장소입니다. 지금은 국궁 체험장과 화성어차 승차장이 가까이 있습니다." },
  { n: 15, name: "동암문", hj: "東暗門", type: "amun", t: 0.336, img: null,
    desc: "적이 알기 어렵게 낸 비밀 출입문입니다." },
  { n: 16, name: "동북포루", hj: "東北舖樓", type: "poru1", t: 0.356, img: null,
    desc: "치성 위에 지은 목조 누각입니다. 각건대라고도 부릅니다." },
  { n: 17, name: "북암문", hj: "北暗門", type: "amun", t: 0.380, img: null,
    desc: "벽돌로 쌓은 암문입니다." },
  { n: 18, name: "방화수류정(동북각루)", hj: "訪花隨柳亭", type: "gangnu", t: 0.400, treasure: "보물", img: "banghwa",
    desc: "공식 명칭은 동북각루입니다. ‘꽃을 찾고 버들을 따라 노닌다’는 뜻의 이름이 붙었습니다. 홍수로 낡은 것을 1848년에 다시 지었고, 2011년 보물로 지정되었습니다. 평면과 지붕 형태가 독특해 보는 위치마다 모습이 다릅니다." },
  { n: 19, name: "화홍문(북수문)", hj: "華虹門", type: "sumun", t: 0.420, img: null,
    desc: "수원천이 화성 안으로 들어오는 북쪽 수문입니다. 수원천이 일곱 개의 홍예를 지나 흐릅니다." },
  { n: 20, name: "북동포루", hj: "北東砲樓", type: "poru2", t: 0.440, img: null,
    desc: "벽돌로 쌓은 화포 발사 시설입니다." },
  { n: 21, name: "북동치", hj: "北東雉", type: "chi", t: 0.456, img: null,
    desc: "북동적대와 맞닿은 치성입니다." },
  { n: 22, name: "북동적대", hj: "北東敵臺", type: "jeokdae", t: 0.472, img: null,
    desc: "장안문 동쪽에서 성문을 지키는 시설입니다." },
  { n: 23, name: "장안문", hj: "長安門", type: "gate", t: 0.492, img: "janganmun",
    desc: "수원화성의 북문이자 정문입니다. 홍예문 위에 2층 누각을 올리고 바깥에 둥근 옹성을 쌓았습니다. 1950년 폭격으로 누각이 불탔다가 1978년 원래 모습으로 복원되었습니다." },
  { n: 24, name: "북서적대", hj: "北西敵臺", type: "jeokdae", t: 0.512, img: null,
    desc: "장안문 서쪽에서 성문을 지키는 시설입니다." },
  { n: 25, name: "북서포루", hj: "北西砲樓", type: "poru2", t: 0.532, img: null,
    desc: "벽돌로 쌓은 3층 구조의 화포 발사 시설입니다." },
  { n: 26, name: "북포루", hj: "北舖樓", type: "poru1", t: 0.552, img: null,
    desc: "치성 위에 지은 목조 누각입니다." },
  { n: 27, name: "서북공심돈", hj: "西北空心墩", type: "gongsimdon", t: 0.576, treasure: "보물", img: "hwaseomun",
    desc: "속이 빈 돈대라는 뜻의 공심돈은 우리나라 성곽 가운데 화성에서만 볼 수 있습니다. 1796년 완공되었고 2011년 보물로 지정되었습니다." },
  { n: 28, name: "화서문", hj: "華西門", type: "gate", t: 0.596, treasure: "보물", img: "hwaseomun",
    desc: "수원화성의 서문입니다. 바로 옆 서북공심돈과 함께 화성의 대표 경관으로 꼽힙니다." },
  { n: 29, name: "서북각루", hj: "西北角樓", type: "gangnu", t: 0.615, img: null,
    desc: "화서문 일대를 살피고 지휘하던 각루입니다." },
  { n: 30, name: "서일치", hj: "西一雉", type: "chi", t: 0.635, img: null,
    desc: "성벽 바깥으로 돌출시켜 쌓은 치성입니다." },
  { n: 31, name: "서포루(西砲樓)", hj: "西砲樓", type: "poru2", t: 0.655, img: null,
    desc: "벽돌로 쌓은 화포 발사 시설입니다. 다른 포루보다 조금 작습니다." },
  { n: 32, name: "서이치", hj: "西二雉", type: "chi", t: 0.675, img: null,
    desc: "성벽 바깥으로 돌출시켜 쌓은 치성입니다." },
  { n: 33, name: "서노대", hj: "西弩臺", type: "nodae", t: 0.700, img: null,
    desc: "팔달산 정상 가까이에 있는 정팔각형 노대입니다." },
  { n: 34, name: "서장대", hj: "西將臺", type: "jangdae", t: 0.718, img: null,
    desc: "팔달산 정상의 군사 지휘소입니다. 정조가 쓴 ‘화성장대’ 편액이 걸려 있습니다. 수원 도심이 사방으로 내려다보여 해돋이 명소로도 알려져 있습니다." },
  { n: 35, name: "서암문", hj: "西暗門", type: "amun", t: 0.742, img: null,
    desc: "자연 지형을 이용해 감춘 암문입니다." },
  { n: 36, name: "서포루(西舖樓)", hj: "西舖樓", type: "poru1", t: 0.762, img: null,
    desc: "망을 보던 목조 포루입니다. 31번 서포루(西砲樓)와 이름은 같고 한자가 다릅니다." },
  { n: 37, name: "서삼치", hj: "西三雉", type: "chi", t: 0.782, img: null,
    desc: "성벽 바깥으로 돌출시켜 쌓은 치성입니다." },
  { n: 38, name: "서남암문", hj: "西南暗門", type: "amun", t: 0.805, img: null,
    desc: "위에 포사를 얹은 암문입니다. 이 문을 나서면 매복을 위해 낸 길인 용도로 이어집니다." },
  { n: 39, name: "화양루(서남각루)", hj: "華陽樓", type: "gangnu", t: 0.848, img: null,
    desc: "용도 끝 높은 곳에 세운 각루입니다." },
  { n: 40, name: "남포루", hj: "南砲樓", type: "poru2", t: 0.905, img: null,
    desc: "팔달문에서 화양루에 이르는 구간을 지키던 화포 발사 시설입니다. 1796년 7월 9일 완성되었습니다." },
  { n: 41, name: "남치", hj: "南雉", type: "chi", t: 0.955, img: null,
    desc: "팔달문과 남포루 사이의 치성입니다." }
];

/* ---------- 수원화성 연표 ---------- */
HS.timeline = [
  { y: "1762", cat: "축성", t: "사도세자 사망(임오화변)" },
  { y: "1789", cat: "축성", t: "사도세자 묘를 양주 배봉산에서 수원 화산으로 옮기고, 수원 읍치를 팔달산 아래로 이전" },
  { y: "1793", cat: "축성", t: "12월, 축성 예정지 사전 답사. 정약용이 축성 계획서 「성화주략」 작성" },
  { y: "1794", cat: "축성", t: "1월, 화성 축성 착공" },
  { y: "1795", cat: "축성", t: "윤2월, 을묘원행과 혜경궁 홍씨 회갑 진찬연. 북쪽 저수지 만석거 축조" },
  { y: "1796", cat: "축성", t: "9월 완공, 10월 낙성연. 성신사 건립" },
  { y: "1799", cat: "축성", t: "서쪽 저수지 축만제 축조" },
  { y: "1800", cat: "축성", t: "6월 28일, 정조 승하" },
  { y: "1801", cat: "축성", t: "화령전 건립. 『화성성역의궤』 10권 9책 간행" },
  { y: "1920년대", cat: "훼손", t: "시가지계획사업으로 장안문 좌우 성벽 철거" },
  { y: "1923", cat: "훼손", t: "화성행궁 일원을 허물고 경기도립병원 신축" },
  { y: "1950", cat: "훼손", t: "한국전쟁 폭격으로 장안문 누각 소실" },
  { y: "1963", cat: "지정", t: "수원 화성 사적 지정" },
  { y: "1975~1979", cat: "복원", t: "『화성성역의궤』를 근거로 성곽 대부분 보수·복원" },
  { y: "1989", cat: "복원", t: "화성행궁 복원사업 시작" },
  { y: "1997", cat: "지정", t: "12월 4일, 유네스코 세계유산 등재. 화성연구회의 모태인 답사 모임 시작" },
  { y: "2001", cat: "연구회", t: "5월, 사단법인 화성연구회 출범(출처에 따라 2000년 법인 승인으로 기록)" },
  { y: "2002", cat: "연구회", t: "1월 12일, 화성연구회 주관으로 성신사 고유제 100여 년 만에 재개" },
  { y: "2003", cat: "복원", t: "화성행궁 1단계 복원 후 공개" },
  { y: "2007", cat: "연구회", t: "화성연구회, 최우수 문화재 지킴이 단체상(대통령상) 수상" },
  { y: "2009", cat: "복원", t: "성신사 복원" },
  { y: "2011", cat: "지정", t: "방화수류정, 서북공심돈 보물 지정" },
  { y: "2012", cat: "복원", t: "남수문 복원" },
  { y: "2016", cat: "지정", t: "축만제 세계관개시설물유산 등재. 수원화성 관광특구 지정" },
  { y: "2017", cat: "지정", t: "만석거 세계관개시설물유산 등재" },
  { y: "2019", cat: "지정", t: "화령전 운한각·이안청·복도각 보물 지정" },
  { y: "2024", cat: "복원", t: "4월 24일, 화성행궁 우화관·별주 복원 개관(1989년 시작한 복원사업 마무리)" },
  { y: "2024", cat: "연구회", t: "제1회 수원화성 축성장인 명패봉안문화제" },
  { y: "2026", cat: "연구회", t: "축성 230주년. 10월 17일 성신사고유제·낙성연·축성장인명패봉안문화제" },
  { y: "2027", cat: "지정", t: "세계유산 등재 30주년" }
];

/* ---------- 행사·프로그램 ----------
   kind: own(연구회 행사), ext(수원시 등 외부 행사), sample(화면 예시용 가상 일정)
   apply: true 이면 신청 가능 */
HS.events = [
  { id: "ext-2026-night", kind: "ext", start: "2026-05-01", end: "2026-11-01", title: "화성행궁 야간개장 ‘달빛화담’", place: "화성행궁", note: "금~일요일·공휴일 18:00~21:30, 수원시·수원문화재단" },
  { id: "ext-2026-media", kind: "ext", start: "2026-09-19", end: "2026-10-06", title: "수원화성 미디어아트 ‘새빛동락’", place: "화서문, 장안문, 장안공원 일원", note: "수원시" },
  { id: "ext-2026-exhibit", kind: "ext", start: "2026-09-30", end: "2026-12-13", title: "특별기획전 〈백성과 함께 이룬 만년대업, 수원화성〉", place: "수원화성박물관 1층 기획전시실", note: "수원화성박물관" },
  { id: "ext-2026-festival", kind: "ext", start: "2026-10-04", end: "2026-10-11", title: "제63회 수원화성문화제", place: "행궁광장, 화성행궁 등 수원화성 일원", note: "수원시" },
  { id: "ext-2026-parade", kind: "ext", start: "2026-10-04", end: "2026-10-04", title: "정조대왕 능행차 공동재현", place: "경복궁~융릉 31.8km", note: "서울시·경기도·수원시·화성시" },
  { id: "own-2026-myeongpae", kind: "own", start: "2026-10-17", end: "2026-10-17", title: "2026 성신사고유제·낙성연·축성장인명패봉안문화제", place: "성신사, 화령전, 낙남헌, 팔달사", note: "(사)화성연구회 주최, 10:00 홍살문 앞 집결", page: "programs/events.html#myeongpae" },

  { id: "s-2026-11-walk", kind: "sample", apply: true, start: "2026-11-21", end: "2026-11-21", time: "10:00~13:00", title: "[예시] 11월 정기 답사: 수원화성 동쪽 구간", place: "창룡문 앞 집결", cap: 30, taken: 18, fee: "무료", note: "창룡문~동북공심돈~방화수류정~화홍문" },
  { id: "s-2026-11-lecture", kind: "sample", apply: true, start: "2026-11-26", end: "2026-11-26", time: "19:00~21:00", title: "[예시] 수원화성 인문학 강좌: 『화성성역의궤』 읽기", place: "강의실(장소 입력)", cap: 40, taken: 33, fee: "무료", note: "의궤에 기록된 장인과 품삯" },
  { id: "s-2026-11-monitor", kind: "sample", apply: true, start: "2026-11-28", end: "2026-11-28", time: "09:30~12:00", title: "[예시] 월례 수원화성 모니터링", place: "화성행궁 앞 집결", cap: 20, taken: 20, fee: "무료", note: "성곽 훼손·안내판 상태 점검(회원 대상)" },
  { id: "s-2026-12-walk", kind: "sample", apply: true, start: "2026-12-12", end: "2026-12-12", time: "10:00~13:00", title: "[예시] 12월 정기 답사: 팔달산 구간", place: "팔달문 앞 집결", cap: 30, taken: 7, fee: "무료", note: "팔달문~서장대~화서문" },
  { id: "s-2026-12-monitor", kind: "sample", apply: true, start: "2026-12-26", end: "2026-12-26", time: "09:30~12:00", title: "[예시] 월례 수원화성 모니터링", place: "화성행궁 앞 집결", cap: 20, taken: 4, fee: "무료", note: "회원 대상" },
  { id: "s-2027-01-goyuje", kind: "sample", apply: true, start: "2027-01-09", end: "2027-01-09", time: "11:00", title: "[예시] 2027 신년 성신사 고유제", place: "팔달산 성신사", cap: 80, taken: 12, fee: "무료", note: "고유제 후 신년회" }
];

/* ---------- 답사 코스 ---------- */
HS.courses = [
  { id: "c-paldal-3h", start: "팔달문", hours: 3, title: "팔달문 출발 한 바퀴(약 3시간)",
    stops: ["팔달문", "남포루", "서남암문", "서장대", "화서문", "장안문", "방화수류정", "화홍문", "동북공심돈", "동장대(연무대)", "창룡문", "봉돈", "동남각루"],
    note: "팔달산 오르막을 먼저 오르는 순서입니다. 성곽 전체 둘레는 5,744m입니다." },
  { id: "c-jangan-3h", start: "장안문", hours: 3, title: "장안문 출발 한 바퀴(약 3시간)",
    stops: ["장안문", "서북공심돈", "화서문", "서장대", "서남암문", "남포루", "팔달문", "동남각루", "봉돈", "창룡문", "동장대(연무대)", "동북공심돈", "방화수류정", "화홍문"],
    note: "서장대로 먼저 올라가면 서장대에서 팔달문까지가 내리막이 됩니다." },
  { id: "c-chang-1h", start: "창룡문", hours: 1, title: "창룡문에서 방화수류정까지(약 1시간)",
    stops: ["창룡문", "동북노대", "동북공심돈", "동장대(연무대)", "북암문", "방화수류정"],
    note: "수원시가 소개하는 1시간 코스입니다. 창룡문 앞 주차장에서 화성어차도 출발합니다." },
  { id: "c-haeng-1h", start: "화성행궁", hours: 1, title: "화성행궁과 화령전(약 1시간)",
    stops: ["화성행궁 신풍루", "봉수당", "장락당", "낙남헌", "화령전"],
    note: "행궁은 유료 관람입니다. 화령전은 행궁 바로 옆에 있습니다." },
  { id: "c-paldal-1h", start: "팔달문", hours: 1, title: "팔달문에서 서장대까지(약 1시간)",
    stops: ["팔달문", "남치", "남포루", "서남암문", "서장대"],
    note: "오르막이 계속되는 구간입니다. 서장대에서 수원 도심이 내려다보입니다." },
  { id: "c-jangan-1h", start: "장안문", hours: 1, title: "장안문에서 화서문까지(약 1시간)",
    stops: ["장안문", "북서적대", "북서포루", "북포루", "서북공심돈", "화서문"],
    note: "평지 구간이라 걷기 편합니다. 화서문과 서북공심돈을 함께 볼 수 있습니다." }
];

/* ---------- 용어 사전 ---------- */
HS.glossary = [
  { w: "성문", hj: "城門", d: "성의 출입문. 화성에는 장안문(북), 팔달문(남), 화서문(서), 창룡문(동) 네 대문이 있습니다." },
  { w: "옹성", hj: "甕城", d: "성문 바깥을 둥글게 한 번 더 감싸 쌓은 성벽. 적이 성문에 바로 닿지 못하게 합니다." },
  { w: "암문", hj: "暗門", d: "적이 알기 어려운 곳에 낸 비밀 출입문. 화성에는 축성 당시 5곳이 있었습니다." },
  { w: "수문", hj: "水門", d: "물길이 성을 지나도록 낸 문. 화성에는 수원천이 지나는 북수문(화홍문)과 남수문이 있습니다." },
  { w: "치", hj: "雉", d: "성벽 바깥으로 돌출시켜 쌓은 방어 시설. 성벽에 붙은 적을 옆에서 공격할 수 있습니다. 치성이라고도 합니다." },
  { w: "포루(舖樓)", hj: "舖樓", d: "치 위에 목조 누각을 지어 군사가 머물며 망을 보던 시설입니다." },
  { w: "포루(砲樓)", hj: "砲樓", d: "벽돌로 쌓아 안에 화포를 두고 쏘던 시설. 위아래 층에서 동시에 공격할 수 있습니다." },
  { w: "노대", hj: "弩臺", d: "쇠뇌(노)를 쏘던 높은 대. 화성에는 동북노대와 서노대가 있습니다." },
  { w: "적대", hj: "敵臺", d: "성문 좌우에서 성문에 다가오는 적을 막던 시설입니다." },
  { w: "각루", hj: "角樓", d: "성곽 모서리 높은 곳에 세운 감시·지휘용 누각. 방화수류정은 동북각루의 이름입니다." },
  { w: "공심돈", hj: "空心墩", d: "속이 빈 돈대라는 뜻. 벽에 총구멍을 낸 망루로, 우리나라 성곽 가운데 화성에서만 볼 수 있습니다." },
  { w: "장대", hj: "將臺", d: "장수가 군사를 지휘하던 곳. 팔달산 정상의 서장대와 동쪽의 동장대(연무대)가 있습니다." },
  { w: "봉돈", hj: "烽墩", d: "연기와 불로 신호를 보내던 시설. 화성의 봉돈은 전체를 벽돌로 쌓았습니다." },
  { w: "용도", hj: "甬道", d: "성이 아니라 길입니다. 서남암문 밖으로 낸 길로, 화성의 용도는 매복을 위해 만들었습니다." },
  { w: "여장", hj: "女墻", d: "성벽 위에 낮게 쌓은 담. 몸을 숨기고 총구멍으로 적을 공격합니다." },
  { w: "오성지", hj: "五星池", d: "성문 위에 만든 구멍 다섯 개 달린 물탱크. 성문에 불이 붙을 때를 대비했습니다." },
  { w: "외축내탁", hj: "外築內托", d: "성벽 바깥쪽만 돌로 쌓고 안쪽은 흙을 돋워 메우는 축성 방식입니다." },
  { w: "거중기", hj: "擧重器", d: "도르래 원리로 무거운 돌을 들어 올리던 기구. 화성 축성 때 녹로와 함께 쓰였습니다." },
  { w: "녹로", hj: "轆轤", d: "높은 곳으로 무거운 재료를 끌어올리던 기구입니다." },
  { w: "의궤", hj: "儀軌", d: "조선 왕실과 국가의 큰 행사를 그림과 글로 기록한 책. 『화성성역의궤』는 화성 공사 보고서입니다." },
  { w: "행궁", hj: "行宮", d: "왕이 궁궐 밖으로 행차할 때 머물던 임시 궁궐. 화성행궁은 평소 화성유수부 관청으로도 쓰였습니다." },
  { w: "고유제", hj: "告由祭", d: "큰일을 앞두고 사당이나 신에게 그 까닭을 알리는 제사. 화성연구회는 성신사 고유제를 매년 봉행합니다." }
];
