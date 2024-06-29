// const job = {
//     title: 'Developer',
//     location: 'Gurugram',
//     salary: 1200000
// }

// console.dir(new Date().toISOString());

class Job{
    constructor(jobTitle = 'Engineer', place = 'Delhi', salary = '1000000'){
        this.title = jobTitle;
        this.location = place;
        this.salary = salary;
    }

    describe(){
        console.log(`I'm ${this.title}, I work in ${this.location} and I earn ${this.salary}.`);
    }
}

const dev = new Job('Developer', 'Gurugram', 1200000);
const engi = new Job();

console.log(dev);
dev.describe();
engi.describe();