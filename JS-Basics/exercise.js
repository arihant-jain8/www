// let courseName = 'WebDev';
// let coursePrice = 2000;
let courseGoals = ['html', 'css', 'jss'];

// alert(courseName);
// alert(coursePrice);
// alert(courseGoals);

let course = {name: 'WebDev', price: 2000,  goals: ['html','css','js']};
alert("name: " + course.name + " price: " + course.price + " goals: " + course.goals)
alert("2nd goal: " + course.goals[1]);

function getListItem(array, index){
    let ele = array[index];
    return ele;
}

let firstGoal = getListItem(course.goals, 0);
alert(firstGoal);
