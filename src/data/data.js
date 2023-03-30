export const CurrentUser = [
    {
        id: 1,
        userName: 'ChiXing',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"}, 
        avatar: 'C',
    },
    {
        id: 2,
        userName: 'ZhenyuHu',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"},
        avatar: 'Z',
    },
    {
        id: 3,
        userName: 'RongchengGuo',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"},
        avatar: 'R',
    },
    {
        id: 4,
        userName: 'XuchengHuang',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"},
        avatar: 'X',
    }
];

export function addUser(newUser) {
    CurrentUser.push(newUser);
    console.log(CurrentUser);
}

export default CurrentUser;
