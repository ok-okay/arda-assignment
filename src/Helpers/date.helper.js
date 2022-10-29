function getNow(){
    const now = new Date(new Date().getTime());
    return now;
}

function getDayStart(){
    const now = new Date(new Date().getTime());
    const dayStart = new Date((new Date(now.getFullYear(), now.getMonth()-1, now.getDate())));
    return dayStart;
}

module.exports = {
    getNow,
    getDayStart
}