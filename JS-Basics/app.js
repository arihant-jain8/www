let age = 22;
let userName = 'Ari' + ' Theory';
let hobbies = ['Guitar', 'Series', 'Movies'];
let job= {
    title: 'Developer',
    place: 'Denmark',
    salary: 120000
}

// alert(job.title);
let adultYears;
function calcAdultYears(userAge){
    return userAge - 18;
}

adultYears = calcAdultYears(age);
alert(adultYears);

age = 45;
adultYears = calcAdultYears(age);
alert(adultYears);