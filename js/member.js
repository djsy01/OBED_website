document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".member-card");
  
    // 포지션 단방향 매핑
    const positionMap = {
      "Engineer": "EngineerStep",
      "Step": "EngineerStep",
      "Acoustic Guitar": "Guitar",
      "Electric Guitar": "Guitar",
      "Bass": "Guitar",
      "Bass Guitar": "Guitar",
      "Piano": "Piano",
      "Synthesizer": "Piano"
    };
  
    // 필터 -> 원래 역할 역매핑
    const reverseMap = {
      "Guitar": ["Acoustic Guitar", "Electric Guitar", "Bass", "Bass Guitar"],
      "EngineerStep": ["Engineer", "Step"],
      "Piano": ["Piano", "Synthesizer"]
    };
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        const normalizedFilter = positionMap[filter] || filter;
        const reverseRoles = reverseMap[normalizedFilter] || [normalizedFilter];
  
        // 버튼 활성화 처리
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        cards.forEach(card => {
          const info = card.querySelector(".member-info");
          const dataPosition = info.dataset.position || "";
          const roles = dataPosition.split(",").map(r => r.trim());
  
          // 카드가 보여야 하는 조건
          const shouldShow =
            filter === "all" ||
            roles.some(role => {
              const mapped = positionMap[role] || role;
              return (
                role === filter ||
                role === normalizedFilter ||
                mapped === normalizedFilter ||
                reverseRoles.includes(role)
              );
            });
  
          card.style.display = shouldShow ? "flex" : "none";
  
          // 포지션 태그 항상 보이기 + 필터된 포지션만 강조
          const roleItems = info.querySelectorAll(".position-list li");
          roleItems.forEach(li => {
            const role = li.dataset.role;
            const mapped = positionMap[role] || role;
            const highlight =
              filter === "all" ||
              role === filter ||
              role === normalizedFilter ||
              mapped === normalizedFilter ||
              reverseRoles.includes(role);
  
            li.style.display = "inline-block"; // 항상 보임
            li.classList.toggle("active", highlight); // 필터 조건에 맞는 것만 강조
          });
        });
      });
    });
  
    // 초기 전체 보기
    document.querySelector(".filter-btn[data-filter='all']")?.click();
  });
  