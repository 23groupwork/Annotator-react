const choiceDataCS = [
    { id: 1, value: 'check1', name: "comp201", intro: "Software EngineeringI", 
    lecture: [{title: "Lecture1", content: "this is comp201 lecture1", summary: "this is lecture1"}, 
    {title: "Lecture2", content: "this is comp201 lecture2", summary: "this is lecture2"},
    {title: "Lecture3", content: "this is comp201 lecture3", summary: "this is lecture3"},
    {title: "Lecture4", content: "this is comp201 lecture4", summary: "this is lecture4"},]},
    { id: 2, value: 'check2', name: "comp202", intro: "Algorithm", 
    lecture: [{id: 1, title: "Lecture1", content: "this is comp202 lecture1", summary: "Search Tree"}, 
    {id: 2, title: "Lecture2", content: "this is comp202 lecture2", summary: "Sorting"},
    {id: 3, title: "Lecture3", content: {1: "We have already discussed the Divide-and-Conquer method when we talked about sorting. MergeSort is a classical Divide-and-Conquer algorithm, and, QuickSort is very much like a Divide-and-Conquer algorithm (although it doesn’t divide the problem into equal-sized subproblems). The problem we discussed about counting inversions in permutations used a Divide-and-Conquer method to solve it (namely, a modification of the MergeSort algorithm).", 
    2: "This is another world"}, summary: "Fundamental-Divide&Conquer"},
    {id: 4, title: "Lecture4", content: "this is comp202 lecture4", summary: "Fundamental-Greedy"},] },
    { id: 3, value: 'check3', name: "comp207", intro: "Database", 
    lecture: [{title: "lecture1", content: "this is comp207 lecture1", summary: "this is lecture1"}, 
    {title: "lecture2", content: "this is comp207 lecture2", summary: "this is lecture2"},
    {title: "lecture3", content: "this is comp207 lecture3", summary: "this is lecture3"},
    {title: "lecture4", content: "this is comp207 lecture4", summary: "this is lecture4"},] },
    { id: 4, value: 'check4', name: "comp208", intro: "Software EngineeringII", 
    lecture: [{title: "lecture1", content: "this is comp208 lecture1", summary: "this is lecture1"}, 
    {title: "lecture2", content: "this is comp208 lecture2", summary: "this is lecture2"},
    {title: "lecture3", content: "this is comp208 lecture3", summary: "this is lecture3"},
    {title: "lecture4", content: "this is comp208 lecture4", summary: "this is lecture4"},] },
]

const choiceDataEco = [
    { id: 1, value: 'check1', name: "eco201", intro: "Software Engineering", 
    lecture: [{title: "lecture1", content: "this is eco201 lecture1"}, 
    {title: "lecture2", content: "this is eco201 lecture2"},
    {title: "lecture3", content: "this is eco201 lecture3"},
    {title: "lecture4", content: "this is eco201 lecture4"},] },
    { id: 2, value: 'check2', name: "eco202", intro: "Algorithm", 
    lecture: [{title: "lecture1", content: "this is eco202 lecture1"}, 
    {title: "lecture2", content: "this is eco202 lecture2"},
    {title: "lecture3", content: "this is eco202 lecture3"},
    {title: "lecture4", content: "this is eco202 lecture4"},] },
    { id: 3, value: 'check3', name: "eco207", intro: "Database", 
    lecture: [{title: "lecture1", content: "this is eco207 lecture1"}, 
    {title: "lecture2", content: "this is eco207 lecture2"},
    {title: "lecture3", content: "this is eco207 lecture3"},
    {title: "lecture4", content: "this is eco207 lecture4"},] },
    { id: 4, value: 'check4', name: "eco208", intro: "Software Development", 
    lecture: [{title: "lecture1", content: "this is eco208 lecture1"}, 
    {title: "lecture2", content: "this is eco208 lecture2"},
    {title: "lecture3", content: "this is eco208 lecture3"},
    {title: "lecture4", content: "this is eco208 lecture4"},] },
]

const choiceDataMath = [
    { id: 1, value: 'check1', name: "mth201", intro: "Software Engineering", 
    lecture: [{title: "lecture1", content: "this is mth201 lecture1"}, 
    {title: "lecture2", content: "this is mth201 lecture2"},
    {title: "lecture3", content: "this is mth201 lecture3"},
    {title: "lecture4", content: "this is mth201 lecture4"},] },
    { id: 2, value: 'check2', name: "mth202", intro: "Algorithm", 
    lecture: [{title: "lecture1", content: "this is mth202 lecture1"}, 
    {title: "lecture2", content: "this is mth202 lecture2"},
    {title: "lecture3", content: "this is mth202 lecture3"},
    {title: "lecture4", content: "this is mth202 lecture4"},] },
    { id: 3, value: 'check3', name: "mth207", intro: "Database", 
    lecture: [{title: "lecture1", content: "this is mth207 lecture1"}, 
    {title: "lecture2", content: "this is mth207 lecture2"},
    {title: "lecture3", content: "this is mth207 lecture3"},
    {title: "lecture4", content: "this is mth207 lecture4"},] },
    { id: 4, value: 'check4', name: "mth208", intro: "Software Development", 
    lecture: [{title: "lecture1", content: "this is mth208 lecture1"}, 
    {title: "lecture2", content: "this is mth208 lecture2"},
    {title: "lecture3", content: "this is mth208 lecture3"},
    {title: "lecture4", content: "this is mth208 lecture4"},] },
]

const choiceDataLaw = [
    { id: 1, value: 'check1', name: "law201", intro: "Software Engineering", 
    lecture: [{title: "lecture1", content: "this is law201 lecture1"}, 
    {title: "lecture2", content: "this is law201 lecture2"},
    {title: "lecture3", content: "this is law201 lecture3"},
    {title: "lecture4", content: "this is law201 lecture4"},] },
    { id: 2, value: 'check2', name: "law202", intro: "Algorithm", 
    lecture: [{title: "lecture1", content: "this is law202 lecture1"}, 
    {title: "lecture2", content: "this is law202 ecture2"},
    {title: "lecture3", content: "this is law202 lecture3"},
    {title: "lecture4", content: "this is law202 lecture4"},] },
    { id: 3, value: 'check3', name: "law207", intro: "Database", 
    lecture: [{title: "lecture1", content: "this is law207 lecture1"}, 
    {title: "lecture2", content: "this is law207 lecture2"},
    {title: "lecture3", content: "this is law207 lecture3"},
    {title: "lecture4", content: "this is law207 lecture4"},] },
    { id: 4, value: 'check4', name: "law208", intro: "Software Development", 
    lecture: [{title: "lecture1", content: "this is law208 lecture1"}, 
    {title: "lecture2", content: "this is law208 lecture2"},
    {title: "lecture3", content: "this is law208 lecture3"},
    {title: "lecture4", content: "this is law208 lecture4"},] },
]
const coursesdata= [
    {
        "id": 3,
        "value": "check3",
        "name": "comp207",
        "intro": "Database"
    },
    {
        "id": 17,
        "value": "check5",
        "name": "comp226",
        "intro": "Computer-Based Trading in Financial Markets"
    },
    {
        "id": 18,
        "value": "check6",
        "name": "comp229",
        "intro": "Introduction to data science"
    }
]
const choiceData = [  
    choiceDataCS, choiceDataEco, choiceDataLaw, choiceDataMath
] 

export default coursesdata;