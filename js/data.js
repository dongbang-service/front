/* 예시 데이터와 브라우저 저장소. 서버가 연결되면 이 계층을 교체하세요. */
(function () {
  "use strict";
  const KEY = "sai-room-frontend-v1";
  function day(offset = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function seed() {
    const now = Date.now();
    return {
      version: 1,
      settings: {
        theme: "light",
        gauge: "basic",
        occupancy: 7,
        capacity: 15,
        detecting: true,
      },
      bookings: [
        {
          id: "sample-project",
          date: day(),
          start: 960,
          end: 1020,
          purpose: "프로젝트",
          name: "최민수",
          people: 3,
          owner: "sample-other",
        },
        {
          id: "sample-study",
          date: day(),
          start: 1080,
          end: 1200,
          purpose: "스터디",
          name: "김동하",
          people: 4,
          owner: "me",
        },
        {
          id: "sample-meeting",
          date: day(1),
          start: 900,
          end: 960,
          purpose: "팀 회의",
          name: "이수진",
          people: 5,
          owner: "sample-other",
        },
      ],
      posts: [
        {
          id: "sample-python",
          kind: "public",
          category: "스터디",
          title: "파이썬 스터디 같이 하실 분",
          body: "매주 수요일 저녁에 파이썬 문제를 같이 풀어볼 분을 구해요.\n처음 배우는 분도 환영합니다! 관심 있으면 댓글 남겨주세요.",
          owner: "sample-other",
          createdAt: now - 600000,
          comments: [
            {
              id: "c1",
              body: "저도 참여하고 싶어요!",
              owner: "me",
              createdAt: now - 300000,
            },
          ],
        },
        {
          id: "sample-drink",
          kind: "public",
          category: "공용물품",
          title: "냉장고의 제 음료수는 먹지 말아주세요",
          body: "냉장고 아래 칸에 이름을 적어둔 음료수가 있어요.\n각자 물건은 확인하고 사용해주시면 감사하겠습니다.",
          owner: "me",
          createdAt: now - 1500000,
          comments: [],
        },
        {
          id: "sample-work",
          kind: "public",
          category: "자유",
          title: "동방에서 같이 과제할 사람?",
          body: "오늘 저녁에 C 과제 같이 하실 분 있나요?\n서로 모르는 부분 이야기하면서 해봐요.",
          owner: "sample-other",
          createdAt: now - 3600000,
          comments: [],
        },
        {
          id: "sample-inquiry",
          kind: "inquiry",
          category: "건의",
          title: "멀티탭을 추가로 놓을 수 있을까요?",
          body: "스터디 시간에 콘센트가 부족해요.\n책상 쪽에 멀티탭을 추가로 배치해주시면 좋겠습니다.",
          owner: "me",
          createdAt: now - 86400000,
          status: "answered",
          comments: [
            {
              id: "admin1",
              body: "건의 감사합니다. 필요한 수량을 확인해서 비치하겠습니다.",
              owner: "admin",
              createdAt: now - 3600000,
            },
          ],
        },
      ],
    };
  }
  function valid(s) {
    return (
      s?.version === 1 &&
      s.settings &&
      ["light", "dark", "blue"].includes(s.settings.theme) &&
      ["basic", "water", "lava"].includes(s.settings.gauge) &&
      Number.isInteger(s.settings.occupancy) &&
      s.settings.occupancy >= 0 &&
      s.settings.occupancy <= 30 &&
      s.settings.capacity === 15 &&
      Array.isArray(s.bookings) &&
      s.bookings.every(
        (b) =>
          typeof b.id === "string" &&
          typeof b.date === "string" &&
          Number.isFinite(b.start) &&
          Number.isFinite(b.end) &&
          typeof b.name === "string" &&
          typeof b.purpose === "string" &&
          Number.isInteger(b.people),
      ) &&
      Array.isArray(s.posts) &&
      s.posts.every(
        (p) =>
          typeof p.id === "string" &&
          typeof p.title === "string" &&
          typeof p.body === "string" &&
          Array.isArray(p.comments),
      )
    );
  }
  let persisted = true;
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (valid(parsed)) return parsed;
      }
    } catch {
      persisted = false;
    }
    return seed();
  }
  function save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      persisted = true;
      return true;
    } catch {
      persisted = false;
      return false;
    }
  }
  window.SaiData = {
    KEY,
    day,
    seed,
    load,
    save,
    get persisted() {
      return persisted;
    },
  };
})();
