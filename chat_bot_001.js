var date = new Date();
var year = date.getFullYear();
var month = new String(date.getMonth() + 1);
var day = new String(date.getDate());

var check_list = "<" + year + "년 " + month + "월 " + day + "일>\n";
var check_list_leader = [];
var check_list_follower = [];
var info_title = "[출첵봇Info]\n"
var admin_name = ["ㄱa김현영","김유라","윤가","웅/Rian","민주르~*"];
var room_name = ["3학년 스린"];


//var patten = new RegExp(/\/.+?/, 'g');

function response(room, msg, sender, isGroupChat, replier) {

    if(!isGroupChat){
        replier.reply(info_title + "개인 카톡에서는 동작하지 않습니다.");
        return;
    }
    
    if (msg.indexOf("/추가") === 0) {
        if(!roomCheck(room,replier)) return;
        if(msg.substr(3,1) != " " || msg.substr(6,1) != " " || msg.substr(9,1) != " "){
            replier.reply(info_title + "띄어쓰기를 정확하게 입력해주세요.\n/추가 리더or팔뤄 반(숫자만) 닉네임");
            return;
        } 
        if (msg.indexOf("리더") === 4) {
            if(isNaN(parseInt(msg.substr(7,1)))){
                replier.reply(info_title + "반은 숫자로 입력해야합니다.");
                return;
            }
            var strTemp = msg.toString().substring(7).replace(/\n/gi, "").replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '@');
            if(strTemp.length > 6){ // 너무 길면 자르기
                strTemp = strTemp.substr(0,6)+".."
            }
            check_list_leader.push(strTemp +"("+sender+")"  + "\n");
        } else if (msg.indexOf("팔뤄") === 4) {
            if(isNaN(parseInt(msg.substr(7,1)))){
                replier.reply(info_title + "반은 숫자로 입력해야합니다.");
                return;
            }
            var strTemp = msg.toString().substring(7).replace(/\n/gi, "").replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '@');;
            if(strTemp.length > 6){ // 너무 길면 자르기
                strTemp = strTemp.substr(0,6)+".."
            }
            check_list_follower.push(strTemp +"("+sender+")" + "\n");
        } else{
            replier.reply(info_title + "두 번째 값은 [리더or팔뤄] 이어야 합니다.");
            return;
        }

    } else if (msg.indexOf("/?") === 0) {
        replier.reply(info_title
                    +"<스윙정보>\n/스윙\n: 딴따라 카페 주소"
                    +"\n\n<신규신청>\n/신청\n: 신입생 신청 링크"
                    +"\n\n<추가>\n/추가 리더or팔뤄 반(숫자만) 닉네임\n: 출석 인원 추가"
                    +"\n\n<삭제>\n/삭제 리더or팔뤄 순번(숫자만)\n: 출석 인원 삭제"
                    +"\n\n<조회>\n/조회\n: 전체 목록 보기" 
                    +"\n\n<리셋>\n/리셋\n: 전체 목록 초기화, 날짜 오늘 날짜로 세팅");
    } else if (msg.indexOf("/조회") === 0) {
        if(!roomCheck(room,replier)) return;
        print_msg = check_list  + "[" + room + " 출석]\n"+ "<리더>(등록자)\n";

        for (var i = 0; i < check_list_leader.length; i++) {
            if(check_list_leader[i].length > 13){
                print_msg += (i + 1) + ". " + check_list_leader[i].substr(0,13)+"\n";
            } else{
                print_msg += (i + 1) + ". " + check_list_leader[i];
            }
        }

        print_msg += "\n<팔뤄>(등록자)\n";;

        for (var i = 0; i < check_list_follower.length; i++) {
            if(check_list_follower[i].length > 13){
                print_msg += (i + 1) + ". " + check_list_follower[i].substr(0,13)+"\n";
            } else{
                print_msg += (i + 1) + ". " + check_list_follower[i];
            }
        }

        replier.reply(print_msg);
    } else if (msg.indexOf("/삭제") === 0) {
        if(!roomCheck(room,replier)) return;
        if(msg.substr(3,1) != " " || msg.substr(6,1) != " "){
            replier.reply(info_title + "띄어쓰기를 정확하게 입력해주세요.\n/삭제 리더or팔뤄 순번(숫자만)");
            return;
        } 
        if (msg.indexOf("리더") === 4) {//리더 등록
            if(isNaN(parseInt(msg.substring(7,msg.length)))){
                replier.reply(info_title + "순번은 숫자로 입력해야합니다.");
                return;
            }
            if(check_list_leader[parseInt(msg.substring(7))-1].indexOf(sender)==-1){ // 본인이 등록한 것만 삭제 가능
                replier.reply(info_title + "본인이 등록한 번호만 삭제 가능합니다.");
                return;
            }
            check_list_leader.splice(parseInt(msg.substring(7))-1,1);
        } else if (msg.indexOf("팔뤄") === 4) {//팔뤄 등록
            if(isNaN(parseInt(msg.substring(7,msg.length)))){
                replier.reply(info_title + "순번은 숫자로 입력해야합니다.");
                return;
            }
            if(check_list_follower[parseInt(msg.substring(7))-1].indexOf(sender)==-1){ // 본인이 등록한 것만 삭제 가능
                replier.reply(info_title + "본인이 등록한 번호만 삭제 가능합니다.");
                return;
            }
            check_list_follower.splice(parseInt(msg.substring(7))-1,1);
        } else{
            replier.reply(info_title + "두 번째 값은 [리더or팔뤄] 이어야 합니다.");
            return;
        }
    } else if (msg.indexOf("/스윙") === 0) {
        replier.reply(info_title + ": 스윙에 대한 모든 것 딴따라 스윙댄스\n" + "http://www.krsd.co.kr/");
    } else if (msg.indexOf("/신청") === 0) {
        replier.reply(info_title + ": 신입생 신청 바로가기(체험이벤트 진행중)\n" + "https://m.cafe.naver.com/ArticleList.nhn?search.clubid=21860839&search.menuid=36&search.boardtype=L");
    } else if (msg.indexOf("/리셋") === 0){
        if(!roomCheck(room,replier)) return;
        for(var i = 0; i < admin_name.length; i++){
            if(sender == admin_name[i])
                break;
            if(i == admin_name.length -1){
                replier.reply(info_title + "관리자만 리셋 가능합니다.");
                return;
            }
        }
        date = new Date();
        year = date.getFullYear();
        month = new String(date.getMonth() + 1);
        day = new String(date.getDate());
        check_list = "<" + year + "년 " + month + "월 " + day + "일>\n";
        replier.reply(info_title + "출석 목록이 초기화 됩니다.\n날짜는 오늘 날짜로 리셋 됩니다.");
        check_list_leader = [];
        check_list_follower = [];
        return;
    } else if (msg.indexOf("/방제목") === 0){
        replier.reply("방제목: " + room);
        return;
    }
    // else if (pattern.test(msg)) {
    //     replier.reply(info_title + "유효하지 않은 명령어입니다.");
    // }
}

function roomCheck(room,replier) {
    for(var i = 0; i < room_name.length; i++){//방 구분
        if(room == room_name[i])
            return true;
        if(i == room_name.length -1){
            replier.reply(info_title + "현재는 사용할 수 없는 방입니다.");
            return false;
        }
    }
}