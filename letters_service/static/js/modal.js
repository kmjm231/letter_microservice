// modal.js
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".modalList").forEach(item => {
        item.addEventListener("click", function () {
            let openDate = new Date(this.dataset.openDate);  // ✅ 편지 open_date 가져오기
            let today = new Date();  // ✅ 현재 날짜 가져오기

            today.setHours(0, 0, 0, 0);  // ✅ 시간을 00:00:00으로 설정하여 비교
            openDate.setHours(0, 0, 0, 0);  
            if (today < openDate) {
                alert("🚫 이 편지는 아직 열 수 없습니다! \n열 수 있는 날짜: " + this.dataset.openDate);
                return;  // ✅ 모달창 열기 차단
            }

            // ✅ 편지 열기 가능할 경우 모달창 표시
            let modal = document.getElementById("letterModal");
            document.getElementById("modalTitle").innerText = this.innerText;
            modal.style.display = "block";
            
            const letterId = this.getAttribute("data-id");
            console.log("Clicked Letter ID:", letterId);  // ✅ letterId 값 출력
            openLetter(letterId);
        });
    });
});

// async function openLetter(letterId) {
//     try {
//         if (!letterId || letterId === "undefined") {
//             console.error("에러: 잘못된 letterId 값");
//             return;
//         }

//         console.log("Fetching letter with ID:", letterId);

//         const response = await fetch(`/api/letters/${letterId}/`);
//         if (!response.ok) {
//             throw new Error("데이터를 가져오는 데 실패했습니다.");
//         }

//         const letter = await response.json();

//         document.getElementById("modalTitle").textContent = letter.title;
//         document.getElementById("modalDate").textContent = "📅 " + letter.letter_date;
//         document.getElementById("modalContent").textContent = letter.content;

//         document.getElementById("modalOverlay").style.display = "block";
//         document.getElementById("letterModal").style.display = "block";
//     } catch (error) {
//         console.error("에러 발생:", error);
//     }
// }

function openLetter(letterId) {
    try {
        if (!letterId || letterId === "undefined") {
            console.error("🚨 에러: 잘못된 letterId 값");
            return;
        }

        console.log("✅ Fetching letter with ID:", letterId);

        fetch(`/api/letters/${letterId}/`)
            .then(response => response.json())
            .then(letter => {
                console.log("✅ 받은 데이터:", letter);  // 🔥 JSON 데이터 콘솔 출력

                document.getElementById("modalTitle").textContent = letter.title;
                document.getElementById("modalDate").textContent = "📅 " + letter.letter_date;
                document.getElementById("modalContent").textContent = letter.content;

                // ✅ 모달창 표시 확인
                let overlay = document.getElementById("modalOverlay");
                let modal = document.getElementById("letterModal");

                overlay.style.display = "block";
                modal.style.display = "block";

                console.log("✅ 모달창 표시됨:", overlay.style.display, modal.style.display);
            })
            .catch(error => {
                console.error("❌ 데이터 로딩 실패:", error);
            });
    } catch (error) {
        console.error("🚨 에러 발생:", error);
    }
}


function closeModal() {
    document.getElementById("modalOverlay").style.display = "none";
    document.getElementById("letterModal").style.display = "none";
}
