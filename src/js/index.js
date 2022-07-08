// Step 요구사항 구현을 위한 전략
// step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴를 추가한다.
// - [x] 추가되는 메뉴의 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼 클릭하면 클릭 이벤트가 발생하고 prompt 뜬다.
// - [x] prompt에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [x] 메뉴 삭제 버튼을 클릭하면 클릭 이벤트가 발생, 메뉴 삭제를 한다.
// - [x] 메뉴 삭제시 confirm을 이용하며 확인 버튼 클릭시 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.

// step2 요구사항 - 상태 관리로 메뉴 관리하기
// TODO localStorage Read & Write
// - [x] localStorage에 데이터를 저장한다.
//    - [x] 메뉴를 추가할 때
//    - [x] 메뉴를 수정할 때
//    - [] 메뉴를 삭제할 때
// - [x] localStorage에 데이터를 읽어온다.

// TODO 카테고리별 메뉴판 관리
// - [ ] 에스프레소 메뉴판 관리
// - [ ] 프라푸치노 메뉴판 관리
// - [ ] 블렌디드 메뉴판 관리
// - [ ] 티바나 메뉴판 관리
// - [ ] 디저트 메뉴판 관리

// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [ ] 페이지가 처음 로딩될때 localStorage에서 에스프레소 메뉴를 읽어온다.
// - [ ] 에스프레소 메뉴를 페이지에 그려준다.

// TODO 품절 상태인 메뉴 관리
// - [ ] 품절 버튼을 추가한다.
// - [ ] 품절 버튼 클릭 시 localStorage에 품절 상태 값을 저장한다.
// - [ ] 품절 버튼 클릭 시 sold-out class를 추가한다.ㅎ
// - [ ] sold-out class가 추가되면 상태를 변경한다.

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};

function App() {
  this.menu = [];

  const updateMenuCount = () => {
    const menuCount = document.querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      return alert("메뉴를 입력해 주세요.");
    }

    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    const template = this.menu
      .map((menuItem, index) => {
        return `<li data-menu-id=${index} class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
      })
      .join("");

    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");

    const updatedMenuName = prompt(
      "메뉴 이름을 수정하시겠습니까?",
      $menuName.innerText
    );

    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    const menuName = e.target.closest("li");

    if (confirm("메뉴를 삭제하시겠습니까??")) {
      menuName.remove();
      updateMenuCount();
    } else {
      return;
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      addMenuName();
    }
  });
}

const app = new App();
