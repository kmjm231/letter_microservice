function setRoutine(type) {
    console.log("clicked!", type);  // ✅ 클릭 테스트 로그
    const routineSection = document.getElementById('routine-section');
    const specialSection = document.getElementById('special-section');

    if (type === 'weekly') {
        routineSection.style.display = 'block';
        specialSection.style.display = 'none';
    } else if (type === 'special') {
        routineSection.style.display = 'none';
        specialSection.style.display = 'block';
    }
}


function showCategory(event) {
    let targetTab = event.target;  // ✅ 클릭한 탭 요소 가져오기
    if (!targetTab.dataset.tabTarget) return;  // ✅ data-tab-target이 없으면 종료

    let activeTab = document.querySelector(".tabs .active");  // ✅ 현재 활성화된 탭 찾기
    if (activeTab) {
        activeTab.classList.remove("active");  // ✅ 기존 활성화된 탭에서 active 제거
    }
    targetTab.classList.add("active");  // ✅ 새로 클릭한 탭을 활성화

    // ✅ 모든 편지 섹션 숨기기
    document.querySelectorAll("[data-tab-content]").forEach((section) => {
        section.style.display = "none";
    });

    // ✅ 클릭한 탭과 연결된 편지 섹션만 표시
    let targetSection = document.querySelector(targetTab.dataset.tabTarget);
    if (targetSection) {
        targetSection.style.display = "block";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let defaultTab = document.querySelector(".tabs .active");  // ✅ 기본 활성화된 탭 찾기
    if (defaultTab) {
        let targetSection = document.querySelector(defaultTab.dataset.tabTarget);
        if (targetSection) {
            targetSection.style.display = "block";  // ✅ 기본 섹션 표시
        }
    }
});




document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".hamburger-btn"); 
    const menu = document.getElementById("menu"); // 사이드 메뉴
    const pageCover = document.querySelector(".page_cover"); // 배경 어두워지는 영역

    // 햄버거 버튼 클릭 시 메뉴 열기
    menuButton.addEventListener("click", function () {
        document.documentElement.classList.toggle("open");
        menu.classList.toggle("open");
        pageCover.classList.toggle("open");
    });

    // 메뉴 바깥 클릭 시 닫기
    pageCover.addEventListener("click", function () {
        document.documentElement.classList.remove("open");
        menu.classList.remove("open");
        pageCover.classList.remove("open");
    });
});

function toggleDateOptions() {
    var routineType = document.getElementById("routine_type").value;
    document.getElementById("weekly-options").style.display = (routineType === "weekly") ? "block" : "none";
    document.getElementById("monthly-options").style.display = (routineType === "monthly") ? "block" : "none";
}

function redirectToWritePage(){
    alert("오늘의 기분이 '${mood}'로 설정되었습니다. 편지를 작성해보세요!");
    
    var mood = document.getElementById("mood").value;
    
}
function add_routine(){
    alert("루틴이 저장되었습니다!");
}
function add_specialDay(){
    alert("기념일이 저장되었습니다!")
}
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tabs li");
    const tabContents = document.querySelectorAll("[data-tab-content]");
    // 초기 상태: "오늘의 편지"만 보이게 설정
    tabContents.forEach(content => content.classList.remove("active"));
    document.querySelector("#today").classList.add("active");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = tab.getAttribute("data-tab-target");
            const targetContent = document.querySelector(targetId);
            
            if (!targetContent) {
                console.error("탭 콘텐츠를 찾을 수 없습니다:", targetId);
                return;
            }

            // 모든 탭 버튼에서 active 클래스 제거
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            // 모든 탭 콘텐츠 숨김
            tabContents.forEach(content => content.classList.remove("active"));
            targetContent.classList.add("active");
        });
    });
});

