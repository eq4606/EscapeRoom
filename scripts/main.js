function checkValid() {
    thisDate = new Date()
    if (config.dfu) {
        a = config.dfu.split(',');
        dt = new Date(a[5], a[3] - 1, a[1]);
        dt.setMonth(dt.getMonth() + 1);
        if (dt > thisDate) {
            return true;
        }
    }
    alert('אינכם רשאים להשתמש בתוכנה\n לפרטים פנו אל מנהל המערכת');
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
        alert('תוקף הרשיון פג\n נא פנו למנהל המערכת')
        location.reload();
        return false;
    }
    if (!document.getElementById('verifiForm').classList.contains('d-none')) {
        document.getElementById('verifiForm').classList.add('d-none');
    }
    confirm('מספר האימות אינו תואם, נסה שוב');
    return false;
}

function verifyForm(val, i) {
    if (config.p[i - 1] == val) {
        location.href = `./page${i + 1}.html`;
        return true;
    }
    alert('שגוי, נסה שוב')
    document.getElementById('verifiText').value = '';
    return false;
}

var animalCount = 0, animals = ['parrot', 'lion', 'dolphin'], allCount = 0;

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
        //TODO ERROR
        alert('כניסה נכשלה, נסה שנית');
        return false;
    }
    return false;
}

function verifyDairyCode(code) {
    if (code === config.d) {
        document.getElementById('dairy').classList.remove('d-none');
        document.getElementById('audioDairy').play();
        return true;
    }
    alert('קוד שגוי');
    return false;
}