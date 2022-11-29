const config = {
    vc: '123',//verification code
    dfu: [07, 10, 29, 11, 34, 22],//date first of use: [07,dd,29,mm,34,yy]
    p: [
        'פריצארד 106 יוהנסבורג',
        'בתוך הנברשת',
        'הפארק הלאומי קרוגר',
        'יומן הסוד תמצא אצל אביקו הזדהה עם חולצת האותיות',
        'מכרה פינש מכרה האוצר',
    ],
    d: '672BSOSD',//dairy
    e: '1.25.30'//emergency safe
};


function CustomAlert() {
    this.alert = function (message, title) {
        document.body.innerHTML = document.body.innerHTML + '<div id="dialogoverlay"></div><div id="dialogbox" class="slit-in-vertical"><div><div id="dialogboxhead"></div><div id="dialogboxbody"></div><div id="dialogboxfoot"></div></div></div>';

        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');

        //let winH = window.innerHeight;
        dialogoverlay.style.height = "100vh";//winH + "px";
        dialogoverlay.style.height = "100vw";
        dialogoverlay.style.top = "0";

        dialogbox.style.top = "0";

        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";
        
        dialogoverlay.style.position = "absolute";
        dialogbox.style.position = "absolute";

        dialogbox.classList.add('box')

        document.getElementById('dialogboxhead').style.display = 'block';

        if (typeof title === 'undefined') {
            document.getElementById('dialogboxhead').style.display = 'none';
        } else {
            document.getElementById('dialogboxhead').innerHTML = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + title;
        }
        document.getElementById('dialogboxbody').innerHTML = message;
        document.getElementById('dialogboxfoot').innerHTML = '<button role="button" tabindex="0" onclick="customAlert.ok()" class="button">אישור<span></span><span></span><span></span><span></span><b aria-hidden="true">אישור</b><b aria-hidden="true">אישור</b><b aria-hidden="true">אישור</b><b aria-hidden="true">אישור</b></button>';
    }

    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
    }
}

let customAlert = new CustomAlert();


function checkValid() {
    thisDate = new Date()
    if (config.dfu) {
        dt = new Date((config.dfu[5] + 2000), config.dfu[3] - 1, config.dfu[1]);
        dt.setMonth(dt.getMonth() + 1);
        if (dt > thisDate) {
            return true;
        }
    }
    customAlert.alert('אינכם רשאים להשתמש בתוכנה\n לפרטים פנו אל מנהל המערכת');
    if (location.href.split('/').pop() == 'index.html')
        location.reload();
    else location.href = '../index.html';
    return false;
}

function verifyLicense(verificationCode) {
    if (verificationCode === config.vc) {
        if (checkValid() === true) {
            location.href = './pages/homepage.html';
            return true;
        }
        customAlert.alert('תוקף הרשיון פג\n נא פנו למנהל המערכת')
        location.reload();
        return false;
    }
    if (!document.getElementById('verifiForm').classList.contains('d-none')) {
        document.getElementById('verifiForm').classList.add('d-none');
    }
    customAlert.alert('מספר האימות אינו תואם, נסה שוב');
    return false;
}

var pages = ['homepage', 'office', 'computer', 'room', 'jungle', 'cabe', 'safe', '../index']

function verifyForm(val, i, next) {
    if (config.p[i - 1] == val) {
        next ? location.href = `./${next}.html` : location.href = `./${pages[i + 1]}.html`;
        return true;
    }
    customAlert.alert('שגוי, נסה שוב')
    document.getElementById('verifiText').value = '';
    return false;
}
function back(i) {
    return `./${pages[i - 1]}.html`;
}

var animalCount = 0, animals = ['lion', 'elephant', 'dolphin'], allCount = 0;

function checkImgPass(animal) {
    allCount++;
    if (animal && animals[animalCount] == animal) {
        animalCount++;
        if (animalCount === 3) {
            location.href = './openedComp.html';
            return true;
        }
    }
    else {
        animalCount = 0;
    }
    if (allCount === 3) {
        allCount = 0;
        customAlert.alert('כניסה נכשלה, נסה שנית');
        return false;
    }
    return false;
}

function show(id) {
    document.querySelectorAll('#screen *').forEach(
        e => e.style.pointerEvents = "none"
    );
    document.querySelectorAll(`#${id} *`).forEach(
        e => e.style.pointerEvents = "auto"
    );
    document.getElementById(id).classList.remove('d-none');
}

function hide(id) {
    document.querySelectorAll('#screen *').forEach(
        e => e.style.pointerEvents = "auto"
    );
    document.getElementById(id).classList.add('d-none');
}

function doRetry(isDoc) {
    hide('err');
    if (isDoc) {
        show('documentsMsg');
        return;
    }
    show('resvideo');
    show('restart');
}

function doCancel(isDoc) {
    hide('err')
    if (isDoc) {
        hide('docerr');
    }
}

function verifyDairyCode(code) {
    if (code === config.d) {
        document.getElementById('dairy').classList.remove('d-none');
        document.getElementById('audioDairy').play();
        return true;
    }
    customAlert.alert('קוד שגוי');
    return false;
}

function verifyESafeCode(e, url) {
    if (e === config.e) {
        open(url, '_blsank');
        return true;
    }
    customAlert.alert('שגוי, נסה שוב')
    return true;
}