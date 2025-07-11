document.addEventListener('DOMContentLoaded', () => {
    // --- 기존의 부드럽게 나타나는 효과 ---
    document.body.style.opacity = 0;
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = 1;
    }, 100);


    // --- 정보 팝오버 기능 ---
    // 1. 팝오버 역할을 할 div 요소를 단 하나만 생성합니다.
    const popover = document.createElement('div');
    popover.className = 'info-popover';
    document.body.appendChild(popover);

    // 2. data-description 속성을 가진 모든 인수 요소를 찾습니다.
    const describedArgs = document.querySelectorAll('.arg[data-description]');

    // 3. 각 인수에 클릭 이벤트를 추가합니다.
    describedArgs.forEach(arg => {
        arg.addEventListener('click', (e) => {
            // 이벤트 버블링을 막아 window의 클릭 이벤트가 바로 실행되는 것을 방지
            e.stopPropagation(); 

            // 팝오버 내용 설정
            popover.textContent = arg.dataset.description;

            // 팝오버 위치 계산
            const rect = arg.getBoundingClientRect();
            const popoverRect = popover.getBoundingClientRect();
            
            popover.style.left = `${rect.left + (rect.width / 2) - (popoverRect.width / 2)}px`;
            popover.style.top = `${rect.bottom + window.scrollY + 8}px`; // 8px 간격

            // 팝오버 보이기
            popover.classList.add('visible');
        });
    });

    // 4. 페이지의 다른 곳을 클릭하면 팝오버를 숨깁니다.
    window.addEventListener('click', () => {
        if (popover.classList.contains('visible')) {
            popover.classList.remove('visible');
        }
    });
});
