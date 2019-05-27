import React, { Component } from 'react';
import { browserHistory } from 'react-router/lib';

class Policy extends Component {
    constructor(props){
      super(props)

      this.state = {
          terms:[1,2,3],
      }
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){      
      axios.get('/api/v1/qna?filters=status=1,object_type=Policy')
      .then((res)  => {
          this.setTerms(res.data)
      })
      .catch((err) => {
          console.log(err)
      })
   }

  setTerms(terms){
    this.setState({ terms: terms['result'] })
  }

  handleClose(){
    window.history.go(-1);
  }
  

  handleShow(id){
    $('.block-content').hide()
    $('#cl-'+id).show()
  }

  render() {
        const {terms} = this.state
        
        return (
          <main className="site-main">
            <div className="container">
                <div className="block-gird-item">
                    <div className="toobar">
                        <strong className="title">개인정보취급방침</strong>

                    </div>

                    <div className="block-privacypolice">
                        <br/><br/><br/>

                        <p>레시피봄은 이용자들의 개인정보보호를 매우 중요시하며, 이용자가 회사의 서비스를 이용함과 동시에 온라인상에서 회사에 제공한 개인정보가 보호 받을 수 있도록 최선을 다하고 있습니다.
                        </p>
                        <p>이에 레시피봄은 통신비밀보호법, 전기통신사업법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 정보통신서비스제공자가 준수하여야 할 관련 법규상의 개인정보보호 규정 및
                            정보통신부가 제정한 개인정보보호지침을 준수하고 있습니다. 레시피봄은 개인정보 처리방침을 통하여 이용자들이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를
                            위해 어떠한 조치가 취해지고 있는지 알려 드립니다</p>
                        <br/>
                        <p>레시피봄은 개인정보 처리방침을 홈페이지 첫 화면에 공개함으로써 이용자들이 언제나 용이하게 보실 수 있도록 조치하고 있습니다.</p>
                        <br/>
                        <p>레시피봄은 이용자들의 개인정보보호를 매우 중요시하며, 이용자가 회사의 서비스를 이용함과 동시에 온라인상에서 회사에 레시피봄은 이용자들의 개인정보보호를 매우 중요시하며, 이용자가
                            회사의 서비스를 이용함과 동시에 온라인상에서 회사에 레시피봄은 이용자들의 개인정보보호를 매우 중요시하며, 이용자가 회사의 서비스를 이용함과 동시에 온라인상에서 회사에</p>
                        <br/>
                        <p>회사의 개인정보 처리방침은 정부의 법률 및 지침 변경이나 회사의 내부 방침 변경 등으로 인하여 수시로 변경될 수 있고, 이에 따른 개인정보 처리방침의 지속적인 개선을 위하여 필요한
                            절차를 정하고 있습니다. 그리고 개인정보 처리방침을 개정하는 경우나 개인정보 처리방침 변경될 경우 개인정보처리방침을 통해 고지하고 있습니다. 이용자들께서는 사이트 방문 시 수시로
                            확인하시기 바랍니다.</p>
                        <br/>
                        <p>레시피봄은 개인정보 처리방침은 다음과 같은 내용을 담고 있습니다.</p>
                        <br/>

                        <p><a href="#privacypolice1" style="color: #000;" data-action='scrollToLink'><b>1. 개인정보 수집에 대한 동의</b></a></p>
                        <p><a href="#privacypolice2" style="color: #000;" data-action='scrollToLink'><b>2. 개인정보의 수집목적 및 이용목적</b></a></p>
                        <p><a href="#privacypolice3" style="color: #000;" data-action='scrollToLink'><b>3. 수집하는 개인정보 항목 및 수집방법</b></a></p>
                        <p><a href="#privacypolice4" style="color: #000;" data-action='scrollToLink'><b>4. 수집하는 개인정보의 보유 및 이용기간</b></a></p>
                        <p><a href="#privacypolice5" style="color: #000;" data-action='scrollToLink'><b>5. 수집한 개인정보의 공유 및 제공</b></a></p>
                        <p><a href="#privacypolice6" style="color: #000;" data-action='scrollToLink'><b>6. 이용자 자신의 개인정보
                                    관리(열람,정정,삭제 등)에 관한 사항</b></a></p>
                        <p><a href="#privacypolice7" style="color: #000;" data-action='scrollToLink'><b>7. 쿠키(Cookie)의 운용 및 거부</b></a></p>
                        <p><a href="#privacypolice8" style="color: #000;" data-action='scrollToLink'><b>8. 비회원 고객의 개인정보 관리</b></a></p>
                        <p><a href="#privacypolice9" style="color: #000;" data-action='scrollToLink'><b>9. 개인정보의 위탁처리</b></a></p>
                        <p><a href="#privacypolice10" style="color: #000;" data-action='scrollToLink'><b>10. 개인정보관련 의견수렴 및
                                    불만처리에 관한 사항</b></a></p>
                        <p><a href="#privacypolice11" style="color: #000;" data-action='scrollToLink'><b>11. 개인정보 관리책임자 및 담당자의
                                    소속-성명 및 연락처</b></a></p>
                        <p><a href="#privacypolice12" style="color: #000;" data-action='scrollToLink'><b>12. 아동의 개인정보보호</b></a></p>
                        <p><a href="#privacypolice13" style="color: #000;" data-action='scrollToLink'><b>13. 고지의 의무</b></a></p>

                        <br/><br/>

                        <p id="privacypolice1"><b>1. 개인정보 수집에 대한 동의</b></p>
                        <p>레시피봄은 이용자들이 회사의 개인정보 처리방침 또는 이용약관의 내용에 대하여 「동의」버튼 또는 「취소」버튼을 클릭할 수 있는 절차를 마련하여, 「동의」버튼을 클릭하면 개인정보
                            수집에 대해</p>
                        <p>동의한 것으로 봅니다.</p>
                        <br/><br/>
                        <p id="privacypolice2"><b>2. 개인정보의 수집목적 및 이용목적</b></p>
                        <p>"개인정보"라 함은 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명등의 사항에 의하여 당해 개인을 식별할 수 있는 <br/>정보(당해 정보만으로는 특정 개인을 식별할
                            수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함)를 말합니다.</p>
                        <p>대부분의 서비스는 별도의 사용자 등록이 없이 언제든지 사용할 수 있습니다. 그러나 레시피봄은 회원서비스를 통하여 이용자들에게 맞춤식 서비스를 비롯한 보다 더 향상된 양질의 서비스를
                            제공하기 위하여 이용자 개인의 정보를 수집하고 있습니다.</p>
                        <p>레시피봄은 이용자의 사전 동의 없이는 이용자의 개인 정보를 공개하지 않으며, 수집된 정보는 아래와 같이 이용하고 있습니다.</p>
                        <p>첫째, 이용자들이 제공한 개인정보를 바탕으로 보다 더 유용한 서비스를 개발할 수 있습니다. 레시피봄은 신규 서비스개발이나 컨텐츠의 확충 시에 기존 이용자들이 회사에 제공한
                            개인정보를 바탕으로 개발해야 할 서비스의 우선 순위를 보다 더 효율적으로 정하고, 레시피봄은이용자들이 필요로 할 컨텐츠를 합리적으로 선택하여 제공할 수 있습니다.</p>
                        <br/>
                        <p>둘째, 수집하는 개인정보 항목과 수집 및 이용목적은 다음과 같습니다. </p>
                        <p>-성명 , 아이디, 비밀번호 : 회원제 서비스 이용에 따른 본인 확인 절차에 이용</p>
                        <p>-이메일주소, 전화번호 : 고지사항 전달, 불만처리 등을 위한 원활한 의사소통 경로의 확보, 새로운 서비스 및 신상품이나 이벤트 정보 등의 안내</p>
                        <p>-은행계좌정보, 신용카드정보 : 서비스 및 부가 서비스 이용에 대한 요금 결제</p>
                        <p>-주소, 전화번호 : 청구서, 물품배송시 정확한 배송지의 확보</p>
                        <p>-기타 선택항목 : 개인맞춤 서비스를 제공하기 위한 자료</p>
                        <p>-IP Address : 불량회원의 부정 이용 방지와 비인가 사용 방지</p>
                        <p>-14세미만 가입자의 경우 법정대리인의 정보 : 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인</p>
                        <br/>
                        <p>기타 위 수집된 정보를 이용하여 서비스 제공에 관한 계약 이행 및 요금 정산, 회원관리, 마케팅 및 광고에 활용하고 있습니다.</p>
                        <br/><br/>
                        <p id="privacypolice3"><b>3. 수집하는 개인정보 항목 및 수집방법</b></p>
                        <p>레시피봄은 이용자들이 회원서비스를 이용하기 위해 회원으로 가입하실 때 서비스 제공을 위한 필수적인 정보들을 온라인상에서 입력 받고 있습니다. 회원 가입 시에 받는 필수적인 정보는
                            이름, 이메일 주소 등입니다. </p>
                        <p>또한 양질의 서비스 제공을 위하여 이용자들이 선택적으로 입력할 수 있는 사항으로서 전화번호 등을 입력 받고 있습니다. 또한 쇼핑몰 내에서의 설문조사나 이벤트 행사 시 통계분석이나
                            경품제공 등을 위해 선별적으로 개인정보 입력을 요청할 수 있습니다. 그러나, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및
                            본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않으며 부득이하게 수집해야 할 경우 이용자들의 사전동의를 반드시 구할 것입니다. 그리고, 어떤 경우에라도
                            입력하신 정보를 이용자들에게 사전에 밝힌 목적 이외에 다른 목적으로는 사용하지 않으며 외부로 유출하지 않습니다.</p>
                        <br/><br/>

                        <p id="privacypolice4"><b>4. 수집하는 개인정보의 보유 및 이용기간</b></p>
                        <p>이용자가 쇼핑몰 회원으로서 회사에 제공하는 서비스를 이용하는 동안 레시피봄은 이용자들의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다. 다만, 아래의 "6.
                            이용자 자신의 개인정보 관리(열람,정정,삭제 등)에 관한 사항" 에서 설명한 절차와 방법에 따라 회원 본인이 직접 삭제하거나 수정한 정보, 가입해지를 요청한 경우에는 재생할 수
                            없는 방법에 의하여 디스크에서 완전히 삭제하며 추후 열람이나 이용이 불가능한 상태로 처리됩니다.</p>
                        <br/>
                        <p>그리고 "3. 수집하는 개인정보 항목 및 수집방법"에서와 같이 일시적인 목적 (설문조사, 이벤트, 본인확인 등)으로 입력 받은 개인정보는 그 목적이 달성된 이후에는 동일한 방법으로
                            사후 재생이 불가능한 상태로 처리됩니다.</p>
                        <br/>
                        <p>귀하의 개인정보는 다음과 같이 개인정보의 수집목적 또는 제공받은 목적이 달성되면 파기하는 것을 원칙으로 합니다. 그리고 상법, 전자상거래등에서의 소비자보호에 관한 법률 등
                            관계법령의 규정에 의하여 보존할 필요가 있는 경우 레시피봄은 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다. 이 경우 레시피봄은 보관하는 정보를 그 보관의 목적으로만
                            이용하며 보존기간은 아래와 같습니다.</p>
                        <br/>
                        <p>- 계약 또는 청약철회 등에 관한 기록 : 5년</p>
                        <p>- 대금결제 및 재화 등의 공급에 관한 기록 : 5년</p>
                        <p>- 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</p>
                        <br/>
                        <p>레시피봄은 귀중한 회원의 개인정보를 안전하게 처리하며, 유출의 방지를 위하여 다음과 같은 방법을 통하여 개인정보를 파기합니다.</p>
                        <br/>
                        <p>- 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
                        <p>- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다</p>
                        <br/><br/>

                        <p id="privacypolice5"><b>5. 수집한 개인정보의 공유 및 제공</b></p>
                        <p>레시피봄은 이용자들의 개인정보를 "2. 개인정보의 수집목적 및 이용목적"에서 고지한 범위 내에서 사용하며, 이용자의 사전 동의 없이는 동 범위를 초과하여 이용하거나 원칙적으로
                            이용자의 개인정보를 외부에 공개하지 않습니다. </p>
                        <p>다만, 아래의 경우에는 예외로 합니다.</p>
                        <br/>
                        <p>- 이용자들이 사전에 공개에 동의한 경우</p>
                        <p>- 서비스 제공에 따른 요금정산을 위하여 필요한 경우</p>
                        <p>- 홈페이지에 게시한 서비스 이용 약관 및 기타 회원 서비스 등의 이용약관 또는 운영원칙을 위반한 경우</p>
                        <p>- 자사 서비스를 이용하여 타인에게 정신적, 물질적 피해를 줌으로써 그에 대한 법적인 조치를</p>
                        <p>취하기 위하여 개인정보를 공개해야 한다고 판단되는 충분한 근거가 있는 경우</p>
                        <p>- 기타 법에 의해 요구된다고 선의로 판단되는 경우 (ex. 관련법에 의거 적법한 절차에 의한 정부/수사기관의 요청이 있는 경우 등)</p>
                        <p>- 통계작성, 학술연구나 시장조사를 위하여 특정개인을 식별할 수 없는 형태로 광고주, 협력업체나 연구단체 등에 제공하는 경우</p>
                        <br/><br/>

                        <p id="privacypolice6"><b>6. 이용자 자신의 개인정보 관리(열람,정정,삭제 등)에 관한 사항</b></p>
                        <p>회원님이 원하실 경우 언제라도 당사에서 개인정보를 열람하실 수 있으며 보관된 필수 정보를 수정하실 수 있습니다. 또한 회원 가입 시 요구된 필수 정보 외의 추가 정보는 언제나
                            열람, 수정, 삭제할 수 있습니다. 회원님의 개인정보 변경 및 삭제와 회원탈퇴는 당사의 고객센터에서 로그인(Login) 후 이용하실 수 있습니다.</p>
                        <br/><br/>

                        <p id="privacypolice7"><b>7. 쿠키(Cookie)의 운용 및 거부</b></p>
                        <p>가. 쿠키의 사용 목적</p>
                        <p>① 회사는 개인 맞춤 서비스를 제공하기 위해서 이용자에 대한 정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트 서버가 이용자의 브라우저에게
                            전송하는 소량의 정보로서 이용자 컴퓨터의 하드디스크에 저장됩니다.</p>
                        <p>② 회사는 쿠키의 사용을 통해서만 가능한 특정된 맞춤형 서비스를 제공할 수 있습니다.</p>
                        <p>③ 회사는 회원을 식별하고 회원의 로그인 상태를 유지하기 위해 쿠키를 사용할 수 있습니다.</p>
                        <br/>
                        <p>나. 쿠키의 설치/운용 및 거부</p>
                        <p>① 이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 이용자는 웹브라우저에서 옵션을 조정함으로써 모든 쿠키를 허용/거부하거나, 쿠키가 저장될 때마다 확인을 거치도록 할
                            수 있습니다.</p>
                        <br/>
                        <p>- 쿠키 설치 허용 여부를 지정하는 방법(Internet Explorer의 경우)은 다음과 같습니다.</p>
                        <p>[도구] 메뉴에서 [인터넷 옵션]을 선택합니다.</p>
                        <p>[개인정보 탭]을 클릭합니다.</p>
                        <p>[개인정보처리 수준]을 설정하시면 됩니다.</p>
                        <p>② 쿠키의 저장을 거부할 경우에는 개인 맞춤서비스 등 회사가 제공하는 일부 서비스는 이용이 어려울 수 있습니다.</p>
                        <br/><br/>

                        <p id="privacypolice8"><b>8. 비회원고객의 개인정보관리</b></p>
                        <p>- 당사는 비회원 고객 또한 물품 및 서비스 상품의 구매를 하실 수 있습니다. 당사는 비회원 주문의 경우 배송 및 대금 결제, 상품 배송에 반드시 필요한 개인정보만을 고객님께
                            요청하고 있습니다.</p>
                        <p>- 당사에서 비회원으로 구입을 하신 경우 비회원 고객께서 입력하신 지불인 정보 및 수령인 정보는 대금 결제 및 상품 배송에 관련한 용도 외에는 다른 어떠한 용도로도 사용되지
                            않습니다.</p>
                        <br/><br/>

                        <p id="privacypolice9"><b>9. 개인정보의 위탁처리</b></p>
                        <p>레시피봄은 서비스 향상을 위해서 귀하의 개인정보를 필요한 경우 동의 등 법률상의 요건을 구비하여 외부에 수집 · 처리 · 관리 등을 위탁하여 처리할 있으며, 제 3자에 게 제공할
                            수 있습니다.</p>
                        <p>- 당사는 개인정보의 처리와 관련하여 아래와 같이 업무를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록
                            필요한 사항을 규정하고 있습니다. 또한 공유하는 정보는 당해 목적을 달성하기 위하여 필요한 최소한의 정보에 국한됩니다.</p>
                        <p>- 개인정보의 처리를 위탁하거나 제공하는 경우에는 수탁자, 수탁범위, 공유 정보의 범위 등에 관한 사항을 서면, 전자우편, 전화 또는 홈페이지를 통해 미리 귀하에게 고지합니다.</p>
                        <br/><br/>

                        <p id="privacypolice10"><b>10. 개인정보관련 의견수렴 및 불만처리에 관한 사항</b></p>
                        <p>당사는 개인정보보호와 관련하여 이용자 여러분들의 의견을 수렴하고 있으며 불만을 처리하기 위하여 모든 절차와 방법을 마련하고 있습니다. 이용자들은 하단에 명시한 "11. 개인정보
                            관리책임자 및 담당자의 소속-성명 및 연락처"항을 참고하여 전화나 메일을 통하여 불만사항을 신고할 수 있고, 레시피봄은 이용자들의 신고사항에 대하여 신속하고도 충분한 답변을 해
                            드릴것입니다.</p>
                        <br/><br/>

                        <p id="privacypolice11"><b>11. 개인정보 보호책임자 및 담당자의 소속-성명 및 연락처</b></p>
                        <p>당사는 귀하가 좋은 정보를 안전하게 이용할 수 있도록 최선을 다하고 있습니다. 개인정보를 보호하는데 있어 귀하께 고지한 사항들에 반하는 사고가 발생할 경우 개인정보보호책임자가
                            책임을 집니다.</p>
                        <p>이용자 개인정보와 관련한 아이디(ID)의 비밀번호에 대한 보안유지책임은 해당 이용자 자신에게 있습니다. 레시피봄은 비밀번호에 대해 어떠한 방법으로도 이용자에게 직접적으로 질문하는
                            경우는 없으므로 타인에게 비밀번호가 유출되지 않도록 각별히 주의하시기 바랍니다. 특히 공공장소에서 온라인상에서 접속해 있을 경우에는 더욱 유의하셔야 합니다.</p>
                        <br/><br/>

                        <p id="privacypolice12"><b>12. 아동의 개인정보보호</b></p>
                        <p>레시피봄은 온라인 환경에서 만 14세 미만 어린이의 개인정보를 보호하는 것 역시 중요한 일이라고 생각하고 있습니다. 레시피봄은 만 14세 미만의 어린이들은 법정대리인의 동의가 없는
                            한 회원으로 가입할 수 없게 하고 있습니다. 즉, 만 14세 미만의 어린이들은 법정대리인의 동의가 있을 때만 레시피봄은 에서 회원 자격의 서비스를 받을 수 있습니다.</p>
                        <br/><br/>

                        <p id="privacypolice13"><b>13. 고지의 의무</b></p>
                        <p>현 개인정보처리방침의 내용은 정부의 정책 또는 보안기술의 변경에 따라 내용의 추가 삭제 및 수정이 있을 시에는 홈페이지의 '공지사항'을 통해 고지할 것입니다. </p>
                        <br/>
                        <p>개인정보처리방침 시행일자: 2018-10-11</p>
                        <p>개인정보처리방침 변경일자: 2018-10-11</p>

                    </div>
                </div>
            </div>
        </main>
        );
    }
}

export default Policy;