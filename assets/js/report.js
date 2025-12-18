function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function (data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수

            if (data.userSelectedType === 'R') {
                addr = data.roadAddress;
            } else {
                addr = data.jibunAddress;
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode;
            document.getElementById("sample6_address").value = addr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById("sample6_detailAddress").focus();
        }
    }).open();
}

function changeContent(selectedValue) {
    // 모든 콘텐츠 박스를 가져옵니다.
    const contentBoxes = document.querySelectorAll('.report__conts');

    // 모든 박스를 숨깁니다.
    contentBoxes.forEach(box => {
        box.style.display = 'none';
    });

    // 선택된 값에 해당하는 콘텐츠 박스만 보이게 합니다.
    if (selectedValue) {
        const selectedBox = document.getElementById(selectedValue);
        if (selectedBox) {
            selectedBox.style.display = 'block';
        }
    }
}


// 폼 제출 버튼 활성화/비활성화 검증 ================================
function validateForm(formElement) {
    const submitBtn = formElement.querySelector('.report__btn');
    if (!submitBtn) return;

    // required 필드들 가져오기
    const requiredFields = formElement.querySelectorAll('[required]');

    function checkFormValidity() {
        let allValid = true;

        requiredFields.forEach(field => {
            if (field.type === 'checkbox') {
                if (!field.checked) allValid = false;
            } else if (field.tagName === 'SELECT') {
                if (!field.value || field.value === '') allValid = false;
            } else if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
                if (!field.value.trim()) allValid = false;
            }
        });

        // 버튼 활성화/비활성화
        submitBtn.disabled = !allValid;
    }

    // 각 필드에 이벤트 리스너 추가
    requiredFields.forEach(field => {
        field.addEventListener('input', checkFormValidity);
        field.addEventListener('change', checkFormValidity);
    });

    // 초기 검증
    checkFormValidity();
}

// 페이지 로드 시 두 폼 모두 초기화
document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('.report__form');
    forms.forEach(form => validateForm(form));
});