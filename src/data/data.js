export const CurrentUser = [
    {
        id: 1,
        userName: 'ChiXing',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"}, 
        avatar: 'C',
        roleType: 'Student',
    },
    {
        id: 2,
        userName: 'ZhenyuHu',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"},
        avatar: 'Z',
        roleType: "Student",
    },
    {
        id: 3,
        userName: 'RongchengGuo',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"},
        avatar: 'R',
        roleType: 'Student',
    },
    {
        id: 4,
        userName: 'XuchengHuang',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207"},
        avatar: 'X',
        roleType: 'Student',
    },
    {
        id: 5,
        userName: 'admin-s',
        password: '123456',
        major: 'Computer Science',
        courses: {1:"comp201", 2:"comp202", 3:"comp207", 4:"comp208"},
        avatar: 'a',
        roleType: 'Student',
    },
    {
            id: 6,
            userName: 'admin-t',
            password: '123456',
            major: 'Computer Science',
            courses: {1:"comp201", 2:"comp202"},
            avatar: 'a',
            roleType: 'Tutor',
    }
];

export function addUser(newUser) {
    CurrentUser.push(newUser);
    // console.log(CurrentUser);
}

export default CurrentUser;