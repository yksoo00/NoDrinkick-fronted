import React, { useState } from 'react';
import '../styles/use.css';

// 예시 데이터
const termsData = {
  1: {
    title: "1조. 정의",
    content: ["1. “노드링킥”이라 함은 애플리케이션을 통해 “개인형 이동수단 공유 서비스”를 제공하는 서비스입니다.", "2. “개인형 이동수단”은 전동킥보드와 전기자전거를 통칭합니다", "3.“회원”이라 함은 서비스에 접속하여 본 약관에 따라 제공하는 서비스를 이용하는 고객을 말합니다."]
  },
  2: {
    title: "2조. 회원가입 및 이용계약의 성립",
    content: ["1. 「개인정보 수집 및 이용 동의」, 「개인정보 제3자 제공 동의」, 「위치정보 이용약관」에 대하여 동의 절차를 완료함으로써 회원가입신청을 합니다.", "2. 회원이 되고자 하는 자의 가입신청에 대하여 서비스 이용 승인을 원칙으로 합니다.", "3. 본인 명의의 휴대전화번호를 보유하고 있는 경우에만 이용 신청이 가능합니다."]
  },
  3: {
    title: "3조. 계정 및 정보의 관리",
    content: ["1. 회원은 1개의 계정을 가지며 그 계정은 회원이 이용 신청 시 기입한 본인인증 정보로 합니다.", "2. 어떠한 경우에도 본인의 계정을 타인에게 양도하면 안됩니다.", "3. 회원의 정보가 유출됨으로 인하여 발생하는 손실이나 손해에 대하여는 회원 본인이 그에 대한 책임을 부담합니다."]
  },
  4: {
    title: "4조. 서비스 이용제한",
    content: ["1. 음주 운전 적발시 서비스가 이용제한 될 수 있습니다.", "2. 위조 면허증 사용시 서비스가 이용제한 될 수 있습니다.", "3. 타인의 아이디를 사용할 경우 서비스가 제한 될 수 있습니다.", "4. 얼굴 인식 3회 오류시 서비스가 제한 될 수 있습니다."]
  }
};

function TermsOfUse() {
  const [selectedSection, setSelectedSection] = useState(null);

  const fetchSectionContent = (section) => {
    setSelectedSection(termsData[section]);
  };

  return (
    <div className="terms-container">
      <h6>이용약관</h6>
      <div className="buttons-container">
        <button onClick={() => fetchSectionContent(1)}>①</button>
        <button onClick={() => fetchSectionContent(2)}>②</button>
        <button onClick={() => fetchSectionContent(3)}>③</button>
        <button onClick={() => fetchSectionContent(4)}>④</button>
      </div>
      {selectedSection && (
        <div className="section-content">
          <h7>{selectedSection.title}</h7>
          <ul>
            {selectedSection.content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TermsOfUse;
